import styles from "./CatalogFavoritesProduct.module.scss";
import { Link } from "react-router-dom";
import { Button, CircularProgress, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { IProduct } from "@/types/apiTypes";
import { memo, useContext, useState } from "react";
import { getStrapiMedia } from "@/utils/strapi/strapi";
import { useFavorites } from "@/store/hooks/useFavorites";
import { APP_ROUTES } from "@/config/routes";
import { useCart } from "@/store/hooks/useCart";
import { SnackbarContext } from "@/contexts/SnackbarContext";

interface props {
  product: IProduct;
}
function CatalogFavoritesProduct({ product }: props) {
  const { isInFavorites, toggleFavorite } = useFavorites();
  const { addItemToCart, isInCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);

  const handleAddToCart = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    showSnackbar(`Товар "${product.title}" добавлен в корзину!`, "success");
    addItemToCart(product.id);
    setIsLoading(false);
  };

  return (
    <div className={styles.product}>
      <div className={styles.product__pic}>
        {product.oldPrice && <div className={styles.product__tag}>-{Math.round((1 - product.price / product.oldPrice) * 100)}%</div>}
        {product.inStock > 0 ? <div className={styles.product__stock}>В наличии</div> : <div className={styles.product__stock__out}>Нет в наличии</div>}
        <img className={styles.product__img} src={getStrapiMedia(product.images[0].url)} alt="sales-1" />
        <IconButton className={(isInFavorites(product.id) && styles.product__likes__active) + " " + styles.product__likes} onClick={() => toggleFavorite(product.id)}>
          <FavoriteIcon className={styles.product__likes__btn} fontSize="medium" />
        </IconButton>
      </div>
      <div className={styles.product__info}>
        <Link to="/" className={styles.product__title}>
          {product.title}
        </Link>
        <div className={styles.product__prices}>
          <div className={styles.product__prices__new}>{product.price} руб.</div>
          {product.oldPrice && <div className={styles.product__prices__old}>{product.oldPrice} руб.</div>}
        </div>
      </div>
      <div className={styles.product__bottom}>
        {isInCart(product.id) ? (
          <Link to={APP_ROUTES.CART}>
            <Button className={styles.product__btn} variant="contained" startIcon={<ShoppingCartCheckoutIcon />} color="success">
              Перейти в корзину
            </Button>
          </Link>
        ) : (
          <Button
            disabled={product.inStock === 0 || isLoading}
            className={`${styles.product__btn}`}
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AddShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            {isLoading ? "Добавляем..." : "Добавить в корзину"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default memo(CatalogFavoritesProduct);
