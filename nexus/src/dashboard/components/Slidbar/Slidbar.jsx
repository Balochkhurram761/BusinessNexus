import React, { useContext } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { NavbarContext } from "../../../context/NavbarContext";

const Slidbar = () => {
  const { handleClose, navbar } = useContext(NavbarContext);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {user?.role === "entrepreneur" ? (
        <div
          className={`fixed top-0 left-0 h-screen w-[250px] flex flex-col gap-8 py-6 bg-[#343a40] shadow-md transform transition-transform duration-300 z-50
          ${navbar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div className="logo flex justify-center">
            <Link to="/dashboard/entrepreneur" onClick={handleClose}>
              <h1 className="font-bold text-white text-lg capitalize leading-none">
                nexus <br /> Investment <br />
                <span className="text-[14px] text-gray-200 font-normal text-center">
                  Network
                </span>
              </h1>
            </Link>
          </div>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/dashboard/entrepreneur"
              className={({ isActive }) =>
                `flex gap-1.5 items-center p-3 ${
                  isActive ? "bg-[#6c757d] rounded-md" : "bg-[#343a40]"
                }`
              }
            >
              <IoHomeOutline className="text-[20px] text-white" />
              <span className="text-[18px] text-white" onClick={handleClose}>
                Home
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/entrepreneur/projects"
              className={({ isActive }) =>
                `flex gap-1.5 items-center p-3 ${
                  isActive ? "bg-[#6c757d] rounded-md" : "bg-[#343a40]"
                }`
              }
            >
              <AiOutlineFundProjectionScreen className="text-[20px] text-white" />
              <span className="text-[18px] text-white" onClick={handleClose}>
                Projects
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/entrepreneur/requestinvestors"
              className={({ isActive }) =>
                `flex gap-1.5 items-center p-3 ${
                  isActive ? "bg-[#6c757d] rounded-md" : "bg-[#343a40]"
                }`
              }
            >
              <AiOutlineFundProjectionScreen className="text-[20px] text-white" />
              <span className="text-[18px] text-white" onClick={handleClose}>
                All Requests Investor
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/entrepreneur/settings"
              className={({ isActive }) =>
                `flex gap-1.5 items-center p-3 ${
                  isActive ? "bg-[#6c757d] rounded-md" : "bg-[#343a40]"
                }`
              }
            >
              <CiSettings className="text-[20px] text-white" />
              <span className="text-[18px] text-white" onClick={handleClose}>
                Settings
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/entrepreneur/chatroom"
              className={({ isActive }) =>
                `flex gap-1.5 items-center p-3 ${
                  isActive ? "bg-[#6c757d] rounded-md" : "bg-[#343a40]"
                }`
              }
            >
              <CiSettings className="text-[20px] text-white" />
              <span className="text-[18px] text-white" onClick={handleClose}>
                All Chat
              </span>
            </NavLink>
          </nav>
        </div>
      ) : (
        <div
          className={`fixed top-0 left-0 h-screen w-[250px] flex flex-col gap-8 py-6 bg-[#343a40] shadow-md transform transition-transform duration-300 z-50
          ${navbar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div className="logo flex justify-center">
            <Link to="/dashboard/investor" onClick={handleClose}>
              <h1 className="font-bold text-white text-lg capitalize leading-none">
                nexus <br /> Investment <br />
                <span className="text-[14px] text-gray-200 font-normal text-center">
                  Network
                </span>
              </h1>
            </Link>
          </div>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/dashboard/investor"
              className={({ isActive }) =>
                `flex gap-1.5 items-center p-3 ${
                  isActive ? "bg-[#6c757d] rounded-md" : "bg-[#343a40]"
                }`
              }
            >
              <IoHomeOutline className="text-[20px] text-white" />
              <span className="text-[18px] text-white" onClick={handleClose}>
                Home
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/investor/entrepreum"
              className={({ isActive }) =>
                `flex gap-1.5 items-center p-3 ${
                  isActive ? "bg-[#6c757d] rounded-md" : "bg-[#343a40]"
                }`
              }
            >
              <AiOutlineFundProjectionScreen className="text-[20px] text-white" />
              <span className="text-[18px] text-white" onClick={handleClose}>
                All Entrepreneur
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/investor/settings"
              className={({ isActive }) =>
                `flex gap-1.5 items-center p-3 ${
                  isActive ? "bg-[#6c757d] rounded-md" : "bg-[#343a40]"
                }`
              }
            >
              <CiSettings className="text-[20px] text-white" />
              <span className="text-[18px] text-white" onClick={handleClose}>
                Settings
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/investor/chatroom"
              className={({ isActive }) =>
                `flex gap-1.5 items-center p-3 ${
                  isActive ? "bg-[#6c757d] rounded-md" : "bg-[#343a40]"
                }`
              }
            >
              <CiSettings className="text-[20px] text-white" />
              <span className="text-[18px] text-white" onClick={handleClose}>
                All Chat
              </span>
            </NavLink>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Slidbar;
