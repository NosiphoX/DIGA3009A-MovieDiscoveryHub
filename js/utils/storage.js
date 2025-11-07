// ======================================================
// FAVOURITES STORAGE SYSTEM
// Manages saving, removing, and checking favourites
// ======================================================

const FAV_KEY = "mdh_favourites_v1";

/**
 * ✅ Get all saved favourites
 * @returns {Array} Array of movie objects
 */
export function getFavourites() {
  try {
    const data = localStorage.getItem(FAV_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("❌ Failed to parse favourites:", error);
    return [];
  }
}

/**
 * ✅ Save or remove a movie in favourites
 * @param {Object} movie - The full TMDB movie object
 * @param {boolean} remove - Pass true to remove instead of add
 */
export function saveToFavourites(movie, remove = false) {
  const list = getFavourites();
  const index = list.findIndex((m) => m.id === movie.id);

  if (remove) {
    if (index > -1) list.splice(index, 1);
  } else {
    // Add only if not already saved
    if (index === -1) list.unshift({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    });
  }

  localStorage.setItem(FAV_KEY, JSON.stringify(list));

  // Dispatch global event so other pages can update UI
  window.dispatchEvent(
    new CustomEvent("favourites:updated", { detail: { list } })
  );
}

/**
 * ✅ Check if a movie is already saved
 * @param {number} id - TMDB movie ID
 * @returns {boolean}
 */
export function isFavourite(id) {
  const list = getFavourites();
  return list.some((m) => m.id === id);
}

/**
 * ✅ Clear all favourites (optional utility)
 */
export function clearFavourites() {
  localStorage.removeItem(FAV_KEY);
  window.dispatchEvent(new CustomEvent("favourites:updated", { detail: { list: [] } }));
}
