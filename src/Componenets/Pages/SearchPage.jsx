import React, { useContext, useEffect, useRef, useState } from "react";
import { GetSearchResults } from "../../API-Calls/MoviesCalls";
import { GenreContext } from "../../GenreContext";
import Navbar from "../Navbar";
import MovieCard from "../MovieCard";
import SkeletonCard from "../SkeletonCard";
import MovieDetailsModal from "../MovieDetailsModal";
import { Search, X, SlidersHorizontal, Film, ArrowUp } from "lucide-react";

function SearchPage() {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { loading, setLoading, genreMap } = useContext(GenreContext);

  const debounceTimer = useRef(null);
  const lastMovieRef = useRef(null);
  const observer = useRef(null);

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

  // Handle Search Input Change with proper debouncing
  function handleSearchInput(e) {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!value.trim()) {
      setMoviesData([]);
      setPage(1);
      setHasMore(false);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await GetSearchResults(value, 1);
        setPage(1);
        setMoviesData(res || []);
        setHasMore((res || []).length > 0);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 400);
  }

  // Load More logic for pagination
  const loadMoreResults = async () => {
    if (!search.trim() || loading || !hasMore) return;
    const nextPage = page + 1;
    setLoading(true);
    try {
      const res = await GetSearchResults(search, nextPage);
      if (res && res.length > 0) {
        setMoviesData((prev) => [...prev, ...res]);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter results by genre tag
  const filteredMovies =
    selectedGenre === "all"
      ? moviesData
      : moviesData.filter((m) =>
          m.genre_ids ? m.genre_ids.includes(Number(selectedGenre)) : true
        );

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col">
        {/* Search Header Banner */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            Explore <span className="text-rose-500">TMDB Database</span>
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            Search thousands of movies by title, franchise, or keywords instantly.
          </p>

          {/* Search Box Input */}
          <div className="relative w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="search"
              autoFocus
              className="w-full pl-12 pr-12 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-slate-100 text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-2xl transition-all"
              placeholder="Search for any movie title..."
              value={search}
              onChange={handleSearchInput}
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setMoviesData([]);
                }}
                className="absolute right-4 top-3.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Genre Filter Bar when search results exist */}
        {moviesData.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Genre:
            </div>

            <button
              onClick={() => setSelectedGenre("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedGenre === "all"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-950/30"
                  : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
              }`}
            >
              All
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
        )}

        {/* Search Results Grid / Initial / Empty States */}
        {search.trim() === "" ? (
          <div className="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-2xl border border-slate-800 my-auto">
            <div className="p-4 rounded-full bg-slate-800/80 text-slate-500 mb-3">
              <Film className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-slate-200">Start Searching</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-sm">
              Type in a movie title above to search through the entire TMDB movie catalog.
            </p>
          </div>
        ) : filteredMovies.length === 0 && !loading ? (
          <div className="py-20 text-center glass-card rounded-2xl p-8">
            <p className="text-lg font-bold text-slate-200">No movies found</p>
            <p className="text-slate-400 text-sm mt-1">
              We couldn't find any results for "{search}". Try searching for another term.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  genreMap={genreMap}
                  isFavourite={localids.includes(movie.id)}
                  onToggleFavourite={modifyIds}
                  onClickMovie={(m) => setSelectedMovie(m)}
                />
              ))}

              {loading && <SkeletonCard count={5} />}
            </div>

            {/* Load More Button */}
            {hasMore && !loading && moviesData.length > 0 && (
              <div className="flex justify-center py-6">
                <button
                  onClick={loadMoreResults}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl border border-slate-700/60 shadow-lg transition-colors"
                >
                  Load More Results
                </button>
              </div>
            )}
          </div>
        )}
      </main>

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

export default SearchPage;