const HOME_URL = "/";

export const APP_ROUTES = {
  HOME: HOME_URL,
  CATALOG: HOME_URL + "catalog",
  FAVORITES: HOME_URL + "favorites",
  CART: HOME_URL + "cart",
  CONTACTS: HOME_URL + "contacts",
} as const;
