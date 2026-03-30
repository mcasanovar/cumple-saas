import { notFound } from "next/navigation";
import type { Metadata } from "next";

import type { InvitationRenderConfig } from "@/lib/types/invitation";
import { getInvitationById } from "@/data/invitations";
import { mergeTemplateWithUserData } from "@/lib/templates";
import { IntroPage } from "@/components/features/invitation/intro/IntroPage";

export async function generateStaticParams() {
  const { getAllInvitationIds } = await import("@/data/invitations");
  return getAllInvitationIds();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ invitationId: string }>;
}): Promise<Metadata> {
  const { invitationId } = await params;
  const userData = await getInvitationById(invitationId);

  if (!userData) {
    return {
      title: "Invitación no encontrada",
    };
  }

  return {
    title: `${userData.metaTitle} - Intro`,
    description: userData.metaDescription,
    openGraph: {
      title: userData.metaTitle,
      description: userData.metaDescription,
      type: "website",
      url: `https://invitame.io/invitacion/${invitationId}/intro`,
    },
  };
}

export default async function InvitationIntroPage({
  params,
}: {
  params: Promise<{ invitationId: string }>;
}) {
  const { invitationId } = await params;
  const userData = await getInvitationById(invitationId);

  if (!userData) {
    notFound();
  }

  const renderConfig: InvitationRenderConfig = mergeTemplateWithUserData(userData);

  return <IntroPage invitation={renderConfig} invitationId={invitationId} />;
}
