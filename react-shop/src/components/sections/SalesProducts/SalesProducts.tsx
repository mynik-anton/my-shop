import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Material-UI components
import { Button, Container, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// App components
import Title from "@/components/ui/Title/Title";
import SalesProduct from "./components/SalesProduct";
import SkeletonSalesProduct from "./components/SkeletonSalesProduct";

// Services
import { apiService } from "@/services/apiService";

// Interfaces and Types
import { IProduct } from "@/types/apiTypes";

// Сonfigs
import { APP_ROUTES } from "@/config/routes";

// Styles
import styles from "./SalesProducts.module.scss";

const SKELETON_ITEMS = 4;

export default function SalesProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const swiperRef = useRef<SwiperType | null>(null); // Создаем реф для Swiper

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getProducts = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await apiService.getProducts("?filters[oldPrice][$null]", { page: 1, pageSize: 12 }, signal);
        if (!response) throw new Error("Ошибка загрузки");
        setProducts(response);
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

  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);
  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);

  if (!isLoading && products.length === 0) return;

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
            swiperRef.current = swiper;
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
