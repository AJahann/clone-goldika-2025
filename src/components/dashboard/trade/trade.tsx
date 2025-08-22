/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";
import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import { useGoldPrice } from "@/libs/data-layer/gold-price/use-gold-price";
import { useBuyGold } from "@/libs/data-layer/trade/use-buy-gold";
import { useSellGold } from "@/libs/data-layer/trade/use-sell-gold";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import { toEnglishDigits } from "@/utils/to-english-digits";
import { toPersianDigits } from "@/utils/to-persian-digits";
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
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { PanelTitle } from "../styled";
import { TradeButton, TradeCard, TradeContainer, TradeToggle } from "./styled";

const getValidationSchema = (
  maxAmount: number,
  maxGrams: number,
  tradeType: "buy" | "sell",
) => {
  const baseSchema = {
    amount: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0, "مقدار نمی‌تواند منفی باشد")
      .required("مقدار نمی‌تواند خالی باشد"),
    gram: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0, "مقدار نمی‌تواند منفی باشد")
      .required("مقدار نمی‌تواند خالی باشد"),
  };

  if (tradeType === "buy") {
    return Yup.object().shape({
      ...baseSchema,
      amount: baseSchema.amount.max(
        maxAmount,
        `حداکثر مبلغ قابل خرید ${Intl.NumberFormat("fa").format(
          maxAmount,
        )} تومان است`,
      ),
    });
  }

  return Yup.object().shape({
    ...baseSchema,
    gram: baseSchema.gram.max(
      maxGrams,
      `حداکثر مقدار قابل فروش ${Intl.NumberFormat("fa").format(maxGrams)} گرم است`,
    ),
  });
};

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
  const { goldPrice, isLoading, error, isError } = useGoldPrice();
  const router = useRouter();
  const theme = useTheme();

  if (isLoading) {
    return <Typography variant="body1">در حال بارگزاری...</Typography>;
  }

  if (isError) {
    return (
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Typography variant="body1" color="error">
          {error?.message}
        </Typography>

        <Button
          variant="outlined"
          color="error"
          onClick={() => router.refresh()}
        >
          تلاش مجدد
        </Button>
      </Stack>
    );
  }

  return (
    <Stack
      alignItems="center"
      px={0.5}
      sx={{ color: theme.palette.text.secondary }}
      direction="row"
      justifyContent="space-between"
    >
      <Typography variant="body1">
        {tradeType === "buy"
          ? FaContent.home.trade.buy_price
          : FaContent.home.trade.sell_price}
        <Typography display="block" component="small" fontSize="0.875rem">
          {FaContent.dashboard.trade.price.unit}
        </Typography>
      </Typography>
      <Typography fontSize={18} fontWeight="bold">
        {new Intl.NumberFormat("fa").format(
          tradeType === "buy"
            ? +(goldPrice.buyPrice ?? 0)
            : +(goldPrice.sellPrice ?? 0),
        )}{" "}
        {FaContent.home.trade.currency}
      </Typography>
    </Stack>
  );
};

interface TradeInputsProps {
  formik: any;
}

const TradeInputs = ({ formik }: TradeInputsProps) => {
  const theme = useTheme();
  const { values, setFieldValue, touched, errors } = formik;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = toEnglishDigits(e.target.value);
    const cleanupValue = value.replace(/[^0-9.]/g, "");
    if (/^\d*\.?\d*$/.test(cleanupValue)) {
      setFieldValue("amount", cleanupValue);
      setFieldValue("lastFocused", "amount");
    }
  };

  const handleGramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = toEnglishDigits(e.target.value);
    if (/^\d*\.?\d*$/.test(value)) {
      setFieldValue("gram", value);
      setFieldValue("lastFocused", "gram");
    }
  };

  return (
    <Stack>
      <StyledTextField
        helperText={touched.amount && errors.amount}
        label={FaContent.home.trade.total_value}
        name="amount"
        error={touched.amount && !!errors.amount}
        onChange={handleAmountChange}
        slotProps={{
          input: {
            endAdornment: FaContent.home.trade.currency,
          },
          htmlInput: {
            maxLength: 11,
          },
        }}
        sx={{
          marginTop: theme.spacing(1.5),
          background: theme.palette.background.paper,
        }}
        value={
          values.amount ? Intl.NumberFormat("fa").format(+values.amount) : ""
        }
      />
      <StyledTextField
        helperText={touched.gram && errors.gram}
        label={FaContent.home.trade.gold_amount}
        name="gram"
        value={toPersianDigits(values.gram)}
        error={touched.gram && !!errors.gram}
        onChange={handleGramChange}
        slotProps={{
          input: {
            endAdornment: FaContent.home.trade.unit,
          },
          htmlInput: {
            maxLength: 4,
          },
        }}
        sx={{
          marginTop: theme.spacing(1.5),
          background: theme.palette.background.paper,
        }}
      />
    </Stack>
  );
};

