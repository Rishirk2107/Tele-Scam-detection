import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import DataVisualization from "./components/DataVisualization";
import DetailsTable from "./components/DetailsTable";
import SnackbarNotification from "./components/SnackbarNotification";
import { fetchOverviewData, fetchScamTypes, fetchMessageAnalysis, fetchScamGrowthData, fetchScammersData, fetchChannelsData } from "./api/api";
import "./styles/theme.css";

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
        const sortedScams = (overview.total_scams || [])
        .sort((a, b) => b.count - a.count) // Sort in descending order by count
        .slice(0, 5); // Take the top 5 scams

      setTopScams(sortedScams);

      const scamTypes = await fetchScamTypes();
      setScamTypesData(scamTypes);

      const scamGrowthData = await fetchScamGrowthData(
        sortedScams.map((scam) => scam.name)
      );
      setScamGrowthData(scamGrowthData);

      const messageAnalysis = await fetchMessageAnalysis();
      const formattedData = messageAnalysis.map((item) => ({
        name: item.date,
        totalMessages: item.no_of_messages,
        scamMessages: item.scam_messages,
      }));
      setData(formattedData);

      const scammersData = await fetchScammersData();
      console.log(scammersData)
      setScammersData(scammersData);

      const channelData = await fetchChannelsData();
      setChannelsData(channelData);

    } catch(error){
      console.error("Error fetching data:", error);
    }
  }; fetchData();
}, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-darkBg text-textLight" : "bg-lightBg text-textDark"}`}>
      <SnackbarNotification open={openSnackbar} onClose={handleCloseSnackbar} />
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Container className="main-container py-8">
        <SummaryCards overviewData={overviewData} topScams={topScams} />
        <DataVisualization
          scamTypesData={scamTypesData}
          scamGrowthData={scamGrowthData}
          data={data}
        />
        <DetailsTable
          scammersData={scammersData}
          channelsData={channelsData}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;

