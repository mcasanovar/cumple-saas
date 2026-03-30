"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { RSVPActionState } from "@/lib/types/invitation";

const rsvpSchema = z.object({
  invitationId: z.string().min(1, "ID de invitación requerido"),
  email: z.string().email("Correo electrónico inválido").optional().or(z.literal("")),
  willAttend: z.boolean(),
  guestCount: z.number().min(0, "El número de invitados no puede ser negativo").max(20, "Máximo 20 invitados permitidos"),
  guestNames: z.array(z.string().min(1, "El nombre del invitado no puede estar vacío").max(50, "El nombre del invitado es demasiado largo")).optional(),
});

export async function submitRSVP(
  _prevState: RSVPActionState,
  formData: FormData
): Promise<RSVPActionState> {
  const rawData = {
    invitationId: formData.get("invitationId"),
    email: formData.get("email"),
    willAttend: formData.get("willAttend") === "true",
    guestCount: parseInt(formData.get("guestCount") as string || "0"),
    guestNames: JSON.parse(formData.get("guestNames") as string || "[]"),
  };

  const parsed = rsvpSchema.safeParse(rawData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos";
    return { status: "error", message: firstError };
  }

  const { invitationId, email, willAttend, guestCount, guestNames } = parsed.data;

  try {
    // Verify if invitation exists in DB
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      // If it's a mock invitation, we just log it and return success for the UI
      console.log("Mock RSVP received (Invitation not in DB):", parsed.data);
      return {
        status: "success",
        message: "¡Gracias por confirmar! (Modo Demo)"
      };
    }

    // Check for duplicate RSVPs with same email
    if (email) {
      const existingRSVP = await prisma.rSVP.findFirst({
        where: {
          invitationId,
          email,
        },
      });

      if (existingRSVP) {
        return {
          status: "error",
          message: "Ya existe una confirmación con este correo electrónico para esta invitación.",
        };
      }
    }

    // Save to DB
    await prisma.rSVP.create({
      data: {
        invitationId,
        name: guestNames?.[0] || "Invitado", // Usar el primer nombre del array o "Invitado" como fallback
        email: email || null,
        willAttend,
        guestCount,
        guestNames: guestNames || [],
      },
    });

    revalidatePath(`/invitacion/${invitationId}`);

    return {
      status: "success",
      message: willAttend
        ? "¡Gracias por confirmar! Te esperamos."
        : "Lamentamos que no puedas venir. ¡Gracias por avisar!",
    };
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    if (error instanceof Error) {
      // Handle specific database errors
      if (error.message.includes('Unique constraint')) {
        return { status: "error", message: "Ya existe una confirmación para esta invitación." };
      }
      if (error.message.includes('Foreign key constraint')) {
        return { status: "error", message: "La invitación no existe." };
      }
    }
    return { status: "error", message: "Hubo un error al procesar tu solicitud. Inténtalo de nuevo." };
  }
}
