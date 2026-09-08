import React from "react";
import { Play, Info, Star, Sparkles } from "lucide-react";

function HeroBanner({ movie, onSelectMovie, isFavourite, onToggleFavourite }) {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] md:h-[520px] rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl group">
      {/* Background Image */}
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
      )}

      {/* Radial and Linear Gradients for Readable Text Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

      {/* Featured Badge */}
      <div className="absolute top-6 left-6 md:left-10 z-10 flex items-center gap-2 px-3 py-1 bg-rose-600/90 text-white rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-rose-950/50">
        <Sparkles className="w-3.5 h-3.5" /> Featured Movie
      </div>

      {/* Content Container */}
      <div className="absolute bottom-8 left-6 md:left-10 right-6 md:right-1/3 z-10 flex flex-col items-start gap-3">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
          {rating && (
            <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-md border border-amber-500/30 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
            </div>
          )}
          {year && <span className="font-semibold">{year}</span>}
          <span className="text-rose-400 font-medium uppercase tracking-wider text-[11px]">
            TMDB Trending
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
          {movie.title || movie.name}
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 max-w-2xl leading-relaxed drop-shadow">
          {movie.overview}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => onSelectMovie && onSelectMovie(movie)}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-rose-950/50 hover:scale-105"
          >
            <Info className="w-4 h-4" /> More Info
          </button>

          <button
            onClick={() => onToggleFavourite && onToggleFavourite(movie.id)}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all backdrop-blur-md border ${
              isFavourite
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                : "bg-slate-900/80 hover:bg-slate-800 border-white/10 text-slate-200"
            }`}
          >
            <Star className={`w-4 h-4 ${isFavourite ? "fill-amber-400 text-amber-400" : ""}`} />
            <span>{isFavourite ? "Saved" : "Bookmark"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
