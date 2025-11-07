// js/pages/browse.js
import {
  fetchGenres,
  searchMovies,
  discoverMovies
} from "../api/tmdb.js";

import { createMovieCard } from "../components/movieCard.js";
import debounce from "../utils/debounce.js";

const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");
const yearSelect = document.getElementById("yearSelect");
const sortSelect = document.getElementById("sortSelect");
const movieGrid = document.getElementById("movieGrid");
const loadingMore = document.getElementById("loadingMore");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const errorState = document.getElementById("errorState");

let page = 1;
let currentQuery = "";
let currentFilters = {};
let isLoading = false;
let hasMore = true;

document.addEventListener("DOMContentLoaded", async () => {
  await populateGenres();
  populateYears();
  attachEventListeners();
  await performSearch(); // initial load
});

/* ==========================
   POPULATE FILTERS
========================== */
async function populateGenres() {
  const genres = await fetchGenres();
  genres.forEach((g) => {
    const opt = document.createElement("option");
    opt.value = g.id;
    opt.textContent = g.name;
    genreSelect.appendChild(opt);
  });
}

function populateYears() {
  const now = new Date().getFullYear();
  for (let y = now; y >= 1950; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }
}

/* ==========================
   EVENT HANDLERS
========================== */
function attachEventListeners() {
  searchInput.addEventListener("input", debounce(() => {
    page = 1;
    performSearch();
  }, 400));

  genreSelect.addEventListener("change", () => {
    page = 1;
    performSearch();
  });

  yearSelect.addEventListener("change", () => {
    page = 1;
    performSearch();
  });

  sortSelect.addEventListener("change", () => {
    page = 1;
    performSearch();
  });

  loadMoreBtn.addEventListener("click", () => performSearch(true));
}

/* ==========================
   FETCH & RENDER LOGIC
========================== */
async function performSearch(loadMore = false) {
  if (isLoading) return;

  isLoading = true;
  showLoading(true);
  hideError();

  const query = searchInput.value.trim();
  const filters = {
    genre: genreSelect.value || "",
    year: yearSelect.value || "",
    sort_by: sortSelect.value || "popularity.desc"
  };

  // if not loading more, reset grid
  if (!loadMore) {
    page = 1;
    movieGrid.innerHTML = "";
  } else {
    page++;
  }

  try {
    let results = [];

    if (query) {
      results = await searchMovies(query, page);
    } else {
      results = await discoverMovies({ ...filters, page });
    }

    if (results.length === 0 && page === 1) {
      showError("No movies found for that search or filter.");
      hasMore = false;
      loadMoreBtn.classList.add("visually-hidden");
    } else {
      results.forEach((movie) => {
        const card = createMovieCard(movie);
        movieGrid.appendChild(card);
      });

      hasMore = results.length >= 20;
      loadMoreBtn.classList.toggle("visually-hidden", !hasMore);

      // Re-run animations after render
      import("../animations/browseAnimations.js").then((mod) => mod.initBrowseAnimations());
    }
  } catch (err) {
    console.error("❌ Browse fetch failed:", err);
    showError("Something went wrong while fetching movies.");
  } finally {
    showLoading(false);
    isLoading = false;
  }
}

/* ==========================
   UI HELPERS
========================== */
function showLoading(show) {
  loadingMore.classList.toggle("visually-hidden", !show);
}

function showError(msg) {
  errorState.textContent = msg;
  errorState.classList.remove("visually-hidden");
}

function hideError() {
  errorState.classList.add("visually-hidden");
}
