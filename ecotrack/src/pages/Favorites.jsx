import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/airSlice";

function Favorites() {
  const favorites = useSelector((state) => state.air.favorites);
  const dispatch = useDispatch();

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">Favorite Cities</h2>

      {favorites.map((city, i) => (
        <div
          key={i}
          className="bg-white/10 p-4 rounded-xl mb-3 flex justify-between"
        >
          <span>{city}</span>
          <button
            onClick={() => dispatch(removeFavorite(city))}
            className="bg-red-500 px-4 rounded-lg"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;