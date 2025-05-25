"use client";
import type { JSX } from "react";

import FaContent from "@/content/fa.json";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SellIcon from "@mui/icons-material/Sell";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import Link from "next/link";

import Chart from "../home/chart";

interface ActionProps {
  title: string;
  txt?: string;
  price: number | string;
  icon?: JSX.Element;
  btnName?: string;
  geram?: boolean;
  link?: string;
}

const DashboardBox = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "18px",
  borderRadius: "16px",
  justifyContent: "space-between",
  textWrap: "nowrap",
  flex: 1,
}));

const DashboardBoxTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  textAlign: "right",
  color: theme.palette.text.primary,
  lineHeight: "24px",
  marginBottom: "9px",
}));

const DashboardBoxSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "14.4px",
  color: theme.palette.text.secondary,
}));

const DashboardBoxPrice = styled(Typography)(({ theme }) => ({
  height: "100%",
  marginTop: "20px",
  color: theme.palette.text.primary,
  fontSize: "20px",
  textAlign: "left",
  marginBottom: "10px",
}));

const ActionButton = styled(Button)({
  fontSize: "16px",
  borderRadius: "8px",
  textWrap: "nowrap",
});

const DirectionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "24px",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {},
}));

const PanelTitle = styled(Typography)(({ theme }) => ({
  margin: "12px 0",
  fontSize: "2.5rem",
  color: theme.palette.common.white,

  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

function DashboardActionBox({
  title,
  txt,
  price,
  icon,
  btnName,
  geram,
  link,
}: ActionProps) {
  return (
    <DashboardBox>
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
    </DashboardBox>
  );
}

const Dashboard = () => {
  return (
    <Stack>
      <PanelTitle variant="h1">خانه</PanelTitle>
      <DirectionsContainer mt={3}>
        <DashboardActionBox
          btnName={FaContent.dashboard.dashboard.buy}
          link="/trade?action=buy"
          price={0}
          title={FaContent.dashboard.dashboard.buy_from_brand}
          txt={FaContent.dashboard.dashboard.gold}
          icon={<CurrencyExchangeIcon fontSize="small" />}
        />
        <DashboardActionBox
          btnName={FaContent.dashboard.dashboard.sell}
          link="/trade?action=sell"
          price={0}
          title={FaContent.dashboard.dashboard.sell_to_brand}
          txt={FaContent.dashboard.dashboard.gold}
          icon={<SellIcon fontSize="small" />}
        />
        <DashboardActionBox
          btnName={FaContent.dashboard.dashboard.increase_wallet}
          link="/deposit"
          price={0}
          title={FaContent.dashboard.dashboard.amount}
          icon={<AccountBalanceWalletOutlinedIcon fontSize="small" />}
        />
        <DashboardActionBox geram price={0} title="موجودی کیف طلا:" />
      </DirectionsContainer>

      <Box
        sx={{
          margin: { xs: "0", md: "32px -16px 0" },
        }}
      >
        <Chart />
      </Box>
    </Stack>
  );
};

export default Dashboard;
