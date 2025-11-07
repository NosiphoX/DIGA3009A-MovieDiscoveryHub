import { getFavourites, saveToFavourites } from "../utils/storage.js";
import { createMovieCard } from "../components/movieCard.js";
import { initFavouritesAnimations } from "../animations/favouritesAnimation.js";

const favouritesGrid = document.getElementById("favouritesGrid");
const emptyState = document.getElementById("emptyState");

document.addEventListener("DOMContentLoaded", () => {
  renderFavourites();

  // Listen to global favourites updates (from movieCard or other pages)
  window.addEventListener("favourites:updated", () => renderFavourites());
});

/* ==========================
   RENDER FAVOURITES GRID
========================== */
function renderFavourites() {
  const movies = getFavourites();
  favouritesGrid.innerHTML = "";

  if (movies.length === 0) {
    emptyState.classList.remove("visually-hidden");
  } else {
    emptyState.classList.add("visually-hidden");
    movies.forEach((movie) => {
      const card = createFavouriteCard(movie);
      favouritesGrid.appendChild(card);
    });

    // Initialize animations for freshly rendered cards
    initFavouritesAnimations();
  }
}

/* ==========================
   CREATE FAVOURITE CARD (WITH REMOVE)
========================== */
function createFavouriteCard(movie) {
  const card = createMovieCard(movie);

  // Override favourite button behavior specifically for Favourites page
  const favBtn = card.querySelector(".fav-btn");
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    saveToFavourites(movie, true); // remove
    renderFavourites();
  });

  return card;
}
