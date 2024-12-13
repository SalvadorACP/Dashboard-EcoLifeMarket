import React, { useEffect, useState } from "react";
import { fetchDashboardStats } from "../services/apiClient";
import { Grid, Paper, Typography, CircularProgress } from "@mui/material";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">{stats.totalUsers || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h3">{stats.totalProducts || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h6">Total Transactions</Typography>
            <Typography variant="h3">{stats.totalTransactions || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h3">${stats.totalRevenue || 0}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
