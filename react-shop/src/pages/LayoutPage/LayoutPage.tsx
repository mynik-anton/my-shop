import { Outlet } from "react-router-dom";

// Sections
import Header from "@/components/sections/Header/Header";
import Footer from "@/components/sections/Footer/Footer";

// MUI components
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    primary: {
      main: "#17696a", //  основной цвет
    },
    secondary: {
      main: "#dc004e", //  вторичный цвет
    },
  },
});

export default function LayoutPage() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
}
