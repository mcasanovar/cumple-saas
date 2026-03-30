"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { DashboardRSVP } from "@/lib/types/rsvp";

const deleteInvitationSchema = z.object({
  invitationId: z.string().min(1, "ID de invitación requerido"),
});

export type DeleteInvitationState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function deleteInvitation(
  _prevState: DeleteInvitationState,
  formData: FormData
): Promise<DeleteInvitationState> {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { status: "error", message: "No autorizado" };
  }

  const rawData = {
    invitationId: formData.get("invitationId"),
  };

  const parsed = deleteInvitationSchema.safeParse(rawData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos";
    return { status: "error", message: firstError };
  }

  const { invitationId } = parsed.data;

  try {
    // Verify invitation exists and belongs to user
    const invitation = await prisma.invitation.findFirst({
      where: {
        id: invitationId,
        user: {
          clerkId,
        },
      },
      include: {
        _count: {
          select: {
            rsvps: true,
          },
        },
      },
    });

    if (!invitation) {
      return {
        status: "error",
        message: "Invitación no encontrada o no tienes permiso",
      };
    }

    // Soft delete - update isDelete to true
    await prisma.invitation.update({
      where: { id: invitationId },
      data: { isDelete: true },
    });

    revalidatePath("/dashboard/invitaciones");

    return {
      status: "success",
      message: `Invitación eliminada correctamente${invitation._count.rsvps > 0 ? ` (${invitation._count.rsvps} confirmaciones de asistencia también se ocultarán)` : ""}`,
    };
  } catch (error) {
    console.error("Error deleting invitation:", error);
    return {
      status: "error",
      message: "Hubo un error al eliminar la invitación. Inténtalo de nuevo.",
    };
  }
}

export async function getRSVPsByInvitation(invitationId: string): Promise<DashboardRSVP[]> {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("No autorizado");
  }

  const invitation = await prisma.invitation.findFirst({
    where: {
      id: invitationId,
      user: {
        clerkId,
      },
    },
    include: {
      rsvps: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!invitation) {
    throw new Error("Invitación no encontrada o no tienes permiso");
  }

  return invitation.rsvps.map((rsvp) => ({
    id: rsvp.id,
    name: rsvp.name,
    email: rsvp.email,
    willAttend: rsvp.willAttend,
    guestCount: rsvp.guestCount,
    guestNames: Array.isArray(rsvp.guestNames) ? rsvp.guestNames as string[] : [],
    createdAt: rsvp.createdAt.toISOString(),
  }));
}
