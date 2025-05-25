"use client";
import { useSidebar } from "@/context/dashboard-sidebar-context";
import { MenuRounded, PersonRounded } from "@mui/icons-material";
import { Box, Button, Stack, styled, Typography } from "@mui/material";

const PanelTopBar = styled(Box)({
  position: "sticky",
  right: 0,
  left: 0,
  top: 0,
  zIndex: 9999,
});

const PanelTopBarWrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.main,
}));

const TopBarCloseMenuBtn = styled(Button)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  color: theme.palette.common.white,
  minWidth: 40,
}));

const Topbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <PanelTopBar>
      <PanelTopBarWrap>
        <TopBarCloseMenuBtn onClick={toggleSidebar}>
          <MenuRounded sx={{ fontSize: "1.5rem" }} />
        </TopBarCloseMenuBtn>
        <Stack alignItems="flex-start" gap={1} direction="row">
          <Typography>۰۰۰۰۰۰۰</Typography>
          <PersonRounded />
        </Stack>
      </PanelTopBarWrap>
    </PanelTopBar>
  );
};

export default Topbar;
