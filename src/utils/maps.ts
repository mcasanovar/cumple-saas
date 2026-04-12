/**
 * Genera una URL de Google Maps basada en una dirección.
 * Formato: https://www.google.com/maps/search/?api=1&query=Direccion+Con+Pluses
 */
export function generateGoogleMapsUrl(address: string): string {
  if (!address) return "";

  const encoded = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}
