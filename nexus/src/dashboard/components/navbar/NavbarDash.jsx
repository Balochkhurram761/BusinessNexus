import React from "react";
import SearchBar from "../searchbar/SearchBar";
import Profile from "../profile/Profile";
const NavbarDash = () => {
  return (
    <div className="navbash  flex sticky left-0 top-0 w-full justify-between items-center px-5   shadow-md bg-[#343a40]">
      <SearchBar />
      <Profile />
    </div>
  );
};

export default NavbarDash;
