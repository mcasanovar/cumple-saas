/**
 * Formatea una fecha en formato YYYY-MM-DD a un formato largo en español: "D de Mes de YYYY"
 * Evita problemas de zona horaria al no usar el constructor de Date directamente con el string.
 */
export function formatDateLong(dateString: string | undefined): string {
  if (!dateString) return "Fecha no definida";
  
  try {
    const [year, month, day] = dateString.split("-").map(Number);
    if (!year || !month || !day) return dateString;

    return new Date(year, month - 1, day).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}
