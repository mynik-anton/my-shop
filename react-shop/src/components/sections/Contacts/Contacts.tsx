// Material-UI components
import { Box } from "@mui/material";

// App components
import BreadcrumbsCustom from "@/components/ui/Breadcrumbs/Breadcrumbs";
import Title from "@/components/ui/Title/Title";
import ContactsContent from "./components/ContactsContent";
import ContactsForm from "./components/ContactsForm";

// Config
import { APP_ROUTES } from "@/config/routes";

// Styles
import styles from "./Contacts.module.scss";

const breadcrumbsItems = [{ label: "Главная", href: APP_ROUTES.HOME }, { label: "Контакты" }];

export default function Contacts() {
  return (
    <section className={styles.contacts}>
      <BreadcrumbsCustom items={breadcrumbsItems} />

      <Title level="h1" className={"title-h1" + " " + styles.contacts__title}>
        Контакты
      </Title>

      <Box className={styles.contacts__content}>
        <ContactsContent />
        <ContactsForm />
      </Box>
    </section>
  );
}
