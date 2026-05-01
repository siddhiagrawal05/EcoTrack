import { useDispatch, useSelector } from "react-redux";
import { setAirData, removeFavorite } from "../redux/airSlice";

function Favorites({ darkMode }) {
  const favorites = useSelector((state) => state.air.favorites);
  const dispatch = useDispatch();

  
  if (!favorites.length) {
    return (
      <p className="text-center text-xl mt-10">
        ⭐ No favorites added yet
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-center">
        ⭐ Favorite Cities
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {favorites.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-lg transition hover:scale-105 ${
              darkMode
                ? "bg-white/10 text-white"
                : "bg-green-200 text-green-900"
            }`}
          >
            {/* City */}
            <h3 className="text-2xl font-bold mb-2 capitalize">
              {item.city}
            </h3>

            {/* AQI */}
            <p className="mb-2 font-semibold">
              AQI: {item.main.aqi}
            </p>

            {/* Weather */}
            <p className="mb-4">
              🌡 {item.weather.main.temp}°C | 💧{" "}
              {item.weather.main.humidity}%
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              {/* View */}
              <button
                onClick={() => dispatch(setAirData(item))}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-semibold"
              >
                View
              </button>

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFavorite(item.city))}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;