import  { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Container,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { BiMoon, BiSun } from "react-icons/bi"; 
import { BiBarChart, BiError, BiCheck, BiMessageSquareDots } from "react-icons/bi";// React Icons for theme toggle
import SecurityIcon from '@mui/icons-material/Security';
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
import axios from "axios";

const COLORS = ["#FF5733", "#1DB954", "#FFC300", "#007BFF", "#8A2BE2", "#FF6347", "#20B2AA", "#FF4500", "#708090", "#2E8B57"];

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [overviewData, setOverviewData] = useState({
    totalMessagesAnalyzed: 0,
    totalChannelsAnalyzed: 0,
    totalScamChannelsDetected: 0,
    totalReports: 0,
  });
  const [topScams, setTopScams] = useState([]);
  const [scamTypesData, setScamTypesData] = useState([]);
  const [scamTrendsData, setScamTrendsData] = useState([]);
  const [data, setData] = useState([]);
  const [scamGrowthData, setScamGrowthData] = useState([]);
  const [scammersData, setScammersData] = useState([]);
  const [channelsData, setChannelsData] = useState([]);

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

  useEffect(() => {
    // Fetch data from the backend API
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get("http://18.60.211.200:8000/api/overview");
        const data = response.data[0];

         // Set overview data
         setOverviewData({
          totalMessagesAnalyzed: data.total_messages_analyzed,
          totalChannelsAnalyzed: data.total_channels_analyzed,
          totalScamChannelsDetected: data.total_scam_channels_detected,
        });

        // Sort scams by count in descending order and set the top 5 scams
        setTopScams(
          data.total_scams
            .sort((a, b) => b.count - a.count) // Sort by count in descending order
            .slice(0, 5) // Get the top 5 scams
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOverviewData();
  }, []);

  useEffect(() => {
    const fetchScamTypes = async () => {
      try {
        const response = await axios.get('http://18.60.211.200:8000/api/scam-types');
        setScamTypesData(response.data);
      } catch (error) {
        console.error('Error fetching scam types data:', error);
      }
    };

    fetchScamTypes();
  }, []);

  useEffect(() => {
    const fetchScamGrowth = async () => {
      try {
        const response = await fetch('http://18.60.211.200:8000/api/scam-trends');
        const data = await response.json();
        setScamTrendsData(data);
      } catch (error) {
        console.error('Error fetching scam trends:', error);
      }
    };

    fetchScamGrowth();
  }, []);

  // const prepareChartData = () => {
  //   const chartData = [];
  //   scamTrendsData.forEach(scam => {
  //     scam.scam_data.forEach(item => {
  //       chartData.push({
  //         scam_type: scam.scam_type,
  //         date: item.date,
  //         count: item.count,
  //       });
  //     });
  //   });
  //   return chartData;
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://18.60.211.200:8000/api/message-analysis'); // Replace with your backend URL
        const formattedData = response.data.map((item) => ({
          name: item.date,
          totalMessages: item.no_of_messages,
          scamMessages: item.scam_messages,
        }));
        setData(formattedData);
      } catch (err) {
        console.error('Error fetching scam trends:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch scam growth data for the top 5 scams
    const fetchScamGrowthData = async () => {
      try {
        const response = await axios.get("http://18.60.211.200:8000/api/top_scam_growth");
        const growthData = response.data;
        
        // Filter growth data for only the top scams
        const filteredData = growthData.filter((item) =>
          topScams.forEach((scam) =>
            scam._id.trim().toLowerCase() === item.scam_type.trim().toLowerCase()
          )
        );
        console.log(growthData)
        console.log(topScams)

        setScamGrowthData(filteredData);
      } catch (error) {
        console.error("Error fetching scam growth data:", error);
      }
    };

    if (topScams.length > 0) {
      fetchScamGrowthData();
    }
  }, [topScams]);

  useEffect(() => {
    // Fetch scammers data
    const fetchScammersData = async () => {
      try {
        const response = await axios.get("http://18.60.211.200:8000/api/scammers");
        setScammersData(response.data);
      } catch (error) {
        console.error("Error fetching scammers data:", error);
      }
    };

    // Fetch scam channels data
    const fetchChannelsData = async () => {
      try {
        const response = await axios.get("http://18.60.211.200:8000/api/scam-channels");
        setChannelsData(response.data);
      } catch (error) {
        console.error("Error fetching channels data:", error);
      }
    };

    fetchScammersData();
    fetchChannelsData();
  }, []);

  const formattedData = [];
  const uniqueDates = [...new Set(scamGrowthData.map((item) => item.date))];

  uniqueDates.forEach((date) => {
    const dataPoint = { date };
    topScams.forEach((scam) => {
      const scamData = scamGrowthData.find((item) => item.date === date && item.scam_type === scam);
      dataPoint[scam] = scamData ? scamData.count : 0;
    });
    formattedData.push(dataPoint);
  });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box className={ `min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-darkBg text-textLight" : "bg-lightBg text-textDark"}`}>
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
            Total Messages Analyzed
            </Typography>
            <Typography className="text-2xl font-bold text-blue-800 dark:text-blue-100">{overviewData.totalMessagesAnalyzed}</Typography>
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
            Total Channels Analyzed
            </Typography>
            <Typography className="text-2xl font-bold text-red-800 dark:text-red-100">{overviewData.totalChannelsAnalyzed}</Typography>
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
              Total Scam Channels
            </Typography>
            <Typography className="text-2xl font-bold text-green-800 dark:text-green-100">{overviewData.totalScamChannelsDetected}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
    {topScams.length > 0 &&
          topScams.map((scam, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  background: "#C70039",
                  color: "#fff",
                  borderRadius: 3,
                  boxShadow: 5,
                }}
                >
                  <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {scam._id || "Unknown Scam"}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Count: {scam.count}
                  </Typography>
                  <Chip
                    label="Scam"
                    color="error"
                    icon={<SecurityIcon />}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
  </Grid>
</Box>

        {/* Right Panel: Analysis */}
        <Box className="right-panel md:col-span-8 pl-4">
          <Typography variant="h5" className="text-lg font-bold mb-4">Analysis</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card className="bg-cardLight dark:bg-cardDark p-4">
                <Typography className="chart-title text-lg font-bold mb-4">Scam Type Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={scamTypesData} dataKey="count" nameKey="scam_type" cx="50%" cy="50%" outerRadius={100} label>
                      {scamTypesData.map((_, index) => (
                        <Cell key={`cell-${index}} fill={COLORS[index % COLORS.length]`} />
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
                <Typography className="chart-title text-lg font-bold mb-4">Total vs Scam Messages per Day</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Bar dataKey="totalMessages" fill="#1DB954" radius={[10, 10, 0, 0]} name="Total Messages" />
                    <Bar dataKey="scamMessages" fill="#FF5733" radius={[10, 10, 0, 0]} name="Scam Messages" />
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
                  <RadarChart data={scamTypesData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="count" stroke="currentColor" />
                    <PolarRadiusAxis stroke="currentColor" />
                    <Radar name="Scam Score" dataKey="count" stroke="#FF5733" fill="#FF5733" fillOpacity={0.6} />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="bg-cardLight dark:bg-cardDark p-4">
                <Typography className="chart-title text-lg font-bold mb-4">Growth of Top 5 Scams</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  {formattedData?.length > 0 ? (
                    <LineChart data={formattedData}>
                      <XAxis dataKey="date" stroke="currentColor" />
                      <YAxis stroke="currentColor" />
                      {topScams.map((scam, index) => (
                        <Line
                          key={scam}
                          type="monotone"
                          dataKey={scam} // This must match keys in formattedData
                          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
                          strokeWidth={2}
                        />
                      ))}
                      <Tooltip />
                      <Legend />
                    </LineChart>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No data available to display.
                    </Typography>
                  )}
                </ResponsiveContainer>
              </Card>
            </Grid>
            {/* Display Scammers Table */}
          <Grid item xs={12} md={6}>
            <Card className="bg-cardLight dark:bg-cardDark p-4">
              <Typography className="chart-title text-lg font-bold mb-4">Scammers Data</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Scam Score</TableCell>
                      <TableCell>Scam Count</TableCell>
                      <TableCell>Top Scam</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scammersData.map((scammer, index) => (
                      <TableRow key={index}>
                        <TableCell>{scammer.username}</TableCell>
                        <TableCell>{scammer.scam_score}</TableCell>
                        <TableCell>{scammer.scam_count}</TableCell>
                        <TableCell>{scammer.top_scam}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* Display Scam Channels Table */}
          <Grid item xs={12} md={6}>
            <Card className="bg-cardLight dark:bg-cardDark p-4">
              <Typography className="chart-title text-lg font-bold mb-4">Scam Channels Data</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Channel Name</TableCell>
                      <TableCell>Scam Score</TableCell>
                      <TableCell>Top Scam Type</TableCell>
                      <TableCell>Top Scammer</TableCell>
                      <TableCell>No. of Scam Messages</TableCell>
                      <TableCell>No. of Reports</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {channelsData.map((channel, index) => (
                      <TableRow key={index}>
                        <TableCell>{channel.channel_name}</TableCell>
                        <TableCell>{channel.scam_score}</TableCell>
                        <TableCell>{channel.top_scam_type}</TableCell>
                        <TableCell>{channel.top_scammer}</TableCell>
                        <TableCell>{channel.scam_messages}</TableCell>
                        <TableCell>{channel.no_of_reports}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );   
};

export default Dashboard;