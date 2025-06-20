import { useState, useEffect } from "react";
import { Breadcrumbs, Typography, Box, Checkbox, FormControlLabel, Container, Slider, Pagination } from "@mui/material";
import Link from "@mui/material/Link";
import { apiService } from "@/services/apiService";
import { IProduct } from "@/types/apiTypes";
import { Title } from "@/components/ui/Title/Title";
import styles from "./Catalog.module.scss";
import CatalogProduct from "./components/CatalogProduct";
import Loading from "@/components/ui/Loading/Loading";
import { useSearchParams } from "react-router-dom";
import CatalogFilter from "./components/CatalogFilter";

export const PRODUCTS_PER_PAGE = 12;

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const page = Number(searchParams.get("_page")) || 1;

  console.log(totalCount);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        console.log("get");

        const response = await apiService.getProductsWithPagination(`?${searchParams.toString()}`);
        setProducts(response.data);
        setTotalCount(response.items);
      } catch {
        // обработка ошибок
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // Копируем параметры
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("_page", value.toString());
    newParams.set("_per_page", PRODUCTS_PER_PAGE.toString());
    setSearchParams(newParams);
  };

  return (
    <section className={styles.catalog}>
      <Container>
        <Box className={styles.breadcrumbs}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Главная
            </Link>
            <Typography color="text.primary">Каталог</Typography>
          </Breadcrumbs>
        </Box>

        <Title level="h1" className={"title-h1 " + styles.catalog__title}>
          Каталог
        </Title>

        <Box className={styles.catalog__area}>
          <CatalogFilter />

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
