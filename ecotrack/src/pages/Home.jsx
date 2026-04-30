import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAirData, addFavorite } from "../redux/airSlice";

function Home({ darkMode }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.air.data);

  const API_KEY = "800710927f61403ca3aa2fb5f6ded07b";

  const searchCity = async () => {
    try {
      setLoading(true);

      const geo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );

      const lat = geo.data[0].lat;
      const lon = geo.data[0].lon;

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      dispatch(setAirData({ city, ...res.data.list[0] }));
      setLoading(false);
    } catch {
      alert("API Error");
      setLoading(false);
    }
  };

  const getAQIColor = (aqi) => {
    if (aqi === 1) return "bg-green-500";
    if (aqi === 2) return "bg-yellow-500";
    if (aqi === 3) return "bg-orange-500";
    if (aqi === 4) return "bg-red-500";
    return "bg-purple-600";
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-5xl font-bold mb-4">Air Quality Dashboard</h2>

      <p
        className={`mb-8 text-lg ${
          darkMode ? "text-slate-300" : "text-green-800"
        }`}
      >
        Search any city and monitor pollution levels instantly.
      </p>

      {/* Search Box */}
      <div className="flex gap-3 justify-center mb-10">
        <input
          className="px-5 py-3 rounded-xl text-black w-80 shadow-md"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          onClick={searchCity}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold text-white transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-xl font-semibold">Loading...</p>}

      {/* Result Card */}
      {data && (
        <div
          className={`rounded-3xl p-10 shadow-2xl transition-all ${
            darkMode
              ? "bg-white/10 backdrop-blur-lg text-white"
              : "bg-green-200/70 text-green-950"
          }`}
        >
          <h3 className="text-4xl font-bold mb-6 capitalize">{data.city}</h3>

          <div
            className={`inline-block px-6 py-3 rounded-full mb-8 text-lg font-bold text-black ${getAQIColor(
              data.main.aqi
            )}`}
          >
            AQI Level: {data.main.aqi}
          </div>

          {/* Pollution Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            <div
              className={`p-5 rounded-2xl shadow-md ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white text-green-900"
              }`}
            >
              PM2.5: {data.components.pm2_5}
            </div>

            <div
              className={`p-5 rounded-2xl shadow-md ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white text-green-900"
              }`}
            >
              PM10: {data.components.pm10}
            </div>

            <div
              className={`p-5 rounded-2xl shadow-md ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white text-green-900"
              }`}
            >
              CO: {data.components.co}
            </div>

            <div
              className={`p-5 rounded-2xl shadow-md ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white text-green-900"
              }`}
            >
              NO2: {data.components.no2}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={() => dispatch(addFavorite(data.city))}
            className="mt-8 bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl text-white font-bold transition"
          >
            Save Favorite
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;