import type { DashboardRSVP } from "@/lib/types/rsvp";

/**
 * Calcula el total de invitados que asistirán (incluyendo al que responde y sus acompañantes)
 */
export function calculateTotalGuests(rsvps: DashboardRSVP[]): number {
  return rsvps
    .filter((r) => r.willAttend)
    .reduce((acc, r) => acc + r.guestCount, 0);
}

/**
 * Calcula el número de confirmaciones que asistirán
 */
export function countConfirmed(rsvps: DashboardRSVP[]): number {
  return rsvps.filter((r) => r.willAttend).length;
}

/**
 * Calcula el número de personas que declinaron la invitación
 */
export function countDeclined(rsvps: DashboardRSVP[]): number {
  return rsvps.filter((r) => !r.willAttend).length;
}

/**
 * Calcula el total absoluto de invitados registrados.
 * Si asiste, suma su guestCount (que incluye al titular y acompañantes).
 * Si no asiste, se cuenta como 1 (el titular que declinó).
 */
export function calculateAllGuests(rsvps: DashboardRSVP[]): number {
  return rsvps.reduce((acc, r) => acc + (r.willAttend ? r.guestCount : 1), 0);
}
