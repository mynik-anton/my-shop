// components/ui/Breadcrumbs/Breadcrumbs.tsx
import { Breadcrumbs as MuiBreadcrumbs, Typography, Box, Link } from "@mui/material";

import styles from "./Breadcrumbs.module.scss";
import { IBreadcrumb } from "@/types/apiTypes";

interface BreadcrumbsProps {
  items: IBreadcrumb[];
  className?: string;
  ariaLabel?: string;
}

export const BreadcrumbsCustom = ({ items, className = "", ariaLabel = "breadcrumb" }: BreadcrumbsProps) => {
  return (
    <Box className={`${styles.breadcrumbs} ${className}`}>
      <MuiBreadcrumbs aria-label={ariaLabel}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return isLast ? (
            <Typography key={item.label} color="text.primary" className={styles.breadcrumbs__item}>
              {item.label}
            </Typography>
          ) : (
            <Link key={item.label} underline="hover" color="inherit" href={item.href} className={styles.breadcrumbs__item}>
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};
