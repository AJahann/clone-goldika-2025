"use client";

import About from "@/components/auth/about";
import { Stack, useTheme } from "@mui/material";

interface Props {
  children: React.ReactNode;
}
const LayoutStyleProvider = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        flexGrow: 1,
        background: theme.palette.background.default,
        flexDirection: "row",
      }}
    >
      <About />
      {children}
    </Stack>
  );
};

export default LayoutStyleProvider;
