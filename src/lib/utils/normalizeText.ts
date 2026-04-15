/**
 * Normaliza el texto para que sea compatible con fuentes que no soportan
 * caracteres acentuados o símbolos especiales (como la fuente de Avengers).
 * 
 * @param text El texto a normalizar
 * @param removePunctuation Si se deben eliminar signos de exclamación e interrogación (opcional)
 * @returns El texto sin acentos, en mayúsculas y opcionalmente sin puntuación
 */
export const normalizeAvengersText = (text: string, removePunctuation = false): string => {
  if (!text) return "";

  // 1. Descomponer caracteres acentuados (NFD) y eliminar las marcas de combinación (acentos)
  let normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 2. Eliminar puntuación si se solicita (la fuente de Avengers suele fallar con ¡!¿?)
  if (removePunctuation) {
    normalized = normalized.replace(/[¡!¿?]/g, "");
  }

  // 3. Forzar mayúsculas para mejor compatibilidad con la fuente Hero
  return normalized.toUpperCase();
};
