"use client";
import SideBar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { SidebarProvider } from "@/context/dashboard-sidebar-context";
import { Stack } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <Stack sx={{ minHeight: "100dvh", flexGrow: 1 }} direction="row">
        <SideBar />
        <Stack flex={1}>
          <Topbar />
          {children}
        </Stack>
      </Stack>
    </SidebarProvider>
  );
};

export default Layout;
