import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getRSVPsByInvitation } from "../../actions";
import { RSVPListView } from "../../components/RSVPListView";

interface InvitadosPageProps {
  params: Promise<{ id: string }>;
}

async function getInvitationTitle(id: string, userId: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { id },
    select: {
      celebrantName: true,
      celebrantAge: true,
      user: {
        select: {
          clerkId: true,
        },
      },
    },
  });

  if (!invitation) return null;
  if (invitation.user.clerkId !== userId) return null;

  return `${invitation.celebrantName} cumple ${invitation.celebrantAge}`;
}

export default async function InvitadosPage({ params }: InvitadosPageProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { id } = await params;

  const invitationTitle = await getInvitationTitle(id, userId);
  if (!invitationTitle) {
    notFound();
  }

  const rsvps = await getRSVPsByInvitation(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/invitaciones"
              className="flex items-center gap-2 text-gray-600 transition hover:text-gray-900"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Invitados confirmados</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <RSVPListView rsvps={rsvps} invitationTitle={invitationTitle} />
      </main>
    </div>
  );
}
