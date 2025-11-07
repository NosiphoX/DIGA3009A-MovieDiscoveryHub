// js/pages/details.js
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
} from "../api/tmdb.js";

import { initDetailsAnimations } from "../animations/detailsAnimation.js";

document.addEventListener("DOMContentLoaded", async () => {
  // ===== 1️⃣ Extract movie ID from URL =====
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id") || 603692; // fallback: John Wick: Chapter 4

  // ===== 2️⃣ Load details + cast + related movies =====
  const [details, credits, similar] = await Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCredits(movieId),
    fetchSimilarMovies(movieId),
  ]);

  renderMovieDetails(details);
  renderCast(credits.cast);
  renderRelatedMovies(similar);

  // ===== 3️⃣ Start animations =====
  initDetailsAnimations();
});

// ======  SECTION RENDERERS  ======

function renderMovieDetails(movie) {
  const container = document.querySelector(".movie-details");
  if (!container) return;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "assets/placeholder-poster.png";

  container.innerHTML = `
    <div class="details-hero">
      <div class="details-poster">
        <img src="${poster}" alt="${movie.title}" />
      </div>

      <div class="details-info blurred-bg">
        <h1>${movie.title}</h1>
        <p class="tagline">${movie.tagline || ""}</p>
        <p class="rating">⭐ ${movie.vote_average?.toFixed(1) || "N/A"} / 10</p>
        <p class="overview">${movie.overview || "No overview available."}</p>
        <p class="extra">
          Release: ${movie.release_date || "N/A"} | Runtime: ${movie.runtime || "N/A"} min
        </p>
      </div>
    </div>
  `;
}

function renderCast(cast) {
  const container = document.querySelector(".cast-section");
  if (!container) return;

  const castHTML = cast
    .slice(0, 15)
    .map((member) => {
      const profile = member.profile_path
        ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
        : "assets/placeholder-profile.png";

      return `
        <div class="cast-card">
          <img src="${profile}" alt="${member.name}">
          <p class="actor-name">${member.name}</p>
          <p class="character">${member.character}</p>
        </div>
      `;
    })
    .join("");

  container.innerHTML = `
    <h2>Cast</h2>
    <div class="cast-carousel">${castHTML}</div>
  `;
}

function renderRelatedMovies(movies) {
  const container = document.querySelector(".related-section");
  if (!container) return;

  const relatedHTML = movies
    .slice(0, 9)
    .map((movie) => {
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : "assets/placeholder-poster.png";

      return `
        <div class="card">
          <img src="${poster}" alt="${movie.title}">
          <div class="card-title">
            <h4>${movie.title}</h4>
            <p>${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
          </div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = `
    <h2>Related Movies</h2>
    <div class="related-grid">${relatedHTML}</div>
  `;
}
