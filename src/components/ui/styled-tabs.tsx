"use client";

import { styled, Tab, Tabs } from "@mui/material";

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  "textTransform": "none",
  "fontWeight": theme.typography.fontWeightRegular,
  "fontSize": theme.typography.pxToRem(15),
  "marginRight": theme.spacing(1),
  "color": theme.palette.common.white,
  "width": "50%",
  "padding": "12px 16px",
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
  "&.Mui-focusVisible": {
    backgroundColor: theme.palette.primary.main,
  },
}));
