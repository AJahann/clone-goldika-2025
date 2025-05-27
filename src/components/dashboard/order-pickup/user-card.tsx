"use client";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "24px",
    padding: "24px",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  borderColor: theme.palette.divider,
}));

const EmptyCartMessage = styled(Typography)(({ theme }) => ({
  lineHeight: "normal",
  fontSize: "1.5rem",
  color: theme.palette.primary.main,
  padding: theme.spacing(4, 6),
}));

interface Card {
  id: number;
  name: string;
  weight: number;
  wages: number;
  count?: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: Card[];
}

const CartDialogHeader = () => (
  <DialogTitle
    sx={{ display: "flex", alignItems: "center", gap: 1, m: 0, p: 0 }}
  >
    <LocalGroceryStoreOutlinedIcon sx={{ ml: 1 }} />
    ثبت تحویل
  </DialogTitle>
);
const CartTableRow = ({ row }: { row: Card }) => (
  <TableRow key={row.id}>
    <StyledTableCell sx={{ fontSize: "0.75rem" }}>{row.name}</StyledTableCell>
    <StyledTableCell align="right">
      {Intl.NumberFormat("fa").format(row.weight)}
    </StyledTableCell>
    <StyledTableCell align="right">
      {Intl.NumberFormat("fa").format(row.wages)}
    </StyledTableCell>
    <StyledTableCell align="right">
      {"count" in row ? Intl.NumberFormat("fa").format(row.count ?? 1) : "۱"}
    </StyledTableCell>
    <StyledTableCell align="right">
      <IconButton>
        <RemoveShoppingCartOutlinedIcon fontSize="small" />
      </IconButton>
    </StyledTableCell>
  </TableRow>
);

const CartTable = ({ cart }: { cart: Card[] }) => (
  <Table>
    <TableHead>
      <TableRow>
        <StyledTableCell>محصول</StyledTableCell>
        <StyledTableCell align="right">وزن (گرم)</StyledTableCell>
        <StyledTableCell align="right">اجرت</StyledTableCell>
        <StyledTableCell align="right">تعداد</StyledTableCell>
        <StyledTableCell align="right">حذف</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {cart.map((row) => (
        <CartTableRow key={row.id} row={row} />
      ))}
    </TableBody>
  </Table>
);

const CartDialogActions = ({
  onClose,
  isLoading,
}: {
  onClose: () => void;
  isLoading: boolean;
}) => (
  <DialogActions>
    <Button onClick={onClose}>لغو</Button>
    <Button variant="contained">
      {isLoading ? <CircularProgress size={24} /> : "نهایی کردن"}
    </Button>
  </DialogActions>
);

const EmptyCart = () => (
  <EmptyCartMessage>سبد تحویل شما خالی است!</EmptyCartMessage>
);

const UserCard: React.FC<Props> = ({ isOpen, onClose, cart }) => {
  const [isLoading] = useState(false);

  return (
    <StyledDialog
      onClose={onClose}
      open={isOpen}
      slotProps={{ paper: { elevation: 1 } }}
    >
      <CartDialogHeader />

      {cart.length > 0 ? (
        <>
          <DialogContent sx={{ px: 1, m: 0, mt: 2, textWrap: "nowrap" }}>
            <CartTable cart={cart} />
          </DialogContent>
          <CartDialogActions isLoading={isLoading} onClose={onClose} />
        </>
      ) : (
        <EmptyCart />
      )}
    </StyledDialog>
  );
};

export default UserCard;
