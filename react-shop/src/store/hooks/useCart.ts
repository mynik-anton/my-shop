import { IProduct } from "@/types/apiTypes";
import { addToCart, removeFromCart, updateQuantity, clearCart } from "../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "./storeHooks";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const isInCart = (productId: number) => {
    return cartItems.some((item) => item.productId === productId);
  };

  const getItemQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const addItemToCart = (productId: number) => {
    dispatch(
      addToCart({
        productId: productId,
      }),
    );
  };

  const removeItemFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const incrementQuantity = (productId: number) => {
    const currentQuantity = getItemQuantity(productId);
    updateItemQuantity(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId: number) => {
    const currentQuantity = getItemQuantity(productId);
    updateItemQuantity(productId, currentQuantity - 1);
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  //const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
    cartItems,
    isInCart,
    getItemQuantity,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCartItems,
    totalItems,
    //totalPrice,
  };
};
