
// import { CssBaseline, Container } from "@mui/material";
// import Dashboard from "./components/dashboard";

// const App = () => {
//   return (
//     <>
//       <CssBaseline />
//       <Container maxWidth="xl">
//         <Dashboard />
//       </Container>
//     </>
//   );
// };

// export default App;
import  { useState } from "react";
import { CssBaseline, Container, createTheme, ThemeProvider, IconButton, Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Dashboard from "./components/dashboard";

const App = () => {
  const [themeMode, setThemeMode] = useState("default");

  // Define themes
  const themes = {
    default: createTheme({
      palette: {
        mode: "light",
        primary: { main: "#ffffff" },
        background: { default: "#f4f4f4" },
        text: { primary: "#000000" },
      },
    }),
    dark: createTheme({
      palette: {
        mode: "dark",
        primary: { main: "#333333" },
        background: { default: "#000000" },
        text: { primary: "#ffffff" },
      },
    }),
    tnPolice: createTheme({
      palette: {
        mode: "dark",
        primary: { main: "#d32f2f" }, // Tamil Nadu Police red
        secondary: { main: "#1976d2" }, // Blue accents
        background: { default: "#212121", paper: "#1c1c1c" },
        text: { primary: "#ffffff", secondary: "#b0bec5" },
      },
    }),
  };

  const handleChangeTheme = () => {
    setThemeMode((prevMode) =>
      prevMode === "default" ? "dark" : prevMode === "dark" ? "tnPolice" : "default"
    );
  };

  return (
    <ThemeProvider theme={themes[themeMode]}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "primary.main",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <IconButton
            onClick={handleChangeTheme}
            sx={{
              color: "text.primary",
              "&:hover": { color: "secondary.main" },
            }}
          >
            {themeMode === "default" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, padding: "16px" }}>
          <Dashboard />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
