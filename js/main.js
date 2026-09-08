document.addEventListener('DOMContentLoaded', () => {

  // Fade-in on scroll con Intersection Observer
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));

  // Validación del formulario
  const form = document.getElementById('contactForm');
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const mensajeInput = document.getElementById('mensaje');
  const nombreError = document.getElementById('nombreError');
  const emailError = document.getElementById('emailError');
  const mensajeError = document.getElementById('mensajeError');
  const formSuccess = document.getElementById('formSuccess');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    nombreError.textContent = '';
    emailError.textContent = '';
    mensajeError.textContent = '';
    nombreInput.classList.remove('error');
    emailInput.classList.remove('error');
    mensajeInput.classList.remove('error');
  }

  nombreInput.addEventListener('input', () => {
    if (nombreInput.value.trim().length > 0) {
      nombreError.textContent = '';
      nombreInput.classList.remove('error');
    }
  });

  emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value.trim())) {
      emailError.textContent = '';
      emailInput.classList.remove('error');
    }
  });

  mensajeInput.addEventListener('input', () => {
    if (mensajeInput.value.trim().length > 0) {
      mensajeError.textContent = '';
      mensajeInput.classList.remove('error');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    if (nombreInput.value.trim().length === 0) {
      nombreError.textContent = 'El nombre es obligatorio.';
      nombreInput.classList.add('error');
      valid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Ingresa un email válido.';
      emailInput.classList.add('error');
      valid = false;
    }

    if (mensajeInput.value.trim().length === 0) {
      mensajeError.textContent = 'El mensaje es obligatorio.';
      mensajeInput.classList.add('error');
      valid = false;
    }

    if (valid) {
      form.reset();
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }
  });

});