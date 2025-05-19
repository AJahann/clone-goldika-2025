"use client";
import FaContent from "@/content/fa.json";
import {
  Box,
  Stack,
  Step,
  StepButton,
  Stepper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import Icon1 from "./svg/SvgFirst";
import Icon4 from "./svg/SvgFourth";
import Icon2 from "./svg/SvgSecond";
import Icon3 from "./svg/SvgThird";

const StyledStepper = styled(Stepper)(({ theme }) => ({
  "alignItems": "flex-start",
  "paddingLeft": "8px",
  "& .MuiStepLabel-label": {
    color: theme.palette.text.secondary,
    fontSize: "14px",
  },
  "& .MuiStepLabel-label.Mui-active": {
    fontSize: "20px",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  },
  "& .MuiSvgIcon-root": {
    "fontSize": "24px",
    "color": `${theme.palette.common.white}80`,
    "&.Mui-active": {
      color: theme.palette.primary.main,
    },
  },
}));

const StepperDescription = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(3.375),
  flex: 1,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MobileStepperDescription = styled("div")(({ theme }) => ({
  marginTop: "-40px",
  marginLeft: "-8px",
  flex: 1,
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const DescriptionBox = styled("div")(({ theme }) => ({
  display: "flex",
  borderRadius: "16px",
  padding: theme.spacing(2),
  minHeight: "230px",
  boxShadow: `${theme.palette.primary.main} 0px 0px 32px 1px`,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
    alignItems: "center",
    paddingTop: `${theme.spacing(5.625)} !important`,
  },
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  flex: 4,
  textAlign: "justify",
  fontSize: "16px",
  paddingLeft: theme.spacing(0.75),
  lineHeight: "32px",
  color: theme.palette.common.white,
}));

const DescriptionIcon = styled("div")(({ theme }) => ({
  width: "104px",
  padding: theme.spacing(1),
}));

const steps = [
  {
    label: FaContent.home.steps_buying_selling.steps[0].label,
    description: FaContent.home.steps_buying_selling.steps[0].description,
    icon: <Icon1 />,
  },
  {
    label: FaContent.home.steps_buying_selling.steps[1].label,
    description: FaContent.home.steps_buying_selling.steps[1].description,
    icon: <Icon2 />,
  },
  {
    label: FaContent.home.steps_buying_selling.steps[2].label,
    description: FaContent.home.steps_buying_selling.steps[2].description,
    icon: <Icon3 />,
  },
  {
    label: FaContent.home.steps_buying_selling.steps[3].label,
    description: FaContent.home.steps_buying_selling.steps[3].description,
    icon: <Icon4 />,
  },
];

export default function StepsBuyingSelling() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Box>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          [theme.breakpoints.down("md")]: {
            fontSize: "1.25rem",
          },
        }}
      >
        {FaContent.home.steps_buying_selling.title}
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1} mt={3.375}>
          <StyledStepper
            activeStep={activeStep}
            nonLinear
            orientation="vertical"
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepButton onClick={handleStep(index)}>
                  {step.label}
                </StepButton>
                {activeStep === index && (
                  <MobileStepperDescription>
                    <DescriptionBox>
                      <DescriptionText>
                        {steps[activeStep].description}
                      </DescriptionText>
                      <DescriptionIcon>
                        {steps[activeStep].icon}
                      </DescriptionIcon>
                    </DescriptionBox>
                  </MobileStepperDescription>
                )}
              </Step>
            ))}
          </StyledStepper>
        </Box>

        <StepperDescription>
          <DescriptionBox>
            <DescriptionText>{steps[activeStep].description}</DescriptionText>
            <DescriptionIcon>{steps[activeStep].icon}</DescriptionIcon>
          </DescriptionBox>
        </StepperDescription>
      </Stack>
    </Box>
  );
}
