import React from "react";

const StatsCard = () => {
  return (
    <div className="cards grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3   justify-center   gap-6 text-white text-2xl ">
      <div className="card min-h-[140px] w-full  px-6 justify-center  flex flex-col gap-1.5 bg-[#777f88] p-3.5 rounded-lg">
        <h1>Total Investment</h1>
        <h1
          className="font-bold  
        text-3xl md:text-4xl"
        >
          $ 50,000
        </h1>
      </div>
      <div className="card min-h-[140px] w-full  px-6 justify-center bg-[#777f88] flex flex-col gap-1.5 p-3.5 rounded-lg">
        <h1>Projects Funded</h1>
        <h1 className="font-bold text-3xl md:text-4xl">12</h1>
      </div>
      <div className="card  min-h-[140px] w-full  px-6 justify-center bg-[#777f88] flex flex-col gap-1.5 p-3.5 rounded-lg">
        <h1>ROI</h1>
        <h1 className="font-bold text-3xl md:text-4xl">15%</h1>
      </div>
    </div>
  );
};

export default StatsCard;
