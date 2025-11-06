import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from "../api/tmdb.js";
import { initDetailsAnimations } from "../animations/detailsAnimations.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  if (!movieId) return;

  const [details, credits, related] = await Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCredits(movieId),
    fetchSimilarMovies(movieId)
  ]);

  renderDetails(details);
  renderCast(credits.cast.slice(0, 12));
  renderRelated(related.results.slice(0, 8));
  initDetailsAnimations();
});

function renderDetails(movie) {
  const bg = document.querySelector(".hero-bg");
  bg.style.backgroundImage = `url(${movie.backdrop_path || movie.poster_path})`;

  document.querySelector(".poster").src = movie.poster_path;
  document.querySelector(".poster").alt = movie.title;
  document.querySelector(".title").textContent = movie.title;
  document.querySelector(".meta").textContent = `${movie.release_date.slice(0,4)} • ${movie.runtime}min • ${movie.genres.map(g => g.name).join(", ")}`;
  document.querySelector(".rating").textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
  document.querySelector(".overview").textContent = movie.overview;
}

function renderCast(cast) {
  const container = document.querySelector(".cast-list");
  container.innerHTML = "";
  cast.forEach(member => {
    const div = document.createElement("div");
    div.classList.add("cast-item");
    div.innerHTML = `
      <img src="${member.profile_path}" alt="${member.name}">
      <p class="cast-name">${member.name}</p>
      <p class="cast-role">${member.character}</p>
    `;
    container.appendChild(div);
  });
}

function renderRelated(list) {
  const container = document.querySelector(".related-list");
  container.innerHTML = "";
  list.forEach(movie => {
    const div = document.createElement("a");
    div.href = `details.html?id=${movie.id}`;
    div.classList.add("related-item");
    div.innerHTML = `
      <img src="${movie.poster_path}" alt="${movie.title}">
      <p>${movie.title}</p>
    `;
    container.appendChild(div);
  });
}
