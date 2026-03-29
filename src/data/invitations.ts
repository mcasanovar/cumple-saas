import prisma from "@/lib/prisma";
import type { UserInvitationData, TemplateId } from "@/lib/types/template";
import type { InvitationGalleryItem } from "@/lib/types/invitation";
import { userInvitations } from "./mock-invitations";

export { userInvitations };

export async function getInvitationById(
  invitationId: string
): Promise<UserInvitationData | undefined> {
  // 1. Try to fetch from Prisma
  try {
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (invitation && invitation.config) {
      const config = invitation.config as Partial<UserInvitationData>;

      return {
        id: invitation.id,
        userId: invitation.userId,
        templateId: (invitation.templateId as UserInvitationData["templateId"]) ?? config.templateId!,
        slug: invitation.slug ?? config.slug!,
        metaTitle: config.metaTitle ?? `Invitación de ${invitation.celebrantName}`,
        metaDescription: config.metaDescription ?? `¡Ven a celebrar los ${invitation.celebrantAge} años de ${invitation.celebrantName}!`,
        celebrantName: invitation.celebrantName,
        age: invitation.celebrantAge,
        date: invitation.eventDate.toISOString(),
        time: invitation.eventTime,
        venueName: invitation.venueName,
        venueAddress: config.venueAddress ?? "",
        googleMapsUrl: config.googleMapsUrl,
        coordinates: config.coordinates ?? { lat: 0, lng: 0 },
        celebrantDescription: config.celebrantDescription ?? "",
        venueImage: invitation.venueImage || undefined,
        gallery: parseCelebrantImages(invitation.celebrantImages),
        eventIncludes: config.eventIncludes,
        targetDateISO: invitation.eventDate.toISOString(),
        introOverrides: config.introOverrides,
        createdAt: invitation.createdAt.toISOString(),
        updatedAt: invitation.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.error("Error fetching invitation from Prisma:", error);
  }

  // 2. Fallback to mock data
  return userInvitations.find((inv) => inv.id === invitationId);
}

export async function getInvitationBySlug(
  slug: string
): Promise<UserInvitationData | undefined> {
  // 1. Try to fetch from Prisma
  try {
    const invitation = await prisma.invitation.findUnique({
      where: { slug: slug },
    });

    if (invitation && invitation.config) {
      const config = invitation.config as Partial<UserInvitationData>;

      return {
        id: invitation.id,
        userId: invitation.userId,
        templateId: (invitation.templateId as UserInvitationData["templateId"]) ?? config.templateId!,
        slug: invitation.slug ?? config.slug!,
        metaTitle: config.metaTitle ?? `Invitación de ${invitation.celebrantName}`,
        metaDescription: config.metaDescription ?? `¡Ven a celebrar los ${invitation.celebrantAge} años de ${invitation.celebrantName}!`,
        celebrantName: invitation.celebrantName,
        age: invitation.celebrantAge,
        date: invitation.eventDate.toISOString(),
        time: invitation.eventTime,
        venueName: invitation.venueName,
        venueAddress: config.venueAddress ?? "",
        googleMapsUrl: config.googleMapsUrl,
        coordinates: config.coordinates ?? { lat: 0, lng: 0 },
        celebrantDescription: config.celebrantDescription ?? "",
        venueImage: invitation.venueImage || undefined,
        gallery: parseCelebrantImages(invitation.celebrantImages),
        eventIncludes: config.eventIncludes,
        targetDateISO: invitation.eventDate.toISOString(),
        introOverrides: config.introOverrides,
        createdAt: invitation.createdAt.toISOString(),
        updatedAt: invitation.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.error("Error fetching invitation by slug from Prisma:", error);
  }

  // 2. Fallback to mock data
  return userInvitations.find((inv) => inv.slug === slug);
}

export async function getAllInvitationIds(): Promise<Array<{ invitationId: string }>> {
  // 1. Try to fetch from Prisma
  try {
    const invitations = await prisma.invitation.findMany({
      select: { id: true },
    });

    if (invitations && invitations.length > 0) {
      return invitations.map((inv: Record<string, any>) => ({
        invitationId: inv.id,
      }));
    }
  } catch (error) {
    console.error("Error fetching all invitation IDs from Prisma:", error);
  }

  // 2. Fallback to mock data
  return userInvitations.map((inv) => ({
    invitationId: inv.id,
  }));
}

function parseCelebrantImages(celebrantImages: unknown): InvitationGalleryItem[] {
  if (!celebrantImages) return [];

  // Handle array of strings (Cloudinary URLs)
  if (Array.isArray(celebrantImages)) {
    return celebrantImages.map((url, index) => ({
      id: `gallery-img-${index}`,
      imageUrl: typeof url === "string" ? url : "",
      caption: `Foto ${index + 1}`,
    })).filter(item => item.imageUrl);
  }

  // Handle object with gallery property
  const images = celebrantImages as Record<string, unknown>;
  if (images.gallery && Array.isArray(images.gallery)) {
    return images.gallery.map((item: unknown, index: number) => {
      if (typeof item === "string") {
        return {
          id: `gallery-img-${index}`,
          imageUrl: item,
          caption: `Foto ${index + 1}`,
        };
      }
      const galleryItem = item as Record<string, string>;
      return {
        id: galleryItem.id || `gallery-img-${index}`,
        imageUrl: galleryItem.imageUrl || "",
        caption: galleryItem.caption || `Foto ${index + 1}`,
      };
    }).filter(item => item.imageUrl);
  }

  return [];
}
