import gsap from "gsap";

export function initContactAnimations() {
  const formWrap = document.querySelector(".contact-form-wrap");
  const inputs = document.querySelectorAll("#contactForm input, #contactForm textarea, #contactForm button");

  // Fade in form
  gsap.from(formWrap, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" });

  // Input focus micro-animations
  inputs.forEach((el) => {
    el.addEventListener("focus", () => gsap.to(el, { borderColor: "#ff4f8a", boxShadow: "0 0 8px rgba(255,79,138,0.5)", duration: 0.3 }));
    el.addEventListener("blur", () => gsap.to(el, { borderColor: "rgba(255,255,255,0.2)", boxShadow: "none", duration: 0.3 }));
  });

  // Ripple effect on submit button
  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    submitBtn.appendChild(ripple);

    const rect = submitBtn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    ripple.classList.add("ripple-animate");

    ripple.addEventListener("animationend", () => ripple.remove());
  });

  // Floating cinematic particles
  createParticles();
}




function showError(input, msg) {
  const error = input.nextElementSibling;
  error.textContent = msg;

  // Animate in
  gsap.to(error, { 
    opacity: 1, 
    y: 0, 
    height: "auto", 
    duration: 0.4, 
    ease: "power2.out" 
  });

  // Animate input border
  gsap.to(input, { borderColor: "#ff4f8a", duration: 0.3 });
  input.classList.add("input-error");
}

function hideError(input) {
  const error = input.nextElementSibling;

  gsap.to(error, {
    opacity: 0,
    y: -10,
    height: 0,
    duration: 0.3,
    ease: "power2.in"
  });

  // Reset input border
  gsap.to(input, { borderColor: "rgba(255,255,255,0.2)", duration: 0.3 });
  input.classList.remove("input-error");
}










/* ============================
   PARTICLE BACKGROUND
============================ */
function createParticles() {
  const body = document.body;
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    body.appendChild(particle);

    const size = Math.random() * 6 + 2; // 2-8px
    particle.style.width = particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.background = `rgba(255,79,138,${Math.random() * 0.5 + 0.2})`;
    particle.style.position = "fixed";
    particle.style.bottom = "-20px";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";

    animateParticle(particle);
  }
}

function animateParticle(particle) {
  const duration = Math.random() * 15 + 10; // 10-25s
  const xMove = (Math.random() - 0.5) * 200; // drift left/right
  const yMove = -window.innerHeight - 50; // move upward

gsap.to(btn, {
    boxShadow: "0 0 12px rgba(255,79,138,0.7)",
    textShadow: "0 0 8px rgba(255,79,138,0.7)",
    duration: 1.2 + Math.random(), // slight random timing
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: i * 0.2 // stagger flickers slightly
  });



  gsap.to(particle, {
    x: xMove,
    y: yMove,
    opacity: 0,
    duration: duration,
    ease: "linear",
    onComplete: () => {
      particle.remove();
      createParticles(); // spawn new particle
    }
  });
}
