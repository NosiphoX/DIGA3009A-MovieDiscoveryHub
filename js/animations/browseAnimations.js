// js/animations/browseAnimations.js
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function initBrowseAnimations() {
  // 1. Intro timeline for control bar
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 }});
  tl.from(".browse-controls", { y: -20, opacity: 0 })
    .from(".movie-grid .movie-card", { stagger: 0.04, y: 20, opacity: 0 }, "-=0.2");

  // 2. ScrollTrigger reveal for future cards (works after render)
  gsap.utils.toArray(".movie-card").forEach(card => {
    gsap.fromTo(card, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6,
      scrollTrigger: {
        trigger: card, start: "top 85%", toggleActions: "play none none reverse"
      }
    });
  });

  // 3. MotionPath decorative SVG (film reel in header if present)
  const film = document.querySelector("#filmReelPath");
  if (film) {
    gsap.to(film, {
      duration: 6, repeat: -1, ease: "none",
      motionPath: { path: "#filmPath", align: "#filmPath", autoRotate: true, alignOrigin: [0.5,0.5] }
    });
  }

  // 4. Hover micro-interactions
  document.querySelectorAll(".movie-card .poster-wrap img").forEach(img => {
    img.addEventListener("mouseenter", () => gsap.to(img, { scale: 1.05, duration: 0.3 }));
    img.addEventListener("mouseleave", () => gsap.to(img, { scale: 1, duration: 0.3 }));
  });
}
