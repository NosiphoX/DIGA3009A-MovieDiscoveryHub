// js/api/tmdb.js
const API_KEY = "dbc0406d11d056fd02118336b35027c8"; // ✅ Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMG = "./assets/images/placeholder.png";

/**
 * Generic fetch helper for TMDB API
 * Handles query params safely
 */
async function fetchFromTMDB(endpoint, extraParams = {}) {
  try {
    const params = new URLSearchParams({ api_key: API_KEY, language: 'en-US', ...extraParams });
    const response = await fetch(`${BASE_URL}${endpoint}?${params}`);
    if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ TMDB API Error:", error);
    return {}; // Return empty object instead of results array to avoid map errors
  }
}

/**
 * Ensure full image URLs or fallback
 */
function formatMovieImages(movie) {
  return {
    ...movie,
    poster_path: movie.poster_path ? `${IMG_URL}${movie.poster_path}` : FALLBACK_IMG,
    backdrop_path: movie.backdrop_path ? `${IMG_URL}${movie.backdrop_path}` : FALLBACK_IMG,
  };
}

/* ============================================================
   HOMEPAGE / BROWSE FUNCTIONS
============================================================ */

/**
 * Fetch trending movies of the day
 */
export async function fetchTrendingMovies() {
  const data = await fetchFromTMDB("/trending/movie/day");
  return data.results?.map(formatMovieImages) || [];
}

/**
 * Fetch all movie genres
 */
export async function fetchGenres() {
  const data = await fetchFromTMDB("/genre/movie/list");
  return data.genres || [];
}

/**
 * Search movies by keyword
 */
export async function searchMovies(query, page = 1) {
  const data = await fetchFromTMDB("/search/movie", { query, page });
  return data.results?.map(formatMovieImages) || [];
}

/**
 * Discover movies with filters (genre, year, etc.)
 */
export async function discoverMovies(filters = {}) {
  const queryParams = {
    sort_by: filters.sort_by || "popularity.desc",
    with_genres: filters.genre || "",
    primary_release_year: filters.year || "",
    page: filters.page || 1,
  };
  const data = await fetchFromTMDB("/discover/movie", queryParams);
  return data.results?.map(formatMovieImages) || [];
}

/* ============================================================
   DETAILS PAGE FUNCTIONS
============================================================ */

/**
 * Fetch detailed movie information
 */
export async function fetchMovieDetails(id) {
  const data = await fetchFromTMDB(`/movie/${id}`);
  return formatMovieImages(data);
}

/**
 * Fetch credits (cast + crew)
 */
export async function fetchMovieCredits(id) {
  const data = await fetchFromTMDB(`/movie/${id}/credits`);
  data.cast = data.cast?.map(c => ({
    ...c,
    profile_path: c.profile_path ? `${IMG_URL}${c.profile_path}` : FALLBACK_IMG,
  })) || [];

  data.crew = data.crew || [];
  const director = data.crew.find(c => c.job === "Director") || null;

  return { cast: data.cast, crew: data.crew, director };
}

/**
 * Fetch similar movies
 */
export async function fetchSimilarMovies(id) {
  const data = await fetchFromTMDB(`/movie/${id}/similar`);
  return data.results?.map(formatMovieImages) || [];
}

/* ============================================================
   IMAGE UTILITIES
============================================================ */
export { IMG_URL, FALLBACK_IMG };
