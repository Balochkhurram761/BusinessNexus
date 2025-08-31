import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
const Layouts = () => {
  return (
    <div className="div">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layouts;
