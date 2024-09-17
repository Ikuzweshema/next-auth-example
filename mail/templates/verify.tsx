"use client";

interface EmailTemplateProps {
  username: string;
  verificationToken: string;
}

export default function EmailTemplate({
  username,
  verificationToken,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src="https://express-auth-app.vercel.app/logo.png"
          alt="next-auth-logo"
          style={{ width: "100px", marginBottom: "20px" }}
        />
      </div>

      {/* Welcome Message */}
      <h1 style={{ color: "#333" }}>Welcome, {username}!</h1>
      <p style={{ color: "#555" }}>
        Thank you for Registration ,To Continue, please verify your email
        address.
      </p>

      {/* Verification Button */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <a
          href={`${process.env.BASE_URL}/auth/${verificationToken}/verify`}
          target="_blank"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Verify Email Address
        </a>
      </div>

      {/* Footer Section */}
      <p style={{ color: "#777", fontSize: "12px" }}>
        If you did not create an account, please ignore this email or contact
        support.
      </p>
    </div>
  );
}
