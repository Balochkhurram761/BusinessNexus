import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationRegister } from "../../validations/registerSchema";
import { Link } from "react-router-dom";
const Register = () => {
  const [Changer, setChanger] = useState("entrepreneur");
  const handleChanger = (role) => {
    setChanger(role);
    setform((prev) => ({
      ...prev,
      role,
    }));
  };
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    role: "entrepreneur",
  });
  const handlerForm = (e) => {
    const { name, value } = e.target;

    setform({
      ...form,
      [name]: value,
    });
  };
  const registerForm = async (e) => {
    e.preventDefault();
    try {
      await validationRegister.validate(form, { abortEarly: false });
      await axios.post("http://localhost:5000/api/auth/register", form);
      toast.success("Registration successful 🎉", { position: "top-right" });
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => {
          toast.error(err.message, { position: "top-right" });
        });
      } else {
        toast.error(error.response?.data?.message || "Registration failed ❌", {
          position: "top-right",
        });
      }
    }
  };
  return (
    <>
      <div className="register w-[85%] sm:w-[460px] md:w-[460px] lg:w-[460px]  mx-auto my-6">
        <div className="form flex flex-col   ">
          <div className="forms border-[2px] border-[2px] shadow-card-1 transition-all duration-300 ease-card-1  border-[#b2bcd3] flex flex-col  gap-6 p-8 rounded-lg">
            <div className="body gap-2.5  flex flex-col items-center text-2xl sm:text-3xl font-medium ">
              <h1>Get Started Now</h1>
              <p className="font-normal text-[16px] text-center">
                It's easy to create a pitch using our online form. Your pitch
                can be in front of our investors before you know it.
              </p>
            </div>
            <form action="" onSubmit={registerForm}>
              <div className="form flex flex-col gap-8">
                <div className="button flex flex-col justify-center items-center sm:flex-row gap-8 px-2.5">
                  <div
                    className="inputs flex items-center gap-2 cursor-pointer  text-[16px] font-medium "
                    onClick={() => handleChanger("investor")}
                  >
                    <input
                      type="radio"
                      className="w-6 h-6"
                      value="investor"
                      checked={form.role === "investor"}
                      id="investor"
                    />
                    <label htmlFor="investor">I'm an Investor</label>
                  </div>
                  <div
                    className="inputs flex items-center cursor-pointer gap-2 text-[18px] font-medium"
                    onClick={() => handleChanger("entrepreneur")}
                  >
                    <input
                      type="radio"
                      className="w-6 h-6"
                      name="role"
                      value="entrepreneur"
                      checked={form.role === "entrepreneur"}
                      id="entrepreneur"
                      defaultChecked
                    />
                    <label htmlFor="entrepreneur">I'm an Entrepreneur</label>
                  </div>
                </div>

                <div className="inputs w-full">
                  <input
                    type="text"
                    className="border-[1px] border-gray-400 w-full outline-none p-1.5 rounded-sm bg-[#FAFAFA] text-[rgb(37,49,66)] py-3 px-2.5"
                    placeholder="Enter Name*"
                    name="name"
                    value={form.name}
                    onChange={handlerForm}
                    id=""
                  />
                </div>
                <div className="inputs">
                  <input
                    type="email"
                    className="border-[1px] border-gray-400 w-full outline-none p-1.5 rounded-sm bg-[#FAFAFA] text-[rgb(37,49,66)] py-3 px-2.5"
                    placeholder="Enter Email*"
                    name="email"
                    value={form.email}
                    onChange={handlerForm}
                    id=""
                  />
                </div>
                <div className="inputs">
                  <input
                    type="password"
                    className="border-[1px] border-gray-400 w-full outline-none p-1.5 rounded-sm bg-[#FAFAFA] text-[rgb(37,49,66)] py-3 px-2.5"
                    placeholder="Enter Password"
                    name="password"
                    value={form.password}
                    onChange={handlerForm}
                    id=""
                  />
                </div>
                {Changer === "entrepreneur" && (
                  <div className="inputs font-medium flex items-start  text-[15px]  gap-2">
                    <input
                      id="form-agree-modal"
                      type="checkbox"
                      name="terms"
                      class="  w-15 h-15 bg-gray-50 rounded-sm border border-gray-300 "
                      required
                    />

                    <p>
                      {" "}
                      I certify that I agree to the website's{" "}
                      <a href="">
                        <span className="text-[#437FFF] transition-all  hover:text-[rgb(51,51,51)]">
                          Privacy Policy
                        </span>{" "}
                      </a>
                      ,{" "}
                      <a href="">
                        <span className="text-[#437FFF] transition-all  hover:text-[rgb(51,51,51)]">
                          Terms and Conditions
                        </span>
                      </a>{" "}
                      and{" "}
                      <a href="">
                        <span className="text-[#437FFF] transition-all  hover:text-[rgb(51,51,51)]">
                          {" "}
                          Refund Policy;{" "}
                        </span>
                      </a>{" "}
                      and I understand it is my responsibility to do due
                      diligence on any investor I meet via this platform.
                    </p>
                  </div>
                )}
                {Changer === "investor" && (
                  <>
                    <div className="inputs font-medium flex items-start  text-[15px]  gap-2">
                      <input
                        id="form-agree-modal"
                        type="checkbox"
                        name="terms"
                        class="  w-6 h-6 bg-gray-50 rounded-sm border border-gray-300 "
                        required
                      />

                      <label htmlFor="">
                        I agree to the website's{" "}
                        <a href="">
                          <span className="text-[#437FFF] transition-all  hover:text-[rgb(51,51,51)]">
                            Privacy Policy
                          </span>{" "}
                        </a>
                        &,{" "}
                        <a href="">
                          <span className="text-[#437FFF] transition-all  hover:text-[rgb(51,51,51)]">
                            Terms and Conditions
                          </span>
                        </a>{" "}
                      </label>
                    </div>
                    <div className="inputs font-medium flex items-start  text-[15px]  gap-2">
                      <input
                        id="form-agree-modal"
                        type="checkbox"
                        name="terms"
                        class="  w-6 h-6 bg-gray-50 rounded-sm border border-gray-300 "
                        required
                      />

                      <label htmlFor="">
                        I certify that I am an accredited, qualified or
                        sophisticated investor.
                      </label>
                    </div>
                  </>
                )}
                <div className="inputs w-full flex flex-col gap-1.5">
                  <button className=" w-full  bg-[#3663EB] text-white  font-medium p-3 cursor-pointer transition-all hover:bg-sky-600 outline-none border-none rounded-sm">
                    Create New Account
                  </button>
                  <Link to="/login" className="text-[#3663EB] ">
                    Have already account log?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
