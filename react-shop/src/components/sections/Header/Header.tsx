import logo from "@assets/images/Header/logo.svg";
import styles from "./Header.module.scss";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__wrap}>
          <div className={styles.header__left}>
            <IconButton className={styles.header__burger} aria-label="menu">
              <MenuIcon className={styles.header__burger__icon} />
            </IconButton>
            <Link to="/" className={styles.header__logo}>
              <img className={styles.header__logo__img} src={logo} alt="Logo" />
            </Link>
          </div>
          <ul className={styles.header__menu}>
            <li className={styles.header__menu__item}>
              <Link to="/" className={styles.header__menu__link}>
                Главная
              </Link>
            </li>
            <li className={styles.header__menu__item}>
              <Link to="/catalog" className={styles.header__menu__link}>
                Каталог
              </Link>
            </li>
            <li className={styles.header__menu__item}>
              <Link to="/catalog/sales" className={styles.header__menu__link}>
                Распродажа
              </Link>
            </li>
            <li className={styles.header__menu__item}>
              <Link to="/contacts" className={styles.header__menu__link}>
                Контакты
              </Link>
            </li>
          </ul>
          <div className={styles.header__right}>
            <form className={styles.header__search}>
              <InputBase className={styles.header__search__input} placeholder="Search products" inputProps={{ "aria-label": "Search products" }} />
              <IconButton className={styles.header__search__button} type="button" aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
            <div className={styles.header__buttons}>
              <IconButton className={styles.header__buttons__item} aria-label="favorite">
                <span className={styles.header__buttons__badge}>2</span>
                <FavoriteIcon className={styles.header__buttons__icon} />
              </IconButton>
              <IconButton className={styles.header__buttons__item} aria-label="cart">
                <span className={styles.header__buttons__badge}>12</span>
                <ShoppingCartIcon className={styles.header__buttons__icon} />
              </IconButton>
              <IconButton className={styles.header__buttons__item} aria-label="account">
                <AccountCircleIcon className={styles.header__buttons__icon} />
              </IconButton>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
