
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ====== MAIN INITIALIZER ======
export function initHomeAnimations() {

  // 1Cinematic Hero Intro Timeline
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

  tl.from(".hero-poster", { scale: 1.2, opacity: 0, duration: 1.5 })
    .from(".hero-meta h1", { y: 40, opacity: 0 }, "-=1")
    .from(".hero-meta .rating", { y: 20, opacity: 0 }, "-=0.8")
    .from(".hero-meta .overview", { y: 20, opacity: 0 }, "-=0.6")
    .from(".hero-ctas", { y: 30, opacity: 0 }, "-=0.4");

  // ScrollTrigger Animations (Mood bar + timeline)
  gsap.from(".mood-bar", {
    scrollTrigger: {
      trigger: ".mood-bar",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    y: -30,
    opacity: 0,
    duration: 1,
  });

  gsap.from(".timeline", {
    scrollTrigger: {
      trigger: ".timeline",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
  });

  // SVG / MotionPath Animation — Film Reel Line
  const svgContainer = document.createElement("div");
  svgContainer.classList.add("film-reel-svg");
  svgContainer.innerHTML = `
    <svg width="100%" height="60" viewBox="0 0 800 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="filmPath" d="M 0 30 Q 200 10 400 30 T 800 30" stroke="#ff4f8a" stroke-width="3" stroke-linecap="round" stroke-dasharray="8 8"/>
      <circle id="filmDot" r="6" fill="#ff4f8a" />
    </svg>
  `;
  document.querySelector(".hero-left").appendChild(svgContainer);

  gsap.to("#filmDot", {
    duration: 4,
    repeat: -1,
    ease: "none",
    motionPath: {
      path: "#filmPath",
      align: "#filmPath",
      alignOrigin: [0.5, 0.5],
    },
  });

  // Reel Item Hover Interaction
  document.querySelectorAll(".reel-item img").forEach(img => {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, { scale: 1.05, rotate: 1, boxShadow: "0 0 15px rgba(255,79,138,0.8)", duration: 0.3 });
    });
    img.addEventListener("mouseleave", () => {
      gsap.to(img, { scale: 1, rotate: 0, boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.3 });
    });
  });
}
