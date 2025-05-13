import { Box } from "@mui/material";

import HeroSection from "./hero/hero-section";

const Home = () => {
  return (
    <Box gap={4} pb={3} pt={{ xs: 0, md: 3 }}>
      <HeroSection />
    </Box>
  );
};

export default Home;
