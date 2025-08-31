import React from "react";

const RecentInvestment = () => {
  return (
    <div className="overflow-x-auto   bg-[#777f88] shadow rounded-lg p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="">
            <th className="p-3 border-b ">Investor</th>
            <th className="p-3 border-b ">Amount</th>
            <th className="p-3 border-b ">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="p-3 border-b">John Doe</td>
            <td className="p-3 border-b">$1,000</td>
            <td className="p-3 border-b">2025-08-15</td>
          </tr>
          <tr className="">
            <td className="p-3 border-b">Jane Smith</td>
            <td className="p-3 border-b">$2,500</td>
            <td className="p-3 border-b">2025-08-14</td>
          </tr>
          <tr className="h">
            <td className="p-3 border-b">Alex Brown</td>
            <td className="p-3 border-b">$3,200</td>
            <td className="p-3 border-b">2025-08-13</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentInvestment;
