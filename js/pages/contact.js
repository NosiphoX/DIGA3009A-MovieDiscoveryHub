import { initContactAnimations } from "../animations/contactAnimations";

document.addEventListener("DOMContentLoaded", () => {
  initContactAnimations();

  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const messageInput = document.getElementById("messageInput");
  const formSuccess = document.getElementById("formSuccess");

  if (formSuccess) {
    formSuccess.classList.add("visually-hidden");
    formSuccess.setAttribute("aria-hidden", "true");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    hideError(nameInput);
    hideError(emailInput);
    hideError(messageInput);

    let valid = true;

    if (!nameInput?.value.trim()) {
      showError(nameInput, "Please enter your name");
      valid = false;
    }

    if (!validateEmail(emailInput?.value)) {
      showError(emailInput, "Please enter a valid email");
      valid = false;
    }

    if (!messageInput?.value.trim()) {
      showError(messageInput, "Message cannot be empty");
      valid = false;
    }

    if (valid) {
      formSuccess.classList.remove("visually-hidden");
      formSuccess.setAttribute("aria-hidden", "false");

      if (window.gsap) {
        window.gsap.fromTo(formSuccess, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      } else {
        formSuccess.style.opacity = 1;
      }

      form.reset();

      setTimeout(() => {
        if (window.gsap) {
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

  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => hideError(input));
  });
});

function showError(input, msg) {
  const error = input?.nextElementSibling;
  if (!error) return;

  error.textContent = msg;
  error.classList.add("visible");

  if (window.gsap) {
    window.gsap.to(error, { opacity: 1, y: 0, height: "auto", duration: 0.4, ease: "power2.out" });
    window.gsap.to(input, { borderColor: "#ff4f8a", duration: 0.3 });
  } else {
    error.style.opacity = 1;
    input.style.borderColor = "#ff4f8a";
  }

  input.classList.add("input-error");
  input.setAttribute("aria-invalid", "true");
}

function hideError(input) {
  const error = input?.nextElementSibling;
  if (!error) return;

  if (window.gsap) {
    window.gsap.to(error, { opacity: 0, y: -10, height: 0, duration: 0.3, ease: "power2.in", onComplete: () => error.classList.remove("visible") });
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
