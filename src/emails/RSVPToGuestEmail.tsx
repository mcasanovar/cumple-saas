import { formatDateLong } from "@/utils/date";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Heading,
  Button,
} from "@react-email/components";
import * as React from "react";

interface RSVPToGuestEmailProps {
  guestName: string;
  willAttend: boolean;
  celebrantName: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  invitationUrl: string;
}

export const RSVPToGuestEmail = ({
  willAttend,
  celebrantName,
  eventDate,
  eventTime,
  venueName,
  invitationUrl,
}: RSVPToGuestEmailProps) => (
  <Html>
    <Head />
    <Preview>
      {willAttend
        ? `¡Confirmado! Te esperamos en el cumple de ${celebrantName}`
        : `Lamentamos que no puedas asistir al cumple de ${celebrantName}`}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>
            {willAttend ? "¡Nos vemos pronto!" : "Gracias por avisarnos"}
          </Heading>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>Hola</Text>

          {willAttend ? (
            <>
              <Text style={paragraph}>
                Tu confirmación para el cumpleaños de <strong>{celebrantName}</strong> ha sido recibida correctamente. ¡Estamos muy felices de que puedas venir!
              </Text>

              <Section style={infoBox}>
                <Heading as="h3" style={infoHeading}>Detalles del Evento:</Heading>
                <Text style={infoText}>
                  <strong>📅 Fecha:</strong> {formatDateLong(eventDate)}
                </Text>
                <Text style={infoText}>
                  <strong>⏰ Hora:</strong> {eventTime}
                </Text>
                <Text style={infoText}>
                  <strong>📍 Lugar:</strong> {venueName}
                </Text>
              </Section>

              <Section style={btnContainer}>
                <Button style={button} href={invitationUrl}>
                  Ver invitación y mapa
                </Button>
              </Section>
            </>
          ) : (
            <Text style={paragraph}>
              Hemos recibido tu respuesta indicando que no podrás asistir al cumpleaños de <strong>{celebrantName}</strong>. ¡Lamentamos que no puedas venir, te extrañaremos!
            </Text>
          )}

          <Hr style={hr} />
          <Text style={footer}>
            Este es un correo automático de nvitame. No responder
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default RSVPToGuestEmail;

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
  backgroundColor: "#f472b6",
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

const infoBox = {
  backgroundColor: "#eaeaea",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid #fbcfe8",
  margin: "24px 0",
};

const infoHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#be185d",
  margin: "0 0 16px 0",
};

const infoText = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#831843",
  margin: "8px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "24px",
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

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
