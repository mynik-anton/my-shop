import { IGender } from "@/types/apiTypes";
import { Link } from "react-router-dom";
import styles from "../BannerCategories.module.scss";
import { getStrapiMedia } from "@/utils/strapi/strapi";
import { APP_ROUTES } from "@/config/routes";

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
