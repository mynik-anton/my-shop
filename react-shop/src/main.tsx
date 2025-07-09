import React from "react";
import ReactDOM from "react-dom/client";

// State management
import { Provider } from "react-redux";
import { store } from "./store/store";

// Routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Contexts
import { SnackbarProvider } from "./contexts/SnackbarContext";

// Config
import { APP_ROUTES } from "./config/routes";

// Pages
import LayoutPage from "./pages/LayoutPage/LayoutPage";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import CartPage from "./pages/CartPage/CartPage";

// Styles
import "./styles/index.scss";

const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <LayoutPage />, // Общий Layout для всех дочерних маршрутов
    children: [
      {
        path: APP_ROUTES.HOME,
        element: <HomePage />, // Главная страница
      },
      {
        path: APP_ROUTES.CATALOG,
        element: <CatalogPage />, // Страница "Каталог"
      },
      {
        path: APP_ROUTES.CONTACTS,
        element: <ContactsPage />, // Страница "Контакты"
      },
      {
        path: APP_ROUTES.FAVORITES,
        element: <FavoritesPage />, // Страница "Избранные товары"
      },
      {
        path: APP_ROUTES.CART,
        element: <CartPage />, // Страница "Избранные товары"
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
);

