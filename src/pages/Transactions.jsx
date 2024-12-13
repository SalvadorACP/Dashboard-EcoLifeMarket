import React, { useEffect, useState } from "react";
import { fetchTransactions, fetchTransactionStats } from "../services/apiClient";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
} from "@mui/material";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await fetchTransactionStats();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching transaction stats:", error);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchPaginatedTransactions = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactions(page + 1, rowsPerPage); // Asegúrate de que el backend espera `page` basado en 1.
        setTransactions(data.transactions || []);
        setTotalTransactions(data.totalTransactions || 0);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaginatedTransactions();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && transactions.length === 0) {
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
          Transactions Dashboard
        </Typography>
      </Grid>

      {/* Transaction Stats */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h6">Total Transactions</Typography>
          <Typography variant="h3">{stats.totalTransactions || 0}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h6">Total Revenue</Typography>
          <Typography variant="h3">${stats.totalRevenue?.toFixed(2) || "0.00"}</Typography>
        </Paper>
      </Grid>

      {/* Transaction Table */}
      <Grid item xs={12}>
        <Paper style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Transactions
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{transaction.product?.name || "N/A"}</TableCell>
                    <TableCell>
                      {transaction.customer
                        ? `${transaction.customer.firstName} ${transaction.customer.lastName}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {transaction.supplier
                        ? `${transaction.supplier.firstName} ${transaction.supplier.lastName}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>${transaction.totalPrice?.toFixed(2) || "0.00"}</TableCell>
                    <TableCell>{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={totalTransactions}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Transactions;
