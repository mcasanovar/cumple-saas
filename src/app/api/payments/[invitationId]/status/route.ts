import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ invitationId: string }> }
) {
  try {
    const { invitationId } = await params;

    if (!invitationId) {
      return NextResponse.json({ error: "Invitation ID is required" }, { status: 400 });
    }

    const purchase = await prisma.purchase.findUnique({
      where: { invitationId },
      select: {
        status: true,
        paymentId: true,
      },
    });

    if (!purchase) {
      return NextResponse.json({ status: "not_found" });
    }

    return NextResponse.json({
      status: purchase.status,
      hasPaymentId: !!purchase.paymentId
    });
  } catch (error) {
    console.error("[Payment Status API] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
