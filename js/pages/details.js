// js/pages/details.js
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies
} from "../api/tmdb.js";
import { initDetailsAnimations } from "../animations/detailsAnimation.js";
import { isFavourite, addFavourite, removeFavourite } from "./favourites.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  const main = document.getElementById("details-page") || document.querySelector("main");
  if (!movieId) {
    showError("No movie selected.");
    return;
  }

  showLoading(true);

  // Fetch in parallel and guard against null responses
  const [detailsRes, creditsRes, relatedRes] = await Promise.all([
    fetchMovieDetails(movieId).catch(err => { console.error(err); return null; }),
    fetchMovieCredits(movieId).catch(err => { console.error(err); return null; }),
    fetchSimilarMovies(movieId).catch(err => { console.error(err); return null; })
  ]);

  showLoading(false);

  if (!detailsRes) {
    showError("Could not load movie details. Please try again later.");
    return;
  }

  // Ensure arrays exist before using slice()
  const castList = (creditsRes && Array.isArray(creditsRes.cast)) ? creditsRes.cast.slice(0, 12) : [];
  const relatedList = (relatedRes && Array.isArray(relatedRes.results)) ? relatedRes.results.slice(0, 8) : [];

  renderDetails(detailsRes);
  renderCast(castList);
  renderRelated(relatedList);

  // Wire Save button behaviour (using favourites util)
  setupSaveButton(detailsRes);

  // Run GSAP animations (if gsap is loaded)
  try { initDetailsAnimations(); } catch (e) { console.warn("Animations init failed:", e); }
});

/* ---------- RENDER HELPERS ---------- */

function renderDetails(movie) {
  const bg = document.querySelector(".hero-bg");
  // Use fallback images if paths missing
  bg.style.backgroundImage = `url('${movie.backdrop_path || movie.poster_path || "./assets/images/placeholder.png"}')`;

  const posterEl = document.querySelector(".poster");
  posterEl.src = movie.poster_path || "./assets/images/placeholder.png";
  posterEl.alt = movie.title || "Poster";

  document.querySelector(".title").textContent = movie.title || "Untitled";
  const releaseYear = movie.release_date ? movie.release_date.slice(0,4) : "n/a";
  const runtime = movie.runtime ? `${movie.runtime}min` : "n/a";
  const genres = movie.genres && movie.genres.length ? movie.genres.map(g => g.name).join(", ") : "—";

  document.querySelector(".meta").textContent = `${releaseYear} • ${runtime} • ${genres}`;
  document.querySelector(".rating").textContent = movie.vote_average ? `⭐ ${movie.vote_average.toFixed(1)}` : "⭐ —";
  document.querySelector(".overview").textContent = movie.overview || "No overview available.";
}

function renderCast(cast) {
  const container = document.querySelector(".cast-list");
  container.innerHTML = "";
  if (!cast.length) {
    container.innerHTML = `<p class="empty-cast">Cast information not available.</p>`;
    return;
  }

  cast.forEach(member => {
    const div = document.createElement("div");
    div.classList.add("cast-item");
    div.innerHTML = `
      <img src="${member.profile_path || "./assets/images/person-placeholder.png"}" alt="${member.name}">
      <p class="cast-name">${member.name}</p>
      <p class="cast-role">${member.character || ""}</p>
    `;
    container.appendChild(div);
  });
}

function renderRelated(list) {
  const container = document.querySelector(".related-list");
  container.innerHTML = "";
  if (!list.length) {
    container.innerHTML = `<p class="empty-related">No related movies found.</p>`;
    return;
  }

  list.forEach(movie => {
    const a = document.createElement("a");
    a.href = `details.html?id=${movie.id}`;
    a.className = "related-item";
    a.innerHTML = `
      <img src="${movie.poster_path || './assets/images/placeholder.png'}" alt="${movie.title}">
      <p>${movie.title}</p>
    `;
    container.appendChild(a);
  });
}

/* ---------- FAVOURITES ---------- */

function setupSaveButton(movie) {
  const saveBtn = document.querySelector(".btn.save");
  if (!saveBtn) return;

  const updateState = () => {
    const saved = isFavourite(movie.id);
    saveBtn.textContent = saved ? "Saved" : "Save";
    saveBtn.classList.toggle("saved", saved);
  };

  updateState();

  saveBtn.addEventListener("click", () => {
    if (isFavourite(movie.id)) {
      removeFavourite(movie.id);
      gsap?.to(saveBtn, { backgroundColor: "#111", color: "#fff", duration: 0.25 });
    } else {
      addFavourite(movie);
      // small pop animation
      gsap?.fromTo(saveBtn, { scale: 0.9 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1 });
      gsap?.to(saveBtn, { backgroundColor: "#ff4f8a", color: "#fff", duration: 0.25 });
    }
    updateState();
  });
}

/* ---------- LOADING / ERROR UI ---------- */

function showLoading(isLoading) {
  const main = document.getElementById("details-page") || document.querySelector("main");
  let loader = document.querySelector(".details-loader");
  if (isLoading) {
    if (!loader) {
      loader = document.createElement("div");
      loader.className = "details-loader";
      loader.innerHTML = `<div class="spinner"></div>`;
      main.prepend(loader);
    }
  } else {
    loader?.remove();
  }
}

function showError(message) {
  const main = document.getElementById("details-page") || document.querySelector("main");
  main.innerHTML = `<div class="details-error"><p>${message}</p></div>`;
}
