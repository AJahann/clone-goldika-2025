import { Box, Stack, styled, Typography } from "@mui/material";

const ContactWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2.25),
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
}));

const ContactTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  color: theme.palette.text.primary,
  marginTop: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const ContactContent = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(3, 0, 5, 0),
  padding: theme.spacing(1.5),
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const ContactDetailsWrapper = styled(Box)(({ theme }) => ({
  flex: 1.5,
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  lineHeight: "1.5rem",
  textAlign: "justify",
  padding: theme.spacing(3, 1.5),
}));

const ContactMapWrapper = styled(Box)(({ theme }) => ({
  "padding": theme.spacing(0, 1.5),
  "width": "100%",
  "& iframe": {
    width: "100%",
  },
}));

const ContactIcon = styled(Box)(({ theme }) => ({
  fontSize: "1.5rem",
  color: theme.palette.primary.main,
  display: "flex",
  justifyContent: "flex-start",
}));

export {
  ContactContent,
  ContactDetailsWrapper,
  ContactIcon,
  ContactMapWrapper,
  ContactTitle,
  ContactWrapper,
};
