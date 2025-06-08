import { Box, Button, Stack, styled, Typography } from "@mui/material";

const PanelContainer = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  maxWidth: "60rem",
  width: "100%",
  [theme.breakpoints.down(840)]: {
    padding: theme.spacing(2),
  },
}));

const DashboardBox = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "18px",
  borderRadius: "16px",
  justifyContent: "space-between",
  textWrap: "nowrap",
  flex: 1,
  minHeight: "185px",
  position: "relative",
}));

const DashboardBoxTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  textAlign: "right",
  color: theme.palette.text.primary,
  lineHeight: "24px",
  marginBottom: "9px",
}));

const DashboardBoxSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "14.4px",
  color: theme.palette.text.secondary,
}));

const DashboardBoxPrice = styled(Typography)(({ theme }) => ({
  height: "100%",
  marginTop: "20px",
  color: theme.palette.text.primary,
  fontSize: "20px",
  textAlign: "left",
  marginBottom: "10px",
}));

const ActionButton = styled(Button)({
  fontSize: "16px",
  borderRadius: "8px",
  textWrap: "nowrap",
});

const DirectionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "24px",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    gap: "12px",
  },
}));

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
  borderRadius: "16px",
}));

export const PanelTitle = styled(Typography)(({ theme }) => ({
  margin: "12px 0",
  fontSize: "2.5rem",
  lineHeight: "normal",
  color: theme.palette.text.primary,

  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    margin: "0",
    marginBottom: theme.spacing(2),
    fontSize: "2rem",
  },
}));

export {
  ActionButton,
  DashboardBox,
  DashboardBoxPrice,
  DashboardBoxSubtitle,
  DashboardBoxTitle,
  DirectionsContainer,
  LoadingOverlay,
  PanelContainer,
};
