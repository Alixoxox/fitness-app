import React from "react";

const ProgressCircle = ({ burnedCals, totalCals }) => {
  const percent = (burnedCals / totalCals) * 100; 
  const radius = 54, circumference = 2 * Math.PI * radius;

  return (
    <div className="relative flex items-center justify-center w-[120px] h-[120px]">
      <svg className="w-full h-full -rotate-90"> w-[160px] h-[160px]
        <circle cx="50%" cy="50%" r={radius} stroke="gray" strokeWidth="12" fill="none" />
        <circle cx="50%" cy="50%" r={radius} stroke="blue" strokeWidth="12" fill="none"
          strokeDasharray={circumference} strokeDashoffset={circumference * (1 - percent / 100)}
          className="transition-all duration-300" />
      </svg>
      <div className="absolute text-center">
        <span className="text-xl font-bold">{Math.round(totalCals-burnedCals)}</span>
        <div className="text-sm font-semibold">Remaining</div>
        
      </div>
    </div>
  );
};

export default ProgressCircle;
