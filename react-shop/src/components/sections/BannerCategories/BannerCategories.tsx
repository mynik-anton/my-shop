import styles from "./BannerCategories.module.scss";
import { Link } from "react-router-dom";
import { Button, Container, Skeleton } from "@mui/material";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { IGender } from "@/types/apiTypes";
import BannerItem from "./components/BannerItem";
import SkeletonBannerItem from "./components/SkeletonBannerItem";

const SKELETON_ITEMS = 3;

export default function BannerCategories() {
  const [genders, setGenders] = useState<IGender[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await apiService.getGenders("", signal);
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

    getProducts();
    return () => controller.abort();
  }, []);

  return (
    <section className={styles.categories}>
      <Container>
        <div className={styles.categories__items}>
          {isLoading && Array.from({ length: SKELETON_ITEMS }).map((_, index) => <SkeletonBannerItem key={index} />)}
          {!isLoading && genders.map((gender) => <BannerItem key={gender.id} gender={gender} />)}
        </div>

        <Link to="/catalog" className={styles.categories__bottom}>
          <Button className={styles.categories__bottom__btn} variant="outlined" size="large">
            Перейти в каталог
          </Button>
        </Link>
      </Container>
    </section>
  );
}
