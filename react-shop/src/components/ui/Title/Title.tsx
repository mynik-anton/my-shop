import { PropsWithChildren } from "react";

interface TitleProps extends PropsWithChildren {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export default function Title({ level, className, children }: TitleProps) {
  const Tag = level;
  return <Tag className={className}>{children}</Tag>;
}
