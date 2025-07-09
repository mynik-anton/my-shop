import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// Material-UI components
import { Box, Container, Pagination } from "@mui/material";

// Store hooks
import { useFavorites } from "@/store/hooks/useFavorites";

// Services
import { apiService } from "@/services/apiService";

// App Components
import Title from "@/components/ui/Title/Title";
import Loading from "@/components/ui/Loading/Loading";
import BreadcrumbsCustom from "@/components/ui/Breadcrumbs/Breadcrumbs";
import CatalogProduct from "./components/CatalogFavoritesProduct";

//Interfaces and Types
import { IProduct } from "@/types/apiTypes";

// Сonfig
import { APP_ROUTES } from "@/config/routes";

// Styles
import styles from "./CatalogFavorites.module.scss";

export const PRODUCTS_PER_PAGE = 4;

const breadcrumbsItems = [{ label: "Главная", href: APP_ROUTES.HOME }, { label: "Избранные товары" }];

export default function CatalogFavorites() {
  const { favorites } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await apiService.getProductsByIds(favorites, { page: page, pageSize: PRODUCTS_PER_PAGE }, signal);
        setProducts(response.data);
        setTotalCount(response.meta.pagination.total);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
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
          Избранные товары
        </Title>

        <Box className={styles.catalog__area}>
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
