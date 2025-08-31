import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InvestorProductUi = () => {
  const [getdata, setgetdata] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const getproductdata = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/allenterprum",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setgetdata(response.data.data || []);
      console.log("Products Fetched ✅", response.data);
    } catch (error) {
      console.error("Error Fetching ❌", error.response?.data || error.message);
    }
  };

  // Send Request API
  const sendrequest = async (entrepreneurId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      await axios.post(
        "http://localhost:5000/api/auth/sendrequest",
        { entrepreneurId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Request sent successfully ✅");
    } catch (error) {
      console.error(
        "Error sending request ❌",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getproductdata();
  }, []);

  return (
    <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {getdata && getdata.length > 0 ? (
        getdata.map((item) => (
          <div
            key={item._id}
            className="card bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between border border-gray-100"
          >
            <div className="card-content flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-gray-900">
                Company : {item.name}
              </h2>
              <p className="text-gray-700 font-medium">
                Startup :{item.startup}
              </p>
              <p className="text-gray-500 text-sm">{item.pitchSummary}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4 ">
              <button className="flex-1 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                View
              </button>
              <button className="flex-1 px-4 py-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium">
                <Link to={`/dashboard/${user?.role}/chatroom/${item.userId}`}>
                  Send Message
                </Link>
              </button>{" "}
              <button
                onClick={() => sendrequest(item._id)}
                className="flex-1 px-4 py-2 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                Send Request
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500 mt-10">
          No products available
        </p>
      )}
    </div>
  );
};

export default InvestorProductUi;
