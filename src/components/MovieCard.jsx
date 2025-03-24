import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, onToggleFavorite, isFavorite }) => {
  const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
      <img src={poster} alt={movie.Title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{movie.Title}</h3>
        <p className="text-sm text-gray-600">{movie.Year}</p>
        <Link to={`/movie/${movie.imdbID}`} className="text-blue-500 mt-2 block">
          View Details →
        </Link>
      </div>

      {/* Favorite Button */}
      <button
        onClick={() => onToggleFavorite(movie)}
        className={`px-2 py-1 rounded text-white ${
          isFavorite ? "bg-yellow-500" : "bg-gray-500"
        }`}
      >
        {isFavorite ? "⭐ Favorited" : "☆ Favorite"}
      </button>
    </div>
  );
};

export default MovieCard;
