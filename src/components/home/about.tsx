"use client";
import FaContent from "@/content/fa.json";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Fade,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import NextLinkt from "next/link";
import React, { useState } from "react";

const AboutContainer = styled(Box)(() => ({
  width: "100%",
}));

const AboutWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  padding: theme.spacing(0, 1),
  height: "auto",
}));

const ReadMoreButton = styled(Button)(({ theme }) => ({
  "gap": theme.spacing(0.75),
  "fontSize": "1rem",
  "lineHeight": "1.5rem",
  "backgroundColor": "transparent",
  "color": theme.palette.primary.main,
  "padding": theme.spacing(1, 0),
  "&:hover": {
    textDecoration: "underline",
    backgroundColor: "transparent",
  },
}));

const AboutContentText = styled(Typography)(({ theme }) => ({
  lineHeight: "2rem",
  fontSize: "1rem",
  textAlign: "justify",
  marginBottom: theme.spacing(2),
}));

const AboutSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: theme.typography.fontWeightBold,
  margin: theme.spacing(2, 0),
}));

const AboutLink = styled(NextLinkt)(({ theme }) => ({
  "fontSize": "1rem",
  "lineHeight": "2rem",
  "color": theme.palette.primary.main,
  "textDecoration": "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const AboutContent = ({ isShow }: { isShow: boolean }) => {
  const content = FaContent.home.about_section;

  return (
    <Collapse in={isShow} collapsedSize={176}>
      <Box>
        <AboutContentText>{content.paragraph1}</AboutContentText>
        <AboutContentText>{content.paragraph2}</AboutContentText>
        <AboutContentText>
          علاوه بر این، آ مارکت{" "}
          <AboutLink href="/about">
            توسط پارک علم و فناوری دانشگاه صنعتی شریف
          </AboutLink>{" "}
          {content.paragraph3.split("به عنوان")[1]}
        </AboutContentText>

        <AboutSubtitle variant="h3">{content.subtitle1}</AboutSubtitle>
        <AboutContentText>{content.paragraph4}</AboutContentText>
        <AboutContentText>{content.paragraph5}</AboutContentText>

        <AboutSubtitle variant="h3">{content.subtitle2}</AboutSubtitle>
        <AboutContentText>{content.paragraph6}</AboutContentText>
      </Box>
    </Collapse>
  );
};

const About = () => {
  const [isShow, setIsShow] = useState(false);
  const theme = useTheme();
  const content = FaContent.home.about_section;

  return (
    <AboutContainer>
      <AboutWrapper>
        <Typography
          variant="h2"
          sx={{
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          {content.title}
        </Typography>

        <AboutContent isShow={isShow} />

        <Fade in>
          <ReadMoreButton disableRipple onClick={() => setIsShow(!isShow)}>
            {isShow ? (
              <>
                {content.closeText}
                <ArrowForwardIosIcon fontSize="small" />
              </>
            ) : (
              <>
                {content.readMoreText}
                <ArrowBackIosNewIcon fontSize="small" />
              </>
            )}
          </ReadMoreButton>
        </Fade>
      </AboutWrapper>
    </AboutContainer>
  );
};

export default About;
