import { Link } from "react-router-dom";

// Material-UI components
import { Container } from "@mui/material";

//Interfaces and Types
import { IBanner } from "@/types/apiTypes";

// Utils
import { getStrapiMedia } from "@/utils/strapi/strapi";

// Styles
import styles from "../Banner.module.scss";

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
