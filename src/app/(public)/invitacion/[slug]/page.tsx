import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { InvitationExperience } from "@/components/features/invitation";
import { getInvitationBySlug, getAllInvitationSlugs } from "@/data/invitations";

export async function generateStaticParams() {
  return getAllInvitationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const invitation = getInvitationBySlug(slug);

  if (!invitation) {
    return {
      title: "Invitación no encontrada",
    };
  }

  return {
    title: invitation.metaTitle,
    description: invitation.metaDescription,
    openGraph: {
      title: invitation.metaTitle,
      description: invitation.metaDescription,
      type: "website",
      url: `https://cumplesaas.example/invitacion/${invitation.slug}`,
    },
  };
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const invitation = getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  return <InvitationExperience invitation={invitation} />;
}
