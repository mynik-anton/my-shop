import React, { useState } from "react";

// Material-UI components
import { Typography, TextField, Button, Stack, Paper, Alert } from "@mui/material";

// App components
import Loading from "@/components/ui/Loading/Loading";
import { apiService } from "@/services/apiService";
import { ICreateEmail } from "@/types/apiTypes";

// Styles
import styles from "../Contacts.module.scss";

export default function ContactsForm() {
  const [formData, setFormData] = useState<ICreateEmail>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"initial" | "success" | "error">("initial");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("initial");

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await apiService.sendEmail(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Сброс формы
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Paper elevation={3} className={styles.contacts__card}>
      <Typography variant="h6" className={styles.contacts__subtitle} gutterBottom>
        Обратная связь
      </Typography>

      {submitStatus === "success" && (
        <Alert color="success" className={styles.contacts__status}>
          Сообщение успешно отправлено!
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert color="error" className={styles.contacts__status}>
          Ошибка при отправке. Попробуйте ещё раз.
        </Alert>
      )}

      {isSubmitting ? (
        <Loading size="small" message="Отправка email" />
      ) : (
        <form onSubmit={handleSubmit} className={styles.contacts__form}>
          <Stack spacing={2}>
            <TextField label="Ваше имя" name="name" value={formData.name} onChange={handleChange} variant="outlined" fullWidth required className={styles.contacts__input} />

            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} variant="outlined" fullWidth required className={styles.contacts__input} />

            <TextField label="Сообщение" name="message" value={formData.message} onChange={handleChange} variant="outlined" multiline rows={4} fullWidth required className={styles.contacts__input} />

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} className={styles.contacts__button}>
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
          </Stack>
        </form>
      )}
    </Paper>
  );
}
