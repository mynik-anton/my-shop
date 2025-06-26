import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./SalesProducts.module.scss";
import { Link } from "react-router-dom";
import { Button, Container, IconButton } from "@mui/material";
import { Title } from "@/components/ui/Title/Title";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IProduct } from "@/types/apiTypes";
import { apiService } from "@/services/apiService";
import SalesProduct from "./components/SalesProduct";
import SkeletonSalesProduct from "./components/SkeletonSalesProduct";
import axios from "axios";
import { APP_ROUTES } from "@/config/routes";

const SKELETON_ITEMS = 4;

export default function SalesProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const swiperRef = useRef<SwiperType | null>(null); // Создаем реф для Swiper

  console.log(products);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getProducts = async () => {
      try {
        setIsLoading(true);

        // Искусственная задержка (если нужна)

        await new Promise((resolve) => setTimeout(resolve, 3000));
        // Передаём signal в запрос
        const response = await apiService.getProducts("", { page: 1, pageSize: 12 }, signal);

        if (!response) throw new Error("Ошибка загрузки");
        setProducts(response);
      } catch (error) {
        // Игнорируем ошибку, если запрос был отменён
        if (!signal.aborted) {
          console.error("Ошибка загрузки:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();

    // Функция очистки - отменяет запрос при размонтировании
    return () => controller.abort();
  }, []);

  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);
  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);

  return (
    <div className={styles.sales}>
      <Container>
        <div className={styles.sales__top}>
          <Title level="h2" className={`${styles.sales__top__title} title-h2`}>
            Распордажа
          </Title>
          {!isLoading && (
            <div className={styles.sales__top__navigation}>
              <IconButton className={styles.sales__top__navigation__btn} onClick={handlePrev} aria-label="prev" size="large">
                <KeyboardArrowLeftIcon fontSize="large" />
              </IconButton>
              <IconButton className={styles.sales__top__navigation__btn} onClick={handleNext} aria-label="Next" size="large">
                <KeyboardArrowRightIcon fontSize="large" />
              </IconButton>
            </div>
          )}
        </div>

        <Swiper
          onInit={(swiper) => {
            swiperRef.current = swiper; // Сохраняем экземпляр Swiper
          }}
          className={styles.sales__slider}
          spaceBetween={30}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
            },
            400: {
              slidesPerView: 1.5,
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {isLoading
            ? Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`} className={styles.sales__slide}>
                  <SkeletonSalesProduct />
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id} className={styles.sales__slide}>
                  <SalesProduct product={product} />
                </SwiperSlide>
              ))}
        </Swiper>

        <Link to={APP_ROUTES.CATALOG} className={styles.sales__bottom}>
          <Button className={styles.sales__bottom__btn} variant="outlined" size="large">
            Посмотреть все товары
          </Button>
        </Link>
      </Container>
    </div>
  );
}
