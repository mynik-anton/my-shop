import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.scss";
import HomePage from "./pages/HomePage/HomePage";
import LayoutPage from "./pages/LayoutPage/LayoutPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />, // Общий Layout для всех дочерних маршрутов
    children: [
      {
        path: "/",
        element: <HomePage />, // Главная страница
      },
      {
        path: "catalog",
        element: <CatalogPage />, // Страница "Каталог"
      },
      {
        path: "contacts",
        element: <ContactsPage />, // Страница "Контакты"
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

