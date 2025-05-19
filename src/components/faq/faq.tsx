/* eslint-disable @eslint-react/no-array-index-key */
"use client";

import FaContent from "@/content/fa.json";
import { faqData } from "@/data/faq-data";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
  Typography,
} from "@mui/material";

const FaqWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2.25, 3, 2.25),
  [theme.breakpoints.down("sm")]: {
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

const FaqTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.75rem",
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.33rem",
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold,
  padding: theme.spacing(3, 0, 1, 0),
}));

const AccordionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  "backgroundColor": theme.palette.background.default,
  "color": theme.palette.common.white,
  "margin": theme.spacing(0.75, 0),
  "&:before": {
    display: "none",
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "fontWeight": 500,
  "fontSize": "0.95rem",
  "color": theme.palette.text.primary,
  "lineHeight": "1.625rem",
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(1.5, 0),
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.9rem",
  textAlign: "justify",
  lineHeight: "1.75rem",
  padding: theme.spacing(0, 2, 2, 2),
}));

interface AccordionFaqProps {
  title: string;
  content: string[];
}

const AccordionFaq = ({ title, content }: AccordionFaqProps) => {
  return (
    <AccordionWrapper>
      <StyledAccordion>
        <StyledAccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          {title}
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          {content.map((paragraph, index) => (
            <Typography paragraph key={index}>
              {paragraph}
            </Typography>
          ))}
        </StyledAccordionDetails>
      </StyledAccordion>
    </AccordionWrapper>
  );
};

const Faq = () => {
  return (
    <Box>
      <FaqWrapper>
        <FaqTitle variant="h1">{FaContent.faq.faq}</FaqTitle>

        {faqData.map((section, sectionIndex) => (
          <Box key={sectionIndex}>
            <SubTitle variant="h2">{section.category}</SubTitle>
            {section.questions.map((question, questionIndex) => (
              <AccordionFaq
                key={questionIndex}
                title={question.title}
                content={question.content}
              />
            ))}
          </Box>
        ))}
      </FaqWrapper>
    </Box>
  );
};

export default Faq;
