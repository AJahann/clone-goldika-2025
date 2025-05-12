"use client";
import Footer from "@/components/common/footer/footer";
import NavBar from "@/components/common/navbar/navbar";
import { Box } from "@mui/material";

import MaxWidthWrapper from "./max-width-wrapper";

interface Props {
  children: React.ReactNode;
}

const LayoutStyleProvider = ({ children }: Props) => {
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <Box sx={{ height: "100%" }}>
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </Box>
      <Footer />
    </Box>
  );
};

export default LayoutStyleProvider;
