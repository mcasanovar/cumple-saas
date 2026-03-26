import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import type { InvitationRenderConfig } from "@/lib/types/invitation";
import { InvitationLandingPage } from "@/components/features/invitation/landing/InvitationLandingPage";
import { getInvitationById } from "@/data/invitations";
import { mergeTemplateWithUserData } from "@/lib/templates";

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
    title: userData.metaTitle,
    description: userData.metaDescription,
    openGraph: {
      title: userData.metaTitle,
      description: userData.metaDescription,
      type: "website",
      url: `https://invitame.io/invitacion/${invitationId}`,
    },
  };
}

export default async function InvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ invitationId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { invitationId } = await params;
  const search = await searchParams;
  const userData = await getInvitationById(invitationId);

  if (!userData) {
    notFound();
  }

  // Redirect to intro if this is the first visit (no 'from' param)
  if (!search.from) {
    redirect(`/invitacion/${invitationId}/intro`);
  }

  const renderConfig: InvitationRenderConfig = mergeTemplateWithUserData(userData);

  return <InvitationLandingPage invitation={renderConfig} />;
}
