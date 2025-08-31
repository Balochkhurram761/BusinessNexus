import React from "react";
import { Outlet } from "react-router-dom";
import NavbarDash from "../components/navbar/NavbarDash";
import Slidbar from "../components/Slidbar/Slidbar";
import NavbarContexts from "../../context/NavbarContext";
import ChatRoom from "../pages/ChatRoom";
const LayoutDash1 = ({ requiredRole }) => {
  return (
    <NavbarContexts>
      <div className="dashboard-layout min-h-screen flex">
        <Slidbar requiredRole={requiredRole} />

        <div className="main-content flex-1 lg:pl-[250px]">
          <NavbarDash />
          <Outlet />
        </div>
      </div>
    </NavbarContexts>
  );
};

export default LayoutDash1;
