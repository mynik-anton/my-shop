import styles from "./BannerCategories.module.scss";
import { Link } from "react-router-dom";
import { Button, Container, Skeleton } from "@mui/material";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { IGender } from "@/types/apiTypes";
import { APP_ROUTES } from "@/config/routes";
import BannerCategoriesItem from "./components/BannerCategoriesItem";
import SkeletonBannerCategoriesItem from "./components/SkeletonBannerCategoriesItem";

const SKELETON_ITEMS = 3;

export default function BannerCategories() {
  const [genders, setGenders] = useState<IGender[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getGenders = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await apiService.getGenders("", signal);
        console.log(response);
        if (!response) throw new Error("Ошибка загрузки");
        setGenders(response);
      } catch (error) {
        if (!signal.aborted) {
          console.error("Ошибка загрузки:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getGenders();
    return () => controller.abort();
  }, []);

  return (
    <section className={styles.categories}>
      <Container>
        <div className={styles.categories__items}>
          {isLoading && Array.from({ length: SKELETON_ITEMS }).map((_, index) => <SkeletonBannerCategoriesItem key={index} />)}
          {!isLoading && genders.map((gender) => <BannerCategoriesItem key={gender.id} gender={gender} />)}
        </div>

        <Link to={APP_ROUTES.CATALOG} className={styles.categories__bottom}>
          <Button className={styles.categories__bottom__btn} variant="outlined" size="large">
            Перейти в каталог
          </Button>
        </Link>
      </Container>
    </section>
  );
}
