"use client";
import FaContent from "@/content/fa.json";
import { AccountBalance } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import AddCardModal from "./add-card-modal";

const CardsHeader = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 16,
  color: theme.palette.common.white,
}));

const CardItem = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: 16,
}));

const CardTextContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  color: theme.palette.common.white,
  boxSizing: "border-box",
  padding: theme.spacing(0.5, 1.5),
}));

const CardName = styled(Typography)({
  textAlign: "left",
});

const CardNumber = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  marginTop: theme.spacing(1),
}));

const MyCards = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isLoading = false;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (isLoading) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <CircularProgress size={38} />
      </Box>
    );
  }

  return (
    <Box>
      <AddCardModal onClose={() => setOpen(false)} open={open} />

      <CardsHeader>
        <Typography>{FaContent.dashboard.deposit.my_cards}</Typography>
        <Button variant="text" onClick={() => setOpen(true)}>
          <Typography>{FaContent.dashboard.deposit.add_card}</Typography>
        </Button>
      </CardsHeader>

      {[
        {
          id: 1,
          cardName: "بانک ملت",
          cardNumber: "1234 1234 1234 1234",
        },
      ].map((card) => (
        <CardItem key={card.id}>
          <AccountBalance
            sx={{ fontSize: 56, color: theme.palette.grey[400] }}
          />
          <CardTextContainer>
            <CardName>{card.cardName}</CardName>
            <CardNumber>{card.cardNumber}</CardNumber>
          </CardTextContainer>
        </CardItem>
      ))}
    </Box>
  );
};

export default MyCards;
