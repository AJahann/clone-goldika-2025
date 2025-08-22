/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";
import type { JSX } from "react";

import FaContent from "@/content/fa.json";
import { useGoldPrice } from "@/libs/data-layer/gold-price/use-gold-price";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import { toPersianDigits } from "@/utils/to-persian-digits";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SellIcon from "@mui/icons-material/Sell";
import { Box, CircularProgress, Tooltip } from "@mui/material";
import Link from "next/link";

import Chart from "../home/chart";
import {
  ActionButton,
  DashboardBox,
  DashboardBoxPrice,
  DashboardBoxSubtitle,
  DashboardBoxTitle,
  DirectionsContainer,
  LoadingOverlay,
  PanelContainer,
  PanelTitle,
} from "./styled";

interface ActionProps {
  title: string;
  txt?: string;
  price: number | string;
  icon?: JSX.Element;
  btnName?: string;
  geram?: boolean;
  link?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

function DashboardActionBox({
  title,
  txt,
  price,
  icon,
  btnName,
  geram,
  link,
  isLoading,
  isError,
  error,
}: ActionProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <LoadingOverlay>
          <CircularProgress size={24} />
        </LoadingOverlay>
      );
    }

    if (isError) {
      return (
        <LoadingOverlay>
          <Tooltip title={error?.message ?? "خطا در دریافت اطلاعات"}>
            <ErrorOutlineIcon color="error" fontSize="large" />
          </Tooltip>
        </LoadingOverlay>
      );
    }

    return (
      <>
        <DashboardBoxTitle variant="body1">{title}</DashboardBoxTitle>
        {txt && (
          <DashboardBoxSubtitle variant="body2">{txt}</DashboardBoxSubtitle>
        )}
        <DashboardBoxPrice variant="h3">
          {price} {geram ? "گرم" : "تومان"}
        </DashboardBoxPrice>
        {link && (
          <Link passHref href={link}>
            <ActionButton
              fullWidth
              disabled={isLoading ?? isError}
              variant="contained"
              color={
                btnName === "خرید"
                  ? "success"
                  : btnName === "فروش"
                    ? "error"
                    : "primary"
              }
              startIcon={icon}
            >
              {btnName}
            </ActionButton>
          </Link>
        )}
      </>
    );
  };

  return <DashboardBox>{renderContent()}</DashboardBox>;
}

const Dashboard = () => {
  const {
    goldPrice,
    isLoading: isGoldPriceLoading,
    isError: isGoldPriceError,
    error: goldPriceError,
  } = useGoldPrice();

  const {
    user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useUserProfile();

  return (
    <PanelContainer>
      <PanelTitle variant="h1">{FaContent.dashboard.dashboard.home}</PanelTitle>
      <DirectionsContainer>
        <DashboardActionBox
          btnName={FaContent.dashboard.dashboard.buy}
          link="/dashboard/trade?action=buy"
          price={Intl.NumberFormat("fa").format(goldPrice.buyPrice ?? 0)}
          title={FaContent.dashboard.dashboard.buy_from_brand}
          txt={FaContent.dashboard.dashboard.gold}
          error={goldPriceError}
          icon={<CurrencyExchangeIcon fontSize="small" />}
          isError={isGoldPriceError}
          isLoading={isGoldPriceLoading}
        />
        <DashboardActionBox
          btnName={FaContent.dashboard.dashboard.sell}
          link="/dashboard/trade?action=sell"
          price={Intl.NumberFormat("fa").format(goldPrice.sellPrice ?? 0)}
          title={FaContent.dashboard.dashboard.sell_to_brand}
          txt={FaContent.dashboard.dashboard.gold}
          error={goldPriceError}
          icon={<SellIcon fontSize="small" />}
          isError={isGoldPriceError}
          isLoading={isGoldPriceLoading}
        />
        <DashboardActionBox
          btnName={FaContent.dashboard.dashboard.increase_wallet}
          link="/dashboard/deposit"
          price={Intl.NumberFormat("fa").format(user?.wallet.cashBalance ?? 0)}
          title={FaContent.dashboard.dashboard.cash_amount}
          error={userError}
          icon={<AccountBalanceWalletOutlinedIcon fontSize="small" />}
          isError={isUserError}
          isLoading={isUserLoading}
        />
        <DashboardActionBox
          geram
          price={toPersianDigits(user?.wallet.goldAmount ?? 0)}
          title="موجودی کیف طلا:"
          error={userError}
          isError={isUserError}
          isLoading={isUserLoading}
        />
      </DirectionsContainer>

      <Box
        sx={{
          margin: { xs: "0", md: "32px -16px 0" },
        }}
      >
        <Chart />
      </Box>
    </PanelContainer>
  );
};

export default Dashboard;
