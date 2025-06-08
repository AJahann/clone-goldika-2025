"use client";
import { ErrorAlert } from "@/components/ui/styled-alerts";
import FaContent from "@/content/fa.json";
import { useWithdraw } from "@/libs/data-layer/transaction/use-withdraw";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import { toEnglishDigits } from "@/utils/to-english-digits";
import { CreditCardOutlined } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { PanelTitle } from "../styled";
import AmountInput from "./components/amount-input";
import CardSelection from "./components/card-selection";
import { DepositContainer, DepositContent, SubmitButton } from "./styled";

const getValidationSchema = (maxAmount: number) =>
  Yup.object({
    amount: Yup.number()
      .required("مبلغ برداشت الزامی است")
      .min(10000, "حداقل مبلغ برداشت ۱۰,۰۰۰ تومان است")
      .max(
        maxAmount,
        `حداکثر مبلغ قابل برداشت ${Intl.NumberFormat("fa").format(maxAmount)} تومان است`,
      ),
    cardId: Yup.string().required("لطفاً یک کارت را انتخاب کنید"),
  });

const BalanceDisplay = ({ balance }: { balance: number | undefined }) => (
  <Stack
    alignItems="center"
    flexDirection="row"
    sx={{
      color: "#9fa0a8",
      mb: 2,
    }}
  >
    <CreditCardOutlined sx={{ fontSize: 24, ml: 1 }} />
    <Typography sx={{ mx: 0.5 }} component="span">
      {FaContent.dashboard.transaction.balance}:
    </Typography>
    <Typography sx={{ fontWeight: "bold", mx: 0.5 }} component="span">
      {Intl.NumberFormat("fa").format(balance ?? 0)}
    </Typography>
    <Typography sx={{ mx: 0.5 }} component="span">
      {FaContent.dashboard.transaction.toman}
    </Typography>
  </Stack>
);

interface SliderProps {
  cashBalance: number;
  amount: number;
}

const WithdrawSlider = ({ cashBalance, amount }: SliderProps) => {
  const stepCalculate = (value: number) => {
    if (value <= 0) return 1;
    return Math.max(Math.floor(value / 50), 1);
  };

  return (
    <Box mt={4} px={2}>
      <Slider
        marks
        max={cashBalance}
        min={0}
        step={stepCalculate(cashBalance)}
        value={amount}
      />
    </Box>
  );
};

const WithdrawAlert = () => (
  <ErrorAlert sx={{ mb: 1 }}>
    <Typography fontSize={14}>
      {FaContent.dashboard.transaction.withdraw_alert}
    </Typography>
  </ErrorAlert>
);

const successNotify = () => toast.success("برداشت با موفقیت انجام شد.");
const errorNotify = (err: string) => toast.error(err);

const Withdraw = () => {
  const { withdraw, isWithdrawing, withdrawError, isWithdrawSuccess } =
    useWithdraw();
  const { user, isError, isLoading, error } = useUserProfile();
  const validationSchema = useMemo(() => {
    return getValidationSchema(user?.wallet.cashBalance ?? 0);
  }, [user?.wallet.cashBalance]);

  const formik = useFormik({
    initialValues: {
      amount: "",
      cardId: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      withdraw({
        amount: Number(values.amount),
        cardId: values.cardId,
      });
    },
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = toEnglishDigits(e.target.value);
    const cleanupValue = value.replace(/[^0-9]/g, "");
    void formik.setFieldValue("amount", cleanupValue);
  };

  useEffect(() => {
    if (isWithdrawSuccess) {
      successNotify();
      formik.resetForm();
    }
    if (withdrawError) {
      errorNotify(withdrawError.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWithdrawSuccess, withdrawError]);

  return (
    <DepositContainer>
      <PanelTitle>{FaContent.dashboard.transaction.withdraw}</PanelTitle>

      <DepositContent>
        <BalanceDisplay balance={user?.wallet.cashBalance} />

        <AmountInput
          label={FaContent.dashboard.transaction.withdraw_amount}
          formik={formik}
          handleAmountChange={handleAmountChange}
        />

        <WithdrawSlider
          cashBalance={user?.wallet.cashBalance ?? 0}
          amount={+formik.values.amount}
        />

        <Box mt={3}>
          <WithdrawAlert />

          <CardSelection
            user={user}
            error={error?.message ?? "نمیدونم ولی یه خطایی داریم."}
            formik={formik}
            isError={isError}
            isLoading={isLoading}
          />
        </Box>
      </DepositContent>

      <Stack alignItems="center" mt={3}>
        <SubmitButton
          disabled={user?.cards.length === 0 || isWithdrawing || !formik.dirty}
          variant="contained"
          onClick={() => formik.handleSubmit()}
        >
          {isWithdrawing ? (
            <CircularProgress size={24} />
          ) : (
            <Typography>{FaContent.dashboard.transaction.pay}</Typography>
          )}
        </SubmitButton>
      </Stack>
    </DepositContainer>
  );
};

export default Withdraw;
