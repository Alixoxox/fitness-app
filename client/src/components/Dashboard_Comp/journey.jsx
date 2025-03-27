import React, { useState, useEffect } from "react";
import WeightProgress from "./weightProgress";

const Journey = () => {
  const [calsData, setCalsData] = useState([]);

  useEffect(() => {
    const data = [];
    let avgBurnedCals = 2900; // Example starting value

    for (let i = 1; i <= 50; i++) {
      let burned = avgBurnedCals + Math.floor(Math.random() * 100) - 50; // Adding small variations
      data.push({ day: `Day ${i}`, burned });
    }

    setCalsData(data);
  }, []);

  return (
    <div className='shadow-sm p-1.5  flex flex-col  max-h-65 overflow-hidden '>
      <h1 className="text-2xl ms-2 font-bold text-blue-400 mb-4">Average Calories Burned</h1>
      <WeightProgress data={calsData} className="leading-none mt-3 mr-2 justify-center"/>
    </div>
  );
};

export default Journey;

