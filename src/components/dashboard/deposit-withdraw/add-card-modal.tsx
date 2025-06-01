"use client";
import { WarningAlert } from "@/components/ui/styled-alerts";
import StyledTextField from "@/components/ui/styled-text-field";
import FaContent from "@/content/fa.json";
import { useBankCards } from "@/libs/data-layer/bank-card/use-bank-cards";
import { toEnglishDigits } from "@/utils/to-english-digits";
import { toPersianDigits } from "@/utils/to-persian-digits";
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
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

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

const successNotify = () => toast.success("کارت بانکی با موفقیت اضافه شد.");
const faildNotify = (ms: string) => toast.error(ms);

const cardFormater = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits
    .replace(/(\d{4})/g, "$1-")
    .slice(0, 19)
    .replace(/-$/, "");
};

const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .required("شماره کارت نمی‌تواند خالی باشد")
    .length(16, "شماره کارت باید 16 رقمی باشد")
    .matches(/^\d+$/, "شماره کارت باید فقط شامل اعداد باشد"),
  cardName: Yup.string()
    .required("نام کارت نمی‌تواند خالی باشد")
    .min(2, "نام کارت باید حداقل 2 کاراکتر باشد")
    .max(50, "نام کارت نمی‌تواند بیش از 50 کاراکتر باشد"),
});

const AddCardModal = ({ open, onClose }: AddCardModalProps) => {
  const { addCard, addCardError, isAddCardSuccess, isAddingCard } =
    useBankCards();

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      addCard({
        cardNumber: values.cardNumber,
        cardName: values.cardName,
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const englishValue = toEnglishDigits(e.target.value);
    const rawValue = englishValue.replace(/\D/g, "").slice(0, 16);
    void formik.setFieldValue("cardNumber", rawValue);
  };

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const englishValue = toEnglishDigits(e.target.value);
    void formik.setFieldValue("cardName", englishValue);
  };

  useEffect(() => {
    if (isAddCardSuccess) {
      successNotify();
      handleClose();
    }
    if (addCardError) faildNotify(addCardError.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCardError, isAddCardSuccess]);

  return (
    <ModalWrapper maxWidth="xs" onClose={handleClose} open={open}>
      <DialogTitle>{FaContent.dashboard.transaction.add_bank_card}</DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack mt={1} spacing={2}>
            <WarningAlert>
              <Typography fontSize={14}>
                {FaContent.dashboard.transaction.add_card_alert}
              </Typography>
            </WarningAlert>

            <StyledTextField
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              label={FaContent.dashboard.transaction.card_number}
              name="cardNumber"
              value={toPersianDigits(cardFormater(formik.values.cardNumber))}
              error={
                formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
              }
              onBlur={formik.handleBlur}
              onChange={handleCardNumberChange}
              slotProps={{
                htmlInput: {
                  maxLength: 19,
                },
              }}
            />

            <StyledTextField
              helperText={formik.touched.cardName && formik.errors.cardName}
              label={FaContent.dashboard.transaction.card_name}
              name="cardName"
              value={toPersianDigits(formik.values.cardName)}
              error={formik.touched.cardName && Boolean(formik.errors.cardName)}
              onBlur={formik.handleBlur}
              onChange={handleCardNameChange}
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                },
              }}
            />
          </Stack>
        </form>
      </DialogContent>

      <DialogActions sx={{ padding: 0, mt: 2, flexDirection: "row-reverse" }}>
        <Button
          fullWidth
          disabled={isAddingCard}
          sx={{ ml: 1 }}
          variant="outlined"
          onClick={handleClose}
        >
          <Typography>{FaContent.dashboard.transaction.cancel}</Typography>
        </Button>
        <Button
          fullWidth
          disabled={isAddingCard || !formik.isValid}
          variant="contained"
          onClick={() => formik.handleSubmit()}
        >
          <Typography>{FaContent.dashboard.transaction.add}</Typography>
        </Button>
      </DialogActions>
    </ModalWrapper>
  );
};

export default AddCardModal;
