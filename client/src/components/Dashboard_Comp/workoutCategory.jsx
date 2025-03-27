import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const workoutCategory = () => {
  const data = [
    { name: "Legs", value: 1 }, // Quadriceps, Hamstrings, Calves, Glutes
    { name: "Back", value: 2 }, // Lats, Traps, Lower Back, Middle Back
    { name: "Chest", value: 2 }, // Pectorals
    { name: "Arms", value: 1.5 }, // Biceps, Triceps, Forearms
    { name: "Shoulders", value: 1 }, // Deltoids
    { name: "Core", value: 1 }, // Abdominals, Obliques
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D84315", "#6A1B9A"];

  return (
    <div className="shadow-sm p-1 flex flex-col h-65">
      <h1 className="text-2xl text-blue-400 font-bold  self-start md:mb-2">
        Workout Categories Breakdown
      </h1>

      <PieChart width={250} height={200} className="self-center">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={69}
          fill="#8884d8"
          dataKey="value" // ✅ Corrected: use "dataKey" instead of "valueKey"
          label={({ name }) => name} // Show only muscle group name
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [name, "Category"]} />
      </PieChart>
    </div>
  )
}
export default workoutCategory;
