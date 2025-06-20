import { IGender } from "@/types/apiTypes";
import { Link } from "react-router-dom";
import styles from "../BannerCategories.module.scss";

interface props {
  gender: IGender;
}

export default function BannerItem({ gender }: props) {
  return (
    <Link to={"/catalog/" + gender.slug} className={styles.categories__item}>
      <div className={styles.categories__item__pic}>
        <img className={styles.categories__item__img} src={gender.img} alt="cat-1" />
      </div>
      <div className={styles.categories__item__name}>{gender.name}</div>
    </Link>
  );
}
