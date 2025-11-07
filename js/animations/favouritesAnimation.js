gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function initFavouritesAnimations() {
  const cards = document.querySelectorAll(".movie-card");

  if (cards.length > 0) {
    // Fade-in timeline for grid
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });
    tl.from(".favourites-grid-wrap", { y: -20, opacity: 0 })
      .from(".movie-grid .movie-card", { stagger: 0.05, y: 20, opacity: 0 }, "-=0.2");

    // ScrollTrigger reveal for each card
    gsap.utils.toArray(".movie-card").forEach((card) => {
      gsap.fromTo(
        card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Hover micro-interactions
    document.querySelectorAll(".movie-card .poster-wrap img").forEach((img) => {
      img.addEventListener("mouseenter", () => gsap.to(img, { scale: 1.05, duration: 0.3 }));
      img.addEventListener("mouseleave", () => gsap.to(img, { scale: 1, duration: 0.3 }));
    });
  } else {
    // Animate the empty reel
    const reel = document.querySelector("#emptyReel");
    if (reel) {
      gsap.fromTo(
        reel.children,
        { y: 0, opacity: 0.5 },
        {
          y: -10,
          opacity: 1,
          stagger: 0.2,
          repeat: -1,
          yoyo: true,
          duration: 0.8,
          ease: "power1.inOut",
        }
      );

      // Horizontal floating motion
      gsap.to(reel, {
        x: 20,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }
  }
}
