// Material-UI components
import { Skeleton } from "@mui/material";

// Styles
import styles from "../BannerCategories.module.scss";

export default function SkeletonBannerCategoriesItem() {
  return (
    <div className={styles.categories__item}>
      <div className={styles.categories__item__pic}>
        <Skeleton sx={{ width: "100%", height: "100%", transform: "none" }} animation="wave" variant="rectangular" />
      </div>
      <Skeleton className={styles.categories__item__name} animation="wave" height={35} width="100%" />
    </div>
  );
}
