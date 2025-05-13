"use client";
import { StyledTab, StyledTabs } from "@/components/ui/styled-tabs";
import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import {
  Box,
  Button,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

import LogoSvg from "./logo";

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

const Trade = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  return (
    <Stack
      width="100%"
      alignItems="center"
      maxWidth="28rem"
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: "18px",
        borderRadius: "16px",
      }}
    >
      <PriceHeader>
        <PriceItem>
          <Typography variant="body1">
            {FaContent.home.trade.buy_price}
          </Typography>
          <BuyPrice>
            <span>0</span>
            <span>{FaContent.home.trade.currency}</span>
          </BuyPrice>
        </PriceItem>

        <LogoContainer>
          <LogoSvg />
        </LogoContainer>

        <PriceItem>
          <Typography variant="body1">
            {FaContent.home.trade.sell_price}
          </Typography>
          <SellPrice>
            <span>0</span>
            <span>{FaContent.home.trade.currency}</span>
          </SellPrice>
        </PriceItem>
      </PriceHeader>

      <TradingMain>
        <Box>
          <StyledTabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <StyledTab label={FaContent.home.trade.buy} />
            <StyledTab label={FaContent.home.trade.sell} />
          </StyledTabs>
        </Box>

        <InputsContainer>
          <StyledTextField
            label={FaContent.home.trade.total_value}
            name={FaContent.home.trade.currency}
            slotProps={{
              input: {
                endAdornment: FaContent.home.trade.currency,
              },
            }}
            sx={{
              marginTop: theme.spacing(1.5),
              background: theme.palette.background.paper,
            }}
          />
          <StyledTextField
            label={FaContent.home.trade.gold_amount}
            name={FaContent.home.trade.unit}
            slotProps={{
              input: {
                endAdornment: FaContent.home.trade.unit,
              },
            }}
            sx={{
              marginTop: theme.spacing(1.5),
              background: theme.palette.background.paper,
            }}
          />
        </InputsContainer>
      </TradingMain>

      <Link passHref href="/login" legacyBehavior>
        <ActionButton fullWidth size="large" variant="outlined" color="primary">
          {tab ? FaContent.home.trade.buy : FaContent.home.trade.sell}
        </ActionButton>
      </Link>
    </Stack>
  );
};

export default Trade;
