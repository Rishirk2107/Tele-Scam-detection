import  { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { BiMoon, BiSun } from "react-icons/bi"; 
import { BiBarChart, BiError, BiCheck, BiMessageSquareDots } from "react-icons/bi";// React Icons for theme toggle
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import tnPoliceLogo from "../assets/tn-police-logo.jpeg";

// Sample data
const sampleData = [
  { channel_id: "CH001", channel_name: "Crypto Scam", flag: true, victim_reports: 15, scam_score: 85 },
  { channel_id: "CH002", channel_name: "Safe Channel", flag: false, victim_reports: 0, scam_score: 20 },
  { channel_id: "CH003", channel_name: "Bank Fraud", flag: true, victim_reports: 7, scam_score: 78 },
  { channel_id: "CH004", channel_name: "Phishing Scam", flag: true, victim_reports: 12, scam_score: 90 },
  { channel_id: "CH005", channel_name: "Investment Fraud", flag: true, victim_reports: 20, scam_score: 95 },
  { channel_id: "CH006", channel_name: "Lottery Scam", flag: true, victim_reports: 8, scam_score: 70 },
  { channel_id: "CH007", channel_name: "Insurance Scam", flag: false, victim_reports: 3, scam_score: 30 },
  { channel_id: "CH008", channel_name: "Social Media Scam", flag: true, victim_reports: 10, scam_score: 82 },
  { channel_id: "CH009", channel_name: "Email Fraud", flag: true, victim_reports: 18, scam_score: 88 },
  { channel_id: "CH010", channel_name: "Loan Fraud", flag: true, victim_reports: 14, scam_score: 80 },
];

// Chart Data
const scamScoreData = sampleData.map((item) => ({ name: item.channel_name, value: item.scam_score }));
const victimReportData = sampleData.map((item) => ({ name: item.channel_name, value: item.victim_reports }));
const flaggedChannels = sampleData.filter((item) => item.flag).length;
const safeChannels = sampleData.length - flaggedChannels;
const COLORS = ["#FF5733", "#1DB954", "#FFC300", "#007BFF", "#8A2BE2", "#FF6347", "#20B2AA", "#FF4500", "#708090", "#2E8B57"];

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setOpenSnackbar(true);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-darkBg text-textLight" : "bg-lightBg text-textDark"}`}>
      {/* Snackbar Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: "100%" }}>
          Welcome to the Scam Analysis Dashboard!
        </Alert>
      </Snackbar>
  
       {/* Header (Navbar-like with theme toggle on the right) */}
       <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid',
          borderColor: isDarkMode ? '#4a4a4a' : '#e0e0e0',
          backgroundColor: isDarkMode ? '#212121' : '#fff',
        }}
      >
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            src={tnPoliceLogo}
            alt="Logo"
            style={{
              width: '64px',
              height: '64px',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: isDarkMode ? '#ffffff' : '#212121',
              transition: 'color 0.3s, transform 0.3s',
              '&:hover': { color: '#1E88E5', transform: 'scale(1.05)' },
            }}
          >
            TeleScam Analysis Dashboard
          </Typography>
        </div>

        {/* Theme Toggle Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
              '&:hover': { backgroundColor: isDarkMode ? '#555' : '#ddd' },
            }}
          >
            {isDarkMode ? <BiSun size={28} /> : <BiMoon size={28} />}
          </IconButton>
        </div>
      </Container>
  
      {/* Main Layout */}
      <Container className="main-container grid grid-cols-1 md:grid-cols-12 gap-4 py-8">
       {/* Left Panel: Summary */}
