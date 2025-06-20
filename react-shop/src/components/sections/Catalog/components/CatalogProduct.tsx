import styles from "../Catalog.module.scss";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IProduct } from "@/types/apiTypes";
import { memo } from "react";

interface props {
  product: IProduct;
}
function CatalogProduct({ product }: props) {
  return (
    <div className={styles.catalog__product}>
      <div className={styles.catalog__product__pic}>
        {product.old_price && <div className={styles.catalog__product__tag}>-{Math.round((product.price / product.old_price) * 100)}%</div>}
        <Link to="/">
          <img className={styles.catalog__product__img} src={product.img} alt="sales-1" />
        </Link>
        <IconButton className={styles.catalog__product__likes}>
          <FavoriteBorderIcon className={styles.catalog__product__likes__btn} fontSize="medium" />
        </IconButton>
      </div>
      <div className={styles.catalog__product__info}>
        <Link to="/" className={styles.catalog__product__title}>
          {product.name}
        </Link>
        <div className={styles.catalog__product__prices}>
          <div className={styles.catalog__product__prices__new}>{product.price} руб.</div>
          {product.old_price && <div className={styles.catalog__product__prices__old}>{product.old_price} руб.</div>}
        </div>
      </div>
      <div className={styles.catalog__product__bottom}>
        <Button className={styles.catalog__product__btn} variant="contained" startIcon={<AddShoppingCartIcon />}>
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
}

export default memo(CatalogProduct);
