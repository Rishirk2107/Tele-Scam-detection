import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    // Check if already logged in (based on localStorage)
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard"); // If logged in, navigate to dashboard
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Simulated login validation
    if (formData.username === "Tn-cyberwing-admin" && formData.password === "cybercrime@tn") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true"); // Store login state in localStorage
      toast.success("Login successful! Welcome to the dashboard!"); // Toast success message
      navigate("/dashboard"); // Navigate to dashboard
    } else {
      setErrorMessage("Invalid username or password.");
      toast.error("Invalid username or password."); // Toast error message
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        <div style={styles.leftSection}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Tamil_Nadu_Police_Logo.png/210px-Tamil_Nadu_Police_Logo.png"
            alt="Logo"
            style={styles.logo}
          />
          <p style={styles.welcomeText}>
            Welcome to <br />
            <strong>TN Police</strong>
          </p>
        </div>
        <div style={styles.rightSection}>
          <h1 style={styles.heading}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="username" style={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                style={styles.input}
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                style={styles.input}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" style={styles.loginButton}>
              Login
            </button>
            {errorMessage && (
              <p style={styles.errorText}>{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

// CSS Styles in a JS object
const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f5f5, #aec6ef)",
    overflow: "hidden",
  },
  loginContainer: {
    display: "flex",
    backgroundColor: "#ffffff",
    width: "900px",
    height: "500px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    transform: "scale(0.95)",
    transition: "transform 0.3s ease-in-out",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0066cc, #003d99)",
    padding: "20px",
    flexDirection: "column",
    color: "white",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  logo: {
    width: "120px",
    marginBottom: "20px",
  },
  welcomeText: {
    fontSize: "24px",
    fontWeight: "bold",
    lineHeight: "1.4",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#ffffff",
    color: "#333333",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "95%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontFamily: "'Inter', sans-serif",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #ff9900, #ff7700)",
    border: "none",
    borderRadius: "25px",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  errorText: {
    color: "#ff6666",
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default Login;
