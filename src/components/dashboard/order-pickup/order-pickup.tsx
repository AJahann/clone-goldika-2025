"use client";
import { InfoAlert } from "@/components/ui/styled-alerts";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";

import OrderFilters from "./sidebar-filters";
import {
  GoldBalanceBadge,
  ProductActionButton,
  ProductCard,
  ProductImage,
} from "./styled";
import UserCard from "./user-card";

const productsData = [
  {
    id: 4,
    name: "سکه ۲ گرمی زردیس",
    imgSrc: "سکه%20۲%20گرمی%20زردیس",
    wages: 70000,
    weight: 2,
    brand: "پارسس",
    type: "سکه پارسیان",
  },
  {
    id: 3,
    name: "سکه ۲ گرمی زردیس",
    imgSrc: "سکه%20۲%20گرمی%20زردیس",
    wages: 70000,
    weight: 2,
    brand: "پارسس",
    type: "سکه پارسیان",
  },
  {
    id: 2,
    name: "سکه ۲ گرمی زردیس",
    imgSrc: "سکه%20۲%20گرمی%20زردیس",
    wages: 70000,
    weight: 2,
    brand: "پارسس",
    type: "سکه پارسیان",
  },
  {
    id: 1,
    name: "سکه ۲ گرمی زردیس",
    imgSrc: "سکه%20۲%20گرمی%20زردیس",
    wages: 70000,
    weight: 2,
    brand: "پارسس",
    type: "سکه پارسیان",
  },
];

const OrderHeader = ({
  setIsOpenFilters,
  setIsOpenCart,
}: {
  setIsOpenFilters: (value: boolean) => void;
  setIsOpenCart: (value: boolean) => void;
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
          دریافت طلا
        </Typography>
        <GoldBalanceBadge>
          موجودی طلا: {new Intl.NumberFormat("fa").format(0)} گرم
        </GoldBalanceBadge>
      </Stack>

      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => setIsOpenFilters(true)}>
          <Typography>فیلترها</Typography>
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
        تحویل طلا به صورت حضوری و در شعبه اداری گلدیکا صورت می‌گیرد. به علت
        محدودیت‌های ارسال پستی طلا و جواهر، امکان ارسال به صورت پستی یا پیک میسر
        نمی‌باشد.
      </Typography>
    </InfoAlert>
  </Box>
);

const ProductItem = ({ item }: { item: (typeof productsData)[0] }) => (
  <Grid>
    <ProductCard>
      <ProductImage
        height={260}
        width={260}
        alt={item.name}
        quality={100}
        src={`/images/panel/${item.imgSrc}.webp`}
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
        <ProductActionButton variant="outlined">
          <Typography sx={{ textWrap: "nowrap" }} fontSize={14}>
            افزودن به سبد
          </Typography>
        </ProductActionButton>
      </Stack>
    </ProductCard>
  </Grid>
);

const ProductsGrid = ({ products }: { products: typeof productsData }) => (
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
  const [products, setProducts] = useState(productsData);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <OrderHeader
        setIsOpenCart={setIsOpenCart}
        setIsOpenFilters={setIsOpenFilters}
      />

      <DeliveryInfoAlert />

      <ProductsGrid products={products} />

      <UserCard
        cart={[products[1]]}
        isOpen={isOpenCart}
        onClose={() => setIsOpenCart(false)}
      />
      <OrderFilters
        data={products}
        isOpen={isOpenFilters}
        setData={setProducts}
        onClose={() => setIsOpenFilters(false)}
      />
    </Container>
  );
};

export default OrderPickup;
