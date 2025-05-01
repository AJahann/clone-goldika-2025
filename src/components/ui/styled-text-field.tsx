"use client";

import { styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "width": "100%",
  ".MuiOutlinedInput-notchedOutline": {
    borderRadius: "16px",
    borderColor: theme.palette.border.secondary,
  },
}));

export default StyledTextField;
