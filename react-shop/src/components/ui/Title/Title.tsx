import React, { PropsWithChildren } from "react";

interface TitleProps extends PropsWithChildren {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // Уровни заголовков
  className?: string; // Дополнительный класс
}

export const Title: React.FC<TitleProps> = ({ level, className, children }) => {
  const Tag = level; // Определяем тег на основе уровня
  return <Tag className={className}>{children}</Tag>;
};
