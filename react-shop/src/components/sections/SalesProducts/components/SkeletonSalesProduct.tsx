// MUI components
import { Skeleton } from "@mui/material";

// Styles
import styles from "../SalesProducts.module.scss";

export default function SkeletonSalesProduct() {
  return (
    <>
      <div className={styles.sales__slide__pic}>
        <Skeleton
          sx={{
            width: "100%",
            height: "100%",
            transform: "none",
          }}
          animation="wave"
          variant="rectangular"
        />
      </div>
      <Skeleton className={styles.sales__slide__title} animation="wave" height={35} width="100%" sx={{ mt: 2, mb: 0.4 }} />
      <Skeleton className={styles.sales__slide__prices} animation="wave" height={50} width="100%" />
      <Skeleton className={styles.sales__slide__prices} animation="wave" height={60} width="100%" sx={{ mt: 0.4 }} />
    </>
  );
}
