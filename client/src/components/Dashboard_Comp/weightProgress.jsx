import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const WeightProgess = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="day" tick={{ fill: "gray" }} />
            <YAxis domain={[0, "dataMin"]} tick={{ fill: "gray" }} />
            <Tooltip />
            <Line type="natural" dataKey="burned" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      );
    };

export default WeightProgess;