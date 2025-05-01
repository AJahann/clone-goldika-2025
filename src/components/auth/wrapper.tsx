"use client";

import { Stack, styled } from "@mui/material";

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

export default Wrapper;
