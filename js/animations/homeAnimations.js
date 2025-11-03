// js/homeAnimations.js
// Future GSAP animations for the homepage
// e.g. cinematic intro timeline, reel scroll parallax, hover effects, etc.

import { gsap } from "gsap";

export function initHomeAnimations() {
  gsap.from(".hero-meta", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out"
  });
}

// Example use later in home.js:
// import { initHomeAnimations } from "./homeAnimations.js";
// initHomeAnimations();
