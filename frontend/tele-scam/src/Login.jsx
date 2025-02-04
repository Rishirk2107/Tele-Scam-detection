import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaMoon, FaSun } from "react-icons/fa";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling when unmounting
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.username === "Tn-cyberwing-admin" && formData.password === "cybercrime@tn") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login successful! Welcome to the dashboard!");
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid username or password.");
      toast.error("Invalid username or password.");
    }
  };

  return (
    <div style={{ ...styles.container, backgroundColor: isDarkMode ? "#1a1a1a" : "#f4f4f4" }}>
      <div style={styles.darkModeToggle} onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? <FaSun size={24} color="#ffcc00" /> : <FaMoon size={24} color="#ffffff" />}
      </div>

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
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  style={styles.input}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span
                  style={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <button type="submit" style={styles.loginButton}>
              Login
            </button>
            {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "casteller",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    transition: "background-color 0.3s ease",
  },
  darkModeToggle: {
    width: "40px", // Set equal width and height
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex", 
    borderRadius: "50%",
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
    backgroundColor: "#333",
    padding: "10px",
    // borderRadius: "50%",
    transition: "background 0.3s ease",
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
    transition: "background-color 0.3s ease, color 0.3s ease",
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
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontFamily: "'Inter', sans-serif",
    paddingRight: "40px",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    fontSize: "18px",
    color: "#666",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #0f172a, #1e40af, #2563eb)",
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