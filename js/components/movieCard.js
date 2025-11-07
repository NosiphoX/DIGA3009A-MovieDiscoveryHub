// js/components/movieCard.js
import { saveToFavourites, isFavourite } from "../utils/storage.js";

export function createMovieCard(movie) {
  const card = document.createElement("article");
  card.className = "movie-card";

  const link = document.createElement("a");
  link.href = `details.html?id=${movie.id}`;
  link.className = "card-link";
  link.setAttribute("aria-label", `View details for ${movie.title}`);

  const poster = document.createElement("div");
  poster.className = "poster-wrap";
  poster.innerHTML = `
    <img src="${movie.poster_path}" alt="${movie.title} poster" loading="lazy" />
  `;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.innerHTML = `
    <h3>${movie.title}</h3>
    <p class="meta-sub">⭐ ${movie.vote_average.toFixed(1)} • ${new Date(
      movie.release_date || ""
    ).getFullYear() || "—"}</p>
  `;

  // ===== Favourite Button =====
  const favBtn = document.createElement("button");
  favBtn.className = "fav-btn";
  favBtn.textContent = isFavourite(movie.id) ? "Saved" : "Save";
  favBtn.setAttribute("aria-pressed", isFavourite(movie.id) ? "true" : "false");

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isFavourite(movie.id)) {
      saveToFavourites(movie, true); // remove
      favBtn.textContent = "Save";
      favBtn.setAttribute("aria-pressed", "false");
    } else {
      saveToFavourites(movie);
      favBtn.textContent = "Saved";
      favBtn.setAttribute("aria-pressed", "true");
    }
  });

  link.appendChild(poster);
  link.appendChild(meta);
  card.appendChild(link);
  card.appendChild(favBtn);
  return card;
}
