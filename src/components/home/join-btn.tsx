"use client";

import FaContnet from "@/content/fa.json";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import { Box, Button, styled, Typography } from "@mui/material";
import Link from "next/link";

const BtnWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const BtnTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  color: theme.palette.common.white,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  "boxShadow": "none",
  "color": theme.palette.getContrastText(theme.palette.primary.main),
  "borderRadius": "8px",
  "fontWeight": theme.typography.fontWeightBold,
  "&:hover": {
    boxShadow: "none",
  },
}));

const JoinBtn = () => {
  const { user } = useUserProfile();

  return (
    <Box>
      <BtnWrapper>
        <ContentWrapper>
          <BtnTitle variant="h1">{FaContnet.home.start_trade}</BtnTitle>

          <Link passHref href={user ? "/dashboard" : "/login"}>
            <ActionButton variant="contained" color="primary">
              {FaContnet.home.login_to_brand}
            </ActionButton>
          </Link>
        </ContentWrapper>
      </BtnWrapper>
    </Box>
  );
};

export default JoinBtn;
