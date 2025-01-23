import React from "react";
import { Box, Typography, Grid, Card, CardContent, Chip, Avatar, Container } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis } from "recharts";

const sampleData = [
  { channel_id: "CH001", channel_name: "Crypto Scam", flag: true, victim_reports: 15, scam_score: 85, red_flag: "Fake Investment" },
  { channel_id: "CH002", channel_name: "Safe Channel", flag: false, victim_reports: 0, scam_score: 20, red_flag: "None" },
  { channel_id: "CH003", channel_name: "Bank Fraud", flag: true, victim_reports: 7, scam_score: 78, red_flag: "Fake Calls" },
  { channel_id: "CH004", channel_name: "Phishing Attack", flag: true, victim_reports: 12, scam_score: 90, red_flag: "Credential Theft" },
  { channel_id: "CH005", channel_name: "Lottery Scam", flag: true, victim_reports: 9, scam_score: 80, red_flag: "False Promises" },
  { channel_id: "CH006", channel_name: "Fraudulent E-commerce", flag: true, victim_reports: 5, scam_score: 70, red_flag: "Fake Products" },
  { channel_id: "CH007", channel_name: "Spam Calls", flag: false, victim_reports: 3, scam_score: 30, red_flag: "Spam" },
  { channel_id: "CH008", channel_name: "Investment Fraud", flag: true, victim_reports: 10, scam_score: 88, red_flag: "Ponzi Scheme" },
  { channel_id: "CH009", channel_name: "Identity Theft", flag: true, victim_reports: 11, scam_score: 92, red_flag: "Personal Data Breach" },
  { channel_id: "CH010", channel_name: "Fake Tech Support", flag: true, victim_reports: 8, scam_score: 75, red_flag: "Remote Access" }
];

const scamScoreData = sampleData.map((item) => ({ name: item.channel_name, value: item.scam_score }));
const victimReportData = sampleData.map((item) => ({ name: item.channel_name, value: item.victim_reports }));
const COLORS = ["#FF5733", "#1DB954", "#FFC300", "#C70039", "#900C3F", "#581845", "#28B463", "#2E86C1", "#D68910", "#A569BD"];

const Dashboard = () => {
  return (
    <Box sx={{ background: "#121212", minHeight: "100vh", p: 4, color: "#fff" }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 4, fontWeight: "bold", color: "#1DB954" }}>
        Scam Analysis Dashboard
      </Typography>

      <Grid container spacing={3}>
        {sampleData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.channel_id}>
            <Card sx={{ background: item.flag ? "#ff1744" : "#1DB954", color: "#fff", borderRadius: 3, boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{item.channel_name}</Typography>
                <Typography variant="subtitle1">Reports: {item.victim_reports}</Typography>
                <Typography variant="subtitle1">Scam Score: {item.scam_score}</Typography>
                <Chip label={item.flag ? "Flagged" : "Safe"} color={item.flag ? "error" : "success"} icon={item.flag ? <SecurityIcon /> : <CheckCircleIcon />} sx={{ fontSize: 14, mt: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>Scam Score Analysis</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={scamScoreData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
              {scamScoreData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <Typography variant="h4" sx={{ mt: 6, mb: 3, textAlign: "center" }}>Victim Reports Analysis</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={victimReportData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Bar dataKey="value" fill="#1DB954" />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </Container>
    </Box>
  );
};

export default Dashboard;
