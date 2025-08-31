import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { NavbarContext } from "../../../context/NavbarContext";

const SearchBar = () => {
  const { handleNavbar } = useContext(NavbarContext);
  return (
    <div className="searchbar w-full items-center  flex gap-6  md:w-[400px] lg:w-[570px] p-3 ">
      <div
        className="seachbarbar text-white text-2xl  cursor-pointer  md:block lg:hidden"
        onClick={handleNavbar}
      >
        <CiMenuBurger />
      </div>
      <div className="input w-full relative ">
        <input
          type="text"
          className=" outline-none w-full  text-white  text-xl px-8  p-3 bg-[#6c757d]  rounded-md "
          placeholder="Search"
          name=""
          id=""
        />
        <CiSearch className="absolute top-0 left-2   text-white transform translate-y-4 text-xl " />
      </div>
    </div>
  );
};

export default SearchBar;
