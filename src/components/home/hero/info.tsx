"use client";
import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

import {
  BadgesContainer,
  MainTitle,
  PrimaryTitle,
  SecondaryTitle,
  SubTitle,
  TradingBadge,
  TradingTitleWrapper,
  VerticalBar,
} from "./info-styled";

const Info = () => {
  const { user } = useUserProfile();

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
          htmlInput: {
            maxLength: 11,
          },
          input: {
            endAdornment: (
              <Button
                href={user ? "/dashboard" : "/login"}
                sx={{ alignItems: "center", zIndex: 2, pl: "20px" }}
                variant="contained"
                color="primary"
                LinkComponent={Link}
              >
                <Typography fontSize={14}>{FaContent.home.start}</Typography>
                <KeyboardArrowLeftRoundedIcon fontSize="small" />
              </Button>
            ),
          },
        }}
      />
    </Stack>
  );
};

export default Info;
