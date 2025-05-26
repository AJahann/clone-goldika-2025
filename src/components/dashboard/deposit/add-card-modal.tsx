"use client";
import { WarningAlert } from "@/components/ui/styled-alerts";
import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ModalWrapper = styled(Dialog)(({ theme }) => ({
  ".MuiDialog-container > .MuiPaper-root": {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2),
    },
  },
  "& .MuiDialogTitle-root": {
    padding: 0,
    color: theme.palette.text.primary,
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
}));

interface AddCardModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCardModal = ({ open, onClose }: AddCardModalProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [isLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalWrapper maxWidth="xs" onClose={handleClose} open={open}>
      <DialogTitle>{FaContent.dashboard.deposit.add_bank_card}</DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <Stack mt={1} spacing={2}>
          <WarningAlert>
            <Typography fontSize={14}>
              {FaContent.dashboard.deposit.add_card_alert}
            </Typography>
          </WarningAlert>

          <StyledTextField
            label={FaContent.dashboard.deposit.card_number}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            slotProps={{
              htmlInput: {
                maxLength: 16,
              },
            }}
          />

          <StyledTextField
            label={FaContent.dashboard.deposit.card_name}
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ padding: 0, mt: 2, flexDirection: "row-reverse" }}>
        <Button
          fullWidth
          disabled={isLoading}
          sx={{ ml: 1 }}
          variant="outlined"
          onClick={handleClose}
        >
          <Typography>{FaContent.dashboard.deposit.cancel}</Typography>
        </Button>
        <Button
          fullWidth
          disabled={!cardNumber || !cardName || isLoading}
          variant="contained"
        >
          <Typography>{FaContent.dashboard.deposit.add}</Typography>
        </Button>
      </DialogActions>
    </ModalWrapper>
  );
};

export default AddCardModal;
