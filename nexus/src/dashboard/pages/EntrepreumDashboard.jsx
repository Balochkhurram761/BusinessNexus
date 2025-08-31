import React from "react";
import StatsCard from "../components/statscard/StatsCard";
import RecentInvestment from "../components/recentinvestment/RecentInvestment";
import InvestmentGraph from "../components/investmentGraph/InvestmentGraph";
const EntrepreumDashboard = () => {
  return (
    <div className="back bg-[#2f3336] h-full">
      <div className="text-[20px] flex flex-col gap-5 t text-white p-2 w-[94%] mx-auto   font-medium">
        <h1 className="text-2xl">Dashboard Investor</h1>
        <StatsCard />
        <div className="recentinvest w-full flex flex-col gap-2.5">
          <h1>Recent Investment</h1>
          <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-4">
            <RecentInvestment />
            <InvestmentGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreumDashboard;
