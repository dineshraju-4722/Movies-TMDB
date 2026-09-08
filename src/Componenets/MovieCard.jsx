import React, { useState } from "react";
import { Star, Info, Film } from "lucide-react";

function MovieCard({ movie, genreMap, isFavourite, onToggleFavourite, onClickMovie }) {
  const [imgError, setImgError] = useState(false);

  const posterUrl =
    !imgError && movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date
      ? new Date(movie.first_air_date).getFullYear()
      : null;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  const genreNames = movie.genre_ids
    ? movie.genre_ids.map((id) => genreMap[id]).filter(Boolean)
    : movie.genres
      ? movie.genres.map((g) => g.name)
      : [];

  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden glass-card hover:border-rose-500/40 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-950/20 w-full sm:w-[13.5rem] md:w-[14.5rem]">
      {/* Poster Container */}
      <div
        className="relative aspect-[2/3] w-full bg-slate-800 overflow-hidden cursor-pointer"
        onClick={() => onClickMovie && onClickMovie(movie)}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 p-4 text-center">
            <Film className="w-10 h-10 mb-2 stroke-[1.5] text-slate-600" />
            <span className="text-xs font-medium">No Poster Available</span>
          </div>
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClickMovie && onClickMovie(movie);
            }}
            className="w-full py-2 bg-rose-600/90 hover:bg-rose-600 text-white font-medium text-xs rounded-lg backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-rose-900/40"
          >
            <Info className="w-3.5 h-3.5" /> Quick Overview
          </button>
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-2.5 left-2.5 px-2 py-1 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-md flex items-center gap-1 text-xs font-semibold text-amber-400 shadow-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
        )}

        {/* Favourite Star Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(movie.id);
          }}
          title={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${isFavourite
              ? "bg-rose-500 text-white shadow-rose-600/50 scale-110"
              : "bg-slate-950/70 text-slate-300 hover:text-rose-400 hover:bg-slate-900/90 border border-white/10"
            }`}
        >
          <Star
            className={`w-4 h-4 transition-transform duration-200 ${isFavourite ? "fill-white text-white" : ""
              }`}
          />
        </button>
      </div>

      {/* Movie Details Info */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-slate-900/40">
        <div>
          <h3
            onClick={() => onClickMovie && onClickMovie(movie)}
            className="font-bold text-sm text-slate-100 line-clamp-1 group-hover:text-rose-400 transition-colors cursor-pointer"
            title={movie.title || movie.name}
          >
            {movie.title || movie.name}
          </h3>

          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            {releaseYear && <span className="font-medium text-slate-400">{releaseYear}</span>}
            {releaseYear && genreNames.length > 0 && <span>•</span>}
            {genreNames.length > 0 && (
              <span className="truncate text-slate-400">{genreNames[0]}</span>
            )}
          </div>
        </div>

        {/* Genre Tags */}
        {genreNames.length > 1 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {genreNames.slice(0, 2).map((genre, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50 font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
