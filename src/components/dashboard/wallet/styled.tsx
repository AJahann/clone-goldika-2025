import { Box, Button, Stack, styled, Typography } from "@mui/material";

const WalletContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "1rem",
  padding: theme.spacing(3, 1.5, 1.5, 1.5),
}));

const WalletTopText = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const WalletActions = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 1.5),
  flexDirection: "row",
  gap: theme.spacing(2),
}));

const WalletActionButton = styled(Button)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  borderRadius: "16px",
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  textDecoration: "none",
}));

const WalletsList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1, 2, 3, 2),
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "8px",
}));

const WalletItem = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1, 1.5),
  backgroundColor: theme.palette.background.default,
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
}));

const WalletItemText = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  lineHeight: "normal",
  fontWeight: "bold",
  color: theme.palette.common.white,
}));

const WalletItemSubtext = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  marginTop: theme.spacing(1),
  display: "block",
  color: theme.palette.text.secondary,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
}));

export {
  LogoContainer,
  WalletActionButton,
  WalletActions,
  WalletContainer,
  WalletItem,
  WalletItemSubtext,
  WalletItemText,
  WalletsList,
  WalletTopText,
};
