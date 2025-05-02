"use client";

import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import { useSignUp } from "@/libs/data-layer/sign-up/use-sign-up";
import { getErrorMessage } from "@/utils/error-handler";
import { toEnglishDigits } from "@/utils/to-english-digits";
import { toPersianDigits } from "@/utils/to-persian-digits";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  alpha,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import NextLink from "next/link";
import * as yup from "yup";

import Wrapper from "./wrapper";

const Header = () => {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      gap={1}
      direction="row"
      justifyContent="space-between"
      sx={{
        color: theme.palette.text.primary,
        paddingBottom: 1,
        borderBottom: `1px solid ${alpha(theme.palette.border.primary, 0.5)}`,
        width: "100%",
      }}
    >
      <Typography variant="h1">{FaContent.auth.login.register}</Typography>

      <IconButton href="/login" LinkComponent={NextLink}>
        <ArrowBackRoundedIcon />
      </IconButton>
    </Stack>
  );
};

const validationSchema = yup.object({
  fullName: yup.string().required("داداش این جا موند..."),
  number: yup
    .string()
    .matches(/^[0-9]+$/, "فقط ارقام مجاز هستند")
    .required("داداش این جا موند...")
    .length(11, "شماره ی معتبر میخوام،‌معتبر"),
  password: yup
    .string()
    .required("داداش این جا موند...")
    .min(4, "یه پسورد خوب لطفا دیگه..."),
  confirmPassword: yup
    .string()
    .required("داداش این جا موند...")
    .oneOf([yup.ref("password")], "یکسانن اینا مثلا؟"),
});

const Form = () => {
  const { signUp, isLoading, error, isError } = useSignUp();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      number: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: ({ fullName, number, password }) => {
      signUp({
        fullName,
        number,
        password,
      });

      formik.isSubmitting = isLoading;
    },
  });

  return (
    <Stack
      width="100%"
      gap={1.5}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <StyledTextField
        helperText={formik.touched.fullName && formik.errors.fullName}
        id="fullName"
        label={FaContent.auth.register.full_name}
        name="fullName"
        value={toPersianDigits(formik.values.fullName)}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        onBlur={formik.handleBlur}
        onChange={(e) => {
          const englishValue = toEnglishDigits(e.target.value);
          void formik.setFieldValue("fullName", englishValue);
        }}
      />
      <StyledTextField
        helperText={formik.touched.number && formik.errors.number}
        id="number"
        label={FaContent.auth.register.number}
        name="number"
        value={toPersianDigits(formik.values.number)}
        error={formik.touched.number && Boolean(formik.errors.number)}
        onBlur={formik.handleBlur}
        onChange={(e) => {
          const englishValue = toEnglishDigits(e.target.value);
          void formik.setFieldValue("number", englishValue);
        }}
      />
      <StyledTextField
        helperText={formik.touched.password && formik.errors.password}
        id="password"
        label={FaContent.auth.register.password}
        name="password"
        type="password"
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <StyledTextField
        id="confirmPassword"
        label={FaContent.auth.register.repeat_password}
        name="confirmPassword"
        type="password"
        value={formik.values.confirmPassword}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
      />

      {isError && (
        <Typography textAlign="center" color="red" fontSize={14}>
          {getErrorMessage(error, "خطایی رخ داده است")}
        </Typography>
      )}

      <Button
        fullWidth
        disabled={isLoading}
        sx={{ mt: "10px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        <Typography fontSize={14}>
          {FaContent.auth.register.register}
        </Typography>
      </Button>
    </Stack>
  );
};

const SignUp = () => {
  return (
    <Wrapper>
      <Header />
      <Form />
    </Wrapper>
  );
};

export default SignUp;
