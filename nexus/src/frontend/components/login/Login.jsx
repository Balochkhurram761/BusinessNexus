import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationLogin } from "../../validations/loginSchema";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handlerForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const loginForm = async (e) => {
    e.preventDefault();
    try {
      await validationLogin.validate(form, { abortEarly: false });
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: response.data.token,
          role: response.data.user.role,
          id: response.data.user.id,
        })
      );
      // console.log("login token generted", response.data.token);
      // console.log("role is ", response.data.user.role);
      // console.log("userid", response.data.user.id);
      toast.success("Login successful 🎉", { position: "top-right" });

      if (response.data.user.role === "investor") {
        navigate("/dashboard/investor");
      } else if (response.data.user.role === "entrepreneur") {
        navigate("/dashboard/entrepreneur");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <>
      <div className="register w-[85%] sm:w-[460px] mx-auto my-30">
        <div className="forms border-[2px] shadow-card-1 transition-all duration-300 ease-card-1 border-[#b2bcd3] flex flex-col gap-6 p-8 rounded-lg">
          <div className="text-center text-2xl sm:text-3xl font-medium">
            <h1>Get Started Now</h1>
            <p className="font-normal text-[16px]">
              It's easy to create a pitch using our online form.
            </p>
          </div>
          <form onSubmit={loginForm} className="flex flex-col gap-8">
            {/* Email */}
            <input
              type="email"
              className="border border-gray-400 w-full outline-none rounded-sm bg-[#FAFAFA] py-3 px-2.5"
              placeholder="Enter Email*"
              name="email"
              value={form.email}
              onChange={handlerForm}
            />

            {/* Password */}
            <input
              type="password"
              className="border border-gray-400 w-full outline-none rounded-sm bg-[#FAFAFA] py-3 px-2.5"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              onChange={handlerForm}
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#3663EB] text-white cursor-pointer font-medium p-3 rounded-sm hover:bg-sky-600"
            >
              Login
            </button>
          </form>
        </div>
        <div className="label text-[15px] flex justify-between flex-col gap-2.5 sm:gap-0 sm:flex-row text-blue-500 transition-all">
          <a href="#" className="hover:text-gray-800">
            Forget your password?
          </a>
          <Link to="/register" className="hover:text-gray-800">
            Not Registered yet? Click here to sign up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
