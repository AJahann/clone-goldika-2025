import { Box, styled, Typography } from "@mui/material";

interface ContactInfoProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ContactInfoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const ContactText = styled(Typography)({
  display: "flex",
  alignItems: "center",
});

export default function ContactInfo({ icon, children }: ContactInfoProps) {
  return (
    <ContactInfoContainer>
      {icon}
      <ContactText>{children}</ContactText>
    </ContactInfoContainer>
  );
}
