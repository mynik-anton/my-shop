module.exports = [
  "strapi::errors",
  "strapi::security", // Обязательный middleware (был пропущен)
  {
    name: "strapi::cors",
    config: {
      origin: ["http://localhost:5173"], // Укажите URL вашего React-приложения
      headers: ["*"], // Разрешите все заголовки
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

