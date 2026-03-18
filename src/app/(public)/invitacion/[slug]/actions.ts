"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  type RSVPActionState,
  type RSVPSubmission,
} from "@/lib/types/invitation";

const rsvpSchema = z.object({
  slug: z.string().min(1, "Slug inválido"),
  name: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Correo inválido"),
  guests: z
    .string()
    .transform((value) => Number(value))
    .pipe(z.number().int().min(1).max(10)),
  message: z.string().max(400).optional(),
});

const submissionsStore: RSVPSubmission[] = [];

export async function submitRSVP(
  _prevState: RSVPActionState,
  formData: FormData,
): Promise<RSVPActionState> {
  const parsed = rsvpSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos";
    return {
      status: "error",
      message: firstError,
    };
  }

  const payload: RSVPSubmission = {
    ...parsed.data,
    respondedAt: new Date().toISOString(),
  };

  submissionsStore.push(payload);

  console.info("Nueva confirmación RSVP", payload);

  revalidatePath(`/invitacion/${payload.slug}`);

  return {
    status: "success",
    message: "¡Gracias! Recibimos tu confirmación.",
  };
}

export async function getRSVPSubmissions(): Promise<RSVPSubmission[]> {
  return submissionsStore;
}
