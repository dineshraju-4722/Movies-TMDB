import React, { useContext, useEffect, useState } from "react";
import { GetUpcomingMovies } from "../API-Calls/MoviesCalls";
import { GenreContext } from "../GenreContext";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import MovieDetailsModal from "./MovieDetailsModal";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

function Upcoming() {
  const [upcomingMoviesData, setUpcomingMoviesData] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { genreMap, loading, setLoading } = useContext(GenreContext);

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
    async function fetchUpcoming() {
      setLoading(true);
      try {
        const res = await GetUpcomingMovies(page);
        setUpcomingMoviesData(res);
      } catch (err) {
        console.error("Failed to fetch upcoming movies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUpcoming();
  }, [page, setLoading]);

  const moviesList = upcomingMoviesData?.results || [];

  const filteredMovies =
    selectedGenre === "all"
      ? moviesList
      : moviesList.filter((m) =>
          m.genre_ids ? m.genre_ids.includes(Number(selectedGenre)) : true
        );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Genre Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
        </div>

        <button
          onClick={() => setSelectedGenre("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
            selectedGenre === "all"
              ? "bg-rose-600 text-white shadow-md shadow-rose-950/30"
              : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
          }`}
        >
          All Genres
        </button>

        {Object.entries(genreMap).map(([id, name]) => (
          <button
            key={id}
            onClick={() => setSelectedGenre(id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              selectedGenre === id
                ? "bg-rose-600 text-white shadow-md shadow-rose-950/30"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
        {loading || !upcomingMoviesData ? (
          <SkeletonCard count={10} />
        ) : filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genreMap={genreMap}
              isFavourite={localids.includes(movie.id)}
              onToggleFavourite={modifyIds}
              onClickMovie={(m) => setSelectedMovie(m)}
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-400">
            <p className="text-lg font-medium">No movies found in this genre for current page.</p>
            <button
              onClick={() => setSelectedGenre("all")}
              className="mt-3 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Genre Filter
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 py-8">
        <button
          disabled={page <= 1 || loading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition-colors border border-slate-700/60"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-bold shadow-inner">
          Page <span className="text-rose-400">{page}</span> of {upcomingMoviesData?.total_pages || 500}
        </span>

        <button
          disabled={loading || (upcomingMoviesData && page >= upcomingMoviesData.total_pages)}
          onClick={() => setPage((p) => p + 1)}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition-colors border border-slate-700/60"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Movie Details Modal */}
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

export default Upcoming;