"use client";

import {
  AccountBalanceWalletOutlined,
  SellOutlined,
  StickyNote2Outlined,
} from "@mui/icons-material";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import Link from "next/link";

import Logo from "../home/hero/logo";
import { PanelTitle } from "./styled";
import WalletChart from "./wallet-chart";

const WalletContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "1rem",
  padding: theme.spacing(3, 1.5, 1.5, 1.5),
}));

const WalletTopText = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const WalletActions = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 1.5),
  flexDirection: "row",
  gap: theme.spacing(2),
}));

const WalletActionButton = styled(Button)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  borderRadius: "16px",
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  textDecoration: "none",
}));

const WalletsList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1, 2, 3, 2),
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "8px",
}));

const WalletItem = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1, 1.5),
  backgroundColor: theme.palette.background.default,
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
}));

const WalletItemText = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  lineHeight: "normal",
  fontWeight: "bold",
  color: theme.palette.common.white,
}));

const WalletItemSubtext = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  marginTop: theme.spacing(1),
  display: "block",
  color: theme.palette.text.secondary,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const WalletPage = () => {
  return (
    <Box
      sx={{
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      <PanelTitle>کیف دارایی</PanelTitle>

      <WalletContainer>
        <WalletTopText>{0} تومان</WalletTopText>
        <WalletChart hasWallet={false} />
        <WalletActions direction="row">
          <WalletActionButton fullWidth href="/deposit" LinkComponent={Link}>
            <AccountBalanceWalletOutlined sx={{ fontSize: 32 }} />
            <span>افزایش موجودی</span>
          </WalletActionButton>
          <WalletActionButton fullWidth href="/report" LinkComponent={Link}>
            <StickyNote2Outlined sx={{ fontSize: 32 }} />
            <span>گزارش</span>
          </WalletActionButton>
          <WalletActionButton fullWidth href="/withdraw" LinkComponent={Link}>
            <SellOutlined sx={{ fontSize: 32 }} />
            <span>برداشت پول</span>
          </WalletActionButton>
        </WalletActions>
        <WalletsList>
          <Typography sx={{ padding: "4px" }} variant="body1">
            کیف‌ها
          </Typography>

          <WalletItem>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <Box>
              <WalletItemText>کیف طلایی</WalletItemText>
              <WalletItemSubtext>{0} گرم</WalletItemSubtext>
            </Box>
          </WalletItem>

          <WalletItem>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <Box>
              <WalletItemText>کیف پول</WalletItemText>
              <WalletItemSubtext>{0} تومان</WalletItemSubtext>
            </Box>
          </WalletItem>
        </WalletsList>
      </WalletContainer>
    </Box>
  );
};

export default WalletPage;
