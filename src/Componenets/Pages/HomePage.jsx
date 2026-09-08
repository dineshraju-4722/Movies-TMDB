import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import TopRated from "../TopRated";
import Popular from "../Popular";
import Upcoming from "../Upcoming";
import HeroBanner from "../HeroBanner";
import MovieDetailsModal from "../MovieDetailsModal";
import { GenreContext } from "../../GenreContext";
import { GetPopularMovies } from "../../API-Calls/MoviesCalls";
import { Flame, Sparkles, Calendar, TrendingUp } from "lucide-react";

function Home() {
  const { genreMap } = useContext(GenreContext);
  const [activeTab, setActiveTab] = useState("trending");
  const [heroMovie, setHeroMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [localids, setLocalids] = useState(() => {
    return JSON.parse(localStorage.getItem("Favourites")) || [];
  });

  function modifyIds(id) {
    if (localids.indexOf(id) === -1) {
      setLocalids((prev) => [...prev, id]);
    } else {
      setLocalids((prev) => prev.filter((e) => e !== id));
    }
  }

  useEffect(() => {
    localStorage.setItem("Favourites", JSON.stringify(localids));
  }, [localids]);

  useEffect(() => {
    async function loadHero() {
      try {
        const res = await GetPopularMovies(1);
        if (res && res.results && res.results.length > 0) {
          // Pick a top backdrop movie for hero banner
          const backdropMovie = res.results.find((m) => m.backdrop_path) || res.results[0];
          setHeroMovie(backdropMovie);
        }
      } catch (err) {
        console.error("Hero movie load failed:", err);
      }
    }
    loadHero();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex flex-col">
        {/* Featured Hero Section */}
        {heroMovie && (
          <HeroBanner
            movie={heroMovie}
            onSelectMovie={(m) => setSelectedMovie(m)}
            isFavourite={localids.includes(heroMovie.id)}
            onToggleFavourite={modifyIds}
          />
        )}

        {/* Tab Navigation Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === "trending"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => setActiveTab("popular")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === "popular"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Popular</span>
            </button>

            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === "upcoming"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Upcoming</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400">
            <TrendingUp className="w-4 h-4 text-rose-500" />
            <span>Updated Daily via TMDB API</span>
          </div>
        </div>

        {/* Tab Content Section */}
        <section className="flex-1 w-full animate-fade-in">
          {activeTab === "trending" && <TopRated />}
          {activeTab === "popular" && <Popular />}
          {activeTab === "upcoming" && <Upcoming />}
        </section>
      </main>

      {/* Hero Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          genreMap={genreMap}
          isFavourite={localids.includes(selectedMovie.id)}
          onToggleFavourite={modifyIds}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Home;