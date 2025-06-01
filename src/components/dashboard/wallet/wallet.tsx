"use client";

import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import { toPersianDigits } from "@/utils/to-persian-digits";
import {
  AccountBalanceWalletOutlined,
  SellOutlined,
  StickyNote2Outlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

import Logo from "../../home/hero/logo";
import { PanelTitle } from "../styled";
import {
  LogoContainer,
  WalletActionButton,
  WalletActions,
  WalletContainer,
  WalletItem,
  WalletItemSubtext,
  WalletItemText,
  WalletsList,
  WalletTopText,
} from "./styled";
import WalletChart from "./wallet-chart";

const WalletPage = () => {
  const { user } = useUserProfile();

  return (
    <Box
      sx={{
        maxWidth: "480px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <PanelTitle>کیف دارایی</PanelTitle>

      <WalletContainer>
        <WalletTopText>
          {user?.wallet.cashBalance
            ? Intl.NumberFormat("fa").format(user.wallet.cashBalance)
            : toPersianDigits(0)}{" "}
          تومان
        </WalletTopText>
        <WalletChart hasWallet={false} />
        <WalletActions direction="row">
          <WalletActionButton fullWidth href="/deposit" LinkComponent={Link}>
            <AccountBalanceWalletOutlined sx={{ fontSize: 32 }} />
            <span>افزایش موجودی</span>
          </WalletActionButton>
          <WalletActionButton fullWidth href="/reports" LinkComponent={Link}>
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
              <WalletItemSubtext>
                {user?.wallet.goldAmount
                  ? Intl.NumberFormat("fa").format(user.wallet.goldAmount)
                  : toPersianDigits(0)}{" "}
                گرم
              </WalletItemSubtext>
            </Box>
          </WalletItem>

          <WalletItem>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <Box>
              <WalletItemText>کیف پول</WalletItemText>
              <WalletItemSubtext>
                {user?.wallet.cashBalance
                  ? Intl.NumberFormat("fa").format(user.wallet.cashBalance)
                  : toPersianDigits(0)}{" "}
                تومان
              </WalletItemSubtext>
            </Box>
          </WalletItem>
        </WalletsList>
      </WalletContainer>
    </Box>
  );
};

export default WalletPage;
