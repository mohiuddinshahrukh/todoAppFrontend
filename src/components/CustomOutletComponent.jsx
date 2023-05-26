import { Paper } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const CustomOutletComponent = () => {
  return (
    <Paper h={"100vh"}>
      <Navbar />
      <Outlet />
    </Paper>
  );
};

export default CustomOutletComponent;
