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
} from "@react-email/components";
import * as React from "react";

interface RSVPToHostEmailProps {
  hostName: string;
  guestName: string;
  willAttend: boolean;
  guestCount: number;
  guestNames?: string[];
  celebrantName: string;
}

export const RSVPToHostEmail = ({
  hostName,
  guestName,
  willAttend,
  guestCount,
  guestNames,
  celebrantName,
}: RSVPToHostEmailProps) => (
  <Html>
    <Head />
    <Preview>
      {willAttend
        ? `✅ ${guestName} ha confirmado asistencia`
        : `❌ ${guestName} no podrá asistir`}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Nueva respuesta RSVP</Heading>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>Hola {hostName},</Text>
          <Text style={paragraph}>
            Has recibido una nueva respuesta para la invitación de <strong>{celebrantName}</strong>.
          </Text>

          <Section style={infoBox}>
            <Text style={infoText}>
              <strong>Invitado:</strong> {guestName}
            </Text>
            <Text style={infoText}>
              <strong>Estado:</strong> {willAttend ? "✅ Asistirá" : "❌ No asistirá"}
            </Text>
            {willAttend && (
              <>
                <Text style={infoText}>
                  <strong>Total de personas:</strong> {guestCount}
                </Text>
                {guestNames && guestNames.length > 0 && (
                  <Text style={infoText}>
                    <strong>Nombres:</strong> {guestNames.join(", ")}
                  </Text>
                )}
              </>
            )}
          </Section>

          <Text style={paragraph}>
            Puedes ver todas las confirmaciones actualizadas en tu dashboard.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            © 2026 nvitame. Todos los derechos reservados.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default RSVPToHostEmail;

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
  backgroundColor: "#3b82f6",
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
  backgroundColor: "#f8fafc",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  margin: "24px 0",
};

const infoText = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#1e293b",
  margin: "8px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
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
