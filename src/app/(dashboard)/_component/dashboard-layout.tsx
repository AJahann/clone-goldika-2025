"use client";
import SideBar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { SidebarProvider } from "@/context/dashboard-sidebar-context";
import { Box, Stack, styled } from "@mui/material";

const PanelContainer = styled(Box)(({ theme }) => ({
  padding: "28px 24px",
  margin: "0 auto",
  maxWidth: "60rem",
  width: "100%",
  boxSizing: "border-box",

  [theme.breakpoints.down(840)]: {
    padding: theme.spacing(2),
  },
}));

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <Stack sx={{ minHeight: "100dvh", flexGrow: 1 }} direction="row">
        <SideBar />
        <Stack flex={1}>
          <Topbar />
          <PanelContainer>{children}</PanelContainer>
        </Stack>
      </Stack>
    </SidebarProvider>
  );
};

export default DashboardLayout;
