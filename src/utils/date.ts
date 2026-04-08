/**
 * Formatea una fecha (Date, ISO string o YYYY-MM-DD) a un formato largo en español: "Sábado 2 de mayo 2026"
 * Evita problemas de zona horaria al manejar componentes de fecha locales.
 */
export function formatDateLong(dateValue: Date | string | undefined): string {
  if (!dateValue) return "Fecha no definida";

  try {
    let date: Date;

    if (dateValue instanceof Date) {
      // Si es un objeto Date (ej. de Prisma), lo tratamos como UTC para evitar el desfase
      // ya que las fechas de cumpleaños suelen guardarse como 00:00:00 UTC
      date = new Date(dateValue.getUTCFullYear(), dateValue.getUTCMonth(), dateValue.getUTCDate());
    } else if (typeof dateValue === "string") {
      if (dateValue.includes("T")) {
        // Es un ISO string, extraemos componentes UTC
        const d = new Date(dateValue);
        date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
      } else {
        // Es formato YYYY-MM-DD
        const [year, month, day] = dateValue.split("-").map(Number);
        if (!year || !month || !day) return dateValue;
        // Creamos la fecha usando Date.UTC para que 2026-05-02 sea exactamente el 2 de mayo en UTC
        date = new Date(Date.UTC(year, month - 1, day));
      }
    } else {
      return String(dateValue);
    }

    if (isNaN(date.getTime())) return String(dateValue);

    // Forzamos el uso de UTC para el formateo y evitamos cualquier desfase
    const formatted = date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

    // Capitalizar primera letra (nombre del día) y quitar la coma si existe
    // Ejemplo: "sábado, 2 de mayo de 2026" -> "Sábado 2 de mayo 2026"
    return formatted
      .replace(",", "")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/ de (\d{4})$/, " $1"); // Quitar el "de" antes del año
  } catch (error) {
    console.error("Error formatting date:", error);
    return String(dateValue);
  }
}

/**
 * Retorna los componentes de la fecha (día, mes, año, día de la semana) 
 * en español y evitando desfases de zona horaria.
 */
export function getDateComponents(dateValue: Date | string | undefined) {
  if (!dateValue) return null;

  try {
    let date: Date;
    if (dateValue instanceof Date) {
      date = new Date(Date.UTC(dateValue.getUTCFullYear(), dateValue.getUTCMonth(), dateValue.getUTCDate()));
    } else if (typeof dateValue === "string") {
      if (dateValue.includes("T")) {
        const d = new Date(dateValue);
        date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
      } else {
        const [year, month, day] = dateValue.split("-").map(Number);
        date = new Date(Date.UTC(year, month - 1, day));
      }
    } else {
      return null;
    }

    if (isNaN(date.getTime())) return null;

    const weekday = date.toLocaleDateString("es-ES", { weekday: "long", timeZone: "UTC" });
    const monthShort = date.toLocaleDateString("es-ES", { month: "short", timeZone: "UTC" });
    const monthLong = date.toLocaleDateString("es-ES", { month: "long", timeZone: "UTC" });
    const day = date.getUTCDate().toString().padStart(2, "0");
    const year = date.getUTCFullYear().toString();

    return {
      weekday: weekday.replace(/\.$/, "").toUpperCase(),
      day,
      monthShort: monthShort.replace(/\.$/, "").toUpperCase(),
      monthLong: monthLong.toUpperCase(),
      year,
    };
  } catch (error) {
    console.error("Error getting date components:", error);
    return null;
  }
}
