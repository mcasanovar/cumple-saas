import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Heading,
} from "@react-email/components";
import * as React from "react";

interface PaymentConfirmationEmailProps {
  userName: string;
  invitationId: string;
  amount: number;
  celebrantName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nvitame.com";

export const PaymentConfirmationEmail = ({
  userName,
  invitationId,
  amount,
  celebrantName,
}: PaymentConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>¡Pago Confirmado! Tu invitación para {celebrantName} ya está activa</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>¡Pago Recibido!</Heading>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>Hola {userName},</Text>
          <Text style={paragraph}>
            ¡Buenas noticias! Tu pago de ha sido procesado exitosamente.
          </Text>
          <Text style={paragraph}>
            La invitación para el cumpleaños de <strong>{celebrantName}</strong> ya se encuentra activa y lista para ser compartida.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={`${baseUrl}/invitacion/${invitationId}`}>
              Ver invitación pública
            </Button>
          </Section>
          <Text style={paragraph}>
            También puedes gestionarla desde tu panel de control, ver quiénes han confirmado asistencia y revisar los detalles.
          </Text>
          <Section style={btnContainer}>
            <Button style={secondaryButton} href={`${baseUrl}/dashboard/invitaciones`}>
              Ir a mi Panel
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Si tienes algún problema con tu invitación, contáctanos via whatsapp, indicando el ID: {invitationId} al +56 9 51282015
          </Text>
          <Text style={footer}>
            © 2026 nvitame. Todos los derechos reservados.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PaymentConfirmationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
};

const header = {
  padding: "32px 48px",
  textAlign: "center" as const,
  backgroundColor: "#4ade80",
  borderRadius: "8px 8px 0 0",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const content = {
  padding: "32px 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "24px",
};

const button = {
  backgroundColor: "#E63946",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const secondaryButton = {
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  color: "#E63946",
  border: "1px solid #E63946",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
