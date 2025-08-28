"use client";

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

const DismissButton = styled(ActionButton)(({ theme }) => ({
  "backgroundColor": theme.palette.action.hover,
  "color": theme.palette.text.secondary,

  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));
const IOSInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;
    const wasDismissed = localStorage.getItem("iosPromptDismissed") === "true";

    if (isIOS && !isStandalone && !wasDismissed && !dismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem("iosPromptDismissed", "true");
  };

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
            برای نصب: دکمه اشتراک‌گذاری (⎋) را بزنید و سپس "Add to Home Screen"
            را انتخاب کنید.
          </Typography>

          <Box display="flex" gap={1.5} mt={2}>
            <DismissButton
              disableRipple
              size="small"
              variant="text"
              onClick={handleDismiss}
            >
              متوجه شدم
            </DismissButton>
          </Box>
        </Box>
      </Box>
    </InstallPromptContainer>
  );
};

export default IOSInstallPrompt;
