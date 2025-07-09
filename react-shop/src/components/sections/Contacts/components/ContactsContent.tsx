// Material-UI components
import { Email, LocationOn, Phone } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";

// Styles
import styles from "../Contacts.module.scss";

export default function ContactsContent() {
  return (
    <Paper elevation={3} className={styles.contacts__card}>
      <Stack spacing={2}>
        <Typography variant="h6" className={styles.contacts__subtitle}>
          Наши контакты
        </Typography>

        <Box className={styles.contacts__item}>
          <Email color="primary" className={styles.contacts__icon} />
          <Typography>example@mail.com</Typography>
        </Box>

        <Box className={styles.contacts__item}>
          <Phone color="primary" className={styles.contacts__icon} />
          <Typography>+7 (123) 456-78-90</Typography>
        </Box>

        <Box className={styles.contacts__item}>
          <LocationOn color="primary" className={styles.contacts__icon} />
          <Typography>г. Москва, ул. Примерная, 123</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
