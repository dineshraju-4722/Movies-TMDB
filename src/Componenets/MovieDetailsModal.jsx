import React, { useEffect } from "react";
import { X, Star, Calendar, Globe, Sparkles, Film, Heart } from "lucide-react";

function MovieDetailsModal({ movie, genreMap, onClose, isFavourite, onToggleFavourite }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : backdropUrl;

  const releaseDate = movie.release_date || movie.first_air_date;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const genreNames = movie.genres
    ? movie.genres.map((g) => g.name)
    : movie.genre_ids && genreMap
    ? movie.genre_ids.map((id) => genreMap[id]).filter(Boolean)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-rose-600 transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Backdrop Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-950 overflow-hidden shrink-0">
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800">
              <Film className="w-16 h-16 text-slate-700" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 -mt-16 sm:-mt-24 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Poster Image */}
            <div className="w-32 sm:w-44 shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700/60 bg-slate-800">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              ) : (
                <div className="w-full aspect-[2/3] flex items-center justify-center bg-slate-800 text-slate-500">
                  No Image
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {movie.title || movie.name}
              </h2>

              {movie.tagline && (
                <p className="text-xs sm:text-sm text-rose-400 italic mt-1 font-medium">
                  "{movie.tagline}"
                </p>
              )}

              {/* Badges & Meta info */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{rating} / 10</span>
                  {movie.vote_count && (
                    <span className="text-slate-400 text-xs font-normal">
                      ({movie.vote_count.toLocaleString()} votes)
                    </span>
                  )}
                </div>

                {releaseDate && (
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{releaseDate}</span>
                  </div>
                )}

                {movie.original_language && (
                  <div className="flex items-center gap-1.5 text-slate-300 uppercase">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>{movie.original_language}</span>
                  </div>
                )}
              </div>

              {/* Genre Pills */}
              {genreNames.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {genreNames.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700/60 font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-1">
                  Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {movie.overview || "No overview available for this movie."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => onToggleFavourite && onToggleFavourite(movie.id)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg ${
                    isFavourite
                      ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/40"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  }`}
                >
                  <Star className={`w-4 h-4 ${isFavourite ? "fill-white" : ""}`} />
                  <span>{isFavourite ? "In Favourites" : "Add to Favourites"}</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsModal;
