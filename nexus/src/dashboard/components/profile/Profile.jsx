import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import MyProfile from "../Myprofile/MyProfile";
import axios from "axios";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const profileshow = async () => {
    // console.log("profileshow function called");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const userId = user?.id;
    // console.log("Retrieved user info:", { token });
    if (!token) {
      navigate("/login");
      return;
    }
    // console.log("id", userId);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/profile/investor/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API call successful", response.data.data);
      setProfileData(response.data.data);
    } catch (error) {
      console.error("API call failed:", {
        message: error.message,
      });
    }
  };
  useEffect(() => {
    profileshow();
  }, []);

  return (
    <>
      <Avatar
        alt="User Avatar"
        src={
          profileData?.image ? `http://localhost:5000/${profileData.image}` : ""
        }
        onClick={handleMenuOpen}
        sx={{ cursor: "pointer" }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setOpenDialog(true);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <MyProfile
        open={openDialog}
        profileData={profileData}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
};

export default Profile;
