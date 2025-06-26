import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Banner.module.scss";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { IBanner } from "@/types/apiTypes";
import { apiService } from "@/services/apiService";
import BannerItem from "./components/BannerItem";

export default function Banner() {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getBanners = async () => {
      try {
        const response = await apiService.getBanners("home", signal);
        console.log(response);
        if (!response) throw new Error("Ошибка загрузки");
        setBanners(response.blockBanners);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getBanners();
    return () => controller.abort();
  }, []);

  return (
    <section className={styles.banner}>
      {!isLoading && (
        <>
          <Swiper
            className={styles.banner__slider}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id} className={styles.banner__slide}>
                <BannerItem banner={banner} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
}
