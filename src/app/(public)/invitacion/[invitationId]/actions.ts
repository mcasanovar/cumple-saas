"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formatDateLong } from "@/utils/date";
import prisma from "@/lib/prisma";
import type { RSVPActionState } from "@/lib/types/invitation";
import { resend } from "@/lib/resend";
import RSVPToHostEmail from "@/emails/RSVPToHostEmail";
import RSVPToGuestEmail from "@/emails/RSVPToGuestEmail";

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
      include: { user: true },
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
    const guestName = guestNames?.[0] || "Invitado";
    await prisma.rSVP.create({
      data: {
        invitationId,
        name: guestName,
        email: email || null,
        willAttend,
        guestCount,
        guestNames: guestNames || [],
      },
    });

    // ENVIAR CORREOS
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const invitationUrl = `${baseUrl}/invitacion/${invitationId}`;

    // 1. Correo al Host (dueño de la invitación)
    if (invitation.user?.email) {
      try {
        await resend.emails.send({
          from: "nvitame.com <hola@nvitame.com>",
          to: invitation.user.email,
          subject: `${guestName} ha respondido a tu invitación`,
          react: RSVPToHostEmail({
            hostName: invitation.user.name || "Host",
            guestName: guestName,
            willAttend: willAttend,
            guestCount: guestCount,
            guestNames: guestNames,
            celebrantName: invitation.celebrantName,
          }),
        });
      } catch (error) {
        console.error("Error sending RSVP email to host:", error);
      }
    }

    // 2. Correo al Invitado (si proporcionó email)
    if (email) {
      try {
        const eventDateStr = formatDateLong(invitation.eventDate);

        await resend.emails.send({
          from: "nvitame.com <hola@nvitame.com>",
          to: email,
          subject: `Confirmación: Cumpleaños de ${invitation.celebrantName}`,
          react: RSVPToGuestEmail({
            guestName: guestName,
            willAttend: willAttend,
            celebrantName: invitation.celebrantName,
            eventDate: eventDateStr,
            eventTime: invitation.eventTime,
            venueName: invitation.venueName,
            invitationUrl: invitationUrl,
          }),
        });
      } catch (error) {
        console.error("Error sending RSVP email to guest:", error);
      }
    }

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
