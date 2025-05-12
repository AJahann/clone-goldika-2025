"use client";

import { Box, CssBaseline, GlobalStyles, useTheme } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const MainLayoutStyle = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          background: theme.palette.background.paper,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default MainLayoutStyle;
