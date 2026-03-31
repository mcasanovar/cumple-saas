"use server";

import { auth } from "@clerk/nextjs/server";
import { Preference } from "mercadopago";
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { mercadopagoClient } from "@/lib/mercadopago";
import type { CreatePreferenceResult } from "@/lib/types/payment";
import type { CreationFormData } from "@/components/features/invitation/creation/types";
import { PRICE_CLP, ALLOWED_IMAGE_FORMATS, ALLOWED_MIME_TYPES, AVAILABLE_TEMPLATES } from "@/components/features/invitation/creation/constants";

export async function createPaymentPreference(
  formData: Partial<CreationFormData>,
  existingInvitationId?: string
): Promise<CreatePreferenceResult> {
  try {
    const { userId: clerkId, sessionClaims } = await auth();
    if (!clerkId) {
      return { success: false, error: "No autorizado. Inicia sesión nuevamente." };
    }

    const userEmail = (sessionClaims as any)?.email || "";

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const template = AVAILABLE_TEMPLATES.find((t) => t.id === formData.templateId);
    const templateName = template?.name ?? "Invitación Digital";

    // Usar el ID de invitación existente o generar uno nuevo si es necesario
    const invitationId = existingInvitationId || uuidv4();

    const preference = new Preference(mercadopagoClient);

    const notificationUrl = `${baseUrl}/api/webhook/mercadopago`;

    const preferenceBody = {
      items: [
        {
          id: formData.templateId ?? "invitation",
          title: `Invitación Digital Premium — ${templateName}`,
          description: `Cumpleaños de ${formData.celebrantName}, ${formData.age} años`,
          quantity: 1,
          unit_price: PRICE_CLP,
          currency_id: "CLP",
        },
      ],
      payer: {
        email: userEmail,
      },
      back_urls: {
        success: `${baseUrl}/dashboard/pago/exitoso?invitationId=${invitationId}`,
        pending: `${baseUrl}/dashboard/pago/pendiente?invitationId=${invitationId}`,
        failure: `${baseUrl}/dashboard/pago/fallido?invitationId=${invitationId}`,
      },
      // MercadoPago bloquea `auto_return` estricto en el ambiente localhost.
      ...(baseUrl.includes("localhost") ? {} : { auto_return: "approved" }),
      notification_url: baseUrl.includes("localhost") ? undefined : notificationUrl,
      external_reference: invitationId,
      metadata: {
        invitation_id: invitationId,
        celebrant_name: formData.celebrantName,
        template_id: formData.templateId,
      },
    };

    const response = await preference.create({
      body: preferenceBody as any,
    });

    console.log("[createPaymentPreference] MP Response ID:", response.id);
    console.log("[createPaymentPreference] MP Init Point:", response.init_point);
    console.log("[createPaymentPreference] MP Sandbox Init Point:", response.sandbox_init_point);

    // Mercado Pago recomienda usar init_point siempre; el modo (sandbox/real) 
    // se determina automáticamente por el Access Token configurado.
    // El uso manual de sandbox_init_point a veces causa loops de redirección 
    // si la sesión del usuario en MP no coincide con el tipo de cuenta.
    const checkoutUrl = response.init_point;

    if (!checkoutUrl) {
      console.error("[createPaymentPreference] No init_point found in MP response");
      return { success: false, error: "No se pudo obtener la URL de pago." };
    }

    // Resetear o crear el registro de compra en estado 'pending' para este nuevo intento
    await prisma.purchase.upsert({
      where: { invitationId },
      create: {
        invitationId,
        externalReference: invitationId,
        status: "pending",
        amount: PRICE_CLP,
        currency: "CLP",
      },
      update: {
        status: "pending",
        paymentId: null, // Limpiar el ID de pago anterior si existe
      },
    });

    return {
      success: true,
      checkoutUrl,
      preferenceId: response.id ?? "",
      invitationId,
    };
  } catch (err) {
    console.error("[createPaymentPreference] Error:", err);
    return {
      success: false,
      error: "Error al crear la preferencia de pago. Intenta nuevamente.",
    };
  }
}


export async function uploadImageAction(formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    // Validar formato de archivo en servidor
    const fileExtension = "." + file.name.split('.').pop()?.toLowerCase();
    const isValidFormat = ALLOWED_IMAGE_FORMATS.includes(fileExtension as any);
    const isValidMimeType = ALLOWED_MIME_TYPES.includes(file.type as any);

    if (!isValidFormat || !isValidMimeType) {
      return { success: false, error: "Solo se permiten archivos .jpeg, .jpg y .png" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `cumple-saas/invitations/${userId}`,
          resource_type: "auto",
        },
        (error, result) => {
          if (error || !result) reject(error || new Error("Upload failed"));
          else resolve(result);
        }
      ).end(buffer);
    });

    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return { success: false, error: "Error al subir la imagen a Cloudinary." };
  }
}

export async function publishInvitationAction(invitationId: string) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    // Verificar que la invitación pertenezca al usuario
    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) throw new Error("User not found");

    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId, userId: dbUser.id },
    });

    if (!invitation) throw new Error("Invitation not found");

    // Actualizar estado a published
    await prisma.invitation.update({
      where: { id: invitationId },
      data: { status: "published" },
    });

    return { success: true };
  } catch (error) {
    console.error("Error publishing invitation:", error);
    return { success: false, error: "No se pudo publicar la invitación." };
  }
}

export async function saveInvitationProgress(
  formData: Partial<CreationFormData>,
  invitationId?: string,
  currentStep: string = "template"
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    // Find our database user
    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) throw new Error("User not found in database");

    const dataToSave = {
      templateId: formData.templateId || "",
      celebrantName: formData.celebrantName || "Festejado",
      celebrantAge: formData.age || 0,
      eventDate: formData.eventDate ? new Date(formData.eventDate) : new Date(),
      eventTime: formData.eventTime || "",
      venueName: formData.venueName || "",
      celebrantImages: formData.celebrantImages || [null, null, null],
      venueImage: formData.venueImage || null,
      status: "draft",
      currentStep,
      userId: dbUser.id,
      config: formData as any, // Persistence of all JSON-serializable data (including Cloudinary URLs)
    };

    if (invitationId) {
      const updated = await prisma.invitation.update({
        where: { id: invitationId, userId: dbUser.id },
        data: dataToSave,
      });
      return { success: true, invitationId: updated.id };
    } else {
      const created = await prisma.invitation.create({
        data: dataToSave,
      });
      return { success: true, invitationId: created.id };
    }
  } catch (error) {
    console.error("Error saving invitation progress:", error);
    return { success: false, error: "No se pudo guardar el progreso." };
  }
}

