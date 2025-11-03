import { fetchTrendingMovies } from "../api/tmdb";

document.addEventListener("DOMContentLoaded", async () => {
  const hero = document.getElementById("hero");
  const reel = document.getElementById("reel");
  const moodBar = document.getElementById("moodBar");

  let movies = await fetchTrendingMovies();
  let current = movies[0];

  renderHero(current);
  renderReel(movies);

  // --- Mood filtering (mock example) ---
  moodBar.addEventListener("click", e => {
    const btn = e.target.closest(".mood-btn");
    if (!btn) return;
    document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const mood = btn.dataset.mood;
    let filtered = movies;
    if (mood === "action") filtered = movies.filter(m => m.genre_ids.includes(28));
    else if (mood === "romance") filtered = movies.filter(m => m.genre_ids.includes(10749));
    else if (mood === "thriller") filtered = movies.filter(m => m.genre_ids.includes(53) || m.genre_ids.includes(9648));
    renderReel(filtered);
  });

  function renderHero(movie) {
    hero.innerHTML = `
      <div class="hero-poster" style="background-image:url('${movie.backdrop_path || movie.poster_path}')">
        <div class="hero-overlay">
          <div class="hero-meta">
            <h1>${movie.title} <span>(${new Date(movie.release_date).getFullYear()})</span></h1>
            <p class="rating">⭐ ${movie.vote_average.toFixed(1)}</p>
            <p class="overview">${movie.overview.slice(0, 200)}...</p>
            <div class="hero-ctas">
              <a href="details.html?id=${movie.id}" class="btn">Details</a>
              <button class="btn save" data-id="${movie.id}">Save</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderReel(list) {
    reel.innerHTML = "";
    list.forEach(movie => {
      const item = document.createElement("button");
      item.className = "reel-item";
      item.innerHTML = `<img src="${movie.poster_path}" alt="${movie.title}" />`;
      item.addEventListener("click", () => {
        current = movie;
        renderHero(movie);
      });
      reel.appendChild(item);
    });
  }
});
