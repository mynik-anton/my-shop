import styles from "../SalesProducts.module.scss";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IProduct } from "@/types/apiTypes";

interface props {
  product: IProduct;
}

export default function SalesProduct({ product }: props) {
  return (
    <>
      <div className={styles.sales__slide__pic}>
        {product.old_price && <div className={styles.sales__slide__tag}>-{Math.round((product.price / product.old_price) * 100)}%</div>}
        <Link to="/">
          <img className={styles.sales__slide__img} src={product.img} alt="sales-1" />
        </Link>
        <IconButton className={styles.sales__slide__likes}>
          <FavoriteBorderIcon className={styles.sales__slide__likes__btn} fontSize="medium" />
        </IconButton>
      </div>
      <div className={styles.sales__slide__main}>
        <Link to="/" className={styles.sales__slide__title}>
          {product.name}
        </Link>
        <div className={styles.sales__slide__prices}>
          <div className={styles.sales__slide__prices__new}>{product.price} руб.</div>
          {product.old_price && <div className={styles.sales__slide__prices__old}>{product.old_price} руб.</div>}
        </div>
        <Button className={styles.sales__slide__btn} variant="contained" startIcon={<AddShoppingCartIcon />}>
          Добавить в корзину
        </Button>
      </div>
    </>
  );
}
