gsap.registerPlugin(ScrollTrigger);

export function initDetailsAnimations() {
  // Hero entrance
  gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } })
    .from(".poster", { opacity: 0, x: -50 })
    .from(".info-text", { opacity: 0, x: 50 }, "-=0.6");

  // Cast scroll animation
  gsap.from(".cast-item", {
    scrollTrigger: {
      trigger: ".cast-section",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
  });

  // Related movies reveal
  gsap.from(".related-item", {
    scrollTrigger: {
      trigger: ".related-section",
      start: "top 85%",
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
  });
}