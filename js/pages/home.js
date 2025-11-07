import { fetchTrendingMovies, fetchGenres } from "../api/tmdb.js";
import { initHomeAnimations } from "../animations/homeAnimations.js";
import { saveToFavourites, isFavourite } from "../utils/storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  const hero = document.getElementById("hero");
  const reel = document.getElementById("reel");
  const moodBar = document.getElementById("moodBar");

  // Fetch movies and genres
  let movies = await fetchTrendingMovies();
  let genres = await fetchGenres();
  let current = movies[0];

  // Render mood buttons dynamically
  moodBar.innerHTML = `
    <button data-mood="all" class="mood-btn active">Discover</button>
    ${genres.map(g => `<button data-mood="${g.id}" class="mood-btn">${g.name}</button>`).join("")}
  `;

  renderHero(current);
  renderReel(movies);

  // Initialize GSAP animations after elements are rendered
  initHomeAnimations();

  // --- Mood filtering ---
  moodBar.addEventListener("click", e => {
    const btn = e.target.closest(".mood-btn");
    if (!btn) return;

    document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const mood = btn.dataset.mood;
    let filtered = movies;

    if (mood !== "all") {
      const genreId = parseInt(mood);
      filtered = movies.filter(m => m.genre_ids.includes(genreId));
    }

    renderReel(filtered);
    renderHero(filtered[0] || movies[0]); // update hero to first of filtered
    reel.scrollTop = 0; // optional: scroll reel to top
    initHomeAnimations(); // re-init animations for new content
  });

  // ====== RENDER FUNCTIONS ======
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

    // Save button logic
    const saveBtn = hero.querySelector(".hero-ctas .save");

    if (isFavourite(movie.id)) {
      saveBtn.textContent = "Saved";
      saveBtn.classList.add("saved");
    } else {
      saveBtn.textContent = "Save";
      saveBtn.classList.remove("saved");
    }

    saveBtn.addEventListener("click", () => {
      const alreadySaved = isFavourite(movie.id);
      saveToFavourites(movie, alreadySaved);

      if (alreadySaved) {
        saveBtn.textContent = "Save";
        saveBtn.classList.remove("saved");
      } else {
        saveBtn.textContent = "Saved";
        saveBtn.classList.add("saved");
      }
    });

    initHomeAnimations();
  }

  function renderReel(list) {
    reel.innerHTML = "";
    list.forEach(movie => {
      const item = document.createElement("button");
      item.className = "reel-item";
      item.innerHTML = `<img src="${movie.poster_path}" alt="${movie.title}" />`;
      item.addEventListener("click", () => {
        renderHero(movie);
      });
      reel.appendChild(item);
    });
  }
});
