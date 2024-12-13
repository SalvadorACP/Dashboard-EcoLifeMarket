import React, { useEffect, useState } from "react";
import { fetchDashboardStats, fetchProductsByCategory, fetchTotalStock } from "../services/apiClient";
import { Grid, Paper, Typography, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const Products = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardStats, byCategory, stock] = await Promise.all([
          fetchDashboardStats(),
          fetchProductsByCategory(),
          fetchTotalStock(),
        ]);

        console.log("Data fetched:", { dashboardStats, byCategory, stock }); // Log de depuración

        // Asignar los valores obtenidos
        setTotalProducts(dashboardStats?.totalProducts || 0); // Desde las estadísticas generales
        setCategories(byCategory || []);
        setTotalStock(stock?.totalStock || 0);
      } catch (error) {
        console.error("Error fetching product data:", error);
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
          Products Dashboard
        </Typography>
      </Grid>

      {/* Indicadores */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h6">Total Products</Typography>
          <Typography variant="h3">{totalProducts}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h6">Total Stock</Typography>
          <Typography variant="h3">{totalStock}</Typography>
        </Paper>
      </Grid>

      {/* Tabla */}
      <Grid item xs={12}>
        <Paper style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Product Details by Category
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Total Products</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category._id || "Unknown"}</TableCell>
                  <TableCell>{category.count || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Products;
