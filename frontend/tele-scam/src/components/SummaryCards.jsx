import { Grid, Card, CardContent, Typography, Avatar, Box, Container, Chip } from "@mui/material";
import { BiBarChart, BiError, BiCheck } from "react-icons/bi";
import SecurityIcon from "@mui/icons-material/Security"; // Import for SecurityIcon
import FlagIcon from "@mui/icons-material/Flag"; // Import for FlagIcon (for scam flags)
import PhishingIcon from "@mui/icons-material/Phishing";
const SummaryCards = ({ overviewData, topScams }) => (
  <Container className="main-container grid grid-cols-1 md:grid-cols-12 gap-4 py-8">
    {/* Left Panel: Summary */}<br></br>
    <Box className="left-panel md:col-span-4 border-r border-gray-300 dark:border-gray-700 pr-4 ">
    <Typography 
  variant="h5" 
  className="text-4xl font-extrabold text-center mb-8"
  sx={{
    fontSize: '2.25rem', 
    fontWeight: 'bold', 
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1.75px',
    padding: '15px 30px',
    background: 'linear-gradient(90deg, #E53935 0%, #1976D2 100%)', 
    borderRadius: '16px', 
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', 
    color: 'black', 
    fontFamily: 'courier-new',
    border: 'none',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)', 
  }}
>
  Real-Time Overview
</Typography><br></br>

      <Grid container spacing={4} justifyContent="space-between">
        {/* Total Messages Analyzed */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className="summary-card bg-blue-100 dark:bg-blue-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
            sx={{
              borderLeft: "4px solid #1E88E5",
              borderRadius: "8px",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CardContent className="flex items-center space-x-4 justify-between">
              <Avatar sx={{ bgcolor: "#1E88E5", width: 56, height: 56 }} className="shadow-lg">
                <BiBarChart size={28} color="white" />
              </Avatar>
              <Box className="flex flex-col justify-center">
                <Typography className="text-blue-700 dark:text-blue-300 text-lg font-semibold hover:text-blue-500 transition-colors duration-200">
                  Total Messages Analyzed
                </Typography>
                <Typography className="text-2xl font-bold text-blue-800 dark:text-blue-100">
                  {overviewData.totalMessagesAnalyzed}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Channels Analyzed */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className="summary-card bg-red-100 dark:bg-red-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
            sx={{
              borderLeft: "4px solid #E53935",
              borderRadius: "8px",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CardContent className="flex items-center space-x-4 justify-between">
              <Avatar sx={{ bgcolor: "#E53935", width: 56, height: 56 }} className="shadow-lg">
                <BiError size={28} color="white" />
              </Avatar>
              <Box className="flex flex-col justify-center">
                <Typography className="text-red-700 dark:text-red-300 text-lg font-semibold hover:text-red-500 transition-colors duration-200">
                  Total Channels Analyzed
                </Typography>
                <Typography className="text-2xl font-bold text-red-800 dark:text-red-100">
                  {overviewData.totalChannelsAnalyzed}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Scam Channels */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className="summary-card bg-green-100 dark:bg-green-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
            sx={{
              borderLeft: "4px solid #43A047",
              borderRadius: "8px",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CardContent className="flex items-center space-x-4 justify-between">
              <Avatar sx={{ bgcolor: "#43A047", width: 56, height: 56 }} className="shadow-lg">
                <BiCheck size={28} color="white" />
              </Avatar>
              <Box className="flex flex-col justify-center">
                <Typography className="text-green-700 dark:text-green-300 text-lg font-semibold hover:text-green-500 transition-colors duration-200">
                  Total Scam Channels
                </Typography>
                <Typography className="text-2xl font-bold text-green-800 dark:text-green-100">
                  {overviewData.totalScamChannelsDetected}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* New Card for More Info */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <Card
            className="summary-card bg-teal-100 dark:bg-teal-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
            sx={{
              borderLeft: "4px solid #009688",
              borderRadius: "8px",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CardContent className="flex items-center space-x-4 justify-between">
              <Avatar sx={{ bgcolor: "#009688", width: 56, height: 56 }} className="shadow-lg">
                <BiBarChart size={28} color="white" />
              </Avatar>
              <Box className="flex flex-col justify-center">
                <Typography className="text-teal-700 dark:text-teal-300 text-lg font-semibold hover:text-teal-500 transition-colors duration-200">
                  Additional Info
                </Typography>
                <Typography className="text-2xl font-bold text-teal-800 dark:text-teal-100">
                  More Details
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}

        {/* Top Scams */}
        {topScams?.length > 0 &&
          topScams.map((scam, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                className="summary-card bg-red-100 dark:bg-red-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
                sx={{
                  borderLeft: "4px solid #C70039",
                  borderRadius: "8px",
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardContent className="flex items-center space-x-4 justify-between">
                  <Avatar sx={{ bgcolor: "#C70039", width: 56, height: 56 }} className="shadow-lg">
                    <SecurityIcon sx={{ color: "white" }} />
                  </Avatar>
                  <Box className="flex flex-col justify-center">
                    <Typography className="text-red-700 dark:text-red-300 text-lg font-semibold hover:text-red-500 transition-colors duration-200">
                      {scam._id || "Unknown Scam"}
                    </Typography>
                    <Typography className="text-2xl font-bold text-red-800 dark:text-red-100">
                      {scam.count}
                    </Typography>
                    <Chip
                      label="Scam"
                      color="error"
                      icon={<FlagIcon />}
                      sx={{
                        mt: 2,
                        backgroundColor: "#000080", // Replaced yellow with teal
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        borderRadius: "4px",
                      }}
                    />
                    <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                      <FlagIcon sx={{ marginRight: "8px", color: "red", fontSize: "1.5rem" }} />
                      <Typography variant="body2" sx={{ color: "#008080", fontWeight: "bold" }}>
                        High Priority
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  </Container>
);

export default SummaryCards;
