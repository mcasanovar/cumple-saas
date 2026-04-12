import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { InvitationsListView, type DashboardInvitation } from "@/components/features/dashboard/InvitationsListView";

export default async function InvitacionesPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return null;
  }

  // Fetch real invitations for the user (excluding soft-deleted)
  const dbInvitations = await prisma.invitation.findMany({
    where: {
      user: {
        clerkId: clerkId
      },
      isDelete: false
    },
    include: {
      rsvps: {
        select: {
          id: true,
          name: true,
          email: true,
          willAttend: true,
          guestCount: true,
          guestNames: true,
          createdAt: true,
        }
      },
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
    isPaid: inv.isPaid,
    rsvps: inv.rsvps.map(r => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      guestNames: r.guestNames as string[] || [],
    })),
  }));

  return <InvitationsListView initialInvitations={invitations} />;
}
