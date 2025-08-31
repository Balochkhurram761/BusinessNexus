import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { RiCloseLargeFill } from "react-icons/ri";
import { BiSolidShow, BiHide } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { useEffect } from "react";

const MyProfile = ({ open, onClose, profileData }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formupdate, setFormupdate] = useState({
    name: "",
    password: "",
    image: "",
  });

  // ✅ Jab profileData change ho, state update ho jaye
  useEffect(() => {
    if (profileData) {
      setFormupdate({
        name: profileData.name || "",
        password: "",
        image: profileData.image || "",
      });
    }
  }, [profileData]);
  // Toggle password visibility
  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormupdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormupdate((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const userId = user?.id;
    console.log("Retrieved user info:", { token });
    try {
      const formData = new FormData();
      formData.append("name", formupdate.name);
      if (formupdate.password && formupdate.password.trim() !== "") {
        formData.append("password", formupdate.password);
      }
      if (formupdate.image instanceof File) {
        formData.append("image", formupdate.image);
      }
      const response = await axios.put(
        `http://localhost:5000/api/auth/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormupdate(response.data.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed, please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="profileid min-w-[320px] sm:w-[500px] bg-[#2F3336] relative text-white flex flex-col gap-3 p-3 rounded-md">
        {/* Close Button */}
        <div
          className="close text-[30px] absolute right-4 cursor-pointer"
          onClick={onClose}
        >
          <RiCloseLargeFill />
        </div>

        <h1 className="font-medium text-2xl text-white text-center">
          Update Profile
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-2.5" onSubmit={handleUpdate}>
          {/* Profile Image */}
          <div className="img self-center relative">
            <img
              className="rounded-full w-[150px] h-[150px] object-cover"
              src={
                formupdate.image instanceof File
                  ? URL.createObjectURL(formupdate.image)
                  : `http://localhost:5000/${formupdate.image}`
              }
              alt="profile"
            />
            <input
              type="file"
              name=""
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <div className="edit font-bold cursor-pointer absolute bottom-5 right-4">
                <FiEdit size={24} />
              </div>
            </label>
          </div>

          {/* Inputs */}
          <div className="inputs flex flex-col gap-2.5">
            {/* Name */}
            <div className="input w-full">
              <input
                type="text"
                name="name"
                value={formupdate.name}
                placeholder="Name"
                onChange={handleFormChange}
                className="outline-none w-full bg-white border-[1px] p-2.5 text-[17px] text-black rounded-md"
              />
            </div>

            {/* Password */}
            <div className="input relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={formupdate.password}
                onChange={handleFormChange}
                placeholder="Enter Update Password"
                className="outline-none w-full bg-white border-[1px] p-2.5 text-[17px] text-black rounded-md"
              />
              <div
                className="show absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-black cursor-pointer"
                onClick={handlePasswordToggle}
              >
                {isPasswordVisible ? <BiSolidShow /> : <BiHide />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer outline-none border-[1px] border-[#3B3F44] p-2.5 text-[18px] font-bold rounded-md transition-all duration-300 ease-in-out bg-[#3B3F44]"
          >
            Update Profile
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default MyProfile;
