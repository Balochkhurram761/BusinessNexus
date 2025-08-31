import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./frontend/components/login/Login";
import Register from "./frontend/components/register/Register";
import Layouts from "./frontend/layouts/Layouts";
import Home1 from "./frontend/pages/Home1";
import ProtectedRoute from "./frontend/components/protectedRoute/ProtectedRoute";
import InvestorDashboard from "./dashboard/pages/InvestorDashboard";
import EntrepreumDashboard from "./dashboard/pages/EntrepreumDashboard";
import LayoutDash1 from "./dashboard/layoutDash/layoutDash";
import EntrepreumProduct from "./dashboard/pages/EntrepreumProduct";
import InvestorProduct from "./dashboard/pages/InvestorProduct";
import InvestorsRequest from "./dashboard/pages/InvestorsRequest";
import ChatRoom from "./dashboard/pages/ChatRoom";
import EntrepreumChat from "./dashboard/pages/EntrepreumChat";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home1 />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>

        {/* Investor Dashboard */}
        <Route
          path="/dashboard/investor"
          element={
            <ProtectedRoute requiredRole="investor">
              <LayoutDash1 />
            </ProtectedRoute>
          }
        >
          <Route index element={<InvestorDashboard />}></Route>
          <Route path="entrepreum" element={<InvestorProduct />}></Route>
          <Route path="chatroom" element={<ChatRoom />}></Route>
          <Route path="chatroom/:id" element={<ChatRoom />}></Route>
        </Route>

        {/* Entrepreneur Dashboard */}
        <Route
          path="/dashboard/entrepreneur"
          element={
            <ProtectedRoute requiredRole="entrepreneur">
              <LayoutDash1 />
            </ProtectedRoute>
          }
        >
          <Route index element={<EntrepreumDashboard />}></Route>
          <Route path="projects" element={<EntrepreumProduct />}></Route>
          <Route path="requestinvestors" element={<InvestorsRequest />}></Route>
          <Route path="chatroom" element={<EntrepreumChat />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
