import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { mercadopagoClient } from "@/lib/mercadopago";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";
import PaymentConfirmationEmail from "@/emails/PaymentConfirmationEmail";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("data.id");

    console.log(`[MP Webhook] Received notification: type=${type}, id=${id}`);

    // Solo procesamos notificaciones de pago
    if (type !== "payment" || !id) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Consultar el estado del pago a Mercado Pago
    const payment = new Payment(mercadopagoClient);
    const paymentData = await payment.get({ id });

    const status = paymentData.status;
    const externalReference = paymentData.external_reference; // Este debe ser nuestro invitationId
    const amount = paymentData.transaction_amount;
    const paymentId = String(paymentData.id);

    console.log(`[MP Webhook] Payment Data: id=${paymentId}, status=${status}, external_ref=${externalReference}`);

    if (!externalReference) {
      console.error("[MP Webhook] Missing external_reference in payment data");
      return NextResponse.json({ error: "Missing external_reference" }, { status: 400 });
    }

    // Buscamos la invitación e incluimos al usuario para el envío del correo
    const invitation = await prisma.invitation.findUnique({
      where: { id: externalReference },
      include: { user: true },
    });

    if (!invitation) {
      console.error(`[MP Webhook] Invitation not found: ${externalReference}`);
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    // Actualizamos el registro de Purchase y el estado de la Invitación según el estado del pago
    if (status === "approved") {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const productUrl = `${baseUrl}/invitacion/${invitation.id}`;

      await prisma.$transaction([
        // Upsert de la compra
        prisma.purchase.upsert({
          where: { invitationId: invitation.id },
          create: {
            invitationId: invitation.id,
            externalReference: externalReference,
            paymentId: paymentId,
            status: "approved",
            amount: amount || 0,
            currency: "CLP",
          },
          update: {
            paymentId: paymentId,
            status: "approved",
            amount: amount || 0,
          },
        }),
        // Activar la invitación y guardar la URL productiva
        prisma.invitation.update({
          where: { id: invitation.id },
          data: {
            isPaid: true,
            status: "published",
            url_ext_invitation: productUrl,
          },
        }),
      ]);
      console.log(`[MP Webhook] Invitation ${invitation.id} successfully activated.`);

      // ENVIAR CORREO DE CONFIRMACIÓN DE PAGO
      if (invitation.user?.email) {
        try {
          await resend.emails.send({
            from: "nvitame.com <hola@nvitame.com>",
            to: invitation.user.email,
            subject: "¡Pago Confirmado! Tu invitación está lista 🎂",
            react: PaymentConfirmationEmail({
              userName: invitation.user.name || "Cliente",
              invitationId: invitation.id,
              amount: amount || 5990,
              celebrantName: invitation.celebrantName,
            }),
          });
          console.log(`Payment confirmation email sent to ${invitation.user.email}`);
        } catch (mailError) {
          console.error("Error sending payment confirmation email:", mailError);
        }
      }
    } else if (status === "rejected" || status === "cancelled" || status === "refunded" || status === "charged_back") {
      // Caso de fallo
      await prisma.purchase.upsert({
        where: { invitationId: invitation.id },
        create: {
          invitationId: invitation.id,
          externalReference: externalReference,
          paymentId: paymentId,
          status: "rejected",
          amount: amount || 0,
          currency: "CLP",
        },
        update: {
          paymentId: paymentId,
          status: "rejected",
          amount: amount || 0,
        },
      });
      console.log(`[MP Webhook] Purchase status updated to rejected for invitation ${invitation.id}`);
    } else {
      // Caso pendiente o en proceso
      await prisma.purchase.upsert({
        where: { invitationId: invitation.id },
        create: {
          invitationId: invitation.id,
          externalReference: externalReference,
          paymentId: paymentId,
          status: "pending",
          amount: amount || 0,
          currency: "CLP",
        },
        update: {
          paymentId: paymentId,
          status: "pending",
          amount: amount || 0,
        },
      });
      console.log(`[MP Webhook] Purchase status updated to pending for invitation ${invitation.id}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[MP Webhook] Error processing notification:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
