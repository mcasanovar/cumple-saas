import { v4 as uuidv4 } from "uuid";

/**
 * Genera un ID único y seguro para una invitación usando UUID v4
 * 
 * @returns UUID v4 string (ej: "550e8400-e29b-41d4-a716-446655440000")
 * 
 * @example
 * const invitationId = generateInvitationId();
 * // "550e8400-e29b-41d4-a716-446655440000"
 */
export function generateInvitationId(): string {
  return uuidv4();
}

/**
 * Valida si un string es un UUID v4 válido
 * 
 * @param id - String a validar
 * @returns true si es un UUID v4 válido
 * 
 * @example
 * isValidInvitationId("550e8400-e29b-41d4-a716-446655440000"); // true
 * isValidInvitationId("invalid-id"); // false
 */
export function isValidInvitationId(id: string): boolean {
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(id);
}
