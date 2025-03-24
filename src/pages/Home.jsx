import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";
import { fetchMovies } from "../services/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Avengers");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSearch, setResetSearch] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (query && !showFavorites) {
      fetchMovieData();
    }
  }, [query, page, showFavorites]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovieData = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const data = await fetchMovies(query, page);
      setMovies(data);
      if (data && data.length > 0) {
        setHasMoreMovies(data.length === 10);
      } else {
        setHasMoreMovies(false);
        setErrorMessage("❌ No data available");
      }
    } catch (error) {
      setErrorMessage("⚠️ Error fetching movies. Try again.");
      setHasMoreMovies(false);
    }
    setLoading(false);
  };

  const handleBackToHome = () => {
    setShowFavorites(false);
    setErrorMessage("");
    setQuery("Avengers");
    setPage(1);
  };

  const toggleFavorite = (movie) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div>
      <Header onTitleClick={handleBackToHome} onFavoritesToggle={() => setShowFavorites(!showFavorites)} />
      <div className="container mx-auto p-4 min-h-screen flex flex-col justify-between">
        
        {!showFavorites && (
          <SearchBar
            onSearch={(q) => {
              setQuery(q);
              setPage(1);
              setResetSearch(false);
            }}
            reset={resetSearch}
          />
        )}

        {loading && <p className="text-white text-center mt-4">Loading...</p>}
        
        {!loading && errorMessage && !showFavorites && (
          <div className="text-center mt-4">
            <p className="text-red-500">{errorMessage}</p>
            <button
              onClick={handleBackToHome}
              className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
            >
              🔄 Go to Home
            </button>
          </div>
        )}

        <div className="grid grid-cols-5 gap-6 mt-5">
          {!loading &&
            (showFavorites
              ? favorites.length > 0
                ? favorites.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={true}
                    />
                  ))
                : <p className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-blue-700 text-center col-span-5">❌ There are no favorites</p>
              : movies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                  />
                ))
            )}
        </div>

        {!loading && movies.length > 0 && !showFavorites && (
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 text-white rounded ${
                page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-700"
              }`}
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMoreMovies}
              className={`px-4 py-2 text-white rounded ${
                !hasMoreMovies ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
