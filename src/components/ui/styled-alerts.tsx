import type { AlertProps } from "@mui/material";

import { Alert, styled } from "@mui/material";

export const WarningAlert = styled((props: Omit<AlertProps, "severity">) => (
  <Alert severity="warning" {...props} />
))(({ theme }) => ({
  "width": "100%",
  "backgroundColor": `${theme.palette.warning.dark} !important`,
  ".MuiAlert-icon": {
    color: theme.palette.primary.light,
  },
}));

export const ErrorAlert = styled((props: Omit<AlertProps, "severity">) => (
  <Alert severity="error" {...props} />
))(({ theme }) => ({
  "width": "100%",
  ".MuiAlert-icon": {
    color: theme.palette.error.light,
  },
}));

export const InfoAlert = styled((props: Omit<AlertProps, "severity">) => (
  <Alert severity="info" {...props} />
))(() => ({
  "width": "fit-content",
  "margin": "0 auto",
  "backgroundColor": `#071318 !important`,
  ".MuiAlert-icon": {
    color: "#b8e7fb",
  },
}));
