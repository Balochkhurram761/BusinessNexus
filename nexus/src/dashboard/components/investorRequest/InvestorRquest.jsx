import axios from "axios";
import React, { useState, useEffect } from "react";

const InvestorRequest = () => {
  const [getrequest, setGetRequest] = useState([]);

  // Fetch all requests
  const getAllRequest = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/getrequestdata",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGetRequest(response.data.data);
    } catch (error) {
      console.error("Server Error:", error);
    }
  };

  // Update request status
  const updateRequest = async (requestId, newStatus) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      await axios.put(
        `http://localhost:5000/api/auth/updaterequest/${requestId}`,
        { status: newStatus }, // ✅ send status
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGetRequest((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Server Error:", error);
    }
  };

  useEffect(() => {
    getAllRequest();
  }, []);

  return (
    <div className="w-[95%] mx-auto my-6 overflow-x-hidden">
      <div className="bg-[#4b1f1f] text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
        <h1 className="font-semibold text-lg">All Investor Requests</h1>
        <span className="cursor-pointer">➔</span>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-b-lg shadow">
        <table className="min-w-[650px] w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Company Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Startup</th>
              <th className="px-4 py-3 whitespace-nowrap">Investor Email</th>
              <th className="px-4 py-3 whitespace-nowrap">Investor Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getrequest.length > 0 ? (
              getrequest.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap truncate max-w-[150px]">
                    {item?.entrepreneurId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                    {item?.entrepreneurId?.startup || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap truncate max-w-[200px]">
                    {item?.investorId?.email || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap truncate max-w-[150px]">
                    {item?.investorId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <select
                      value={item.status}
                      onChange={(e) => updateRequest(item._id, e.target.value)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium focus:outline-none cursor-pointer ${
                        item?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : item?.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorRequest;
