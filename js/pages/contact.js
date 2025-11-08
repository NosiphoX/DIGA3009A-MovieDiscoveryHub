import { initContactAnimations } from "../animations/contactAnimations.js";
import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  initContactAnimations();

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const messageInput = document.getElementById("messageInput");
  const formSuccess = document.getElementById("formSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset all errors
    hideError(nameInput);
    hideError(emailInput);
    hideError(messageInput);

    let valid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, "Please enter your name");
      valid = false;
    }

    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email");
      valid = false;
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, "Message cannot be empty");
      valid = false;
    }

    if (valid) {
      // Animate success message
      formSuccess.classList.remove("visually-hidden");
      gsap.fromTo(
        formSuccess,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      form.reset();

      // Hide success message after 5 seconds with animation
      setTimeout(() => {
        gsap.to(formSuccess, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => formSuccess.classList.add("visually-hidden"),
        });
      }, 5000);
    }
  });
});

/* ========================
   VALIDATION HELPERS
======================== */
function showError(input, msg) {
  const error = input.nextElementSibling;
  error.textContent = msg;

  // Animate error message in
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

  // Animate error message out
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

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
