import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { FaSun, FaMoon } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ScammersAndChannelsTable from "./components/DetailsTable";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scammersData, setScammersData] = useState([]);
  const [channelsData, setChannelsData] = useState([]);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const primaryColor = "#607D8B";

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: { main: primaryColor },
      secondary: { main: primaryColor },
      background: {
        default: isDarkMode ? "#121212" : "#f4f6f9",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#333333",
        secondary: isDarkMode ? "#bbbbbb" : "#666666",
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
      h5: { fontWeight: 700 },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl" style={{ position: "relative", minHeight: "100vh", paddingBottom: "80px", paddingTop: "60px" }}>
          <Header isDarkMode={isDarkMode} handleThemeToggle={handleThemeToggle} primaryColor={primaryColor} />
          <Routes>
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <Dashboard setScammersData={setScammersData} setChannelsData={setChannelsData} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/tables"
              element={
                isLoggedIn ? (
                  <ScammersAndChannelsTable scammersData={scammersData} channelsData={channelsData} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
          </Routes>
          {isLoggedIn && <ViewTableButton primaryColor={primaryColor} />}
        </Container>
      </ThemeProvider>
    </Router>
  );
};

const Header = ({ isDarkMode, handleThemeToggle, primaryColor }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "12px",
        right: 0,
        padding: "15px 20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton onClick={handleThemeToggle}>
        {isDarkMode ? <FaMoon size={28} style={{ color: primaryColor }} /> : <FaSun size={28} style={{ color: primaryColor }} />}
      </IconButton>
    </Box>
  );
};

const ViewTableButton = ({ primaryColor }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate("/tables")}
        sx={{
          backgroundColor: primaryColor,
          padding: "12px 24px",
          fontWeight: "bold",
          borderRadius: "8px",
          textTransform: "none",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#455A64",
            boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        View Table
      </Button>
    </Box>
  );
};

export default App;
