import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
} from "../api/tmdb.js";

import { initDetailsAnimations } from "../animations/detailsAnimation.js";

// ====== MAIN LOADER ======
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id") || 603692; // fallback: John Wick: Chapter 4
  loadMovieData(movieId);
});

// ====== CORE DATA LOADER ======
async function loadMovieData(movieId) {
  try {
    const [details, credits, similar] = await Promise.all([
      fetchMovieDetails(movieId),
      fetchMovieCredits(movieId),
      fetchSimilarMovies(movieId),
    ]);

    renderMovieDetails(details);
    renderCast(credits.cast);
    renderRelatedMovies(similar);
    initDetailsAnimations();
  } catch (err) {
    console.error("Error loading movie data:", err);
  }
}

// ====== SECTION RENDERERS ======
function renderMovieDetails(movie) {
  const container = document.querySelector(".movie-details");
  if (!container) return;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "assets/placeholder-poster.png";

  container.innerHTML = `
    <div class="details-hero zoom-glow">
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
        <button class="save-btn" data-id="${movie.id}">${isFavourite(movie.id) ? "💖 Saved" : "💖 Save to Favourites"}</button>
      </div>
    </div>
  `;

  // ========== FAVOURITE BUTTON HANDLER ==========
  const saveBtn = container.querySelector(".save-btn");
  saveBtn.addEventListener("click", () => toggleFavourite(movie, saveBtn));
}

// ====== CAST SECTION ======
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

// ====== RELATED MOVIES ======
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
        <div class="card" data-id="${movie.id}">
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

  // ========== CLICK TO LOAD MOVIE DETAILS ==========
  container.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const newId = card.dataset.id;
      window.history.pushState({}, "", `?id=${newId}`);
      loadMovieData(newId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

// ====== FAVOURITES SYSTEM ======
function isFavourite(movieId) {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  return favourites.some(fav => fav.id === movieId);
}

function toggleFavourite(movie, btn) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  const index = favourites.findIndex(fav => fav.id === movie.id);

  if (index === -1) {
    favourites.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
    localStorage.setItem("favourites", JSON.stringify(favourites));
    btn.textContent = "💖 Saved";
    btn.classList.add("saved");
    alert(`${movie.title} added to Favourites 💖`);
  } else {
    favourites.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    btn.textContent = "💖 Save to Favourites";
    btn.classList.remove("saved");
    alert(`${movie.title} removed from Favourites`);
  }
}
