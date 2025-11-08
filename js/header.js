// js/header.js
export async function loadHeader() {
  try {
    // 1️⃣ Fetch and inject the header HTML
    const res = await fetch("./header.html");
    const html = await res.text();
    document.getElementById("header").innerHTML = html;

    // 2️⃣ Wait a short moment to ensure DOM elements exist
    await new Promise((resolve) => setTimeout(resolve, 50));

    // 3️⃣ Now safely select elements and attach event listener
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
      });
    } else {
      console.warn("Header elements not found — check .menu-toggle or .main-nav selectors.");
    }
  } catch (err) {
    console.error("Error loading header:", err);
  }
}
