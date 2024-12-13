import React, { useEffect, useState } from "react";
import { fetchAllUsers, fetchUsersByRole, fetchUsersByMonth } from "../services/apiClient";
import { Grid, Paper, Typography, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [rolesStats, setRolesStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allUsers, usersByRole, usersByMonth] = await Promise.all([
          fetchAllUsers(),
          fetchUsersByRole(),
          fetchUsersByMonth(),
        ]);
        setUsers(allUsers);
        setRolesStats(usersByRole);
        setMonthlyStats(usersByMonth);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Users Dashboard
        </Typography>
      </Grid>

      {/* Total Users */}
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h3">{users.length}</Typography>
        </Paper>
      </Grid>

      {/* Users by Role */}
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h6">Users by Role</Typography>
          {rolesStats.map((role) => (
            <Typography key={role._id} variant="body1">
              {role._id}: {role.count}
            </Typography>
          ))}
        </Paper>
      </Grid>

      {/* Monthly Registrations */}
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h6">Monthly Registrations</Typography>
          {monthlyStats.map((month) => (
            <Typography key={month.month} variant="body1">
              {month.month}: {month.count}
            </Typography>
          ))}
        </Paper>
      </Grid>

      {/* Table of Users */}
      <Grid item xs={12}>
        <Paper style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            User List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Users;
