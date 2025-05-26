import { Box, Button, Stack, styled, Typography } from "@mui/material";

const DepositContainer = styled(Box)(() => ({
  maxWidth: 640,
  margin: "0 auto",
  width: "100%",
}));

const DepositTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1.5, 0),
  lineHeight: "normal",
  fontSize: "2.5rem",
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const DepositContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  padding: theme.spacing(2.5, 1.5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
}));

const PresetAmountsContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0.875),
  marginTop: theme.spacing(4),
}));

const PresetAmountRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing(1.75),
  alignItems: "center",
  marginBottom: theme.spacing(1.75),
}));

const PresetAmountButton = styled(Button)(({ theme }) => ({
  flex: 1,
  minWidth: "12rem",
  textWrap: "nowrap",
  backgroundColor: theme.palette.background.default,
  height: 31,
  [theme.breakpoints.down("sm")]: {
    height: "auto",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  "width": "100%",
  "maxWidth": 320,
  "padding": theme.spacing(1.5, 0),
  "&.Mui-disabled": {
    color: "rgba(255, 255, 255, 0.26)",
    backgroundColor: "rgba(189, 184, 184, 0.12)",
  },
}));

export {
  DepositContainer,
  DepositContent,
  DepositTitle,
  PresetAmountButton,
  PresetAmountRow,
  PresetAmountsContainer,
  SubmitButton,
};
