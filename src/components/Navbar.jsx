import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography
          variant="h6"
          noWrap
          sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          EcoLife Market Admin Panel
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
