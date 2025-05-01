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
        background: theme.palette.background.paper,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <About />

      <Stack
        sx={{
          flex: 1.8,
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default LayoutStyleProvider;
