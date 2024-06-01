import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./themes/theme.ts";
import AdminRestaurant from "./components/pages/AdminRestaurant.tsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AdminRestaurant />
      </ThemeProvider>
    </>
  );
}

export default App;
