"use client";
import type { Product } from "@/libs/data-layer/products/useProducts";

import { InfoAlert } from "@/components/ui/styled-alerts";
import FaContent from "@/content/fa.json";
import { useBasket } from "@/libs/data-layer/basket/use-basket";
import { useProducts } from "@/libs/data-layer/products/useProducts";
import { useProductForm } from "@/libs/data-layer/products/useProductsForm";
import { useUserProfile } from "@/libs/data-layer/user-profile/use-user-profile";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import OrderFilters from "./sidebar-filters";
import {
  GoldBalanceBadge,
  ProductActionButton,
  ProductCard,
  ProductImage,
} from "./styled";
import UserCard from "./user-card";

const OrderHeader = ({
  setIsOpenFilters,
  setIsOpenCart,
  goldBalance,
}: {
  setIsOpenFilters: (value: boolean) => void;
  setIsOpenCart: (value: boolean) => void;
  goldBalance: number;
}) => {
  return (
    <Stack
      alignItems="center"
      spacing={1}
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Stack
        alignItems="center"
        spacing={2}
        direction="row"
        sx={{
          width: { xs: "100%", sm: "auto" },
          justifyContent: { xs: "space-between", sm: "flex-start" },
        }}
      >
        <Typography sx={{ fontSize: "2.5rem", lineHeight: "normal" }}>
          {FaContent.dashboard.order.title}
        </Typography>
        <GoldBalanceBadge>
          {FaContent.dashboard.order.goldBalance.replace(
            "{{amount}}",
            new Intl.NumberFormat("fa").format(goldBalance),
          )}
        </GoldBalanceBadge>
      </Stack>

      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => setIsOpenFilters(true)}>
          <Typography>{FaContent.dashboard.order.filtersButton}</Typography>
        </Button>
        <Button
          sx={{ maxWidth: 48, minWidth: 48 }}
          variant="contained"
          onClick={() => setIsOpenCart(true)}
        >
          <LocalGroceryStoreOutlinedIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

const DeliveryInfoAlert = () => (
  <Box my={3}>
    <InfoAlert>
      <Typography fontSize={14}>
        {FaContent.dashboard.order.deliveryAlert}
      </Typography>
    </InfoAlert>
  </Box>
);

const successNotif = () =>
  toast.success("محصول با موفقیت به سبد خرید اضافه شد.");
const errorNotif = (err: string) => toast.error(err);

const ProductItem = ({ item }: { item: Product }) => {
  const { addItem, isAddingItem, addItemError, isAddItemSuccess } = useBasket();

  const handleAddItem = (productId: string) => {
    if (!isAddingItem) {
      addItem(productId);
    }
  };

  useEffect(() => {
    if (addItemError) {
      errorNotif(addItemError.message);
    }
    if (isAddItemSuccess) {
      successNotif();
    }
  }, [addItemError, isAddItemSuccess]);

  return (
    <Grid>
      <ProductCard>
        <ProductImage
          height={260}
          width={260}
          alt={item.name}
          quality={100}
          src={item.imgData}
        />
        <Stack
          width="100%"
          alignItems="center"
          gap={1}
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            color="textPrimary"
            fontSize={18}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {item.name}
          </Typography>
          <ProductActionButton
            disabled={isAddingItem}
            variant="outlined"
            onClick={() => handleAddItem(item.id)}
          >
            {isAddingItem ? (
              <CircularProgress size={18} />
            ) : (
              <Typography sx={{ textWrap: "nowrap" }} fontSize={14}>
                {FaContent.dashboard.order.addToCart}
              </Typography>
            )}
          </ProductActionButton>
        </Stack>
      </ProductCard>
    </Grid>
  );
};

const ProductsGrid = ({ products }: { products: Product[] }) => (
  <Grid
    spacing={2}
    container
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      },
    }}
  >
    {products.map((item) => (
      <ProductItem item={item} key={item.id} />
    ))}
  </Grid>
);

const OrderPickup = () => {
  const { user } = useUserProfile();
  const { data: products, isLoading, isError, error } = useProducts();
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <OrderHeader
        setIsOpenCart={setIsOpenCart}
        setIsOpenFilters={setIsOpenFilters}
        goldBalance={user?.wallet.goldAmount ?? 0}
      />

      <DeliveryInfoAlert />

      {isLoading ? (
        <Stack alignItems="center">
          <CircularProgress size={32} />
        </Stack>
      ) : !products || products.length === 0 ? (
        <Typography mt={8} textAlign="center" variant="h1" color="primary">
          محصولی یافت نشد
        </Typography>
      ) : isError ? (
        <Typography mt={8} textAlign="center" variant="h3" color="error">
          {error.message}
        </Typography>
      ) : (
        <ProductsGrid products={products} />
      )}

      <UserCard
        cart={user?.basket ?? []}
        isOpen={isOpenCart}
        onClose={() => setIsOpenCart(false)}
      />
      {/* <OrderFilters
        data={products}
        isOpen={isOpenFilters}
        // setData={setProducts}
        onClose={() => setIsOpenFilters(false)}
      /> */}
    </Container>
  );
};

export default OrderPickup;
