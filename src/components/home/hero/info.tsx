"use client";
import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { alpha, Box, Button, Stack, styled, Typography } from "@mui/material";

const TradingTitleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingTop: theme.spacing(5.5),
  alignItems: "center",
  gap: theme.spacing(2.25),
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(0),
  },
}));

const PrimaryTitle = styled(Typography)(({ theme }) => ({
  fontSize: "48px",
  fontWeight: 500,
  lineHeight: "48px",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
}));

const VerticalBar = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));

const SecondaryTitle = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
}));

const BadgesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(2.5),
  gap: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const TradingBadge = styled(Button)(({ theme }) => ({
  "height": "23px",
  "borderRadius": theme.spacing(2),
  "backgroundColor": alpha(theme.palette.primary.main, 0.15),
  "fontSize": "0.7rem",
  "textTransform": "none",
  "&.Mui-disabled": {
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
  },
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3.25),
  fontSize: "28px",
  lineHeight: "48px",
  fontWeight: 200,
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  marginTop: theme.spacing(1.75),
  lineHeight: "24px",
  color: theme.palette.text.secondary,
}));

const Info = () => {
  return (
    <Stack
      sx={{ width: "100%", alignItems: { xs: "center", md: "flex-start" } }}
    >
      <TradingTitleWrapper>
        <PrimaryTitle as="span">{FaContent.home.brand_name}</PrimaryTitle>
        <VerticalBar as="span">|</VerticalBar>
        <SecondaryTitle as="span">
          {FaContent.home.secure_market}
        </SecondaryTitle>
      </TradingTitleWrapper>
      <BadgesContainer>
        <TradingBadge disabled variant="outlined">
          بدون نیاز به مراجعه حضوری
        </TradingBadge>
        <TradingBadge disabled variant="outlined">
          امکان تحویل فیزیکی
        </TradingBadge>
        <TradingBadge disabled variant="outlined">
          بازار ۲۴ ساعته
        </TradingBadge>
      </BadgesContainer>
      <MainTitle>خرید و فروش آنلاین طلای آبشده (بدون اجرت)</MainTitle>
      <SubTitle>
        خرید طلای آبشده به صورت رسمی و تضمین‌شده و با هر میزان سرمایه
      </SubTitle>

      <StyledTextField
        label={FaContent.home.enter_phone}
        sx={{ mt: 4, maxWidth: { xs: "346px", md: "100%" } }}
        slotProps={{
          input: {
            endAdornment: (
              <Button
                sx={{ alignItems: "center", zIndex: 2 }}
                variant="contained"
                color="primary"
              >
                <Typography fontSize={14}>{FaContent.home.start}</Typography>
                <KeyboardArrowLeftRoundedIcon />
              </Button>
            ),
          },
        }}
      />
    </Stack>
  );
};

export default Info;
