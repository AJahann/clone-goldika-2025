import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import { Typography } from "@mui/material";

interface Props {
  formik: any;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const AmountInput = ({ formik, handleAmountChange, label }: Props) => (
  <StyledTextField
    helperText={formik.touched.amount && formik.errors.amount}
    label={label}
    name="amount"
    error={formik.touched.amount && Boolean(formik.errors.amount)}
    onChange={handleAmountChange}
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
    value={
      formik.values.amount
        ? Intl.NumberFormat("fa").format(+formik.values.amount)
        : ""
    }
  />
);

export default AmountInput;
