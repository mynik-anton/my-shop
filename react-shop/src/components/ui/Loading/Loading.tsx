import { Box, CircularProgress } from "@mui/material";
import React, { ReactNode } from "react";

interface props {
  size?: "small" | "tiny";
  message?: ReactNode;
}

export default function Loading({ size, message }: props) {
  let sizeClass, iconSize;
  switch (size) {
    case "tiny":
      sizeClass = "p";
      iconSize = 20;
      break;
    case "small":
      sizeClass = "title-h6";
      iconSize = 30;
      break;
    default:
      sizeClass = "title-h2";
      iconSize = 50;
      break;
  }
  return (
    <Box className={sizeClass} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <CircularProgress size={iconSize} /> {message || "Идёт загрузка..."}
    </Box>
  );
}
