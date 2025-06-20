import { Box } from "@mui/material";
import styles from "./Contacts.module.scss";
import { Title } from "@/components/ui/Title/Title";
import ContactsContent from "./components/ContactsContent";
import ContactsForm from "./components/ContactsForm";

const Contacts: React.FC = () => {
  return (
    <section className={styles.contacts}>
      <Title level="h1" className={"title-h2" + " " + styles.contacts__title}>
        Контакты
      </Title>

      <Box className={styles.contacts__content}>
        {/* Блок с контактами */}
        <ContactsContent />

        {/* Блок с формой */}
        <ContactsForm />
      </Box>
    </section>
  );
};

export default Contacts;
