// js/animations/detailsAnimations.js
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function initDetailsAnimations() {
  // ========================
  // 1️⃣ HERO TIMELINE ANIMATION
  // ========================
  const heroTimeline = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });
  
  // ← Replace these lines with updated selectors:
  heroTimeline.from(".poster-wrapper", { scale: 1.2, opacity: 0, duration: 1.5 })
              .from(".hero-info h1", { y: 40, opacity: 0 }, "-=1")
              .from(".hero-info p, .movie-meta", { y: 20, opacity: 0, stagger: 0.2 }, "-=0.8")
              .from(".hero-buttons button", { y: 20, opacity: 0, stagger: 0.15 }, "-=0.6");
  
  
}

  // ========================
  // 2️⃣ SECTION SCROLL-ZOOM ANIMATION
  // ========================
  gsap.utils.toArray("section").forEach(section => {
    gsap.fromTo(section, 
      { scale: 0.97, opacity: 0.8 }, 
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true
        }
      }
    );
  });

  // ========================
  // 3️⃣ CAST HORIZONTAL SCROLL ANIMATION
  // ========================
  const castList = document.querySelector(".cast-list");
  if(castList) {
    const castCards = castList.querySelectorAll(".cast-card");
    gsap.to(castCards, {
      xPercent: -100 * (castCards.length - Math.floor(castList.offsetWidth / castCards[0].offsetWidth)),
      ease: "none",
      scrollTrigger: {
        trigger: ".cast-section",
        start: "top center",
        end: "bottom top",
        scrub: 0.5,
        pin: true,
      }
    });
  }

  // ========================
  // 4️⃣ SVG CINEMATIC MOTIONPATH ANIMATION
  // ========================
  // create SVG dynamically
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "motion-svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100");
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.pointerEvents = "none";
  svg.style.zIndex = "5";

  const circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  circle.setAttribute("r", "12");
  circle.setAttribute("fill", "#ff4f8a");
  svg.appendChild(circle);
  document.body.appendChild(svg);

  gsap.to(circle, {
    duration: 6,
    repeat: -1,
    motionPath: {
      path: [
        { x: 50, y: 50 },
        { x: window.innerWidth - 50, y: 50 },
        { x: window.innerWidth / 2, y: 80 },
        { x: 50, y: 50 }
      ],
      curviness: 1.5
    },
    ease: "power1.inOut"
  });

  // ========================
  // 5️⃣ TOP/BOTTOM BOUNCE INDICATORS
  // ========================
  const topBounce = document.createElement("div");
  const bottomBounce = document.createElement("div");
  topBounce.classList.add("top-bounce");
  bottomBounce.classList.add("bottom-bounce");
  document.body.appendChild(topBounce);
  document.body.appendChild(bottomBounce);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;

    // top bounce
    if(scrollTop <= 10) gsap.to(topBounce, { opacity: 1, duration: 0.3, yoyo:true, repeat:1 });
    else gsap.to(topBounce, { opacity: 0, duration: 0.3 });

    // bottom bounce
    if(scrollTop >= scrollHeight - 10) gsap.to(bottomBounce, { opacity: 1, duration: 0.3, yoyo:true, repeat:1 });
    else gsap.to(bottomBounce, { opacity: 0, duration: 0.3 });
  });


