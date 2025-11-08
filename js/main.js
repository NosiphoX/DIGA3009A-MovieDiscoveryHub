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

// === 1️⃣ Load header & footer BEFORE adding event listeners ===
await loadComponent("header", "./header.html");
await loadComponent("footer", "./footer.html");

// === 2️⃣ Wait until header is actually injected, THEN run listeners ===
document.addEventListener("DOMContentLoaded", () => {
  // Delay ensures header DOM exists before selecting
  requestAnimationFrame(() => {
    // Mobile menu toggle
    document.addEventListener("click", (e) => {
      if (e.target.closest(".menu-toggle")) {
        const nav = document.querySelector(".main-nav");
        if (nav) nav.classList.toggle("active");
      }
    });

    // Highlight active nav link based on current URL
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("href").split("/").pop();
      if (linkPage === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }

      // Visually update on click (SPA feel)
      link.addEventListener("click", () => {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });

    // --- Logo Intro Animation ---
    if (window.gsap) {
      gsap.from(".logo img", {
        duration: 1,
        opacity: 0,
        y: -20,
        ease: "power2.out",
      });

      gsap.from(".logo span", {
        duration: 1,
        opacity: 0,
        y: -10,
        delay: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(".logo span", {
            color: "#ff4f8a",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
          });
        },
      });
    } else {
      console.warn("GSAP not loaded — logo animation skipped.");
    }
  });
});
