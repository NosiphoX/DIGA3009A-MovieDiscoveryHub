// js/animations/detailsAnimations.js
gsap.registerPlugin(ScrollTrigger);

export function initDetailsAnimations() {
  // === 0️⃣ Add rotating glow behind details hero ===
  const hero = document.querySelector(".details-hero");
  if (hero) {
    const glow = document.createElement("div");
    glow.classList.add("hero-glow");
    hero.prepend(glow);

    // Style the glow
    Object.assign(glow.style, {
      position: "absolute",
      top: "-50%",
      left: "50%",
      width: "100%",
      height: "190%",
      background: "radial-gradient(circle, rgba(255,79,138,0.25) 0%, transparent 70%)",
      zIndex: "0",
      pointerEvents: "none",
      borderRadius: "50%",
    });

    // Animate rotation
    gsap.to(glow, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });
  }

  // === 1️⃣ Fade + Zoom effect for each section ===
  gsap.utils.toArray("section").forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 20%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });

  // === 2️⃣ Cast grid fade-in animation ===
  gsap.from(".cast-grid .cast-card", {
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".cast-grid",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // === 3️⃣ Smooth bounce at top & bottom (visual illusion) ===
  const scrollContainer = document.scrollingElement;
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const current = scrollContainer.scrollTop;
    const maxScroll = scrollContainer.scrollHeight - window.innerHeight;

    // Bounce when reaching the top
    if (current <= 0 && lastScroll > 0) {
      gsap.to(window, {
        scrollTo: 30,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      });
    }

    // Bounce when reaching the bottom
    if (current >= maxScroll && lastScroll < maxScroll) {
      gsap.to(window, {
        scrollTo: maxScroll - 30,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      });
    }

    lastScroll = current;
  });
}
