import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./Banner.module.scss";
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { IBanner } from "@/types/apiTypes";
import { apiService } from "@/services/apiService";
import BannerItem from "./components/BannerItem";

export default function Banner() {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getProducts = async () => {
      try {
        console.log("fetch");
        const response = await apiService.getBanners("", signal);
        if (!response) throw new Error("Ошибка загрузки");
        setBanners(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
    return () => controller.abort();
  }, []);

  return (
    <section>
      {!isLoading && (
        <Swiper className={styles.banner} spaceBetween={0} slidesPerView={1} loop={true} navigation={true} modules={[Pagination, Navigation]}>
          {banners.map((banner) => (
            <SwiperSlide key={banner.id} className={styles.banner__slide}>
              <BannerItem banner={banner} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
