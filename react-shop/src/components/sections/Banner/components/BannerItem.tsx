import { Container } from "@mui/material";
import styles from "../Banner.module.scss";
import { Link } from "react-router-dom";
import { IBanner } from "@/types/apiTypes";
import { getStrapiMedia } from "@/utils/strapi/strapi";

interface props {
  banner: IBanner;
}

export default function BannerItem({ banner }: props) {
  return (
    <>
      <img className={styles.banner__slide__img} src={getStrapiMedia(banner.image.url)} alt="banner-1" />
      <Container>
        <div className={styles.banner__slide__content}>
          {banner.subtitle && <div className={styles.banner__slide__subtitle}>{banner.subtitle}</div>}
          {banner.title && <div className={"title-h1" + " " + styles.banner__slide__title}>{banner.title}</div>}
          {banner.buttonLink && (
            <Link to={banner.buttonLink} className={styles.banner__slide__button}>
              {banner.buttonText}
            </Link>
          )}
        </div>
      </Container>
    </>
  );
}
