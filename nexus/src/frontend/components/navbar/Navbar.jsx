import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-2.5   ">
      {/* Logo Section */}
      <div className="flex items-center gap-3 ">
        <Link to="/">
          <h1 className="font-bold text-lg  capitalize  leading-none ">
            nexus <br /> Investment <br />{" "}
            <span className="text-[14px] text-gray-500 font-normal  text-center">
              {" "}
              Network{" "}
            </span>
          </h1>
        </Link>
      </div>

      {/* Links Section */}
      <div>
        <ul className="flex gap-6 text-gray-500 transition-all   ">
          <li>
            <a
              href="#"
              className="hover:text-gray-900 flex gap-0.5 items-center"
            >
              Invest
              <i class="fa-solid fa-dollar-sign"></i>
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900 flex gap-1.5">
              <span> Fundraise </span>
              <i class="fa-solid fa-hand-holding"></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-900 flex gap-1.5 items-center"
            >
              Help
              <i class="fa-solid fa-hand-holding-hand"></i>
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900">
              Testimonials
            </a>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-900">
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="hover:text-gray-900 border-[2px] border-gray-400 rounded-lg px-5 py-2"
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
