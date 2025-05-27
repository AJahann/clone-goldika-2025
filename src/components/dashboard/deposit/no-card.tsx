"use client";
import { WarningAlert } from "@/components/ui/styled-alerts";
import FaContent from "@/content/fa.json";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

import AddCardModal from "./add-card-modal";

const NoCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <Stack alignItems="center">
      <AddCardModal onClose={() => setOpen(false)} open={open} />

      <WarningAlert>
        <Typography fontSize={14}>
          {FaContent.dashboard.transaction.no_card_alert}
        </Typography>
      </WarningAlert>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        <Typography fontSize={14} fontWeight={500}>
          {FaContent.dashboard.transaction.add_card}
        </Typography>
      </Button>
    </Stack>
  );
};

export default NoCard;
