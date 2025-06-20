import { Container } from "@mui/material";
import styles from "../Banner.module.scss";
import { Link } from "react-router-dom";
import { IBanner } from "@/types/apiTypes";

interface props {
  banner: IBanner;
}

export default function BannerItem({ banner }: props) {
  return (
    <>
      <img className={styles.banner__slide__img} src={banner.img} alt="banner-1" />
      <Container>
        <div className={styles.banner__slide__content}>
          <div className={styles.banner__slide__subtitle}>{banner.desc}</div>
          <div className={styles.banner__slide__title}>{banner.title}</div>
          <Link to={banner.link} className={styles.banner__slide__button}>
            Перейти в каталог
          </Link>
        </div>
      </Container>
    </>
  );
}
