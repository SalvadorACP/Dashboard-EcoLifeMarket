import React from "react";
import { List, ListItem, ListItemText, Drawer, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      style={{
        width: "240px", // Ancho fijo del Sidebar
        flexShrink: 0,
        zIndex: 1100, // Debajo del Navbar
        boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)", // Sombra para diferenciar del contenido
      }}
      PaperProps={{
        style: {
          width: "240px", // Asegura el mismo ancho para el Drawer
          backgroundColor: "#f8f9fa", // Fondo claro
        },
      }}
    >
      <div
        style={{
          height: "64px", // Altura igual al Navbar para alinear
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #ddd", // Línea divisoria inferior
        }}
      >
        <Typography variant="h6" style={{ fontWeight: "bold", color: "#333" }}>
          Menu
        </Typography>
      </div>
      <List>
        <ListItem button component={Link} to="/" style={{ padding: "16px" }}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/transactions" style={{ padding: "16px" }}>
          <ListItemText primary="Transactions" />
        </ListItem>
        <ListItem button component={Link} to="/users" style={{ padding: "16px" }}>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/products" style={{ padding: "16px" }}>
          <ListItemText primary="Products" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
