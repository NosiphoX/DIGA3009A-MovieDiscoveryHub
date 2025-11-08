export function initContactAnimations() {
  if (!window.gsap) return;
  const gsap = window.gsap;

  const formWrap = document.querySelector(".contact-form-wrap");
  const inputs = document.querySelectorAll("#contactForm input, #contactForm textarea, #contactForm button");

  if (formWrap) gsap.from(formWrap, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" });

  if (inputs.length) {
    inputs.forEach((el) => {
      el.addEventListener("focus", () => gsap.to(el, { borderColor: "#ff4f8a", boxShadow: "0 0 8px rgba(255,79,138,0.5)", duration: 0.3 }));
      el.addEventListener("blur", () => gsap.to(el, { borderColor: "rgba(255,255,255,0.2)", boxShadow: "none", duration: 0.3 }));
    });
  }

  const submitBtn = document.querySelector(".submit-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      const rect = submitBtn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      submitBtn.appendChild(ripple);

      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.classList.add("ripple-animate");
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  }

  // Particle background
  for (let i = 0; i < 25; i++) spawnParticle();

  function spawnParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    document.body.appendChild(particle);

    const size = Math.random() * 6 + 2;
    particle.style.width = particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.background = `rgba(255,79,138,${Math.random() * 0.5 + 0.15})`;
    particle.style.position = "fixed";
    particle.style.bottom = "-20px";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";

    const duration = Math.random() * 15 + 10;
    const xMove = (Math.random() - 0.5) * 200;
    const yMove = -window.innerHeight - 50;

    gsap.to(particle, {
      x: xMove,
      y: yMove,
      opacity: 0,
      duration: duration,
      ease: "linear",
      onComplete: () => {
        particle.remove();
        spawnParticle();
      },
    });
  }
}
