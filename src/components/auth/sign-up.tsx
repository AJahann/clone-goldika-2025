"use client";

import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  alpha,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";

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

const SignUp = () => {
  return (
    <Wrapper>
      <Header />

      <Stack width="100%" gap={1.5}>
        <StyledTextField label={FaContent.auth.register.full_name} />
        <StyledTextField label={FaContent.auth.register.number} />
        <StyledTextField
          label={FaContent.auth.register.password}
          type="password"
        />
        <StyledTextField
          label={FaContent.auth.register.repeat_password}
          type="password"
        />
      </Stack>

      <Button fullWidth variant="contained" color="primary">
        <Typography fontSize={14}>
          {FaContent.auth.register.register}
        </Typography>
      </Button>
    </Wrapper>
  );
};

export default SignUp;
