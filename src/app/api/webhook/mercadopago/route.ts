import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { mercadopagoClient } from "@/lib/mercadopago";
import prisma from "@/lib/prisma";

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

    // Buscamos la invitación
    const invitation = await prisma.invitation.findUnique({
      where: { id: externalReference },
    });

    if (!invitation) {
      console.error(`[MP Webhook] Invitation not found: ${externalReference}`);
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    // Actualizamos el registro de Purchase y el estado de la Invitación si el pago está aprobado
    if (status === "approved") {
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
        // Activar la invitación
        prisma.invitation.update({
          where: { id: invitation.id },
          data: {
            isPaid: true,
            status: "published",
          },
        }),
      ]);
      console.log(`[MP Webhook] Invitation ${invitation.id} successfully activated via webhook.`);
    } else {
      // Si el pago no está aprobado (ej: pending, rejected), actualizamos solo el estado de la compra
      await prisma.purchase.upsert({
        where: { invitationId: invitation.id },
        create: {
          invitationId: invitation.id,
          externalReference: externalReference,
          paymentId: paymentId,
          status: status || "pending",
          amount: amount || 0,
          currency: "CLP",
        },
        update: {
          paymentId: paymentId,
          status: status || "pending",
        },
      });
      console.log(`[MP Webhook] Purchase status updated to ${status} for invitation ${invitation.id}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[MP Webhook] Error processing notification:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