<Box className="left-panel md:col-span-4 border-r border-gray-300 dark:border-gray-700 pr-4 ">
  <Typography variant="h5" className="text-lg font-bold mb-4">Summary</Typography>
  <Grid container spacing={2}>
    {/* Total Channels */}
    <Grid item xs={12} sm={6}>
      <Card
        className="summary-card bg-blue-100 dark:bg-blue-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
        sx={{ borderLeft: "4px solid #1E88E5", borderRadius: "8px" }}
      >
        <CardContent className="flex items-center space-x-4">
          <Avatar sx={{ bgcolor: "#1E88E5", width: 56, height: 56 }} className="shadow-lg">
            <BiBarChart size={28} color="white" />
          </Avatar>
          <Box>
            <Typography className="text-blue-700 dark:text-blue-300 text-lg font-semibold hover:text-blue-500 transition-colors duration-200">
              Total Channels
            </Typography>
            <Typography className="text-2xl font-bold text-blue-800 dark:text-blue-100">{sampleData.length}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    {/* Flagged Channels */}
    <Grid item xs={12} sm={6}>
      <Card
        className="summary-card bg-red-100 dark:bg-red-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
        sx={{ borderLeft: "4px solid #E53935", borderRadius: "8px" }}
      >
        <CardContent className="flex items-center space-x-4">
          <Avatar sx={{ bgcolor: "#E53935", width: 56, height: 56 }} className="shadow-lg">
            <BiError size={28} color="white" />
          </Avatar>
          <Box>
            <Typography className="text-red-700 dark:text-red-300 text-lg font-semibold hover:text-red-500 transition-colors duration-200">
              Flagged Channels
            </Typography>
            <Typography className="text-2xl font-bold text-red-800 dark:text-red-100">{flaggedChannels}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    {/* Safe Channels */}
    <Grid item xs={12} sm={6}>
      <Card
        className="summary-card bg-green-100 dark:bg-green-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
        sx={{ borderLeft: "4px solid #43A047", borderRadius: "8px" }}
      >
        <CardContent className="flex items-center space-x-4">
          <Avatar sx={{ bgcolor: "#43A047", width: 56, height: 56 }} className="shadow-lg">
            <BiCheck size={28} color="white" />
          </Avatar>
          <Box>
            <Typography className="text-green-700 dark:text-green-300 text-lg font-semibold hover:text-green-500 transition-colors duration-200">
              Safe Channels
            </Typography>
            <Typography className="text-2xl font-bold text-green-800 dark:text-green-100">{safeChannels}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    {/* Total Reports */}
    <Grid item xs={12} sm={6}>
      <Card
        className="summary-card bg-yellow-100 dark:bg-yellow-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
        sx={{ borderLeft: "4px solid #FDD835", borderRadius: "8px" }}
      >
        <CardContent className="flex items-center space-x-4">
          <Avatar sx={{ bgcolor: "#FDD835", width: 56, height: 56 }} className="shadow-lg">
            <BiMessageSquareDots size={28} color="white" />
          </Avatar>
          <Box>
            <Typography className="text-yellow-700 dark:text-yellow-300 text-lg font-semibold hover:text-yellow-500 transition-colors duration-200">
              Total Reports
            </Typography>
            <Typography className="text-2xl font-bold text-yellow-800 dark:text-yellow-100">
              {sampleData.reduce((acc, item) => acc + item.victim_reports, 0)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>

        {/* Right Panel: Analysis */}
        <Box className="right-panel md:col-span-8 pl-4">
          <Typography variant="h5" className="text-lg font-bold mb-4">Analysis</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card className="bg-cardLight dark:bg-cardDark p-4">
                <Typography className="chart-title text-lg font-bold mb-4">Scam Score Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={scamScoreData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {scamScoreData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="bg-cardLight dark:bg-cardDark p-4">
                <Typography className="chart-title text-lg font-bold mb-4">Victim Reports per Channel</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={victimReportData}>
                    <XAxis dataKey="name" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Bar dataKey="value" fill="#1DB954" radius={[10, 10, 0, 0]} />
                    <Tooltip />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="bg-cardLight dark:bg-cardDark p-4">
                <Typography className="chart-title text-lg font-bold mb-4">Channel Scam Scores Radar</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={scamScoreData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" stroke="currentColor" />
                    <PolarRadiusAxis stroke="currentColor" />
                    <Radar name="Scam Score" dataKey="value" stroke="#FF5733" fill="#FF5733" fillOpacity={0.6} />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="bg-cardLight dark:bg-cardDark p-4">
                <Typography className="chart-title text-lg font-bold mb-4">Channel Victim Reports Line Chart</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={victimReportData}>
                    <XAxis dataKey="name" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Line type="monotone" dataKey="value" stroke="#007BFF" strokeWidth={2} />
                    <Tooltip />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );   
};

export default Dashboard;