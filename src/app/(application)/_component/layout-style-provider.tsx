"use client";
import NavBar from "@/components/common/navbar/navbar";
import { Box, useTheme } from "@mui/material";

import MaxWidthWrapper from "./max-width-wrapper";

interface Props {
  children: React.ReactNode;
}

const LayoutStyleProvider = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </Box>
  );
};

export default LayoutStyleProvider;
