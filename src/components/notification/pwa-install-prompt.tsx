"use client";

import { usePWAInstall } from "@/hooks/use-pwa-install";
import {
  Box,
  Button,
  keyframes,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const InstallPromptContainer = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1300,
  maxWidth: 330,
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  animation: `${slideIn} 0.5s ease-out forwards`,
  backdropFilter: "blur(10px)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[8],
  borderRadius: "24px",

  [theme.breakpoints.down("sm")]: {
    right: theme.spacing(1),
    left: theme.spacing(1),
    maxWidth: "none",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  "borderRadius": "18px",
  "fontWeight": 600,
  "textTransform": "none",
  "padding": theme.spacing(1, 2),
  "fontSize": "0.875rem",
  "transition": theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.shorter,
  }),

  "&:hover": {
    transform: "translateY(-1px)",
  },
}));

const InstallButton = styled(ActionButton)(({ theme }) => ({
  "backgroundColor": theme.palette.primary.main,
  "color": theme.palette.primary.contrastText,

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const DismissButton = styled(ActionButton)(({ theme }) => ({
  "backgroundColor": theme.palette.action.hover,
  "color": theme.palette.text.secondary,

  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const PWAInstallPrompt = () => {
  const { canInstall, installApp, isAppInstalled } = usePWAInstall();
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (canInstall && !isAppInstalled && !dismissed) {
        setShowPrompt(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [canInstall, isAppInstalled, dismissed]);

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);

    localStorage.setItem("pwaPromptDismissed", "true");
  };

  useEffect(() => {
    const wasDismissed = localStorage.getItem("pwaPromptDismissed") === "true";
    setDismissed(wasDismissed);
  }, []);

  if (!showPrompt) return null;

  return (
    <InstallPromptContainer>
      <Box alignItems="flex-start" display="flex" gap={2}>
        <Box flex={1} justifyContent="center">
          <Typography
            variant="subtitle1"
            color="text.primary"
            fontWeight={600}
            gutterBottom
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.4,
            }}
          >
            نصب اپلیکیشن
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.875rem",
              lineHeight: 1.5,
              mb: 2,
            }}
          >
            این اپلیکیشن را روی دستگاه خود نصب کنید تا تجربه بهتری داشته باشید!
          </Typography>

          <Box display="flex" gap={1.5} mt={2}>
            <InstallButton
              disableRipple
              size="small"
              variant="contained"
              onClick={handleInstall}
            >
              نصب
            </InstallButton>

            <DismissButton
              disableRipple
              size="small"
              variant="text"
              onClick={handleDismiss}
            >
              بعداً
            </DismissButton>
          </Box>
        </Box>
      </Box>
    </InstallPromptContainer>
  );
};

export default PWAInstallPrompt;
