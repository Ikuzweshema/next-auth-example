import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { Button } from "@/components/ui/button";

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
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={"https://express-auth-app.vercel.app/logo.png"}
            width="150"
            height="100"
            alt="Your App Logo"
            style={logo}
          />
          <Heading as="h1" style={h1}>
            Verify Your Email Address
          </Heading>
          <Text style={text}>Hello {username},</Text>
          <Text style={text}>
            Thank you for signing up! To complete your registration and start
            using our app, please verify your email address by clicking the
            button below:
          </Text>
          <Button asChild>
            <Link
              href={`${process.env.BASE_URL}/auth/${verificationToken}/verify`}
              target="_blank"
              style={{
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              Verify Email Address
            </Link>
          </Button>
          <Text style={text}>
            If you didn't create an account, you can safely ignore this email.
          </Text>
          <Text style={{ ...text, marginTop: "14px" }}>
            Best regards,
            <br />
            The Next Auth Example Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "hsl(var(--background))",
  fontFamily: "var(--font-sans)",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const logo = {
  margin: "0 auto",
};

const h1 = {
  color: "hsl(var(--foreground))",
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "40px",
  letterSpacing: "-0.5px",
  margin: "48px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "hsl(var(--foreground))",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 24px",
};
