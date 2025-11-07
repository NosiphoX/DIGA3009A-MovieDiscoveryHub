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
  const movieId = params.get("id") || 603692; // fallback: John Wick: Chapter 4 ID (for testing)

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

  container.innerHTML = `
    <div class="details-hero" style="background-image:url('${movie.backdrop_path}')">
      <div class="overlay"></div>
      <div class="details-meta">
        <img src="${movie.poster_path}" alt="${movie.title}" class="poster" />
        <div class="info">
          <h1>${movie.title}</h1>
          <p class="tagline">${movie.tagline || ""}</p>
          <p class="rating">⭐ ${movie.vote_average.toFixed(1)} / 10</p>
          <p class="overview">${movie.overview}</p>
          <p class="extra">Release: ${movie.release_date || "N/A"} | Runtime: ${movie.runtime || "N/A"} min</p>
        </div>
      </div>
    </div>
  `;
}


function renderCast(cast) {
  const container = document.querySelector(".cast-section");
  if (!container) return;

  const castHTML = cast
    .slice(0, 15)
    .map(
      (member) => `
      <div class="cast-card">
        <img src="${member.profile_path}" alt="${member.name}">
        <p class="actor-name">${member.name}</p>
        <p class="character">${member.character}</p>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <h2>Cast</h2>
    <div class="cast-scroll">${castHTML}</div>
  `;
}


function renderRelatedMovies(movies) {
  const container = document.querySelector(".related-section");
  if (!container) return;

  const relatedHTML = movies
    .slice(0, 9)
    .map(
      (movie) => `
      <div class="related-card">
        <img src="${movie.poster_path}" alt="${movie.title}">
        <div class="related-info">
          <h4>${movie.title}</h4>
          <p>${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
        </div>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <h2>Related Movies</h2>
    <div class="related-grid">${relatedHTML}</div>
  `;
}
