import { CircularProgress, Stack, Typography } from "@mui/material";

import MyCards from "./my-cards";
import NoCard from "./no-card";

interface Props {
  isError: boolean;
  error: string;
  isLoading: boolean;
  user: any;
  formik: any;
}

const CardSelection = ({ isError, isLoading, user, formik, error }: Props) => {
  if (isError) {
    return (
      <Typography textAlign="center" color="error">
        {error}
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Stack alignItems="center">
        <CircularProgress size={36} />
      </Stack>
    );
  }

  return user?.cards.length ? (
    <MyCards
      helperText={formik.touched.cardId && formik.errors.cardId}
      selectedCard={formik.values.cardId}
      error={formik.touched.cardId && Boolean(formik.errors.cardId)}
      onChange={(cardId) => formik.setFieldValue("cardId", cardId)}
    />
  ) : (
    <NoCard />
  );
};

export default CardSelection;
