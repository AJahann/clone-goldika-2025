"use client";
import { useSidebar } from "@/context/dashboard-sidebar-context";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import { toPersianDigits } from "@/utils/to-persian-digits";
import { ErrorOutline, MenuRounded, PersonRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";

const PanelTopBar = styled(Box)({
  position: "sticky",
  right: 0,
  left: 0,
  top: 0,
  zIndex: 99,
});

const PanelTopBarWrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.main,
  height: theme.spacing(8),
}));

const TopBarCloseMenuBtn = styled(Button)(({ theme }) => ({
  "width": 40,
  "height": 40,
  "borderRadius": "50%",
  "color": theme.palette.common.white,
  "minWidth": 40,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const UserProfileDisplay = () => {
  const { user, isLoading, isError, error } = useUserProfile();

  if (isLoading) {
    return <CircularProgress size={16} color="inherit" />;
  }

  if (isError) {
    return (
      <Tooltip title={error?.message ?? "Failed to load user profile"}>
        <ErrorOutline color="error" fontSize="small" />
      </Tooltip>
    );
  }

  if (!user?.phone) {
    return null;
  }

  return (
    <Stack alignItems="center" gap={1} direction="row">
      <Typography variant="body2" noWrap>
        {toPersianDigits(user.phone)}
      </Typography>
      <PersonRounded fontSize="small" />
    </Stack>
  );
};

const Topbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <PanelTopBar role="banner">
      <PanelTopBarWrap>
        <TopBarCloseMenuBtn
          aria-label="Toggle sidebar"
          data-testid="sidebar-toggle"
          onClick={toggleSidebar}
        >
          <MenuRounded sx={{ fontSize: "1.5rem" }} />
        </TopBarCloseMenuBtn>

        <Box>
          <UserProfileDisplay />
        </Box>
      </PanelTopBarWrap>
    </PanelTopBar>
  );
};

export default Topbar;
