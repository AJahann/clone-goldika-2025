import { Stack } from "@mui/material";

import Info from "./info";
import Trade from "./trade";

const HeroSection = () => {
  return (
    <Stack alignItems="center" gap={5} direction={{ xs: "column", md: "row" }}>
      <Info />
      <Trade />
    </Stack>
  );
};

export default HeroSection;
