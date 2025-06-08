"use client";
import type { UserProfile } from "@/libs/data-layer/user-profile/use-user-profile";

import FaContent from "@/content/fa.json";
import { useBasket } from "@/libs/data-layer/basket/use-basket";
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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: UserProfile["basket"];
}

const CartDialogHeader = () => (
  <DialogTitle
    sx={{ display: "flex", alignItems: "center", gap: 1, m: 0, p: 0 }}
  >
    <LocalGroceryStoreOutlinedIcon sx={{ ml: 1 }} />
    {FaContent.dashboard.order.cart.title}
  </DialogTitle>
);

const successNotif = () => toast.success("محصول با موفقیت از سبد خرید حذف شد.");
const errorNotif = (err: string) => toast.error(err);

const CartTableRow = ({ row }: { row: UserProfile["basket"][number] }) => {
  const { removeItem, removeItemError, isRemoveItemSuccess, isRemovingItem } =
    useBasket(); //here

  const handleRemoveItem = () => {
    if (!isRemovingItem) {
      removeItem(row.id);
    }

    console.log(row);
  };

  useEffect(() => {
    if (removeItemError) {
      errorNotif(removeItemError.message);
    }
    if (isRemoveItemSuccess) {
      successNotif();
    }
  }, [removeItemError, isRemoveItemSuccess]);

  return (
    <TableRow key={row.id}>
      <StyledTableCell sx={{ fontSize: "0.75rem" }}>{row.name}</StyledTableCell>
      <StyledTableCell align="center">
        {Intl.NumberFormat("fa").format(row.gram)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {Intl.NumberFormat("fa").format(+row.wages)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {"count" in row ? Intl.NumberFormat("fa").format(row.count) : "۱"}
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{
          pr: 1,
        }}
      >
        <IconButton onClick={handleRemoveItem}>
          {isRemovingItem ? (
            <CircularProgress size={19} />
          ) : (
            <RemoveShoppingCartOutlinedIcon fontSize="small" />
          )}
        </IconButton>
      </StyledTableCell>
    </TableRow>
  );
};

const CartTable = ({ cart }: { cart: UserProfile["basket"] }) => (
  <Table>
    <TableHead>
      <TableRow>
        <StyledTableCell>
          {FaContent.dashboard.order.cart.product}
        </StyledTableCell>
        <StyledTableCell align="right">
          {FaContent.dashboard.order.cart.weight}
        </StyledTableCell>
        <StyledTableCell align="right">
          {FaContent.dashboard.order.cart.wages}
        </StyledTableCell>
        <StyledTableCell align="right">
          {FaContent.dashboard.order.cart.quantity}
        </StyledTableCell>
        <StyledTableCell align="right">
          {FaContent.dashboard.order.cart.remove}
        </StyledTableCell>
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
    <Button onClick={onClose}>{FaContent.dashboard.order.cart.cancel}</Button>
    <Button variant="contained">
      {isLoading ? (
        <CircularProgress size={24} />
      ) : (
        FaContent.dashboard.order.cart.submit
      )}
    </Button>
  </DialogActions>
);

const EmptyCart = () => (
  <EmptyCartMessage>
    {FaContent.dashboard.order.cart.emptyMessage}
  </EmptyCartMessage>
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
