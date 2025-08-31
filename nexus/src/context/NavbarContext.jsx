import React, { createContext, useState } from "react";

export const NavbarContext = createContext();

const NavbarContexts = ({ children }) => {
  const [navbar, setNavbar] = useState(false);

  const handleNavbar = () => {
    setNavbar(!navbar); // toggle
  };

  const handleClose = () => {
    setNavbar(false); // close
  };

  return (
    <NavbarContext.Provider
      value={{ navbar, setNavbar, handleClose, handleNavbar }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContexts;
