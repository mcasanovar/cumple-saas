import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Heading,
  Link,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userName?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nvitame.com";

export const WelcomeEmail = ({
  userName,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>¡Bienvenido a nvitame! Comienza a crear invitaciones mágicas</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>¡Bienvenido a nvitame!</Heading>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>Hola {userName || "amigo/a"},</Text>
          <Text style={paragraph}>
            Estamos muy emocionados de tenerte con nosotros. nvitame es el lugar donde la magia de los cumpleaños comienza con una invitación inolvidable.
          </Text>
          <Text style={paragraph}>
            Ya puedes empezar a crear tu primera invitación premium en solo minutos. Elige entre nuestros temas exclusivos como Safari, Princesas, Dinosaurios y más.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={`${baseUrl}/dashboard/invitaciones/nueva`}>
              Crear mi primera invitación
            </Button>
          </Section>
          <Text style={paragraph}>
            ¡Que comience la fiesta!
            <br />
            El equipo de nvitame
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            La Serena, Chile.
            <br />
            © 2026 nvitame. Todos los derechos reservados.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const header = {
  padding: "32px 48px",
  textAlign: "center" as const,
  backgroundColor: "#E63946",
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
  marginTop: "32px",
  marginBottom: "32px",
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
