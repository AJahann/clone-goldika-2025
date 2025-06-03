"use client";
import FaContent from "@/content/fa.json";
import { useDeposit } from "@/libs/data-layer/transaction/use-deposit";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import { toEnglishDigits } from "@/utils/to-english-digits";
import { Add } from "@mui/icons-material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

import StyledTextField from "../../ui/styled-text-field";
import { PanelTitle } from "../styled";
import MyCards from "./my-cards";
import NoCard from "./no-card";
import {
  DepositContainer,
  DepositContent,
  PresetAmountButton,
  PresetAmountRow,
  PresetAmountsContainer,
  SubmitButton,
} from "./styled";

const successNotify = () => toast.success("واریزی با موفقیت انجام شد.");
const errorNotify = () => toast.error("واریزی با خطا مواجه شد.");

const PRESET_AMOUNTS = [
  ["500000", "1000000"],
  ["5000000", "10000000"],
];

const validationSchema = Yup.object({
  amount: Yup.number()
    .required("مبلغ واریزی الزامی است")
    .min(10000, "حداقل مبلغ واریز ۱۰,۰۰۰ تومان است")
    .max(100000000, "حداکثر مبلغ واریز ۱۰۰,۰۰۰,۰۰۰ تومان است"),
  cardId: Yup.string().required("لطفاً یک کارت را انتخاب کنید"),
});

const PresetAmounts = ({
  handlePresetAmount,
}: {
  handlePresetAmount: (amount: string) => void;
}) => (
  <PresetAmountsContainer>
    {PRESET_AMOUNTS.map((row, rowIndex) => (
      // eslint-disable-next-line @eslint-react/no-array-index-key
      <PresetAmountRow key={`row-${rowIndex}`}>
        {row.map((presetAmount) => (
          <PresetAmountButton
            key={presetAmount}
            variant="outlined"
            color="primary"
            onClick={() => handlePresetAmount(presetAmount)}
            startIcon={<Add sx={{ fontSize: 20 }} />}
          >
            {new Intl.NumberFormat("fa").format(+presetAmount)}{" "}
            {FaContent.dashboard.transaction.toman}
          </PresetAmountButton>
        ))}
      </PresetAmountRow>
    ))}
  </PresetAmountsContainer>
);

const AmountInput = ({
  formik,
  handleAmountChange,
}: {
  formik: any;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <StyledTextField
    helperText={formik.touched.amount && formik.errors.amount}
    label={FaContent.dashboard.transaction.amount}
    name="amount"
    error={formik.touched.amount && Boolean(formik.errors.amount)}
    onChange={handleAmountChange}
    slotProps={{
      input: {
        endAdornment: (
          <Typography>{FaContent.dashboard.transaction.toman}</Typography>
        ),
      },
    }}
    sx={{
      background: (theme) => theme.palette.background.default,
    }}
    value={
      formik.values.amount
        ? Intl.NumberFormat("fa").format(+formik.values.amount)
        : ""
    }
  />
);

const CardSelection = ({
  isError,
  isLoading,
  user,
  formik,
  error,
}: {
  isError: boolean;
  error: string;
  isLoading: boolean;
  user: any;
  formik: any;
}) => {
  if (isError) {
    return (
      <Typography alignItems="center" color="error">
        {error}
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Stack alignItems="center">
        <CircularProgress size={36} />
      </Stack>
    );
  }

  return user?.cards.length ? (
    <MyCards
      helperText={formik.touched.cardId && formik.errors.cardId}
      selectedCard={formik.values.cardId}
      error={formik.touched.cardId && Boolean(formik.errors.cardId)}
      onChange={(cardId) => formik.setFieldValue("cardId", cardId)}
    />
  ) : (
    <NoCard />
  );
};

const Deposit = () => {
  const { deposit, isDepositing, isDepositSuccess, depositError } =
    useDeposit();
  const { user, isLoading, isError, error } = useUserProfile();

  const formik = useFormik({
    initialValues: {
      amount: "",
      cardId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      deposit({
        amount: Number(values.amount),
        cardId: values.cardId,
      });
    },
  });

  const handlePresetAmount = (presetAmount: string) => {
    void formik.setFieldValue("amount", presetAmount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = toEnglishDigits(e.target.value);
    const cleanupValue = value.replace(/[^0-9]/g, "");
    void formik.setFieldValue("amount", cleanupValue);
  };

  useEffect(() => {
    if (isDepositSuccess) {
      successNotify();
      formik.resetForm();
    } else if (depositError) {
      errorNotify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositError, isDepositSuccess]);

  return (
    <DepositContainer>
      <PanelTitle>{FaContent.dashboard.transaction.deposit}</PanelTitle>

      <DepositContent>
        <form onSubmit={formik.handleSubmit}>
          <AmountInput
            formik={formik}
            handleAmountChange={handleAmountChange}
          />

          <PresetAmounts handlePresetAmount={handlePresetAmount} />

          <Box mt={3}>
            <CardSelection
              user={user}
              error={error?.message ?? "نمیدونم ولی یه خطایی داریم."}
              formik={formik}
              isError={isError}
              isLoading={isLoading}
            />
          </Box>
        </form>
      </DepositContent>

      <Stack alignItems="center" mt={3}>
        <SubmitButton
          variant="contained"
          onClick={() => formik.handleSubmit()}
          disabled={
            user?.cards.length === 0 ||
            isDepositing ||
            !formik.isValid ||
            !formik.dirty
          }
        >
          {isDepositing ? (
            <CircularProgress size={24} />
          ) : (
            <Typography>{FaContent.dashboard.transaction.pay}</Typography>
          )}
        </SubmitButton>
      </Stack>
    </DepositContainer>
  );
};

export default Deposit;
