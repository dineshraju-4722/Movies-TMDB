import React, { useContext, useEffect, useRef, useState } from "react";
import { GetMovieBYId } from "../../API-Calls/MoviesCalls";
import Navbar from "../Navbar";
import MovieCard from "../MovieCard";
import SkeletonCard from "../SkeletonCard";
import MovieDetailsModal from "../MovieDetailsModal";
import { GenreContext } from "../../GenreContext";
import { useNavigate } from "react-router-dom";
import { Star, Heart, Film, Search, Trash2, ArrowRight } from "lucide-react";

function Favourites() {
  const navigate = useNavigate();
  const [moviesArray, setMoviesArray] = useState([]);
  const [movieids, setMoviesId] = useState(() => {
    return JSON.parse(localStorage.getItem("Favourites")) || [];
  });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const { genreMap, loading, setLoading } = useContext(GenreContext);
  const isFirst = useRef(true);

  function modifyIds(ide) {
    setMoviesId((prev) => prev.filter((id) => id !== ide));
    setMoviesArray((prev) => prev.filter((movie) => movie.id !== ide));
  }

  useEffect(() => {
    async function fetchFavourites() {
      if (movieids.length === 0) {
        setMoviesArray([]);
        return;
      }
      setLoading(true);
      try {
        const movies = await Promise.all(movieids.map((id) => GetMovieBYId(id)));
        // Filter out nulls/errors
        setMoviesArray(movies.filter(Boolean));
      } catch (err) {
        console.error("Failed to load favourites:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFavourites();
  }, []);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    localStorage.setItem("Favourites", JSON.stringify(movieids));
  }, [movieids]);

  // Filter stored favourites by search query and genre
  const filteredMovies = moviesArray.filter((m) => {
    const matchesSearch =
      !searchQuery ||
      (m.title && m.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const movieGenres = m.genres
      ? m.genres.map((g) => g.id)
      : m.genre_ids || [];

    const matchesGenre =
      selectedGenre === "all" || movieGenres.includes(Number(selectedGenre));

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col">
        {/* Vault Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 fill-rose-500" /> Saved Collection
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Your Favourites Vault
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {movieids.length === 1
                ? "1 movie bookmarked in your personal library"
                : `${movieids.length} movies bookmarked in your personal library`}
            </p>
          </div>

          {/* Quick Filter Search inside Favourites */}
          {moviesArray.length > 0 && (
            <div className="w-full md:w-auto flex items-center gap-3">
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Filter saved title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700/70 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>
          )}
        </div>

        {/* Favourites Grid or Empty State */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            <SkeletonCard count={movieids.length || 5} />
          </div>
        ) : movieids.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center glass-panel rounded-2xl border border-slate-800 my-auto">
            <div className="p-4 rounded-full bg-slate-800/80 text-rose-500 mb-4 animate-glow">
              <Film className="w-12 h-12 stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Your Favourites List is Empty
            </h3>
            <p className="text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
              Explore trending, popular, or upcoming movies and click the star icon on any poster to build your personalized collection!
            </p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-rose-950/40"
            >
              <span>Explore Movies Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="py-16 text-center text-slate-400 glass-card rounded-2xl p-8">
            <p className="text-lg font-medium">No saved movies match your search query.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genreMap={genreMap}
                isFavourite={movieids.includes(movie.id)}
                onToggleFavourite={modifyIds}
                onClickMovie={(m) => setSelectedMovie(m)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          genreMap={genreMap}
          isFavourite={movieids.includes(selectedMovie.id)}
          onToggleFavourite={modifyIds}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Favourites;