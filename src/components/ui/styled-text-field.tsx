"use client";

import { styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "width": "100%",
  "borderRadius": "16px",
  ".MuiInputBase-input": {
    borderRadius: "16px !important",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderRadius: "16px !important",
    borderColor: theme.palette.border.secondary,
  },
}));

export default StyledTextField;
