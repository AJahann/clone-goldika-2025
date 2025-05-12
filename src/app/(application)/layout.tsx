"use client";

import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Box, Stack } from "@mui/material";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <Stack
      sx={{
        height: "100%",
        color: "white",
      }}
    >
      <Navbar />
      <Box sx={{ height: "100%" }}>{children}</Box>
      <Footer />
    </Stack>
  );
};

export default Layout;
