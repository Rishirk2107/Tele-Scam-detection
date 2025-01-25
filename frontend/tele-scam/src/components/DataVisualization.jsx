import { Container, Box, Typography, Card, Grid } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const DataVisualization = ({ scamTrendsData, scamTypesData, data }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ff0000", "#00ff00", "#0000ff"];

  // Default to empty array if scamTypesData is undefined or null
  const safeScamTypesData = scamTypesData || [];
  
  return (
    <Container className="main-container grid grid-cols-1 md:grid-cols-12 gap-4 py-8">
      <Box className="right-panel md:col-span-8 pl-4">
        <Typography variant="h5" className="text-lg font-bold mb-4">Analysis</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card className="bg-cardLight dark:bg-cardDark p-4">
              <Typography className="chart-title text-lg font-bold mb-4">Scam Type Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie 
                    data={safeScamTypesData} 
                    dataKey="count" 
                    nameKey="scam_type" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    label
                  >
                    {safeScamTypesData.length > 0 && safeScamTypesData.map((_, index) => (
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
                <RadarChart data={safeScamTypesData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="scam_type" />
                  <PolarRadiusAxis />
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
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={scamTrendsData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="scamMessages" stroke="#8884d8" />
                  <Line type="monotone" dataKey="totalMessages" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DataVisualization;
