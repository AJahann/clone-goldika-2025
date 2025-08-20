"use client";
import FaContent from "@/content/fa.json";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNewRounded";
import { Box, Button, Typography, useTheme } from "@mui/material";

import {
  CardMediaContainer,
  InfoColumn,
  InfoTextContainer,
  InfoWrapper,
  StyledCard,
  StyledCardContent,
} from "./styled";
import SvgFirst from "./svg/SvgFirst";
import SvgFourth from "./svg/SvgFourth";
import SvgSecond from "./svg/SvgSecond";
import SvgThird from "./svg/SvgThird";

interface InfoCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon?: React.ReactNode;
}

const InfoCard = ({ title, description, buttonText, icon }: InfoCardProps) => {
  const theme = useTheme();

  return (
    <StyledCard>
      <CardMediaContainer>{icon}</CardMediaContainer>
      <StyledCardContent>
        <Typography variant="h2" fontSize={28} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" fontSize={16}>
          {description}
        </Typography>
      </StyledCardContent>

      <Button
        fullWidth
        variant="text"
        color="primary"
        sx={{
          "marginTop": theme.spacing(3.375),
          "fontSize": "16px",
          "gap": theme.spacing(1.5),
          "justifyContent": "left",
          "&:hover": {
            textDecoration: "underline",
            backgroundColor: "transparent",
          },
          [theme.breakpoints.down("md")]: {
            fontSize: "12px",
            justifyContent: "right",
          },
        }}
      >
        {buttonText}
        <ArrowBackIosNew style={{ fontSize: "14px" }} />
      </Button>
    </StyledCard>
  );
};

const InfoText = () => (
  <InfoTextContainer>
    <Typography variant="h1" component="h1">
      {FaContent.home.why_goldika.title}
    </Typography>
    <Typography variant="body1" component="p">
      {FaContent.home.why_goldika.description}
    </Typography>
  </InfoTextContainer>
);

const WhyGoldika = () => {
  return (
    <InfoWrapper>
      <InfoColumn className="infoRight">
        <InfoText />
        <Box>
          <InfoCard
            title={FaContent.home.why_goldika.secure_investment.title}
            buttonText={FaContent.home.why_goldika.growth_comparison}
            description={
              FaContent.home.why_goldika.secure_investment.description
            }
            icon={<SvgFirst />}
          />

          <InfoCard
            title={FaContent.home.why_goldika.trust.title}
            buttonText={FaContent.home.why_goldika.trust.question}
            description={FaContent.home.why_goldika.trust.title}
            icon={<SvgSecond />}
          />
        </Box>
      </InfoColumn>

      <InfoColumn className="infoLeft">
        <Box>
          <InfoCard
            title={FaContent.home.why_goldika.no_fees.title}
            buttonText={FaContent.home.why_goldika.no_fees.question}
            description={FaContent.home.why_goldika.no_fees.description}
            icon={<SvgThird />}
          />

          <InfoCard
            title={FaContent.home.why_goldika.online_advantages.title}
            buttonText={FaContent.home.why_goldika.faq}
            description={
              FaContent.home.why_goldika.online_advantages.description
            }
            icon={<SvgFourth />}
          />
        </Box>
      </InfoColumn>
    </InfoWrapper>
  );
};

export default WhyGoldika;
