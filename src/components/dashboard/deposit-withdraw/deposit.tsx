"use client";
import FaContent from "@/content/fa.json";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import { Add } from "@mui/icons-material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";

import StyledTextField from "../../ui/styled-text-field";
import { PanelTitle } from "../styled";
import MyCards from "./my-cards";
import NoCard from "./no-card";
import {
  DepositContainer,
  DepositContent,
  PresetAmountButton,
  PresetAmountRow,
  PresetAmountsContainer,
  SubmitButton,
} from "./styled";

const Deposit = () => {
  const { user, isLoading, isError, error } = useUserProfile();
  const [amount, setAmount] = useState("");

  return (
    <DepositContainer>
      <PanelTitle>{FaContent.dashboard.transaction.deposit}</PanelTitle>

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
          {isLoading ? (
            <Stack alignItems="center">
              <CircularProgress size={36} />
            </Stack>
          ) : user?.cards.length ? (
            <MyCards />
          ) : (
            <NoCard />
          )}
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
