// js/api.js

// --- TMDB CONFIG ---
const API_KEY = "dbc0406d11d056fd02118336b35027c8"; // Replace this with your actual key
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500"; // You can use /w342 or /w780 for smaller/larger

// --- FETCH HELPERS ---

/**
 * Generic fetch helper with error handling
 */
async function fetchData(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("TMDB fetch error:", err);
    return null;
  }
}

/**
 * Get trending movies of the day
 */
export async function fetchTrendingMovies() {
  const data = await fetchData("/trending/movie/day");
  if (!data) return [];
  return data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    overview: movie.overview,
    poster_path: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : "",
    backdrop_path: movie.backdrop_path ? `${IMG_BASE}${movie.backdrop_path}` : "",
    genre_ids: movie.genre_ids || []
  }));
}

/**
 * Get movie genres (used for filtering in Browse page later)
 */
export async function fetchGenres() {
  const data = await fetchData("/genre/movie/list");
  return data ? data.genres : [];
}

/**
 * Search movies (for Browse/Search page)
 */
export async function searchMovies(query, page = 1) {
  const data = await fetchData(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
  return data ? data.results : [];
}

/**
 * Get detailed movie info (for Details page)
 */
export async function fetchMovieDetails(id) {
  const data = await fetchData(`/movie/${id}`);
  return data || {};
}
