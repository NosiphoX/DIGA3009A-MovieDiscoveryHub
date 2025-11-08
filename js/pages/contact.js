// js/pages/contact.js
// Minimal changes: removed `import gsap` (we use global gsap loaded via CDN).
// Guarded initContactAnimations call, ensured DOM elements exist, ensured show/hide error toggle adds/removes .visible for CSS.

import { initContactAnimations } from "../animations/contactAnimations.js";

document.addEventListener("DOMContentLoaded", () => {
  // initialize animations (the function itself guards for GSAP)
  initContactAnimations();

  const form = document.getElementById("contactForm");
  if (!form) return; // nothing to do if form not present

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const messageInput = document.getElementById("messageInput");
  const formSuccess = document.getElementById("formSuccess");

  // defensive: ensure success is hidden initially
  if (formSuccess) {
    formSuccess.classList.add("visually-hidden");
    formSuccess.setAttribute("aria-hidden", "true");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset all errors (hide)
    if (nameInput) hideError(nameInput);
    if (emailInput) hideError(emailInput);
    if (messageInput) hideError(messageInput);

    let valid = true;

    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) showError(nameInput, "Please enter your name");
      valid = false;
    }

    if (!emailInput || !validateEmail(emailInput.value)) {
      if (emailInput) showError(emailInput, "Please enter a valid email");
      valid = false;
    }

    if (!messageInput || !messageInput.value.trim()) {
      if (messageInput) showError(messageInput, "Message cannot be empty");
      valid = false;
    }

    if (valid) {
      // Show success message with GSAP if available
      if (formSuccess) {
        formSuccess.classList.remove("visually-hidden");
        formSuccess.setAttribute("aria-hidden", "false");
        if (typeof window.gsap !== "undefined") {
          window.gsap.fromTo(
            formSuccess,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        } else {
          // fallback: just ensure it's visible
          formSuccess.style.opacity = 1;
        }
      }

      // Reset form fields
      form.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        if (!formSuccess) return;
        if (typeof window.gsap !== "undefined") {
          window.gsap.to(formSuccess, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              formSuccess.classList.add("visually-hidden");
              formSuccess.setAttribute("aria-hidden", "true");
            },
          });
        } else {
          formSuccess.classList.add("visually-hidden");
          formSuccess.setAttribute("aria-hidden", "true");
        }
      }, 5000);
    }
  });

  // Remove error on input
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      hideError(input);
    });
  });
});

/* ========================
   VALIDATION HELPERS
   (kept as function declarations so they are hoisted)
======================== */
function showError(input, msg) {
  const error = input.nextElementSibling;
  if (!error) return;

  error.textContent = msg;
  error.classList.add("visible"); // ensures CSS transitions apply

  // Animate in if gsap available
  if (typeof window.gsap !== "undefined") {
    window.gsap.to(error, {
      opacity: 1,
      y: 0,
      height: "auto",
      duration: 0.4,
      ease: "power2.out",
    });

    window.gsap.to(input, { borderColor: "#ff4f8a", duration: 0.3 });
  } else {
    // fallback: set visible styles
    error.style.opacity = 1;
    input.style.borderColor = "#ff4f8a";
  }

  input.classList.add("input-error");
  input.setAttribute("aria-invalid", "true");
}

function hideError(input) {
  const error = input.nextElementSibling;
  if (!error) return;

  // Animate out if gsap available
  if (typeof window.gsap !== "undefined") {
    window.gsap.to(error, {
      opacity: 0,
      y: -10,
      height: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => error.classList.remove("visible"),
    });
    window.gsap.to(input, { borderColor: "rgba(255,255,255,0.2)", duration: 0.3 });
  } else {
    error.style.opacity = 0;
    error.classList.remove("visible");
    input.style.borderColor = "rgba(255,255,255,0.2)";
  }

  input.classList.remove("input-error");
  input.removeAttribute("aria-invalid");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
