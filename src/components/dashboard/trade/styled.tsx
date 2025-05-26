import { Box, Button, ButtonGroup, styled } from "@mui/material";

const TradeContainer = styled(Box)(() => ({
  maxWidth: "30rem",
  width: "100%",
  margin: "0 auto",
}));

const TradeCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2.25),
  marginTop: theme.spacing(2.5),
}));

const TradeToggle = styled(ButtonGroup)(({ theme }) => ({
  "backgroundColor": theme.palette.background.default,
  "borderRadius": `${theme.spacing(2)} !important`,
  "padding": theme.spacing(2),
  "& .MuiButton-root": {
    height: 36,
  },
}));

const TradeButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  maxWidth: 360,
  padding: theme.spacing(1.2, 0),
  borderRadius: theme.spacing(1),
  fontWeight: "bold",
}));

export { TradeButton, TradeCard, TradeContainer, TradeToggle };
