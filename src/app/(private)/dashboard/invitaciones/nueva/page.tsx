import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { InvitationCreation } from "@/components/features/invitation/creation";
import prisma from "@/lib/prisma";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function NuevaInvitacionPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const { userId: clerkId } = await auth();

  let initialData = null;

  if (id && clerkId) {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (user) {
      const invitation = await prisma.invitation.findUnique({
        where: { id, userId: user.id },
      });

      if (invitation) {
        initialData = {
          id: invitation.id,
          currentStep: invitation.currentStep as any,
          formData: {
            ...(invitation.config as any),
            celebrantImages: (invitation.celebrantImages as any) || (invitation.config as any)?.celebrantImages || [null, null, null],
            venueImage: (invitation.venueImage as any) || (invitation.config as any)?.venueImage || null,
          },
        };
      }
    }
  }

  return <InvitationCreation initialData={initialData} />;
}
