"use client";
import { Box, Button, styled, Typography } from "@mui/material";
import Image from "next/image";

const ProductCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const ProductImage = styled(Image)({
  marginBottom: "16px",
  borderRadius: "16px",
});

const ProductActionButton = styled(Button)(() => ({
  minWidth: 96,
  width: 96,
  height: "31px",
}));

const GoldBalanceBadge = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderRadius: "999px",
  border: `2px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(0.7, 1.5),
}));

export { GoldBalanceBadge, ProductActionButton, ProductCard, ProductImage };
