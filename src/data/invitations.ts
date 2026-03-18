import { InvitationConfig } from "@/lib/types/invitation";

export const invitations: InvitationConfig[] = [
  {
    slug: "mia-safari-2",
    theme: "safari",
    metaTitle: "Emiliano cumple 2 años | Safari Dreams",
    metaDescription:
      "Acompáñanos a celebrar los 2 años de Emilianop en una aventura llena de magia y alegría.",
    hero: {
      headline: "La gran aventura de",
      subheadline: "¡Ven a celebrar con nosotros!",
      featuredIllustration: "/illustrations/safari-cubs.svg",
    },
    event: {
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
      venueImageUrl: undefined,
      celebrantDescription:
        "Le encantan los dinosaurios, correr por el parque y las risas con sus amigos. ¡Este año celebramos a lo grande!",
      invitationMessage:
        "Prepárate para una tarde llena de risas, aventuras y sorpresas. Tu presencia hará este día inolvidable.",
      closingMessage:
        "¡Nos encantará compartir esta aventura contigo! Confirma tu asistencia y reserva tu lugar en la expedición.",
    },
    gallery: [
      {
        id: "img-1",
        caption: "Mía lista para explorar",
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
    countdown: {
      targetDateISO: "2026-08-24T16:30:00-03:00",
    },
    intro: {
      celebrantHeadline: "Emiliano",
      celebrantSubtitle: "cumpleaños",
      celebrantTagline: "Acompáñanos a celebrar con risas monstruosas y mucha diversión",
      hintHeadline: "¡Estás invitado!",
      buttonLabel: "presiona",
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
  },
];

export function getInvitationBySlug(slug: string): InvitationConfig | undefined {
  return invitations.find((invitation) => invitation.slug === slug);
}

export function getAllInvitationSlugs(): string[] {
  return invitations.map((invitation) => invitation.slug);
}
