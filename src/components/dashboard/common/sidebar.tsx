"use client";

import { useSidebar } from "@/context/dashboard-sidebar-context";
import {
  AddShoppingCartOutlined,
  AttachMoneyOutlined,
  HomeOutlined,
  LogoutOutlined,
  MoneyOffCsredOutlined,
  PriceChangeOutlined,
  StoreOutlined,
  SummarizeOutlined,
} from "@mui/icons-material";
import {
  Box,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import LogoSvg from "./logo-svg";

const SidebarMenu = styled(Box)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(1, 0),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const SidebarMenuWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const SidebarItemWrapper = styled(Box)(({ theme }) => ({
  "& > a": {
    "gap": "12px",
    "padding": theme.spacing(1.5, 2),
    "color": theme.palette.common.white,
    "textDecoration": "none",
    "display": "flex",
    "alignItems": "center",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  "& > a.active": {
    backgroundColor: `${theme.palette.primary.light}36`,
  },
}));

const SidebarItemIcon = styled(Box)({
  width: "26px",
  height: "26px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SidebarItemName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: "1rem",
  marginRight: theme.spacing(4),
}));

const SidebarLogoutButton = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  cursor: "pointer",
}));

interface SideBarItemProps {
  name: string;
  icon: React.ReactNode;
  to: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ name, icon, to }) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <SidebarItemWrapper>
      <Link className={isActive ? "active" : ""} href={to}>
        <SidebarItemIcon>{icon}</SidebarItemIcon>
        <SidebarItemName>{name}</SidebarItemName>
      </Link>
    </SidebarItemWrapper>
  );
};

const SideBar: React.FC = () => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isMobile && !isSidebarOpen) {
      toggleSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Stack
      sx={{
        width: isSidebarOpen ? "17rem" : 0,
        transform: isSidebarOpen ? "translateX(0)" : "translateX(-17rem)",
        transition: "all 0.3s ease-in-out",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        zIndex: 99,
        [theme.breakpoints.down("md")]: {
          transform: !isSidebarOpen ? "translateX(0)" : "translateX(-17rem)",
          width: !isSidebarOpen ? "17rem" : 0,
          position: "fixed",
          top: "-40px",
          left: 0,
          bottom: 0,
        },
      }}
    >
      <Stack
        sx={{
          position: "sticky",
          inset: 0,
          width: "100%",
          height: "100vh",
          [theme.breakpoints.down("md")]: {
            height: "100%",
          },
        }}
      >
        <Stack
          href="/"
          component={Link}
          sx={{
            width: "110px",
            padding: theme.spacing(3),
            margin: "0 auto",
          }}
        >
          <LogoSvg />
        </Stack>
        <SidebarMenu>
          <SidebarMenuWrapper>
            <SideBarItem name="خانه" icon={<HomeOutlined />} to="/dashboard" />
            <SideBarItem
              name="کیف و دارایی"
              icon={<PriceChangeOutlined />}
              to="/dashboard/wallet"
            />
            <SideBarItem
              name="واریز پول"
              icon={<AttachMoneyOutlined />}
              to="/dashboard/deposit"
            />
            <SideBarItem
              name="برداشت پول"
              icon={<MoneyOffCsredOutlined />}
              to="/dashboard/withdraw"
            />
            <SideBarItem
              name="معامله طلا"
              icon={<StoreOutlined />}
              to="/dashboard/trade"
            />
            <SideBarItem
              name="گزارش"
              icon={<SummarizeOutlined />}
              to="/dashboard/reports"
            />
            <SideBarItem
              name="دریافت طلا"
              icon={<AddShoppingCartOutlined />}
              to="/dashboard/order-pickup"
            />
          </SidebarMenuWrapper>

          <SidebarLogoutButton>
            <SideBarItem name="خروج" icon={<LogoutOutlined />} to="/" />
          </SidebarLogoutButton>
        </SidebarMenu>
      </Stack>
    </Stack>
  );
};

export default SideBar;
