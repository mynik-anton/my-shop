import styles from "./CatalogProduct.module.scss";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IProduct } from "@/types/apiTypes";
import { memo } from "react";
import { getStrapiMedia } from "@/utils/strapi/strapi";
import { useFavorites } from "@/store/hooks/useFavorites";

interface props {
  product: IProduct;
}
function CatalogProduct({ product }: props) {
  const { isInFavorites, toggleFavorite } = useFavorites();

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
        <Button disabled={product.inStock === 0} className={styles.product__btn} variant="contained" startIcon={<AddShoppingCartIcon />}>
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
}

export default memo(CatalogProduct);
