"use client";

import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import { useLogin } from "@/libs/data-layer/login/use-login";
import { getErrorMessage } from "@/utils/error-handler";
import { toEnglishDigits } from "@/utils/to-english-digits";
import { toPersianDigits } from "@/utils/to-persian-digits";
import {
  Button,
  ButtonBase,
  Link,
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
      sx={{ color: theme.palette.text.primary }}
      direction="row"
    >
      <Typography variant="h1">{FaContent.auth.login.login}</Typography>
      <Typography variant="h1">|</Typography>
      <Link
        href="/sign-up"
        underline="none"
        color="primary"
        component={NextLink}
      >
        <Typography variant="h2">{FaContent.auth.login.register}</Typography>
      </Link>
    </Stack>
  );
};

const Confirmation = () => {
  return (
    <Stack gap={0.5} direction="row">
      <Typography variant="body2">
        {FaContent.auth.login.confirmation.fs}
      </Typography>
      <ButtonBase>
        <Typography variant="body2" color="primary">
          {FaContent.auth.login.confirmation.sc}
        </Typography>
      </ButtonBase>
      <Typography variant="body2">
        {FaContent.auth.login.confirmation.ls}
      </Typography>
    </Stack>
  );
};

const validationSchema = yup.object({
  number: yup
    .string()
    .matches(/^[0-9]+$/, "فقط ارقام مجاز هستند")
    .required("داداش این جا موند...")
    .length(11, "شماره ی معتبر میخوام،‌معتبر"),
  password: yup
    .string()
    .required("داداش این جا موند...")
    .min(4, "یه پسورد خوب لطفا دیگه..."),
});

const Form = () => {
  const { login, isLoading, error, isError } = useLogin();

  const formik = useFormik({
    initialValues: {
      number: "",
      password: "",
    },
    validationSchema,
    onSubmit: ({ number, password }) => {
      login({
        phone: number,
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

      <Confirmation />

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
        <Typography fontSize={14}>{FaContent.auth.login.login}</Typography>
      </Button>
    </Stack>
  );
};

const Login = () => {
  return (
    <Wrapper>
      <Header />
      <Form />
    </Wrapper>
  );
};

export default Login;
