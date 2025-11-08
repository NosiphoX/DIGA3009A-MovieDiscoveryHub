import { getFavourites, saveToFavourites } from "../utils/storage.js";
import { createMovieCard } from "../components/movieCard.js";
import { initFavouritesAnimations } from "../animations/favouritesAnimation.js";

const favouritesGrid = document.getElementById("favouritesGrid");
const emptyState = document.getElementById("emptyState");

document.addEventListener("DOMContentLoaded", () => {
  renderFavourites();

  // Listen to global favourites updates (from other pages)
  window.addEventListener("favourites:updated", () => renderFavourites());
});

/* ==========================
   RENDER FAVOURITES GRID
========================== */
function renderFavourites() {
  const movies = getFavourites() || [];
  favouritesGrid.innerHTML = "";

  if (!movies || movies.length === 0) {
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

  // Replace the favourite button with a "Remove" button
  let favBtn = card.querySelector(".fav-btn");
  if (favBtn) {
    favBtn.textContent = "💔 Remove";
    favBtn.classList.remove("btn-save");
    favBtn.classList.add("btn-remove");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
       let favourites = getFavourites() || [];
      favourites = favourites.filter((f) => f.id !== movie.id);
      localStorage.setItem("favourites", JSON.stringify(favourites));

      // Re-render grid and empty state
      renderFavourites();
    });
  }

  // Prevent clicking the card itself from breaking the page
   card.addEventListener("click", () => {
    window.location.href = `details.html?id=${movie.id}`;
  });

  return card;
}