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
      },
    });

    if (!purchase) {
      // Si no hay purchase aún, es que MP no ha enviado el webhook o no se ha iniciado el proceso en DB
      return NextResponse.json({ status: "not_found" });
    }

    return NextResponse.json({ status: purchase.status });
  } catch (error) {
    console.error("[Payment Status API] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
