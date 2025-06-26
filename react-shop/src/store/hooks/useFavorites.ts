import { addToFavorites, removeFromFavorites, clearFavorites } from "../slices/favoritesSlice";
import { useAppDispatch, useAppSelector } from "./storeHooks";

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  const isInFavorites = (productId: number) => {
    return favorites.some((item) => item === productId);
  };

  const toggleFavorite = (productId: number) => {
    if (isInFavorites(productId)) {
      dispatch(removeFromFavorites(productId));
    } else {
      dispatch(addToFavorites(productId));
    }
  };

  const addFavorite = (productId: number) => {
    if (!isInFavorites(productId)) {
      dispatch(addToFavorites(productId));
    }
  };

  const removeFavorite = (productId: number) => {
    dispatch(removeFromFavorites(productId));
  };

  const clearAllFavorites = () => {
    dispatch(clearFavorites());
  };

  return {
    favorites,
    isInFavorites,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearAllFavorites,
    favoritesCount: favorites.length,
  };
};
