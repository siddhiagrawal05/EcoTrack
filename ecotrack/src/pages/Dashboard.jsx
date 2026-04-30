import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function Dashboard() {
  const data = useSelector(state => state.air.data);

  if (!data) return <h2>No Data Available</h2>;

  const chartData = [
    { name: "PM2.5", value: data.components.pm2_5 },
    { name: "PM10", value: data.components.pm10 },
    { name: "CO", value: data.components.co },
    { name: "NO2", value: data.components.no2 }
  ];

  return (
    <div>
      <h1 className="text-2xl mb-4">Pollution Dashboard</h1>

      <BarChart width={500} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#22c55e" />
      </BarChart>
    </div>
  );
}

export default Dashboard;