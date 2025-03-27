import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const weeklyworkout = () => {

  //sample data
  const data = [
    { day: "Mon", burned: 500 },
    { day: "Tue", burned: 450 },
    { day: "Wed", burned: 470 },
    { day: "Thu", burned: 480 },
    { day: "Fri", burned: 460 },
    { day: "Sat", burned: 500 },
    { day: "Sun", burned: 520 },
  ];
  return (
    <div className='shadow-sm p-1 flex flex-col max-h-65 '>
      <h1 className='text-2xl text-blue-400 font-bold mb-4 ms-2'>Weekly Calories Burned</h1>
      <div className='mb-1'><ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="day" tick={{ fill: "gray" }} />
          <YAxis tick={{ fill: "gray" }} />
          <Tooltip />
          <Bar dataKey="burned" fill="#F59E0B" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer></div>
      
    </div>
  )
}

export default weeklyworkout
