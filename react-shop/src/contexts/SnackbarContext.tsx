import { createContext, useState, ReactNode, useCallback } from "react";

// MUI components
import { AlertProps, Snackbar, Alert } from "@mui/material";

type SnackbarContextType = {
  showSnackbar: (message: string, severity?: AlertProps["severity"]) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertProps["severity"] }>({ open: false, message: "", severity: "success" });

  const showSnackbar = useCallback((message: string, severity: AlertProps["severity"] = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
