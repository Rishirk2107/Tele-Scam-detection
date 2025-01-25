import { Grid, Card, CardContent, Typography, Avatar, Box, Container, Chip } from "@mui/material";
import { BiBarChart, BiError, BiCheck } from "react-icons/bi";
import SecurityIcon from "@mui/icons-material/Security"; // Import for SecurityIcon

const SummaryCards = ({ overviewData, topScams }) => (
  <Container className="main-container grid grid-cols-1 md:grid-cols-12 gap-4 py-8">
    {/* Left Panel: Summary */}
    <Box className="left-panel md:col-span-4 border-r border-gray-300 dark:border-gray-700 pr-4 ">
      <Typography variant="h5" className="text-lg font-bold mb-4">Summary</Typography>
      <Grid container spacing={2}>
        {/* Total Messages Analyzed */}
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
                <Typography className="text-2xl font-bold text-blue-800 dark:text-blue-100">
                  {overviewData.totalMessagesAnalyzed}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Channels Analyzed */}
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
                <Typography className="text-2xl font-bold text-red-800 dark:text-red-100">
                  {overviewData.totalChannelsAnalyzed}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Scam Channels */}
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
                <Typography className="text-2xl font-bold text-green-800 dark:text-green-100">
                  {overviewData.totalScamChannelsDetected}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Scams */}
        {topScams?.length > 0 &&
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
  </Container>
);

export default SummaryCards;
