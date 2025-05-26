"use client";
import FaContent from "@/content/fa.json";
import { Add } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

import StyledTextField from "../../ui/styled-text-field";
import MyCards from "./my-cards";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NoCard from "./no-card";
import {
  DepositContainer,
  DepositContent,
  DepositTitle,
  PresetAmountButton,
  PresetAmountRow,
  PresetAmountsContainer,
  SubmitButton,
} from "./styled";

const Deposit = () => {
  const [amount, setAmount] = useState("");

  return (
    <DepositContainer>
      <DepositTitle>{FaContent.dashboard.transaction.deposit}</DepositTitle>

      <DepositContent>
        <StyledTextField
          label={FaContent.dashboard.transaction.amount}
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

        <PresetAmountsContainer>
          <PresetAmountRow>
            {["500000", "1000000"].map((presetAmount) => (
              <PresetAmountButton
                key={presetAmount}
                variant="outlined"
                color="primary"
                onClick={() => setAmount(presetAmount)}
                startIcon={<Add sx={{ fontSize: 20 }} />}
              >
                {new Intl.NumberFormat("fa").format(+presetAmount)}{" "}
                {FaContent.dashboard.transaction.toman}
              </PresetAmountButton>
            ))}
          </PresetAmountRow>
          <PresetAmountRow>
            {["5000000", "10000000"].map((presetAmount) => (
              <PresetAmountButton
                key={presetAmount}
                variant="outlined"
                color="primary"
                onClick={() => setAmount(presetAmount)}
                startIcon={<Add sx={{ fontSize: 20 }} />}
              >
                {new Intl.NumberFormat("fa").format(+presetAmount)}{" "}
                {FaContent.dashboard.transaction.toman}
              </PresetAmountButton>
            ))}
          </PresetAmountRow>
        </PresetAmountsContainer>

        <Box mt={3}>
          {/* <NoCard /> */}
          <MyCards />
        </Box>
      </DepositContent>

      <Stack alignItems="center" mt={3}>
        <SubmitButton variant="contained">
          <Typography>{FaContent.dashboard.transaction.pay}</Typography>
        </SubmitButton>
      </Stack>
    </DepositContainer>
  );
};

export default Deposit;
