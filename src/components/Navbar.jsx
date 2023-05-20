import { Title } from "@mantine/core";
import React from "react";

const NavbarLogin = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "65px",
        backgroundColor: "black",
      }}
    >
      {" "}
      <Title ff={"monospace"} pl={"xl"} color="white">
        Shahrukh's Todo App
      </Title>
    </div>
  );
};

export default NavbarLogin;
