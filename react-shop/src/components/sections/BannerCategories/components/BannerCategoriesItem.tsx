import { Link } from "react-router-dom";

// Utils
import { getStrapiMedia } from "@/utils/strapi/strapi";

//Interfaces and Types
import { IGender } from "@/types/apiTypes";

// Config
import { APP_ROUTES } from "@/config/routes";

// Styles
import styles from "../BannerCategories.module.scss";

interface props {
  gender: IGender;
}

export default function BannerCategoriesItem({ gender }: props) {
  return (
    <Link to={APP_ROUTES.CATALOG + "?gender=" + gender.slug} className={styles.categories__item}>
      <div className={styles.categories__item__pic}>
        <img className={styles.categories__item__img} src={getStrapiMedia(gender.image.url)} alt={gender.name} />
      </div>
      <div className={styles.categories__item__name}>{gender.name}</div>
    </Link>
  );
}
