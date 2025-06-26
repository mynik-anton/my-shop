import { Box } from "@mui/material";
import styles from "./Contacts.module.scss";
import { Title } from "@/components/ui/Title/Title";
import ContactsContent from "./components/ContactsContent";
import ContactsForm from "./components/ContactsForm";
import { APP_ROUTES } from "@/config/routes";
import { BreadcrumbsCustom } from "@/components/ui/Breadcrumbs/Breadcrumbs";

const breadcrumbsItems = [{ label: "Главная", href: APP_ROUTES.HOME }, { label: "Контакты" }];

const Contacts: React.FC = () => {
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
};

export default Contacts;
