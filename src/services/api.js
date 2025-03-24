const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

export const fetchMovies = async (query, page = 1, type = "") => {
  try {
    const response = await fetch(`${BASE_URL}?s=${query}&page=${page}&type=${type}&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return {};
  }
};
