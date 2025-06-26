import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFavoritesState {
  items: number[];
}

const initialState: IFavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find((item) => item === action.payload);
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
