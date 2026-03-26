import prisma from "@/lib/prisma";
import type { UserInvitationData } from "@/lib/types/template";

export const userInvitations: UserInvitationData[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    userId: "user_demo_001",
    templateId: "safari-adventure",
    slug: "emiliano-safari-2",
    metaTitle: "Emiliano cumple 3 años | Safari Dreams",
    metaDescription:
      "Acompáñanos a celebrar los 3 años de Emiliano en una aventura llena de magia y alegría.",
    celebrantName: "Emiliano",
    age: 3,
    date: "Sábado 02 de Abril, 2026",
    time: "15:00 hrs",
    venueName: "Casa de Caro",
    venueAddress: "Altovalsol",
    googleMapsUrl: "https://maps.google.com",
    coordinates: {
      lat: -34.603684,
      lng: -58.381559,
    },
    celebrantDescription:
      "Le encantan los dinosaurios, correr por el parque y las risas con sus amigos. ¡Este año celebramos a lo grande!",
    gallery: [
      {
        id: "img-1",
        caption: "Emiliano listo para explorar",
        imageUrl: "/emi1.jpeg",
      },
      {
        id: "img-2",
        caption: "Animalitos amigos",
        imageUrl: "/emi2.jpeg",
      },
      {
        id: "img-3",
        caption: "Decoración temática",
        imageUrl: "/emi3.jpeg",
      },
    ],
    targetDateISO: "2026-04-02T15:00:00-03:00",
    introOverrides: {
      detailLeft: {
        title: "Sábado",
        subtitle: "02 ABRIL",
        helper: "Evento especial",
      },
      detailRight: {
        title: "3 PM",
        subtitle: "Altovalsol",
        helper: "Casa de Caro",
      },
    },
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    userId: "user_demo_002",
    templateId: "dino-party",
    slug: "emilio-dino-6",
    metaTitle: "Emiliano cumple 6 años | Aventura Jurásica",
    metaDescription:
      "Únete a la aventura prehistórica de Emiliano. ¡Dinosaurios, diversión y mucha acción!",
    celebrantName: "Emiliano",
    age: 6,
    date: "Sábado 17 de Agosto, 2026",
    time: "14:00 hrs",
    venueName: "Calle Cualquiera 123",
    venueAddress: "Cualquier lugar",
    googleMapsUrl: "https://maps.google.com",
    coordinates: {
      lat: -33.4489,
      lng: -70.6693,
    },
    celebrantDescription:
      "Fanático de los dinosaurios, explorador nato y amante de las aventuras. ¡Este año viajamos al Jurásico!",
    gallery: [
      {
        id: "img-1",
        caption: "Emilio el explorador",
        imageUrl: "/emi1.jpeg",
      },
      {
        id: "img-2",
        caption: "Mundo prehistórico",
        imageUrl: "/emi2.jpeg",
      },
      {
        id: "img-3",
        caption: "Decoración jurásica",
        imageUrl: "/emi3.jpeg",
      },
    ],
    targetDateISO: "2026-08-17T14:00:00-03:00",
    introOverrides: {
      detailLeft: {
        title: "Sábado",
        subtitle: "17 AGOSTO",
        helper: "¡No faltes!",
      },
      detailRight: {
        title: "2 PM",
        subtitle: "Cualquier lugar",
        helper: "Calle Cualquiera 123",
      },
    },
    createdAt: "2026-02-10T12:00:00Z",
    updatedAt: "2026-02-10T12:00:00Z",
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    userId: "user_demo_003",
    templateId: "princess-dreams",
    slug: "sofia-princesa-5",
    metaTitle: "Sofía cumple 5 años | Reino Encantado",
    metaDescription:
      "Únete a la celebración mágica de Sofía en un reino lleno de princesas, coronas doradas y sueños encantados.",
    celebrantName: "Sofía",
    age: 5,
    date: "Domingo 25 de Mayo, 2026",
    time: "16:00 hrs",
    venueName: "Salón de Fiestas Mágico",
    venueAddress: "Avenida de los Sueños 456",
    googleMapsUrl: "https://maps.google.com",
    coordinates: {
      lat: -34.603684,
      lng: -58.381559,
    },
    celebrantDescription:
      "Le encantan las princesas, los vestidos brillantes y las coronas doradas. ¡Este año celebramos como la realeza!",
    gallery: [
      {
        id: "img-1",
        caption: "Sofía lista para la fiesta",
        imageUrl: "/emi1.jpeg",
      },
      {
        id: "img-2",
        caption: "Decoración de princesas",
        imageUrl: "/emi2.jpeg",
      },
      {
        id: "img-3",
        caption: "Reino encantado",
        imageUrl: "/emi3.jpeg",
      },
    ],
    targetDateISO: "2026-05-25T16:00:00-03:00",
    introOverrides: {
      detailLeft: {
        title: "Domingo",
        subtitle: "25 MAYO",
        helper: "Celebración real",
      },
      detailRight: {
        title: "4 PM",
        subtitle: "Salón Mágico",
        helper: "Av. de los Sueños",
      },
    },
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
    userId: "user_demo_004",
    templateId: "k-pop",
    slug: "mia-kpop-7",
    metaTitle: "Mia cumple 7 años | Fiesta K-Pop",
    metaDescription:
      "Únete a la celebración musical de Mia con una fiesta llena de brillo, música y diversión al estilo K-pop.",
    celebrantName: "Mia",
    age: 7,
    date: "Sábado 15 de Junio, 2026",
    time: "15:30 hrs",
    venueName: "Estudio de Danza Estrella",
    venueAddress: "Avenida Musical 789",
    googleMapsUrl: "https://maps.google.com",
    coordinates: {
      lat: -34.603684,
      lng: -58.381559,
    },
    celebrantDescription:
      "Le encanto bailar, cantar y brillar como una verdadera estrella. ¡Este año celebramos con mucha música y diversión K-pop!",
    gallery: [
      {
        id: "img-1",
        caption: "Mia lista para brillar",
        imageUrl: "/emi1.jpeg",
      },
      {
        id: "img-2",
        caption: "Decoración estrellada",
        imageUrl: "/emi2.jpeg",
      },
      {
        id: "img-3",
        caption: "Fiesta musical",
        imageUrl: "/emi3.jpeg",
      },
    ],
    targetDateISO: "2026-06-15T15:30:00-03:00",
    introOverrides: {
      detailLeft: {
        title: "Sábado",
        subtitle: "15 JUNIO",
        helper: "¡Vamos a brillar!",
      },
      detailRight: {
        title: "3:30 PM",
        subtitle: "Estudio Estrella",
        helper: "Av. Musical 789",
      },
    },
    createdAt: "2026-03-15T14:00:00Z",
    updatedAt: "2026-03-15T14:00:00Z",
  },
];

export async function getInvitationById(
  invitationId: string
): Promise<UserInvitationData | undefined> {
  // 1. Try to fetch from Prisma
  try {
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (invitation && invitation.config) {
      return invitation.config as unknown as UserInvitationData;
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
      return invitation.config as unknown as UserInvitationData;
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
