import { Box, Button, styled } from "@mui/material";

const PriceHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  width: "100%",
  justifyContent: "space-evenly",
  padding: theme.spacing(1, 0),
}));

const PriceItem = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  maxWidth: "11rem",
  alignItems: "center",
  display: "flex",
  fontSize: "16px",
  lineHeight: "24px",
  flexDirection: "column",
}));

const PriceValue = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(0.5),
  fontWeight: theme.typography.fontWeightBold,
}));

const BuyPrice = styled(PriceValue)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const SellPrice = styled(PriceValue)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  "width": 40,
  "height": 40,
  "fontSize": "13px",
  "color": theme.palette.primary.main,
  "& svg": {
    filter: "drop-shadow(0 0 0.7em)",
    opacity: 1,
  },
}));

const TradingMain = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  marginTop: theme.spacing(1.5),
  borderRadius: "12px",
  overflow: "hidden",
  width: "100%",
}));

const InputsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingBottom: theme.spacing(2.5),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2.125),
  width: "88%",
  border: `3px solid ${theme.palette.primary.main}80`,
  borderRadius: 8,
}));

export {
  ActionButton,
  BuyPrice,
  InputsContainer,
  LogoContainer,
  PriceHeader,
  PriceItem,
  PriceValue,
  SellPrice,
  TradingMain,
};
