import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Film, Search, Star, Clapperboard, Heart } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/home" || location.pathname === "/";
  const isFavourites = location.pathname === "/favourites";
  const isSearch = location.pathname === "/search";

  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const favs = JSON.parse(localStorage.getItem("Favourites")) || [];
      setFavCount(favs.length);
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    const interval = setInterval(updateCount, 1000);
    return () => {
      window.removeEventListener("storage", updateCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => navigate("/home")}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-lg shadow-rose-950/40 group-hover:scale-105 transition-transform">
            <Clapperboard className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:to-rose-400 transition-colors">
            Cine<span className="text-rose-500">Pulse</span>
          </span>
        </div>

        {/* Center Search Input Trigger */}
        <div
          onClick={() => navigate("/search")}
          className={`flex-1 max-w-md hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-slate-700/60 hover:border-rose-500/50 cursor-pointer text-slate-400 hover:text-slate-200 transition-all text-sm group ${
            isSearch ? "border-rose-500/50 bg-slate-900/90" : ""
          }`}
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-rose-400 transition-colors" />
          <span className="truncate">Search movies by title, genre, cast...</span>
          <kbd className="hidden lg:inline-block ml-auto px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-400 rounded border border-slate-700">
            Search
          </kbd>
        </div>

        {/* Right Nav Options */}
        <nav className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <button
            onClick={() => navigate("/search")}
            className={`sm:hidden p-2.5 rounded-xl transition-colors ${
              isSearch
                ? "bg-rose-600 text-white"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
            }`}
            title="Search Movies"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Movies Link */}
          <button
            onClick={() => navigate("/home")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              isHome
                ? "bg-rose-600 text-white shadow-lg shadow-rose-950/40"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Movies</span>
          </button>

          {/* Favourites Link with Badge */}
          <button
            onClick={() => navigate("/favourites")}
            className={`relative px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              isFavourites
                ? "bg-rose-600 text-white shadow-lg shadow-rose-950/40"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Star className={`w-4 h-4 ${isFavourites ? "fill-white" : ""}`} />
            <span>Favourites</span>
            {favCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-[11px] font-extrabold bg-amber-500 text-slate-950 rounded-full">
                {favCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;