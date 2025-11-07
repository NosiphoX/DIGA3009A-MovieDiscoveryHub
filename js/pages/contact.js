import { initContactAnimations } from "../animations/contactAnimations.js";

document.addEventListener("DOMContentLoaded", () => {
  initContactAnimations();

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const messageInput = document.getElementById("messageInput");
  const formSuccess = document.getElementById("formSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset error states
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
      // For demo, just show confirmation message
      formSuccess.classList.remove("visually-hidden");
      form.reset();
      setTimeout(() => formSuccess.classList.add("visually-hidden"), 5000);
    }
  });
});

/* ========================
   VALIDATION HELPERS
======================== */
function showError(input, msg) {
  const error = input.nextElementSibling;
  error.textContent = msg;
  error.classList.remove("visually-hidden");
  input.classList.add("input-error");
}

function hideError(input) {
  const error = input.nextElementSibling;
  error.classList.add("visually-hidden");
  input.classList.remove("input-error");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
