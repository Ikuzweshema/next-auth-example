import React from "react";
import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Hr } from "@react-email/hr";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { Img } from "@react-email/img";
import { Container } from "@react-email/container";

interface EmailTemplateProps {
  expires: Date;
  url: string;
}

export default function SignInRequestEmail({
  expires,
  url,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Please Verify Email to Continue to Your account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Img
              src={`https://nextauthappexample.vercel.app/logo.png`}
              width="140"
              height="140"
              alt="Logo"
              className="mx-auto my-20"
            />
          </Container>

          <Text style={paragraph}>Hello </Text>
          <Text style={paragraph}>
            Click the button below to sign in to your account . This link will
            expire in {expires.getHours()} hours.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={url}>
              Sign In
            </Button>
          </Section>
          <Text style={paragraph}>
            If you didn't request this email, you can safely ignore it.
          </Text>
          <Text style={paragraph}>
            Best,
            <br />
            The Team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            <Button href="https://github.com/Ikuzweshema/next-auth-example">
              Next Auth Example
            </Button>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
  display: "flex",
  justifyContent: "center",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  width: "15rem",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
