import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.scss";
import HomePage from "./pages/HomePage/HomePage";
import LayoutPage from "./pages/LayoutPage/LayoutPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import { APP_ROUTES } from "./config/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

