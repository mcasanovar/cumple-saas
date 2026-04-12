"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { DashboardRSVP } from "@/lib/types/rsvp";

const deleteInvitationSchema = z.object({
  invitationId: z.string().min(1, "ID de invitación requerido"),
});

const addGuestSchema = z.object({
  rsvpId: z.string().min(1, "ID de RSVP requerido"),
  name: z.string().min(1, "El nombre no puede estar vacío"),
});

const removeGuestSchema = z.object({
  rsvpId: z.string().min(1, "ID de RSVP requerido"),
  index: z.number().min(1, "No se puede eliminar al invitado principal"),
});

export type DeleteInvitationState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export type AddGuestState =
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
    message: rsvp.message,
    createdAt: rsvp.createdAt.toISOString(),
  }));
}

export async function addRSVPGuest(
  _prevState: AddGuestState,
  formData: FormData
): Promise<AddGuestState> {
  const { userId: clerkId } = await auth();
  if (!clerkId) return { status: "error", message: "No autorizado" };

  const rsvpId = formData.get("rsvpId") as string;
  const name = formData.get("name") as string;

  const parsed = addGuestSchema.safeParse({ rsvpId, name });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0].message };

  try {
    const rsvp = await prisma.rSVP.findFirst({
      where: { id: rsvpId, invitation: { user: { clerkId } } },
      select: { guestNames: true, invitationId: true }
    });

    if (!rsvp) return { status: "error", message: "No encontrado" };

    const guestNames = Array.isArray(rsvp.guestNames) ? [...(rsvp.guestNames as string[]), name] : [name];

    await prisma.rSVP.update({
      where: { id: rsvpId },
      data: {
        guestNames,
        guestCount: guestNames.length,
      },
    });

    revalidatePath(`/dashboard/invitaciones/${rsvp.invitationId}/invitados`);
    return { status: "success", message: "Invitado agregado" };
  } catch (error) {
    return { status: "error", message: "Error al agregar invitado" };
  }
}

export async function removeRSVPGuest(
  rsvpId: string,
  index: number
): Promise<{ success: boolean; message: string }> {
  const { userId: clerkId } = await auth();
  if (!clerkId) return { success: false, message: "No autorizado" };

  const parsed = removeGuestSchema.safeParse({ rsvpId, index });
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };

  try {
    const rsvp = await prisma.rSVP.findFirst({
      where: { id: rsvpId, invitation: { user: { clerkId } } },
      select: { guestNames: true, invitationId: true }
    });

    if (!rsvp) return { success: false, message: "No encontrado" };

    const guestNames = (rsvp.guestNames as string[]).filter((_, i) => i !== index);

    await prisma.rSVP.update({
      where: { id: rsvpId },
      data: {
        guestNames,
        guestCount: guestNames.length,
      },
    });

    revalidatePath(`/dashboard/invitaciones/${rsvp.invitationId}/invitados`);
    return { success: true, message: "Invitado eliminado" };
  } catch (error) {
    return { success: false, message: "Error al eliminar invitado" };
  }
}
