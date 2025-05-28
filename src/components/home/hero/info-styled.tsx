"use client";
import { alpha, Box, Button, styled, Typography } from "@mui/material";

const TradingTitleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingTop: theme.spacing(5.5),
  alignItems: "center",
  gap: theme.spacing(2.25),
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(0),
  },
}));

const PrimaryTitle = styled(Typography)(({ theme }) => ({
  fontSize: "48px",
  fontWeight: 500,
  lineHeight: "48px",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
}));

const VerticalBar = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));

const SecondaryTitle = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));

const BadgesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(2.5),
  gap: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const TradingBadge = styled(Button)(({ theme }) => ({
  "height": "23px",
  "borderRadius": theme.spacing(2),
  "backgroundColor": alpha(theme.palette.primary.main, 0.15),
  "fontSize": "0.7rem",
  "textTransform": "none",
  "&.Mui-disabled": {
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
  },
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3.25),
  fontSize: "28px",
  lineHeight: "48px",
  fontWeight: 200,
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  marginTop: theme.spacing(1.75),
  lineHeight: "24px",
  color: theme.palette.text.secondary,
}));

export {
  BadgesContainer,
  MainTitle,
  PrimaryTitle,
  SecondaryTitle,
  SubTitle,
  TradingBadge,
  TradingTitleWrapper,
  VerticalBar,
};
