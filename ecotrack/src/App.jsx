import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-slate-950 to-slate-800 text-white"
            : "bg-gradient-to-br from-white via-green-50 to-green-100 text-green-950"
        }`}
      >
        {/* Navbar */}
        <nav
          className={`flex justify-between items-center px-8 py-5 shadow-lg ${
            darkMode
              ? "bg-slate-900 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          <h1 className="text-3xl font-bold">🌍 EcoTrack</h1>

          <div className="flex gap-6 items-center text-lg font-semibold">
            <NavLink to="/" className="hover:text-green-200">
              Home
            </NavLink>

            <NavLink to="/dashboard" className="hover:text-green-200">
              Dashboard
            </NavLink>

            <NavLink to="/favorites" className="hover:text-green-200">
              Favorites
            </NavLink>

            <button
              onClick={toggleTheme}
              className={`px-5 py-2 rounded-xl font-bold ${
                darkMode
                  ? "bg-white text-black"
                  : "bg-white text-green-700"
              }`}
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/favorites" element={<Favorites darkMode={darkMode} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;