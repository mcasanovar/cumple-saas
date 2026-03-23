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
];

export function getInvitationById(
  invitationId: string
): UserInvitationData | undefined {
  return userInvitations.find((inv) => inv.id === invitationId);
}

export function getInvitationBySlug(slug: string): UserInvitationData | undefined {
  return userInvitations.find((inv) => inv.slug === slug);
}

export function getAllInvitationIds(): Array<{ invitationId: string }> {
  return userInvitations.map((inv) => ({
    invitationId: inv.id,
  }));
}
