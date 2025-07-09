import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// Material-UI components
import { Box, Container, Pagination } from "@mui/material";

// Services
import { apiService } from "@/services/apiService";
import { buildStrapiQuery } from "@/utils/strapi/strapi";

// Interfaces and Types
import { IProduct } from "@/types/apiTypes";

// Config
import { APP_ROUTES } from "@/config/routes";

// App components
import Title from "@/components/ui/Title/Title";
import Loading from "@/components/ui/Loading/Loading";
import BreadcrumbsCustom from "@/components/ui/Breadcrumbs/Breadcrumbs";
import CatalogProduct from "./components/CatalogProduct/CatalogProduct";
import CatalogFilter from "./components/CatalogFilter/CatalogFilter";
import CatalogMobileFilter from "./components/CatalogMobileFilter/CatalogMobileFilter";

// Styles
import styles from "./Catalog.module.scss";

export const PRODUCTS_PER_PAGE = 3;

const breadcrumbsItems = [{ label: "Главная", href: APP_ROUTES.HOME }, { label: "Категории" }];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isActive = true;

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Добавляем проверку отмены в задержку
        await Promise.race([
          new Promise((resolve) => setTimeout(resolve, 3000)),
          new Promise((_, reject) => signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")))),
        ]);

        if (!isActive) return;

        const response = await apiService.getProductsWithPagination(buildStrapiQuery(searchParams), { page: page, pageSize: PRODUCTS_PER_PAGE }, signal);

        if (!isActive) return;

        setProducts(response.data);
        setTotalCount(response.meta.pagination.total);
      } catch (error) {
        if (!signal.aborted) {
          console.error("Ошибка загрузки:", error);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [searchParams]);

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", value.toString());
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <section className={styles.catalog}>
      <Container>
        <BreadcrumbsCustom items={breadcrumbsItems} />

        <Title level="h1" className={"title-h1 " + styles.catalog__title}>
          Каталог
        </Title>

        <Box className={styles.catalog__area}>
          <CatalogFilter />
          <CatalogMobileFilter />
          <Box className={styles.catalog__main}>
            {isLoading ? (
              <Box display="flex" alignItems="center" justifyContent="center" py={5}>
                <Loading size="small" />
              </Box>
            ) : (
              <>
                <Box className={styles.catalog__products}>
                  {products?.map((product) => (
                    <CatalogProduct key={product.id} product={product} />
                  ))}
                </Box>
                {totalCount > PRODUCTS_PER_PAGE && (
                  <Box className={styles.catalog__pagination}>
                    <Pagination count={Math.ceil(totalCount / PRODUCTS_PER_PAGE)} page={page} onChange={handlePageChange} color="primary" />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </section>
  );
}
