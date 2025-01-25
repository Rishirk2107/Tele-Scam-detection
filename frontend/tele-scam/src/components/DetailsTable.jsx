import React from "react";
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid } from "@mui/material";

const ScammersAndChannelsTable = ({ scammersData, channelsData }) => {
  return (
    <Grid container spacing={2}>
      {/* Scammers Table */}
      <Grid item xs={12} md={6}>
        <Card className="bg-cardLight dark:bg-cardDark p-4">
          <Typography className="chart-title text-lg font-bold mb-4">Top Scammers</Typography>
          <TableContainer>
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
                    <TableCell align="right">{scammer.scam_count}</TableCell>
                    <TableCell align="right">{scammer.top_scam}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>

      {/* Channels Table */}
      <Grid item xs={12} md={6}>
        <Card className="bg-cardLight dark:bg-cardDark p-4">
          <Typography className="chart-title text-lg font-bold mb-4">Channels Analysis</Typography>
          <TableContainer>
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
  );
};

export default ScammersAndChannelsTable;
