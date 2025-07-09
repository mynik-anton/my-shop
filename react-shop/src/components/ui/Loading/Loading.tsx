import { Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface props {
  size?: keyof typeof SIZE_PARAMS;
  message?: ReactNode;
}

const SIZE_PARAMS = {
  tiny: { className: "p", iconSize: 20 },
  small: { className: "title-h6", iconSize: 30 },
  default: { className: "title-h2", iconSize: 50 },
} as const;

export default function Loading({ size, message }: props) {
  let params = SIZE_PARAMS[size || "default"];
  return (
    <Box className={params.className} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <CircularProgress size={params.iconSize} /> {message || "Идёт загрузка..."}
    </Box>
  );
}
