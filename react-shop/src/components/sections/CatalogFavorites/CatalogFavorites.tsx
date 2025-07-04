import { useState, useEffect, useCallback } from "react";
import { Breadcrumbs, Typography, Box, Container, Pagination } from "@mui/material";
import { apiService } from "@/services/apiService";
import { IProduct } from "@/types/apiTypes";
import { Title } from "@/components/ui/Title/Title";
import styles from "./CatalogFavorites.module.scss";
import CatalogProduct from "./components/CatalogFavoritesProduct";
import Loading from "@/components/ui/Loading/Loading";
import { useSearchParams } from "react-router-dom";
import { APP_ROUTES } from "@/config/routes";
import { BreadcrumbsCustom } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { useFavorites } from "@/store/hooks/useFavorites";

export const PRODUCTS_PER_PAGE = 3;

const breadcrumbsItems = [{ label: "Главная", href: APP_ROUTES.HOME }, { label: "Избранные товары" }];

export default function CatalogFavorites() {
  const { favorites } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const page = Number(searchParams.get("page")) || 1;

  console.log(totalCount);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(page);

        const response = await apiService.getProductsByIds(favorites, { page: page, pageSize: PRODUCTS_PER_PAGE }, signal);
        console.log(response);
        setProducts(response.data);
        setTotalCount(response.meta.pagination.total);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
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
                <Box className={styles.catalog__pagination}>
                  <Pagination count={Math.ceil(totalCount / PRODUCTS_PER_PAGE)} page={page} onChange={handlePageChange} color="primary" />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </section>
  );
}
