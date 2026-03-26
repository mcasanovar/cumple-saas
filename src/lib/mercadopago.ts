import MercadoPagoConfig from "mercadopago";

/**
 * Singleton del cliente MercadoPago configurado con el access token del servidor.
 * Usar solo en Server Components / Server Actions / API Routes.
 */
export const mercadopagoClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? "",
});
