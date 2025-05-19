"use client";
import FaContent from "@/content/fa.json";
import { Box, styled, Typography } from "@mui/material";

import GoldSVG from "./svg/gold-svg";

const AboutWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2.25),
  [theme.breakpoints.down("md")]: {
    "& .MuiTypography-h1": {
      textAlign: "center",
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0),
  },
}));

const AboutContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.25),
  fontSize: "1rem",
  textAlign: "justify",
  lineHeight: "2rem",
  color: theme.palette.common.white,
  borderRadius: "16px",
  backgroundColor: theme.palette.background.paper,
}));

const ContentBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2, 3.375),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
  },
}));

const GoldSVGWrapper = styled(Box)(({ theme }) => ({
  width: "16rem",
  height: "16rem",
  padding: theme.spacing(0, 3.125),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Highlight = styled("span")(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.main,
}));

const ParkLink = styled("span")(({ theme }) => ({
  "color": theme.palette.primary.main,
  "textDecoration": "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Title = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: "1.5rem", color: "white" }} variant="h1">
    {title}
  </Typography>
);

const Content = () => {
  return (
    <>
      <Paragraph>
        {FaContent.about.paragraphs.first.split("{highlight1}")[0]}
        <Highlight>{FaContent.about.highlights.first}</Highlight>
        {FaContent.about.paragraphs.first.split("{highlight1}")[1]}
      </Paragraph>

      <ContentBottom>
        <Paragraph>
          <Highlight>{FaContent.about.highlights.second}</Highlight>
          {
            FaContent.about.paragraphs.second
              .split("{highlight2}")[1]
              .split("{parkLink}")[0]
          }
          <ParkLink>{FaContent.about.parkLink.text}</ParkLink>
          {FaContent.about.paragraphs.second.split("{parkLink}")[1]}
        </Paragraph>
        <GoldSVGWrapper>
          <GoldSVG />
        </GoldSVGWrapper>
      </ContentBottom>
    </>
  );
};

const About = () => {
  return (
    <Box component="section">
      <Box className="container">
        <AboutWrapper>
          <Title title={FaContent.about.title} />
          <AboutContent>
            <Content />
          </AboutContent>
        </AboutWrapper>
      </Box>
    </Box>
  );
};

export default About;
