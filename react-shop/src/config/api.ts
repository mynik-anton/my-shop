const API_BASE_URL = "http://localhost:1337/api";

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  PAGES: `${API_BASE_URL}/pages`,
  CATEGORIES: `${API_BASE_URL}/categories`,
  GENDERS: `${API_BASE_URL}/genders`,
} as const;
