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
