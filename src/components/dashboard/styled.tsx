import { styled, Typography } from "@mui/material";

export const PanelTitle = styled(Typography)(({ theme }) => ({
  margin: "12px 0",
  fontSize: "2.5rem",
  lineHeight: "normal",
  color: theme.palette.text.primary,

  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    margin: "0",
    marginBottom: theme.spacing(2),
    fontSize: "2rem",
  },
}));
