import React from "react";
import { Container, Avatar, Typography, Box } from "@mui/material";
import tnPoliceLogo from "../assets/tn-police-logo.jpeg";

const Header = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "18px 24px",
        borderBottom: "2px solid #d1d5db",
        background: "linear-gradient(90deg, #0f172a, #1e40af, #2563eb)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)", // Elevated shadow
        borderRadius: "12px", // Adds roundness to the container
        marginBottom: "20px", // Creates spacing below the header
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "24px", // Balanced gap for spacing
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Avatar
          src={tnPoliceLogo}
          alt="Logo"
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%", // Perfectly circular avatar
            border: "4px solid #ffffff", // Contrasting white border
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Shadow for a standout look
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth animations
            "&:hover": {
              transform: "scale(1.1)", // Slight scaling on hover
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // Stronger shadow on hover
            },
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontSize: "2rem",
            fontWeight: "800", // Extra bold for emphasis
            color: "white", // White text color
            textAlign: "center",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            textShadow: "1px 1px 6px rgba(0, 0, 0, 0.5)", // Enhanced shadow for depth
            animation: "glow 3s ease-in-out infinite", // Subtle glowing animation
          }}
        >
          TeleScam Analysis Dashboard
        </Typography>
      </Box>
    </Container>
  );
};

export default Header;
