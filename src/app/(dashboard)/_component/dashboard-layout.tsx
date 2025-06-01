"use client";
import SideBar from "@/components/dashboard/common/sidebar";
import Topbar from "@/components/dashboard/common/topbar";
import { SidebarProvider } from "@/context/dashboard-sidebar-context";
import { Box, Stack } from "@mui/material";

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
          <Box
            sx={{
              padding: "12px 24px 28px",
            }}
          >
            {children}
          </Box>
        </Stack>
      </Stack>
    </SidebarProvider>
  );
};

export default DashboardLayout;
