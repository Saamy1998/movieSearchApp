import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch movie suggestions from API
  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Search) {
          // **Filter results to only include movies that START with query**
          const filteredMovies = data.Search.filter(movie =>
            movie.Title.toLowerCase().startsWith(query.toLowerCase())
          );

          setSuggestions(filteredMovies.slice(0, 5)); // Limit to 5 suggestions
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching movie suggestions:", error);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300); // Debounce API call
    return () => clearTimeout(timer);
  }, [query]);

  // Handle search
  const handleSearch = (selectedQuery) => {
    if (!selectedQuery.trim()) {
      alert("⚠️ Enter a movie title or keyword");
      return;
    }
    setQuery(selectedQuery);
    setSuggestions([]);
    onSearch(selectedQuery);
  };

  // Search on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      handleSearch(query);
    }
  };

  return (
    <div className="relative flex items-center justify-center mt-4">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-64 px-4 py-2 border rounded-l-md  focus:ring-blue-500"
      />
      <button
        onClick={() => handleSearch(query)}
        className="px-4 py-2 border bg-black rounded-r-md hover:bg-blue-700"
      >
        🔍
      </button>
      {suggestions.length > 0 && (
        <ul className="absolute z-50 top-12 w-64 bg-white border shadow-lg rounded-md mt-1">
          {suggestions.map((movie) => (
            <li
              key={movie.imdbID}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
              onClick={() => handleSearch(movie.Title)}
            >
              <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/30"} 
                   alt={movie.Title} className="w-8 h-8 mr-2 rounded" />
              {movie.Title} ({movie.Year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
