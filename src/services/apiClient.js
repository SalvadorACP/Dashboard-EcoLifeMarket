import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dashboard-backend-eco-life-market.vercel.app/api", // Ajusta la URL base según tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Usuarios
export const fetchAllUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const fetchUsersByRole = async () => {
  const response = await apiClient.get("/users/roles");
  return response.data;
};

export const fetchUsersByMonth = async () => {
  const response = await apiClient.get("/users/monthly");
  return response.data;
};

// Productos
export const fetchTotalProducts = async () => {
  const response = await apiClient.get("/products/total");
  return response.data;
};

export const fetchProductsByCategory = async () => {
  const response = await apiClient.get("/products/categories");
  return response.data;
};

export const fetchTotalStock = async () => {
  const response = await apiClient.get("/products/stock");
  return response.data;
};

// Transacciones
export const fetchTransactions = async (page = 1, limit = 10) => {
  const response = await apiClient.get(`/transactions?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchTransactionStats = async () => {
  const response = await apiClient.get("/transactions/stats");
  return response.data;
};

export const fetchRevenueBySupplier = async () => {
  const response = await apiClient.get("/transactions/revenue-by-supplier");
  return response.data;
};

export const fetchTransactionsByCustomer = async (customerId) => {
  const response = await apiClient.get(`/transactions/customer/${customerId}`);
  return response.data;
};

export const fetchTransactionsBySupplier = async (supplierId) => {
  const response = await apiClient.get(`/transactions/supplier/${supplierId}`);
  return response.data;
};

// Dashboard
export const fetchDashboardStats = async () => {
  const response = await apiClient.get("/dashboard");
  return response.data;
};

export default apiClient;
