"use client";

import {
  Box,
  Button,
  Link as MuiLink,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";

const NotFoundContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.common.white,
  marginTop: theme.spacing(6.25),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const NotFound = () => {
  const theme = useTheme();

  return (
    <NotFoundContainer>
      <Typography
        sx={{
          fontSize: "2.5rem",
          fontWeight: theme.typography.fontWeightBold,
          marginBottom: theme.spacing(3),
        }}
      >
        دنبال چی بودی؟
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.secondary,
          marginBottom: theme.spacing(6),
        }}
      >
        بهم بگو:{" "}
        <MuiLink
          href="https://t.me/a_v101"
          target="_blank"
          underline="none"
          color="primary"
          component={Link}
        >
          t.m/A_v101
        </MuiLink>
      </Typography>

      <Link passHref href="/">
        <Button variant="outlined" color="primary">
          بازگشت به صفحه اصلی
        </Button>
      </Link>
    </NotFoundContainer>
  );
};

export default NotFound;
