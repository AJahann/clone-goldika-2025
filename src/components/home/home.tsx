import { Stack } from "@mui/material";

import About from "./about";
import Articles from "./articles";
import Chart from "./chart";
import HeroSection from "./hero/hero-section";
import JoinBtn from "./join-btn";
import StepsBuyingSelling from "./steps-buying-selling/steps-buying-selling";
import WhyGoldika from "./why-goldika/why-goldika";

const Home = () => {
  return (
    <Stack gap={{ xs: 5, md: 9 }}>
      <HeroSection />
      <WhyGoldika />
      <StepsBuyingSelling />
      <Chart />
      <Articles />
      <Stack gap={4}>
        <About />
        <JoinBtn />
      </Stack>
    </Stack>
  );
};

export default Home;
