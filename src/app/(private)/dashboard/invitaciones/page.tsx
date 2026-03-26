import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { InvitationsListView, type DashboardInvitation } from "./components/InvitationsListView";

export default async function InvitacionesPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return null;
  }

  // Fetch real invitations for the user
  const dbInvitations = await prisma.invitation.findMany({
    where: {
      user: {
        clerkId: clerkId
      }
    },
    include: {
      _count: {
        select: {
          rsvps: {
            where: {
              willAttend: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  // Map Prisma data to DashboardInvitation structure
  const invitations: DashboardInvitation[] = dbInvitations.map((inv) => ({
    id: inv.id,
    title: `${inv.celebrantName} cumple ${inv.celebrantAge}`,
    theme: inv.templateId,
    date: inv.eventDate.toISOString().split("T")[0],
    guests: inv._count.rsvps,
    status: inv.status,
    slug: inv.slug || "",
    createdAt: inv.createdAt.toISOString().split("T")[0],
  }));

  return <InvitationsListView initialInvitations={invitations} />;
}
