import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAirData, addFavorite } from "../redux/airSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Home({ darkMode }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);


  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const dispatch = useDispatch();
  const data = useSelector((state) => state.air.data);
  const favorites = useSelector((state) => state.air.favorites);

  const API_KEY = "800710927f61403ca3aa2fb5f6ded07b";

 
  const searchCity = async () => {
    if (!city) return;

    try {
      setLoading(true);

      const geo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );

      if (!geo.data.length) {
        alert("City not found");
        setLoading(false);
        return;
      }

      const { lat, lon } = geo.data[0];

      const air = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      const weather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      dispatch(
        setAirData({
          city,
          ...air.data.list[0],
          weather: weather.data,
        })
      );

     
      const updated = [city, ...history.filter((c) => c !== city)].slice(0, 5);
      setHistory(updated);
      localStorage.setItem("history", JSON.stringify(updated));

      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("API Error");
      setLoading(false);
    }
  };

  
  const getLocationData = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setLoading(true);

          const { latitude: lat, longitude: lon } = pos.coords;

          const air = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          );

          const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );

          dispatch(
            setAirData({
              city: weather.data.name,
              ...air.data.list[0],
              weather: weather.data,
            })
          );

          setLoading(false);
        } catch {
          alert("Location fetch failed");
          setLoading(false);
        }
      },
      () => alert("Permission denied")
    );
  };

  
  const getAdvice = (aqi) => {
    if (aqi === 1) return "🌿 Good air quality.";
    if (aqi === 2) return "🙂 Moderate air.";
    if (aqi === 3) return "😷 Sensitive groups beware.";
    if (aqi === 4) return "⚠️ Unhealthy.";
    return "🚨 Hazardous!";
  };

 
  const getAQIStyle = (aqi) => {
    if (aqi === 1) return "bg-green-500";
    if (aqi === 2) return "bg-yellow-400";
    if (aqi === 3) return "bg-orange-500";
    if (aqi === 4) return "bg-red-500";
    return "bg-purple-600";
  };

  const getAQILabel = (aqi) => {
    if (aqi === 1) return "Good";
    if (aqi === 2) return "Moderate";
    if (aqi === 3) return "Unhealthy";
    if (aqi === 4) return "Very Unhealthy";
    return "Hazardous";
  };


  const chartData = data
    ? [
        { name: "PM2.5", value: data.components.pm2_5 },
        { name: "PM10", value: data.components.pm10 },
        { name: "CO", value: data.components.co },
        { name: "NO2", value: data.components.no2 },
      ]
    : [];

  const isFavorite = favorites.some(
    (item) => item.city === data?.city
  );

  return (
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-5xl font-bold mb-4">Air Quality Dashboard</h2>

      {/* Search */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <input
          className="px-5 py-3 rounded-xl text-black w-80 shadow-md"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          onClick={searchCity}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-white font-bold"
        >
          Search
        </button>

        <button
          onClick={getLocationData}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white font-bold"
        >
          📍 Location
        </button>
      </div>

      {/* History */}
      <div className="mb-8">
        <p className="font-semibold mb-2">Recent Searches:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {history.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                setCity(c);
                setTimeout(searchCity, 100);
              }}
              className={`px-3 py-1 rounded-lg text-sm ${
                darkMode ? "bg-slate-700 text-white" : "bg-white text-green-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-xl font-semibold">Loading...</p>}

      {/* Result */}
      {data && (
        <div
          className={`p-10 rounded-3xl shadow-2xl ${
            darkMode
              ? "bg-white/10 text-white backdrop-blur-lg"
              : "bg-green-200 text-green-900"
          }`}
        >
          <h3 className="text-4xl font-bold mb-6 capitalize">{data.city}</h3>

          {/* AQI */}
          <div className="mb-6">
            <span
              className={`px-6 py-3 rounded-full text-white font-bold text-lg ${getAQIStyle(
                data.main.aqi
              )}`}
            >
              AQI: {data.main.aqi} ({getAQILabel(data.main.aqi)})
            </span>
          </div>

          <p className="mb-6">{getAdvice(data.main.aqi)}</p>

          {/* Weather */}
          <div className="mb-6">
            🌡 {data.weather.main.temp}°C | 💧 {data.weather.main.humidity}% | 🌬{" "}
            {data.weather.wind.speed}
          </div>

          {/* Chart */}
          <div className="h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis stroke={darkMode ? "#fff" : "#065f46"} dataKey="name" />
                <YAxis stroke={darkMode ? "#fff" : "#065f46"} />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Save */}
          <button
            onClick={() => dispatch(addFavorite(data))}
            disabled={isFavorite}
            className={`px-6 py-3 rounded-xl text-white font-bold ${
              isFavorite
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isFavorite ? "Saved" : "Save Favorite"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;