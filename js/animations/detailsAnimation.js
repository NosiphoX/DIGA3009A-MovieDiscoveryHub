// js/animations/detailsAnimations.js
gsap.registerPlugin(ScrollTrigger);

export function initDetailsAnimations() {
  // Fade + Zoom effect for each section
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

  // Smooth bounce at top & bottom (visual illusion)
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
