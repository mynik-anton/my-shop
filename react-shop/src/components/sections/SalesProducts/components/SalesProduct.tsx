import { useContext, useState } from "react";
import { Link } from "react-router-dom";

// MUI components
import { Button, CircularProgress, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

// Contexts
import { SnackbarContext } from "@/contexts/SnackbarContext";

// Store hooks
import { useFavorites } from "@/store/hooks/useFavorites";
import { useCart } from "@/store/hooks/useCart";

// Utils and config
import { getStrapiMedia } from "@/utils/strapi/strapi";
import { APP_ROUTES } from "@/config/routes";

// Interfaces and Types
import { IProduct } from "@/types/apiTypes";

// Styles
import styles from "../SalesProducts.module.scss";

interface props {
  product: IProduct;
}

export default function SalesProduct({ product }: props) {
  const { isInFavorites, toggleFavorite } = useFavorites();
  const { addItemToCart, isInCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);

  const handleAddToCart = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    addItemToCart(product.id);
    showSnackbar(`Товар "${product.title}" добавлен в корзину!`, "success");
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.sales__slide__pic}>
        {product.oldPrice && <div className={styles.sales__slide__tag}>-{Math.round((1 - product.price / product.oldPrice) * 100)}%</div>}
        {product.inStock > 0 ? <div className={styles.sales__slide__stock}>В наличии</div> : <div className={styles.sales__slide__stock__out}>Нет в наличии</div>}
        <img className={styles.sales__slide__img} src={getStrapiMedia(product.images[0].url)} alt="sales-1" />
        <IconButton className={(isInFavorites(product.id) && styles.sales__slide__likes__active) + " " + styles.sales__slide__likes} onClick={() => toggleFavorite(product.id)}>
          <FavoriteIcon className={styles.sales__slide__likes__btn} fontSize="medium" />
        </IconButton>
      </div>
      <div className={styles.sales__slide__main}>
        <Link to="/" className={styles.sales__slide__title}>
          {product.title}
        </Link>
        <div className={styles.sales__slide__prices}>
          <div className={styles.sales__slide__prices__new}>{product.price} руб.</div>
          {product.oldPrice && <div className={styles.sales__slide__prices__old}>{product.oldPrice} руб.</div>}
        </div>
        {isInCart(product.id) ? (
          <Link to={APP_ROUTES.CART}>
            <Button className={styles.sales__slide__btn} variant="contained" startIcon={<ShoppingCartCheckoutIcon />} color="success">
              Перейти в корзину
            </Button>
          </Link>
        ) : (
          <Button
            disabled={product.inStock === 0 || isLoading}
            className={`${styles.sales__slide__btn}`}
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AddShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            {isLoading ? "Добавляем..." : "Добавить в корзину"}
          </Button>
        )}
      </div>
    </>
  );
}