const BalanceDisplay = ({ tradeType }: { tradeType: "buy" | "sell" }) => {
  const { user } = useUserProfile();

  return (
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
              new Intl.NumberFormat("fa").format(user?.wallet.cashBalance ?? 0),
            )
          : String(FaContent.dashboard.trade.goldBalance).replace(
              "{{amount}}",
              new Intl.NumberFormat("fa").format(user?.wallet.goldAmount ?? 0),
            )}
      </Typography>
    </Stack>
  );
};

interface SubmitButtonProps {
  tradeType: "buy" | "sell";
  isSubmitting: boolean;
}

const SubmitButton = ({ tradeType, isSubmitting }: SubmitButtonProps) => (
  <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
    <TradeButton
      fullWidth
      disabled={isSubmitting}
      type="submit"
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

const successBuyNotif = () => toast.success("خرید طلا با موفقیت انجام شد.");
const successSellNotif = () => toast.success("فروش طلا با موفقیت انجام شد.");
const errNotif = (err: string) => toast.error(err);

// eslint-disable-next-line max-lines-per-function
const Trade = () => {
  const { buyGoldAsync, buyError, isBuying, isBuySuccess } = useBuyGold();
  const { sellGoldAsync, sellError, isSelling, isSellSuccess } = useSellGold();
  const { goldPrice } = useGoldPrice();
  const { user } = useUserProfile();
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const theme = useTheme();

  const maxValues = useMemo(
    () => ({
      maxAmount: user?.wallet.cashBalance ?? 0,
      maxGrams: user?.wallet.goldAmount ?? 0,
    }),
    [user],
  );

  const validationSchema = useMemo(
    () =>
      getValidationSchema(maxValues.maxAmount, maxValues.maxGrams, tradeType),
    [maxValues, tradeType],
  );

  const formik = useFormik({
    initialValues: {
      amount: "",
      gram: "",
      lastFocused: null as "amount" | "gram" | null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const grams = Number(values.gram);
      const amount = Number(values.amount);

      if (tradeType === "buy") {
        await buyGoldAsync({ amount });
      } else {
        await sellGoldAsync({ grams });
      }
    },
  });

  const { values, setFieldValue } = formik;

  useEffect(() => {
    if (!goldPrice) return;

    const price =
      tradeType === "buy" ? goldPrice.buyPrice : goldPrice.sellPrice;

    if (values.lastFocused === "amount" && values.amount) {
      const newGram = (Number(values.amount) / price).toFixed(2);
      void setFieldValue("gram", newGram);
    } else if (values.lastFocused === "gram" && values.gram) {
      const newAmount = (Number(values.gram) * price).toFixed(0);
      void setFieldValue("amount", newAmount);
    }
  }, [
    values.amount,
    values.gram,
    values.lastFocused,
    goldPrice,
    tradeType,
    setFieldValue,
  ]);

  useEffect(() => {
    void setFieldValue("amount", "");
    void setFieldValue("gram", "");
    void setFieldValue("lastFocused", null);
  }, [tradeType, setFieldValue]);

  useEffect(() => {
    if (isSellSuccess) {
      successSellNotif();
      formik.resetForm();
    } else if (sellError?.message) {
      errNotif(sellError.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSellSuccess, sellError]);

  useEffect(() => {
    if (isBuySuccess) {
      successBuyNotif();
      formik.resetForm();
    } else if (buyError?.message) {
      errNotif(buyError.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuySuccess, buyError]);

  const stepCalculate = (value: number) => {
    if (value <= 0) return 1;
    return Math.max(Math.floor(value / 50), 1);
  };

  const sliderValue =
    tradeType === "buy" ? Number(values.amount) : Number(values.gram);

  const sliderMax =
    tradeType === "buy" ? maxValues.maxAmount : maxValues.maxGrams;

  const handleSliderChange = (_: Event, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;

    if (tradeType === "buy") {
      void setFieldValue("amount", String(newValue));
      void setFieldValue("lastFocused", "amount");
    } else {
      void setFieldValue("gram", String(newValue));
      void setFieldValue("lastFocused", "gram");
    }
  };

  return (
    <TradeContainer>
      <PanelTitle>{FaContent.dashboard.trade.title}</PanelTitle>

      <TradeCard>
        <form onSubmit={formik.handleSubmit}>
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

              <TradeInputs formik={formik} />
            </Stack>

            <Box sx={{ px: 2 }}>
              <Slider
                marks
                max={sliderMax}
                min={0}
                step={stepCalculate(sliderMax)}
                value={sliderValue}
                onChange={handleSliderChange}
              />
            </Box>

            <BalanceDisplay tradeType={tradeType} />
            <SubmitButton
              isSubmitting={isBuying || isSelling}
              tradeType={tradeType}
            />
          </Stack>
        </form>
      </TradeCard>
    </TradeContainer>
  );
};

export default Trade;
