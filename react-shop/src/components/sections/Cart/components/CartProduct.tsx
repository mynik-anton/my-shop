import { Box, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { IProduct } from "@/types/apiTypes";
import styles from "./CartProduct.module.scss";
import { getStrapiMedia } from "@/utils/strapi/strapi";
import { memo } from "react";

interface CartProductProps {
  product: IProduct;
  quantity: number;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
}

function CartProduct({ product, quantity, onIncrement, onDecrement, onRemove }: CartProductProps) {
  console.log(product.title);
  return (
    <Box className={styles.product}>
      <Box className={styles.product__pic}>
        <img className={styles.product__pic__img} src={getStrapiMedia(product.images[0].url)} alt="sales-1" />
      </Box>
      <Box className={styles.product__info}>
        <Box className={styles.product__info__left}>
          <Box className={styles.product__info__title}>{product.title}</Box>
          <Box className={styles.product__info__price}>{product.price} ₽</Box>
        </Box>
        <Box className={styles.product__info__actions}>
          <IconButton onClick={() => onDecrement(product.id)} disabled={quantity <= 1}>
            <Remove />
          </IconButton>
          <Box>{quantity}</Box>
          <IconButton onClick={() => onIncrement(product.id)} disabled={product.inStock <= quantity}>
            <Add />
          </IconButton>
          <IconButton onClick={() => onRemove(product.id)} color="error">
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(CartProduct);
