// js/homeAnimations.js
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ====== MAIN INITIALIZER ======
export function initHomeAnimations() {

  // 1️⃣ Cinematic Hero Intro Timeline
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

  tl.from(".hero-poster", { scale: 1.2, opacity: 0, duration: 1.5 })
    .from(".hero-meta h1", { y: 40, opacity: 0 }, "-=1")
    .from(".hero-meta .rating", { y: 20, opacity: 0 }, "-=0.8")
    .from(".hero-meta .overview", { y: 20, opacity: 0 }, "-=0.6")
    .from(".hero-ctas", { y: 30, opacity: 0 }, "-=0.4");

  // 2️⃣ ScrollTrigger Animations (Mood bar + timeline)
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

  // 3️⃣ Cinematic Spotlight Sweep (replaces Film Reel SVG)
  const existingLight = document.querySelector(".hero-light");
  if (!existingLight) {
    const lightDiv = document.createElement("div");
    lightDiv.classList.add("hero-light");
    lightDiv.innerHTML = `
      <svg class="hero-light-svg" width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="spotlightGradient" cx="50%" cy="50%" r="30%">
            <stop offset="0%" stop-color="rgba(255,79,138,0.6)" />
            <stop offset="100%" stop-color="rgba(255,79,138,0)" />
          </radialGradient>
        </defs>
        <ellipse id="lightBeam" cx="100" cy="300" rx="180" ry="100" fill="url(#spotlightGradient)" />
      </svg>
    `;
    document.querySelector(".hero-left").appendChild(lightDiv);
  }

  // Animate the spotlight sweep
  gsap.to("#lightBeam", {
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    motionPath: {
      path: [
        { x: 0, y: 250 },
        { x: 300, y: 100 },
        { x: 600, y: 250 }
      ],
      curviness: 1.2
    },
    opacity: 0.8
  });

  // 4️⃣ Reel Item Hover Interaction
  document.querySelectorAll(".reel-item img").forEach(img => {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 0 20px rgba(255,79,138,0.8)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        rotateY: 0,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        duration: 0.3,
        ease: "power2.inOut"
      });
    });
  });
}
