"use server";

import { Preference } from "mercadopago";
import { v4 as uuidv4 } from "uuid";

import { mercadopagoClient } from "@/lib/mercadopago";
import type { CreatePreferenceResult } from "@/lib/types/payment";
import type { CreationFormData } from "@/components/features/invitation/creation/types";
import { PRICE_CLP, AVAILABLE_TEMPLATES } from "@/components/features/invitation/creation/constants";

export async function createPaymentPreference(
  formData: Partial<CreationFormData>
): Promise<CreatePreferenceResult> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const template = AVAILABLE_TEMPLATES.find((t) => t.id === formData.templateId);
    const templateName = template?.name ?? "Invitación Digital";

    // ID único para rastrear la compra (se vinculará a Supabase en el futuro)
    const invitationId = uuidv4();

    const preference = new Preference(mercadopagoClient);

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
      back_urls: {
        success: `${baseUrl}/dashboard/pago/exitoso`,
        pending: `${baseUrl}/dashboard/pago/pendiente`,
        failure: `${baseUrl}/dashboard/pago/fallido`,
      },
      // MercadoPago bloquea `auto_return` estricto en el ambiente localhost.
      ...(baseUrl.includes("localhost") ? {} : { auto_return: "approved" }),
      external_reference: invitationId,
      metadata: {
        invitation_id: invitationId,
        celebrant_name: formData.celebrantName,
        template_id: formData.templateId,
      },
    };

    console.log("[createPaymentPreference] Payload a enviar:", JSON.stringify(preferenceBody, null, 2));

    const response = await preference.create({
      body: preferenceBody as any,
    });

    // En Sandbox usar sandbox_init_point; en producción usar init_point
    const checkoutUrl =
      response.sandbox_init_point ?? response.init_point ?? "";

    if (!checkoutUrl) {
      return { success: false, error: "No se pudo obtener la URL de pago." };
    }

    return {
      success: true,
      checkoutUrl,
      preferenceId: response.id ?? "",
    };
  } catch (err) {
    console.error("[createPaymentPreference] Error:", err);
    return {
      success: false,
      error: "Error al crear la preferencia de pago. Intenta nuevamente.",
    };
  }
}
