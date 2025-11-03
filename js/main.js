// js/main.js
async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(`Error loading ${file}:`, err);
  }
}

// Load header and footer into every page
await loadComponent("header", "./header.html");
await loadComponent("footer", "./footer.html");

// Make mobile menu functional after header loads
document.addEventListener("click", e => {
  if (e.target.closest(".menu-toggle")) {
    document.querySelector(".main-nav").classList.toggle("active");
  }
});
