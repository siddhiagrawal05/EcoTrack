import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ darkMode }) {
  const data = useSelector((state) => state.air.data);

  if (!data) {
    return (
      <h2 className="text-center text-2xl mt-10">
        No Data Available
      </h2>
    );
  }

  const chartData = [
    { name: "PM2.5", value: data.components.pm2_5 },
    { name: "PM10", value: data.components.pm10 },
    { name: "CO", value: data.components.co },
    { name: "NO2", value: data.components.no2 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Pollution Dashboard
      </h1>

      {/* ✅ GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 📊 LEFT: CHART */}
        <div
          className={`md:col-span-2 p-6 rounded-2xl shadow-xl ${
            darkMode
              ? "bg-white/10 text-white"
              : "bg-white text-green-900"
          }`}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  stroke={darkMode ? "#fff" : "#065f46"}
                />
                <YAxis stroke={darkMode ? "#fff" : "#065f46"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                    color: darkMode ? "#ffffff" : "#000000",
                    borderRadius: "10px",
                    border: "none",
                  }}
                />
                <Bar dataKey="value" fill="#22c55e" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🌿 RIGHT: HEALTH CARD */}
        <div
          className={`p-6 rounded-2xl shadow-xl ${
            darkMode
              ? "bg-white/10 text-white"
              : "bg-green-100 text-green-900"
          }`}
        >
          <h3 className="text-xl font-bold mb-4 text-green-500">
            🌿 Health Guide
          </h3>

          <div className="space-y-3 text-sm">
            <p>😷 Avoid outdoor activities when AQI is high</p>
            <p>💧 Stay hydrated</p>
            <p>🌳 Keep indoor plants</p>
            <p>🚴 Reduce vehicle usage</p>
            <p>🏠 Stay indoors in heavy pollution</p>
          </div>

          {/* AQI Info */}
          <div className="mt-6 text-sm">
            <h4 className="font-semibold mb-2">AQI Level:</h4>
            <p className="text-lg font-bold text-green-500">
              {data.main.aqi}
            </p>
          </div>

          {/* Quote */}
          <p className="mt-6 italic text-xs opacity-70">
            "Clean air is a basic human right."
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;