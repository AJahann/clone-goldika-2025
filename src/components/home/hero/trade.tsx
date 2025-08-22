"use client";
import { StyledTab, StyledTabs } from "@/components/ui/styled-tabs";
import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import { useGoldPrice } from "@/libs/data-layer/gold-price/use-gold-price";
import { toEnglishDigits } from "@/utils/to-english-digits";
import { toPersianDigits } from "@/utils/to-persian-digits";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  ActionButton,
  BuyPrice,
  InputsContainer,
  LogoContainer,
  PriceHeader,
  PriceItem,
  SellPrice,
  TradingMain,
} from "./hero-styled";
import LogoSvg from "./logo";

const PriceDisplay = ({
  label,
  price,
  isBuy,
}: {
  label: string;
  price: number | undefined;
  isBuy: boolean;
}) => {
  const PriceComponent = isBuy ? BuyPrice : SellPrice;
  return (
    <PriceItem>
      <Typography variant="body1">{label}</Typography>
      <PriceComponent>
        <span>{Intl.NumberFormat("fa").format(price ?? 0)}</span>
        <span>{FaContent.home.trade.currency}</span>
      </PriceComponent>
    </PriceItem>
  );
};

const TradeHeader = ({
  goldPrice,
}: {
  goldPrice?: { buyPrice: number; sellPrice: number };
}) => (
  <PriceHeader>
    <PriceDisplay
      isBuy
      label={FaContent.home.trade.buy_price}
      price={goldPrice?.buyPrice}
    />

    <LogoContainer>
      <LogoSvg />
    </LogoContainer>

    <PriceDisplay
      isBuy={false}
      label={FaContent.home.trade.sell_price}
      price={goldPrice?.sellPrice}
    />
  </PriceHeader>
);

const TradeInputs = ({
  amount,
  gram,
  handleAmountChange,
  handleGramChange,
}: {
  amount: string;
  gram: string;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGramChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const theme = useTheme();

  return (
    <InputsContainer>
      <StyledTextField
        label={FaContent.home.trade.total_value}
        name={FaContent.home.trade.currency}
        value={amount ? Intl.NumberFormat("fa").format(+amount) : ""}
        onChange={handleAmountChange}
        slotProps={{
          input: {
            endAdornment: FaContent.home.trade.currency,
          },
          htmlInput: {
            maxLength: 9,
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
        value={toPersianDigits(gram)}
        onChange={handleGramChange}
        slotProps={{
          input: {
            endAdornment: FaContent.home.trade.unit,
          },
          htmlInput: {
            maxLength: 3,
          },
        }}
        sx={{
          marginTop: theme.spacing(1.5),
          background: theme.palette.background.paper,
        }}
      />
    </InputsContainer>
  );
};

const Trade = () => {
  const { goldPrice } = useGoldPrice();
  const [amount, setAmount] = useState("");
  const [gram, setGram] = useState("");
  const [focused, setFocused] = useState<"amount" | "gram" | null>(null);
  const theme = useTheme();
  const [tab, setTab] = useState<0 | 1>(0); // 0: buy, 1: sell

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = toEnglishDigits(e.target.value);
    const cleanupValue = value.replace(/[^0-9.]/g, "");
    if (/^\d*\.?\d*$/.test(cleanupValue)) {
      setFocused("amount");
      setAmount(cleanupValue);
    }
  };

  const handleGramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = toEnglishDigits(e.target.value);
    if (/^\d*\.?\d*$/.test(value)) {
      setFocused("gram");
      setGram(value);
    }
  };

  const setGramByAmount = () => {
    if (amount && goldPrice) {
      const price = tab === 0 ? goldPrice.buyPrice : goldPrice.sellPrice;
      const newGram = (Number(amount) / price).toFixed(2);
      setGram(newGram);
    } else {
      setGram("");
    }
  };

  const setAmountByGram = () => {
    if (gram && goldPrice) {
      const price = tab === 0 ? goldPrice.buyPrice : goldPrice.sellPrice;
      const newAmount = (Number(gram) * price).toFixed(0);
      setAmount(newAmount);
    } else {
      setAmount("");
    }
  };

  useEffect(() => {
    if (focused === "amount") {
      setGramByAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    if (focused === "gram") {
      setAmountByGram();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gram]);

  useEffect(() => {
    setAmount("");
    setGram("");
  }, [tab]);

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
      <TradeHeader goldPrice={goldPrice} />

      <TradingMain>
        <Box>
          <StyledTabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <StyledTab label={FaContent.home.trade.buy} />
            <StyledTab label={FaContent.home.trade.sell} />
          </StyledTabs>
        </Box>

        <TradeInputs
          gram={gram}
          handleGramChange={handleGramChange}
          amount={amount}
          handleAmountChange={handleAmountChange}
        />
      </TradingMain>

      <ActionButton
        fullWidth
        size="large"
        href="/login"
        variant="outlined"
        color="primary"
        LinkComponent={Link}
      >
        {tab ? FaContent.home.trade.buy : FaContent.home.trade.sell}
      </ActionButton>
    </Stack>
  );
};

export default Trade;
