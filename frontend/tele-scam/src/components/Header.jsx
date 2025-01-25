import React, { useState, useEffect } from "react";
import { Container, Avatar, Typography, IconButton } from "@mui/material";
import { BiMoon, BiSun } from "react-icons/bi";
import tnPoliceLogo from "../assets/tn-police-logo.jpeg";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  // Update the theme in localStorage and the document root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Function to toggle the theme
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid",
        borderColor: isDarkMode ? "#4a4a4a" : "#e0e0e0",
        backgroundColor: isDarkMode ? "#212121" : "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Avatar src={tnPoliceLogo} alt="Logo" sx={{ width: 64, height: 64 }} />
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: isDarkMode ? "#ffffff" : "#212121",
          }}
        >
          TeleScam Analysis Dashboard
        </Typography>
      </div>
      <IconButton onClick={toggleTheme}>
        {isDarkMode ? <BiSun size={28} /> : <BiMoon size={28} />}
      </IconButton>
    </Container>
  );
};

export default Header;
