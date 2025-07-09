import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { apiService } from "@/services/apiService";
import { IProduct } from "@/types/apiTypes";
import { Title } from "@/components/ui/Title/Title";
import Loading from "@/components/ui/Loading/Loading";
import { useCart } from "@/store/hooks/useCart";
import styles from "./Cart.module.scss";
import CartProduct from "./components/CartProduct";
import BreadcrumbsCustom from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { APP_ROUTES } from "@/config/routes";

const breadcrumbsItems = [{ label: "Главная", href: APP_ROUTES.HOME }, { label: "Корзина" }];

export default function Cart() {
  const { cartItems, incrementQuantity, decrementQuantity, removeItemFromCart, clearCartItems, getTotalPrice } = useCart();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      if (cartItems.length === 0) {
        setProducts([]);
        return;
      }
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const ids = cartItems.map((item) => item.productId);
        const response = await apiService.getProductsByIds(ids, {}, signal);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const getItemQuantity = useMemo(() => {
    return (productId: number) => {
      const item = cartItems.find((i) => i.productId === productId);
      return item ? item.quantity : 0;
    };
  }, [cartItems]);

  const totalPrice = useMemo(() => getTotalPrice(products), [products, cartItems]);

  const handleIncrement = useCallback(
    (productId: number) => {
      incrementQuantity(productId);
    },
    [incrementQuantity],
  );

  const handleDecrement = useCallback(
    (productId: number) => {
      decrementQuantity(productId);
    },
    [decrementQuantity],
  );

  const handleRemove = useCallback(
    (productId: number) => {
      removeItemFromCart(productId);
    },
    [removeItemFromCart],
  );

  return (
    <section className={styles.cart}>
      <Container>
        <BreadcrumbsCustom items={breadcrumbsItems} />

        <Title level="h1" className={"title-h1 " + styles.cart__title}>
          Корзина
        </Title>

        {isLoading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <Loading size="small" />
          </Box>
        ) : products.length === 0 ? (
          <Typography variant="h6" align="center" py={5}>
            Ваша корзина пуста.
          </Typography>
        ) : (
          <Box className={styles.cart__content}>
            <Box className={styles.cart__products}>
              {products.map((product) => (
                <CartProduct key={product.id} product={product} quantity={getItemQuantity(product.id)} onIncrement={handleIncrement} onDecrement={handleDecrement} onRemove={handleRemove} />
              ))}
            </Box>

            <Box className={styles.cart__summary}>
              <Box className={"title-h5 " + styles.cart__summary__total}>Итоговая сумма: {totalPrice.toLocaleString()} ₽</Box>
              <Button variant="contained" color="secondary" onClick={clearCartItems} className={styles.cart__summary__btn}>
                Очистить корзину
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </section>
  );
}
