import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Container,
  Box,
  Avatar,
} from "@mui/material";
import tnPoliceLogo from "../assets/tn-police-logo.jpeg";

const ScammersAndChannelsTable = ({ scammersData, channelsData }) => {
  return (
    <>
      {/* Header (Unchanged) */}
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 24px",
          borderBottom: "2px solid #d1d5db",
          background: "linear-gradient(90deg, #0f172a, #1e40af, #2563eb)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Avatar
            src={tnPoliceLogo}
            alt="Logo"
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "4px solid #ffffff",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
              },
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontSize: "2rem",
              fontWeight: "800",
              color: "white",
              textAlign: "center",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              textShadow: "1px 1px 6px rgba(0, 0, 0, 0.5)",
              animation: "glow 3s ease-in-out infinite",
            }}
          >
            TeleScam Analysis Dashboard
          </Typography>
        </Box>
      </Container>

      {/* Tables with Elite Enhancements */}
      <Grid container spacing={4} justifyContent="center">
        {/* Scammers Table */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#ffffff",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Typography
              sx={{
                color: "#333",
                fontSize: "24px",
                fontWeight: "600",
                letterSpacing: "1px",
                textAlign: "center",
                textTransform: "uppercase",
                padding: "16px 0",
                backgroundColor: "#C41E3A",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              Top Scammers
            </Typography>
            <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ color: "#333", fontWeight: "600", borderRight: "1px solid #e0e0e0" }}>
                      Username
                    </TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "600", borderRight: "1px solid #e0e0e0" }}>
                      Scam Score
                    </TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "600", borderRight: "1px solid #e0e0e0" }} align="right">
                      Scam Count
                    </TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "600" }} align="right">
                      Top Scam
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scammersData.map((scammer, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f9f9f9",
                          "& td": {
                            fontWeight: "600",
                            color: "#1e40af",
                          },
                        },
                      }}
                    >
                      <TableCell sx={{ color: "#555", fontWeight: "500", borderRight: "1px solid #e0e0e0" }}>
                        {scammer.username}
                      </TableCell>
                      <TableCell sx={{ color: "#555", fontWeight: "500", borderRight: "1px solid #e0e0e0" }}>
                        {scammer.scam_score}
                      </TableCell>
                      <TableCell sx={{ color: "#555", fontWeight: "500", borderRight: "1px solid #e0e0e0" }} align="right">
                        {scammer.scam_count}
                      </TableCell>
                      <TableCell sx={{ color: "#555", fontWeight: "500" }} align="right">
                        {scammer.top_scam}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Channels Table */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
              backgroundColor: "#ffffff",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Typography
              sx={{
                color: "#333",
                fontSize: "24px",
                fontWeight: "600",
                letterSpacing: "1px",
                textAlign: "center",
                textTransform: "uppercase",
                padding: "16px 0",
                backgroundColor: "#50C878",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              Channel Analysis
            </Typography>
            <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ color: "#333", fontWeight: "600", borderRight: "1px solid #e0e0e0" }}>
                      Channel Name
                    </TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "600", borderRight: "1px solid #e0e0e0" }}>
                      Scam Score
                    </TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "600", borderRight: "1px solid #e0e0e0" }}>
                      Top Scam Type
                    </TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "600", borderRight: "1px solid #e0e0e0" }}>
                      Top Scammer
                    </TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "600", borderRight: "1px solid #e0e0e0" }}>
                      No. of Scam Messages
                    </TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "600" }}>No. of Reports</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {channelsData.map((channel, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f9f9f9",
                          "& td": {
                            fontWeight: "600",
                            color: "#1e40af",
                          },
                        },
                      }}
                    >
                      <TableCell sx={{ color: "#555", fontWeight: "500", borderRight: "1px solid #e0e0e0" }}>
                        {channel.channel_name}
                      </TableCell>
                      <TableCell sx={{ color: "#555", fontWeight: "500", borderRight: "1px solid #e0e0e0" }}>
                        {channel.scam_score}
                      </TableCell>
                      <TableCell sx={{ color: "#555", fontWeight: "500", borderRight: "1px solid #e0e0e0" }}>
                        {channel.top_scam_type}
                      </TableCell>
                      <TableCell sx={{ color: "#555", fontWeight: "500", borderRight: "1px solid #e0e0e0" }}>
                        {channel.top_scammer}
                      </TableCell>
                      <TableCell sx={{ color: "#555", fontWeight: "500", borderRight: "1px solid #e0e0e0" }}>
                        {channel.scam_messages}
                      </TableCell>
                      <TableCell sx={{ color: "#555", fontWeight: "500" }}>{channel.no_of_reports}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ScammersAndChannelsTable;