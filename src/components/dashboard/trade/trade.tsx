"use client";
import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import {
  alpha,
  Box,
  Button,
  Slider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import { TradeButton, TradeCard, TradeContainer, TradeToggle } from "./styled";

const goldPrices = { buy: 0, sell: 0 };

const TradeTypeToggle = ({
  tradeType,
  setTradeType,
}: {
  tradeType: "buy" | "sell";
  setTradeType: (type: "buy" | "sell") => void;
}) => {
  const theme = useTheme();

  return (
    <TradeToggle fullWidth>
      <Button
        onClick={() => setTradeType("buy")}
        sx={{
          backgroundColor:
            tradeType === "buy"
              ? theme.palette.primary.main
              : theme.palette.background.default,
          borderRadius: "8px 0 0 8px !important",
        }}
      >
        <Typography color="textPrimary">
          {FaContent.dashboard.trade.buy}
        </Typography>
      </Button>
      <Button
        onClick={() => setTradeType("sell")}
        sx={{
          backgroundColor:
            tradeType === "sell"
              ? theme.palette.primary.main
              : theme.palette.background.default,
          borderRadius: "0 8px 8px 0 !important",
        }}
      >
        <Typography color="textPrimary">
          {FaContent.dashboard.trade.sell}
        </Typography>
      </Button>
    </TradeToggle>
  );
};

const PriceDisplay = ({ tradeType }: { tradeType: "buy" | "sell" }) => {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      px={0.5}
      sx={{ color: theme.palette.text.secondary }}
      direction="row"
      justifyContent="space-between"
    >
      <Typography variant="body1">
        {FaContent.home.trade.buy_price}
        <Typography display="block" component="small" fontSize="0.875rem">
          {FaContent.dashboard.trade.price.unit}
        </Typography>
      </Typography>
      <Typography fontSize={18} fontWeight="bold">
        {new Intl.NumberFormat("fa").format(
          tradeType === "buy" ? +goldPrices.buy : +goldPrices.sell,
        )}{" "}
        {FaContent.home.trade.currency}
      </Typography>
    </Stack>
  );
};

const CurrencyInput = () => {
  const theme = useTheme();

  return (
    <StyledTextField
      fullWidth
      label={FaContent.home.trade.total_value}
      name={FaContent.home.trade.currency}
      slotProps={{
        input: {
          endAdornment: (
            <Typography>{FaContent.home.trade.currency}</Typography>
          ),
        },
      }}
      sx={{
        mt: 1.5,
        backgroundColor: theme.palette.background.default,
      }}
    />
  );
};

const GoldAmountInput = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 4, width: "100%" }}>
      <StyledTextField
        fullWidth
        label={FaContent.home.trade.gold_amount}
        name={FaContent.home.trade.unit}
        slotProps={{
          input: {
            endAdornment: <Typography>{FaContent.home.trade.unit}</Typography>,
          },
        }}
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      />
    </Box>
  );
};

const BalanceDisplay = ({ tradeType }: { tradeType: "buy" | "sell" }) => (
  <Stack
    alignItems="center"
    sx={{ color: "grey.500", pl: 0.5 }}
    direction="row"
  >
    <CreditCardOutlinedIcon sx={{ mr: 1, fontSize: "1.5rem" }} />
    <Typography fontSize={15}>
      {tradeType === "buy"
        ? String(FaContent.dashboard.trade.walletBalance).replace(
            "{{amount}}",
            new Intl.NumberFormat("fa").format(0),
          )
        : String(FaContent.dashboard.trade.goldBalance).replace(
            "{{amount}}",
            new Intl.NumberFormat("fa").format(0.0),
          )}
    </Typography>
  </Stack>
);

const SubmitButton = ({ tradeType }: { tradeType: "buy" | "sell" }) => (
  <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
    <TradeButton
      fullWidth
      variant="contained"
      color={tradeType === "buy" ? "success" : "error"}
    >
      <Typography fontSize={18} fontWeight={500}>
        {tradeType === "buy"
          ? FaContent.dashboard.trade.buy
          : FaContent.dashboard.trade.sell}
      </Typography>
    </TradeButton>
  </Box>
);

const Trade = () => {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const theme = useTheme();

  return (
    <TradeContainer>
      <Typography sx={{ mb: 1.5, fontSize: "2.5rem" }} variant="h1">
        {FaContent.dashboard.trade.title}
      </Typography>

      <TradeCard>
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={2}
            bgcolor={alpha(theme.palette.background.secondary, 0.2)}
            borderRadius={3}
          >
            <TradeTypeToggle
              setTradeType={setTradeType}
              tradeType={tradeType}
            />
            <PriceDisplay tradeType={tradeType} />
            <CurrencyInput />
            <GoldAmountInput />
          </Stack>

          <Box sx={{ px: 2 }}>
            <Slider
              marks
              max={10}
              min={0}
              step={1}
              sx={{ color: "grey.500" }}
              value={2}
            />
          </Box>

          <BalanceDisplay tradeType={tradeType} />
          <SubmitButton tradeType={tradeType} />
        </Stack>
      </TradeCard>
    </TradeContainer>
  );
};

export default Trade;
