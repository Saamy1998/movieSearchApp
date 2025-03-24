import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "5f874515"; // Store in .env for security

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        setError("Error fetching movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Fallback Poster if no image is available
  const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div className="container mx-auto p-4">
      {/* Navigation Links */}
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Movie Details</h2>
      <Link to="/" className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700">🔄 Go to Home</Link>
      </div>

      {/* Movie Details */}
      <div className="flex flex-col md:flex-row items-start">
        {/* Movie Poster (Smaller Size) */}
        <img src={poster} alt={movie.Title} className="w-48 h-auto rounded-lg shadow-lg" />

        {/* Movie Information */}
        <div className="md:ml-8 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold">{movie.Title}</h2>
          <p className="text-gray-700 italic">{movie.Plot}</p>

          <div className="mt-4 space-y-1">
            <p><strong>📅 Year:</strong> {movie.Year}</p>
            <p><strong>📌 Rated:</strong> {movie.Rated}</p>
            <p><strong>⏳ Runtime:</strong> {movie.Runtime}</p>
            <p><strong>🎭 Genre:</strong> {movie.Genre}</p>
            <p><strong>🎬 Director:</strong> {movie.Director}</p>
            <p><strong>✍️ Writers:</strong> {movie.Writer}</p>
            <p><strong>🎭 Actors:</strong> {movie.Actors}</p>
            <p><strong>🌎 Language:</strong> {movie.Language}</p>
            <p><strong>🏆 Awards:</strong> {movie.Awards}</p>
            <p><strong>💰 Box Office:</strong> {movie.BoxOffice}</p>
            <p><strong>🔗 IMDb Rating:</strong> {movie.imdbRating} ⭐ ({movie.imdbVotes} votes)</p>

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mt-3">
                <p><strong>📊 Ratings:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  {movie.Ratings.map((rating, index) => (
                    <li key={index}><strong>{rating.Source}:</strong> {rating.Value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
