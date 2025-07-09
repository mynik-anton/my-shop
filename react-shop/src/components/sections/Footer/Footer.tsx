// Material-UI components
import { Box, Typography } from "@mui/material";

// Styles
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer>
      <Box component="footer" className={styles.footer}>
        <Typography className={styles.footer__text}>FOOTER © {new Date().getFullYear()} Копирайт</Typography>
      </Box>
    </footer>
  );
}
