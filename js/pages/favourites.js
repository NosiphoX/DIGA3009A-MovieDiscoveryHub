// js/pages/favourites.js
import { getFavourites } from "../utils/storage.js";
import { createMovieCard } from "../components/movieCard.js";
import { initFavouritesAnimations } from "../animations/favouritesAnimation.js";

const favouritesGrid = document.getElementById("favouritesGrid");

document.addEventListener("DOMContentLoaded", () => {
  if (!favouritesGrid) return;
  renderFavourites();

  // Listen for global updates (from other pages)
  window.addEventListener("favourites:updated", () => renderFavourites());
});

/* ==========================
   RENDER FAVOURITES GRID
========================== */
function renderFavourites() {
  const movies = getFavourites() || [];
  favouritesGrid.innerHTML = "";

  if (movies.length === 0) {
    // Empty state handled automatically via CSS :empty::before
    return;
  }

  movies.forEach((movie) => {
    const card = createFavouriteCard(movie);
    favouritesGrid.appendChild(card);
  });

  // Refresh animations
  initFavouritesAnimations();
}

/* ==========================
   CREATE FAVOURITE CARD (WITH REMOVE)
========================== */
function createFavouriteCard(movie) {
  const card = createMovieCard(movie);
  const favBtn = card.querySelector(".fav-btn");

  if (favBtn) {
    favBtn.textContent = "💔 Remove";
    favBtn.classList.replace("btn-save", "btn-remove");

    favBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Animate card out smoothly before removing
      gsap.to(card, {
        opacity: 0,
        scale: 0.85,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          removeFromFavourites(movie.id);
          card.remove();
          if (!favouritesGrid.children.length) renderFavourites();
        },
      });
    });
  }

  // Navigate to details page on card click
  card.addEventListener("click", () => {
    window.location.href = `details.html?id=${movie.id}`;
  });

  return card;
}

/* ==========================
   REMOVE FROM LOCAL STORAGE
========================== */
function removeFromFavourites(id) {
  const favourites = getFavourites() || [];
  const updated = favourites.filter((f) => f.id !== id);
  localStorage.setItem("favourites", JSON.stringify(updated));
  window.dispatchEvent(new Event("favourites:updated"));
}
