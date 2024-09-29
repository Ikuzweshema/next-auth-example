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
  username: string;
  verificationToken: string;
}

export default function EmailTemplate({
  username,
  verificationToken,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Img
              src={`https://nextauthappexample.vercel.app/logo.png`}
              width="140"
              height="140"
              alt="Koala"
              className="mx-auto my-20"
            />
          </Container>

          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            Thank you for signing up! To complete your registration and start
            using our app, please verify your email address by clicking the
            button below:
          </Text>
          <Section style={btnContainer}>
            <Button
              style={button}
              href={`${process.env.BASE_URL}/auth/${verificationToken}/verify`}
            >
              Verify Email
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            Shema Elisa
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

const logo = {
  margin: "0 auto",
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
