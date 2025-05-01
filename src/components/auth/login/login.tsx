"use client";

import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import {
  Button,
  ButtonBase,
  Link,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";

const Wrapper = styled(Stack)(({ theme }) => ({
  width: "400px",
  alignItems: "flex-start",
  background: theme.palette.background.default,
  padding: "28px",
  border: "2px solid",
  borderRadius: "16px",
  borderColor: theme.palette.border.primary,
  gap: "22px",
  color: theme.palette.common.white,
  [theme.breakpoints.down("sm")]: {
    width: "85%",
  },
}));

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
        href="/register"
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

const Login = () => {
  return (
    <Wrapper>
      <Header />

      <Stack width="100%" gap={1.5}>
        <StyledTextField label={FaContent.auth.login.email} />
        <StyledTextField
          label={FaContent.auth.login.password}
          type="password"
        />

        <Confirmation />
      </Stack>

      <Button fullWidth variant="contained" color="primary">
        <Typography fontSize={14}>{FaContent.auth.login.login}</Typography>
      </Button>
    </Wrapper>
  );
};

export default Login;
