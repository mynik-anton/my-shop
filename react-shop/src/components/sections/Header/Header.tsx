import { Link } from "react-router-dom";

// Material-UI components
import { Container } from "@mui/system";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";

// Store hooks
import { useFavorites } from "@/store/hooks/useFavorites";
import { useCart } from "@/store/hooks/useCart";

// Config
import { APP_ROUTES } from "@/config/routes";

// Assets
import logo from "@assets/images/Header/logo.svg";

// Styles
import styles from "./Header.module.scss";

export default function Header() {
  const { favoritesCount } = useFavorites();
  const { cartItemsQuantity } = useCart();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__wrap}>
          <div className={styles.header__left}>
            <IconButton className={styles.header__burger} aria-label="menu">
              <MenuIcon className={styles.header__burger__icon} />
            </IconButton>
            <Link to={APP_ROUTES.HOME} className={styles.header__logo}>
              <img className={styles.header__logo__img} src={logo} alt="Logo" />
            </Link>
          </div>
          <ul className={styles.header__menu}>
            <li className={styles.header__menu__item}>
              <Link to={APP_ROUTES.HOME} className={styles.header__menu__link}>
                Главная
              </Link>
            </li>
            <li className={styles.header__menu__item}>
              <Link to={APP_ROUTES.CATALOG} className={styles.header__menu__link}>
                Каталог
              </Link>
            </li>
            <li className={styles.header__menu__item}>
              <Link to={APP_ROUTES.CONTACTS} className={styles.header__menu__link}>
                Контакты
              </Link>
            </li>
          </ul>
          <div className={styles.header__right}>
            <div className={styles.header__buttons}>
              <Link to={APP_ROUTES.FAVORITES}>
                <IconButton className={styles.header__buttons__item} aria-label="favorite">
                  {favoritesCount > 0 && <span className={styles.header__buttons__badge}>{favoritesCount}</span>}
                  <FavoriteIcon className={styles.header__buttons__icon} />
                </IconButton>
              </Link>
              <Link to={APP_ROUTES.CART}>
                <IconButton className={styles.header__buttons__item} aria-label="cart">
                  {cartItemsQuantity > 0 && <span className={styles.header__buttons__badge}>{cartItemsQuantity}</span>}
                  <ShoppingCartIcon className={styles.header__buttons__icon} />
                </IconButton>
              </Link>
              <Link to={APP_ROUTES.HOME}>
                <IconButton className={styles.header__buttons__item} aria-label="account">
                  <AccountCircleIcon className={styles.header__buttons__icon} />
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
