import { memo } from "react";

// MUI components
import { Breadcrumbs as MuiBreadcrumbs, Typography, Box, Link } from "@mui/material";

//Interfaces and Types
import { IBreadcrumb } from "@/types/apiTypes";

// Styles
import styles from "./Breadcrumbs.module.scss";

interface BreadcrumbsProps {
  items: IBreadcrumb[];
  className?: string;
  ariaLabel?: string;
}

const BreadcrumbsCustom = ({ items, className = "", ariaLabel = "breadcrumb" }: BreadcrumbsProps) => {
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

export default memo(BreadcrumbsCustom);
