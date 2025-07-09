import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer, { IFavoritesState } from "./slices/favoritesSlice";
import cartReducer, { ICartState } from "./slices/cartSlice";

interface PreloadedState {
  favorites: IFavoritesState;
  cart: ICartState;
}

function loadState(): PreloadedState | undefined {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState) as PreloadedState;
  } catch (e) {
    console.warn("Ошибка при загрузке store из localStorage", e);
    return undefined;
  }
}

function saveState(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (e) {
    console.warn("Ошибка сохранения store в localStorage", e);
  }
}

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
