"use client";

import { Box, styled } from "@mui/material";

const MaxWidthWrapper = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  maxWidth: "70rem",
  width: "100%",
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export default MaxWidthWrapper;
