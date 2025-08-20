import { Box, styled, Typography } from "@mui/material";
import Link from "next/link";

const FooterContainer = styled("footer")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

const FooterWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "68rem",
  margin: "0 auto",
  padding: theme.spacing(0, 3),
}));

const FooterRow = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingTop: theme.spacing(4.75),
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const FooterLinksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 10,
  maxWidth: "28rem",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "24rem",
  },
}));

const FooterLinksColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  "marginTop": theme.spacing(2),
  "fontSize": "1rem",
  "color": theme.palette.common.white,
  "textDecoration": "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const FooterNemadsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row-reverse",
  gap: theme.spacing(0.75),
  flex: 1,
}));

const FooterNemad = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  borderRadius: "18px",
  width: "120px",
  height: "120px",
  padding: theme.spacing(1.125),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const FooterInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(1.5),
  },
}));

const FooterAddress = styled(Box)(({ theme }) => ({
  flex: 1.5,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const AddressText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  marginTop: theme.spacing(1),
  lineHeight: "1.5rem",
  color: theme.palette.common.white,
}));

const FooterConnect = styled(Box)(() => ({
  flex: 0.8,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

const PhoneText = styled(Typography)(({ theme }) => ({
  "fontSize": "1rem",
  "color": theme.palette.common.white,
  "& span": {
    color: theme.palette.grey[500],
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "0.75rem",
  color: theme.palette.grey[300],
  marginTop: theme.spacing(2.5),
  padding: theme.spacing(1.25),
}));

export {
  AddressText,
  CopyrightText,
  FooterAddress,
  FooterConnect,
  FooterContainer,
  FooterInfo,
  FooterLink,
  FooterLinksColumn,
  FooterLinksContainer,
  FooterNemad,
  FooterNemadsContainer,
  FooterRow,
  FooterWrapper,
  PhoneText,
};
