// js/pages/details.js
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies, FALLBACK_IMG } from "../api/tmdb.js";
import { initDetailsAnimations } from "../animations/detailsAnimation.js";

// Grab movie ID from URL query params
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id") || "550"; // default to Fight Club for testing

// DOM Elements
const moviePoster = document.getElementById("moviePoster");
const movieTitle = document.getElementById("movieTitle");
const movieTagline = document.getElementById("movieTagline");
const movieOverview = document.getElementById("movieOverview");
const releaseDateEl = document.getElementById("releaseDate");
const movieRating = document.getElementById("movieRating");
const movieGenres = document.getElementById("movieGenres");
const castList = document.querySelector(".cast-list");
const relatedGrid = document.querySelector(".related-grid");

// Initialize page
async function initDetailsPage() {
  try {
    // 1️⃣ Fetch movie details
    const details = await fetchMovieDetails(movieId);
    moviePoster.src = details.poster_path || FALLBACK_IMG;
    movieTitle.textContent = details.title || "Movie Title";
    movieTagline.textContent = details.tagline || "A cinematic journey beyond imagination.";
    movieOverview.textContent = details.overview || "No overview available.";
    releaseDateEl.textContent = details.release_date || "Unknown";
    movieRating.textContent = details.vote_average || "N/A";
    movieGenres.textContent = details.genres?.map(g => g.name).join(", ") || "Unknown";

    // 2️⃣ Fetch cast
    const credits = await fetchMovieCredits(movieId);
    castList.innerHTML = ""; // clear placeholders
    credits.cast.slice(0, 15).forEach(actor => {
      const card = document.createElement("div");
      card.classList.add("cast-card");
      card.innerHTML = `
        <img src="${actor.profile_path || FALLBACK_IMG}" alt="${actor.name}" />
        <p class="actor-name">${actor.name}</p>
        <p class="character-name">as ${actor.character}</p>
      `;
      castList.appendChild(card);
    });

    // 3️⃣ Fetch related movies
    const related = await fetchSimilarMovies(movieId);
    relatedGrid.innerHTML = ""; // clear placeholders
    related.slice(0, 6).forEach((movie, i) => {
      const card = document.createElement("div");
      card.classList.add(i === 0 ? "featured" : "card"); // first is featured
      card.innerHTML = `
        <img src="${movie.poster_path || FALLBACK_IMG}" alt="${movie.title}" />
        <div class="card-title">${movie.title}</div>
      `;
      relatedGrid.appendChild(card);
    });

    // 4️⃣ Initialize animations after content is rendered
    initDetailsAnimations();

  } catch (err) {
    console.error("Error initializing details page:", err);
  }
}

document.addEventListener("DOMContentLoaded", initDetailsPage);
