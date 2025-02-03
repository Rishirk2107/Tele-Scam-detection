import { useState, useEffect } from "react";
import { Box, Container, Paper } from "@mui/material";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import DataVisualization from "./components/DataVisualization";
import SnackbarNotification from "./components/SnackbarNotification";
import {
  fetchOverviewData,
  fetchScamTypes,
  fetchMessageAnalysis,
  fetchTopScamGrowthData,
  fetchScammersData,
  fetchChannelsData,
} from "./api/api";
import "./styles/theme.css";

const Dashboard = ({ setScammersData, setChannelsData }) => {
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
  const [data, setData] = useState([]);
  const [topScamGrowthData, setTopScamGrowthData] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    setOpenSnackbar(true);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const overview = await fetchOverviewData();
        setOverviewData({
          totalMessagesAnalyzed: overview.total_messages_analyzed,
          totalChannelsAnalyzed: overview.total_channels_analyzed,
          totalScamChannelsDetected: overview.total_scam_channels_detected,
        });

        const sortedScams = (overview.total_scams || []).sort((a, b) => b.count - a.count).slice(0, 6);
        setTopScams(sortedScams);

        const scamTypes = await fetchScamTypes();
        setScamTypesData(scamTypes);

        const allGrowthData = await fetchTopScamGrowthData();
        const topScamNames = sortedScams.map((scam) => scam._id);
        const topScamGrowthData = allGrowthData.filter((data) => topScamNames.includes(data.scam_type));
        setTopScamGrowthData(topScamGrowthData);

        const messageAnalysis = await fetchMessageAnalysis();
        setData(messageAnalysis.map((item) => ({ name: item.date, totalMessages: item.no_of_messages, scamMessages: item.scam_messages })));

        const scammersDataResponse = await fetchScammersData();
        setScammersData(scammersDataResponse);

        const channelsDataResponse = await fetchChannelsData();
        setChannelsData(channelsDataResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <SnackbarNotification open={openSnackbar} onClose={handleCloseSnackbar} />
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8" component="main">
        {/* Summary Cards with Glassmorphism Effect */}
        <Paper
          elevation={3}
          className={`col-span-12 lg:col-span-12 p-6 rounded-lg shadow-lg ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-md bg-opacity-80 border border-gray-700"
              : "bg-gradient-to-br from-white to-gray-50 backdrop-blur-md bg-opacity-80 border border-gray-200"
          }`}
        >
          <SummaryCards overviewData={overviewData} topScams={topScams} isDarkMode={isDarkMode} />
        </Paper>

        {/* Data Visualization with Enhanced Charts */}
        <Paper
          elevation={3}
          className={`col-span-12 lg:col-span-8 p-6 rounded-lg shadow-lg ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-md bg-opacity-80 border border-gray-700"
              : "bg-gradient-to-br from-white to-gray-50 backdrop-blur-md bg-opacity-80 border border-gray-200"
          }`}
        >
          <DataVisualization scamTypesData={scamTypesData} topScamGrowthData={topScamGrowthData} data={data} isDarkMode={isDarkMode} />
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;