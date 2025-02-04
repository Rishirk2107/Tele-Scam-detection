import React from "react";
import { Container, Box, Typography, Card, Grid } from "@mui/material";
import Chart from "react-apexcharts";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const DataVisualization = ({ topScamGrowthData, scamTypesData, data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF3333"];
    // Default to empty array if scamTypesData is undefined or null
  const safeScamTypesData = scamTypesData || [];
  const topScamGrowth = topScamGrowthData || [];
  const scamTypes = Object.keys(topScamGrowthData[0] || {}).filter(key => key !== "date");
  console.log(scamTypes)
  // Apex Pie Chart Configuration
  const pieOptions = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1000,
      },
      toolbar: {
        show: true, // Adds a toolbar for exporting and zoom
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 4,
        opacity: 0.3,
      },
    },
    labels: safeScamTypesData.map((item) => item.scam_type),
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      labels: {
        colors: "#6B7280",
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },
    colors: COLORS,
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              color: "#6B7280",
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 700,
              color: "#374151",
            },
            total: {
              show: true,
              label: "Total",
              color: "#4B5563",
              fontSize: "18px",
              fontWeight: 700,
              formatter: () =>
                safeScamTypesData.reduce((sum, item) => sum + item.count, 0),
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val} cases`, // Custom tooltip format
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: "90%",
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const pieSeries = safeScamTypesData.map((item) => item.count);

  return (
      <Container className="main-container grid grid-cols-1 md:grid-cols-12 gap-8 py-12">
        {/* Large Pie Chart Section */}<br></br>
        <Box className="w-full md:col-span-12">
          <Card className="relative p-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            {/* Typography Title Positioned Absolutely on Top */}
            <Typography
              variant="h6"
              className="absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-center"
              style={{
                color: "#FF5733", // Bright color for contrast
                fontSize: "24px", // Larger font size for readability
                fontWeight: 700, // Bold for emphasis
                letterSpacing: "1px", // Slight spacing for better legibility
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Shadow for visibility
                // backgroundColor: "rgba(255, 255, 255, 0.8)", // Subtle background for clarity
                padding: "8px 16px", // Padding for better spacing
                borderRadius: "12px", // Rounded edges for elegance
                zIndex: 10, // Ensure it stays above the chart
              }}
            >
              Scam Type Distribution
            </Typography>
    
            {/* Donut Chart */}
            <div className="flex justify-center mt-12">
              <Chart
                options={pieOptions}
                series={pieSeries}
                type="donut"
                height={450}
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Card>
        </Box><br></br>
        <Box className="w-full md:col-span-12">
  <Card
    className="relative p-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
    style={{
      border: "2px solid #FF5733",
      borderRadius: "15px",
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
    }}
  >
    {/* Typography Title Positioned Absolutely on Top */}
    <Typography
      variant="h6"
      className="absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-center"
      style={{
        color: "#FF5733", // Bright color for contrast
        fontSize: "24px", // Larger font size for readability
        fontWeight: 700, // Bold for emphasis
        letterSpacing: "1px", // Slight spacing for better legibility
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Shadow for visibility
        // backgroundColor: "rgba(255, 255, 255, 0.8)", // Subtle background for clarity
        padding: "8px 16px", // Padding for better spacing
        borderRadius: "12px", // Rounded edges for elegance
        zIndex: 10, // Ensure it stays above the chart
      }}
    >
      Channel Scam Scores Radar
    </Typography>

    {/* Radar Chart */}
    <div className="flex justify-center mt-12">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={safeScamTypesData}>
          <PolarGrid stroke="#ddd" strokeDasharray="4 4" strokeWidth={2} />
          <PolarAngleAxis
            dataKey="scam_type"
            tick={{
              fill: "#9A2A2A",
              fontSize: 12,
              fontWeight: 500,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "3px 6px ",
              borderRadius: "3px",
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }} tickSize={10}
          />
          <PolarRadiusAxis tick={{ fill: "#fff", fontSize: 12 }} tickCount={6} stroke="#fff" />
          <Radar
            name="Scam Score"
            dataKey="count"
            stroke="#008080"
            fill="url(#radarGradient)"
            fillOpacity={0.85}
            strokeWidth={4}
            connectNulls
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              borderRadius: "5px",
              color: "#fff",
              fontSize: "14px",
              padding: "10px",
              opacity: 0.85,
              transition: "opacity 0.3s ease-in-out",
            }}
            cursor={{ stroke: "#FF5733", strokeWidth: 2 }}
          />
          <Legend
            wrapperStyle={{
              color: "#fff",
              textAlign: "center",
              marginTop: "10px",
              fontSize: "16px",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </Card>
</Box>

<br></br>
  <Box className="w-full md:col-span-12">
  <Card
    className="relative p-8 bg-gradient-to-br from-gray-200 via-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
    style={{
      borderRadius: "16px",
      width: "100%",
      maxWidth: "100%",  // Extend the card horizontally
    }}
  >
    {/* Typography Title Positioned Absolutely on Top */}
    <Typography
      variant="h6"
      className="absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-center"
      style={{
        color: "#FF5733", // Bright color for contrast
        fontSize: "24px", // Larger font size for readability
        fontWeight: 700, // Bold for emphasis
        letterSpacing: "1px", // Slight spacing for better legibility
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Shadow for visibility
        // backgroundColor: "rgba(255, 255, 255, 0.8)", // Subtle background for clarity
        padding: "8px 16px", // Padding for better spacing
        borderRadius: "12px", // Rounded edges for elegance
        zIndex: 10, // Ensure it stays above the chart
      }}
    >
      Total vs Scam Messages per Day
    </Typography>

    {/* Bar Chart */}
    <div className="flex justify-center mt-12">
      <ResponsiveContainer width="95%" height={400}>  {/* Adjust width to extend more horizontally */}
        <BarChart data={data} margin={{ top: 60, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4CAF50" stopOpacity={0.4} />
            </linearGradient>
            <linearGradient id="colorScam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5722" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#FF5722" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 12, fill: "#6B7280" }} tickLine={false} />
          <YAxis stroke="#9CA3AF" tick={{ fontSize: 12, fill: "#6B7280" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              borderRadius: "8px",
              color: "#FFF",
              border: "none",
            }}
            labelStyle={{ color: "#9CA3AF" }}
          />
          <Legend
            iconSize={12}
            iconType="circle"
            wrapperStyle={{
              marginTop: "-10px",
              fontSize: "14px",
              color: "#6B7280",
            }}
          />
          <Bar
            dataKey="totalMessages"
            name="Total Messages"
            fill="url(#colorTotal)"
            stackId="a"
            radius={[8, 8, 0, 0]}
            barSize={18}
            label={{
              position: "top",
              fill: "#fff",
              fontSize: 12,
              fontWeight: "bold",
            }}
            isAnimationActive
          />
          <Bar
            dataKey="scamMessages"
            name="Scam Messages"
            fill="url(#colorScam)"
            stackId="a"
            radius={[8, 8, 0, 0]}
            barSize={18}
            label={{
              position: "top",
              fill: "#fff",
              fontSize: 12,
              fontWeight: "bold",
            }}
            isAnimationActive
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Card>
</Box>
<br></br>
<Grid item xs={12} direction="column" alignItems={"center"}>
  <Card className="relative p-8 shadow-3xl rounded-3xl border border-gray-500 overflow-hidden bg-gradient-to-br from-[#104f4f] via-[#0e678c] to-[#013d36]">
    {/* Dark Overlay for Better Readability */}
    <div className="absolute inset-0 bg-black opacity-70 rounded-3xl"></div>

    {/* Title with Improved Styling */}
    <Typography
      variant="h6"
      className="absolute top-4 left-1/2 transform -translate-x-1/2 font-extrabold text-center"
      style={{
        color: "#FF6B35",
        fontSize: "26px",
        fontWeight: 800,
        letterSpacing: "1.2px",
        textShadow: "3px 3px 6px rgba(0, 0, 0, 0.4)",
        padding: "10px 20px",
        borderRadius: "15px",
        zIndex: 10,
      }}
    >
      Growth of Top 5 Scams
    </Typography>
    {/* Chart Container */}
    <ResponsiveContainer width="100%" height={400} className="relative z-10">
      <LineChart
        data={topScamGrowth.filter((_, index) => index % 2 === 0)}
        margin={{ top: 20, right: 40, left: 20, bottom: 30 }}
      >
        {/* Gradient for Line */}
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ffa2" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#007bff" stopOpacity={0.5} />
          </linearGradient>
        </defs>

        {/* X-Axis with Black Text */}
        <XAxis
          dataKey="date"
          tick={{ fill: "orange", fontSize: 14, fontWeight: "bold" }}
          axisLine={{ stroke: "brown", strokeWidth: 2 }}
          tickLine={{ stroke: "brown", strokeWidth: 2 }}
        />

        {/* Y-Axis with Black Text */}
        <YAxis
          tick={{ fill: "orange", fontSize: 14, fontWeight: "bold" }}
          axisLine={{ stroke: "brown", strokeWidth: 2 }}
          tickLine={{ stroke: "brown", strokeWidth: 2 }}
        />

        {/* Tooltip with Black Text */}
        <Tooltip
  contentStyle={{
    backgroundColor: "#333", // Dark background for readability
    color: "#fff", // White text
    fontSize: "14px", // Set the font size
    borderRadius: "10px", // Rounded corners for the tooltip
    padding: "12px", // Add padding to prevent text from touching edges
    border: "1px solid #ff6b35", // A light border color for contrast
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Add a shadow for depth
    transition: "all 0.3s ease", // Smooth transition when appearing/disappearing
  }}
  itemStyle={{
    fontWeight: "bold", // Make the text bold for better emphasis
    color: "#fff", // Set text color to white
  }}
  cursor={{
    stroke: "#FF5733", // Change cursor color when hovering
    strokeDasharray: "3 3", // Add dashes to the cursor
  }}
/>


        {/* Legend with Black Text */}
        <Legend
          wrapperStyle={{
            color: "#000000",
            fontSize: "15px",
            fontWeight: "bold",
            textAlign: "center",
          }}
          align="center"
          verticalAlign="bottom"
          iconType="circle"
        />

        {/* Animated Dynamic Lines for Each Scam Type */}
        {/* {[...new Set(topScamGrowth.map((data) => data.scam_type))].map((scamType,index)=>( */}
        {Object.keys(topScamGrowthData[0] || {})
      .filter((key) => key !== "date") // Exclude the "date" key
      .map((scamType, index) => (
          <Line
              key={scamType}
              type="monotone"
              dataKey={scamType} // Use the scam type as the dataKey
              stroke={COLORS[index % COLORS.length]} // Assign a unique color
              strokeWidth={4}
              dot={{
                r: 6,
                fill: COLORS[index % COLORS.length],
                stroke: "#000000",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 10,
                fill: COLORS[index % COLORS.length],
                stroke: "#000000",
                strokeWidth: 2,
              }}
              isAnimationActive={true} // Enables animation
              animationDuration={1500} // Smooth animation effect
              animationEasing="ease-in-out" // Easing effect
            />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </Card>
</Grid>
<br></br>
    </Container>
  );
};

export default DataVisualization;