"use client";
import { ErrorAlert } from "@/components/ui/styled-alerts";
import FaContent from "@/content/fa.json";
import { CreditCardOutlined } from "@mui/icons-material";
import { Box, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";

import StyledTextField from "../../ui/styled-text-field";
import NoCard from "./no-card";
import {
  DepositContainer,
  DepositContent,
  DepositTitle,
  SubmitButton,
} from "./styled";

const Withdraw = () => {
  const [amount, setAmount] = useState("");

  return (
    <DepositContainer>
      <DepositTitle>{FaContent.dashboard.transaction.withdraw}</DepositTitle>

      <DepositContent>
        <Stack
          alignItems="center"
          flexDirection="row"
          sx={{
            color: "#9fa0a8",
            mb: 2,
          }}
        >
          <CreditCardOutlined sx={{ fontSize: 24, ml: 1 }} />
          <Typography sx={{ mx: 0.5 }} component="span">
            {FaContent.dashboard.transaction.balance}:
          </Typography>
          <Typography sx={{ fontWeight: "bold", mx: 0.5 }} component="span">
            {0}
          </Typography>
          <Typography sx={{ mx: 0.5 }} component="span">
            {FaContent.dashboard.transaction.toman}
          </Typography>
        </Stack>

        <StyledTextField
          label={FaContent.dashboard.transaction.withdraw_amount}
          name={FaContent.dashboard.transaction.toman}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <Typography>{FaContent.dashboard.transaction.toman}</Typography>
              ),
            },
          }}
          sx={{
            background: (theme) => theme.palette.background.default,
          }}
        />

        <Box mt={4} px={2}>
          <Slider marks max={10} min={0} step={1} value={2} />
        </Box>

        <Box mt={3}>
          <ErrorAlert sx={{ mb: 1 }}>
            <Typography fontSize={14}>
              {FaContent.dashboard.transaction.withdraw_alert}
            </Typography>
          </ErrorAlert>
          <NoCard />
        </Box>
      </DepositContent>

      <Stack alignItems="center" mt={3}>
        <SubmitButton variant="contained">
          <Typography>{FaContent.dashboard.transaction.withdraw}</Typography>
        </SubmitButton>
      </Stack>
    </DepositContainer>
  );
};

export default Withdraw;
