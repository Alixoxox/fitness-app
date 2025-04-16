import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { fetchCategory } from "../../pages/utils/cals_categ_fetch";

const WorkoutCategory = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCategory(); // e.g., [{ category: "all" }, { category: "all" }, { category: "legs" }]
      const formatted = [];

      data.forEach(item => {
        if (item.category) {
          const existing = formatted.find(entry => entry.name === item.category);
          if (existing) {
            existing.value += 1;
          } else {
            formatted.push({ name: item.category, value: 1 });
          }
        } else {
          console.warn("Category not found or invalid structure for:", item);
        }
      });

      setResult(formatted);
    };

    getData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D84315", "#6A1B9A"];
  console.log("Rendering workout category:", result);

  return (
    <div className="shadow-sm p-1 flex flex-col h-65">
      <h1 className="text-2xl text-blue-400 font-bold self-start md:mb-2">
        Workout Categories Breakdown
      </h1>

      <PieChart width={250} height={200} className="self-center">
        <Pie
          data={result}
          cx="50%"
          cy="50%"
          outerRadius={69}
          fill="#8884d8"
          dataKey="value"
          label={({ name }) => name}
        >
          {result.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, name]} />
      </PieChart>
    </div>
  );
};

export default WorkoutCategory;
