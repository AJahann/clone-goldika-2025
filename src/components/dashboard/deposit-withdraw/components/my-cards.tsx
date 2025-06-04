"use client";
import FaContent from "@/content/fa.json";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import { toPersianDigits } from "@/utils/to-persian-digits";
import { AccountBalance } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
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
  "width": "100%",
  "display": "flex",
  "padding": theme.spacing(1.5),
  "marginTop": theme.spacing(2),
  "borderRadius": 16,
  "transition": "background-color 0.2s ease-in-out",
  ":hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
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

interface Props {
  selectedCard: string | null;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: any;
}

const MyCards = ({ onChange, selectedCard, error, helperText }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { user, isLoading, isError, error: profileError } = useUserProfile();

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <CircularProgress size={38} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ width: "100%" }}>
        <Typography textAlign="center" color="error">
          {profileError?.message}
        </Typography>
      </Box>
    );
  }

  const handleCardChange = (cardId: string) => {
    onChange(cardId);
  };

  return (
    <Box>
      <AddCardModal onClose={() => setOpen(false)} open={open} />

      <CardsHeader>
        <Typography>{FaContent.dashboard.transaction.my_cards}</Typography>
        <Button variant="text" onClick={() => setOpen(true)}>
          <Typography>{FaContent.dashboard.transaction.add_card}</Typography>
        </Button>
      </CardsHeader>

      {user?.cards.map((card) => (
        <CardItem
          key={card.id}
          onClick={() => handleCardChange(card.id)}
          sx={{
            border:
              selectedCard === card.id
                ? `2px solid ${theme.palette.primary.main}`
                : error
                  ? `2px solid ${theme.palette.error.main}`
                  : `2px solid ${theme.palette.border.primary}`,
            backgroundColor:
              selectedCard === card.id
                ? alpha(theme.palette.primary.main, 0.1)
                : undefined,
          }}
        >
          <AccountBalance
            sx={{ fontSize: 56, color: theme.palette.grey[400] }}
          />
          <CardTextContainer>
            <CardName>{toPersianDigits(card.cardName)}</CardName>
            <CardNumber dir="ltr">{`****-****-****-${toPersianDigits(card.last4)}`}</CardNumber>
          </CardTextContainer>
        </CardItem>
      ))}

      {error && helperText && (
        <FormHelperText sx={{ mt: 1 }} error>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default MyCards;
