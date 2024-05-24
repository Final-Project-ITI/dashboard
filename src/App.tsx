import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import theme from "./themes/theme.ts"
import NavBar from "./components/shared/NavBar.tsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Box sx={{minHeight:"100vh", backgroundColor:"#F3ECE4"}}>
        <NavBar></NavBar>

        </Box>
        
        
      </ThemeProvider>
    </>
  );
}

export default App;
