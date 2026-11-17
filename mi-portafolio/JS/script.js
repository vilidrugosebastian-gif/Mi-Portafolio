document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú móvil desplegable
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      icon.classList.toggle("bx-menu");
      icon.classList.toggle("bx-x");
    });

    // Cerrar el menú al hacer clic en cualquier enlace
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        const icon = menuToggle.querySelector("i");
        icon.classList.add("bx-menu");
        icon.classList.remove("bx-x");
      });
    });
  }

  // 2. Filtrado interactivo de proyectos
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Actualizar botón activo
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category");
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 3. Resaltado de enlace activo en navbar según scroll
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSection = "";
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // 4. Validación y envío simulado del formulario de contacto
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const asunto = document.getElementById("asunto").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      if (!nombre || !email || !asunto || !mensaje) {
        formFeedback.textContent =
          "Por favor, completa todos los campos obligatorios.";
        formFeedback.className = "form-feedback error";
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formFeedback.textContent = "Ingresa un correo electrónico válido.";
        formFeedback.className = "form-feedback error";
        return;
      }

      formFeedback.textContent = `¡Gracias, ${nombre}! Tu mensaje ha sido enviado correctamente.`;
      formFeedback.className = "form-feedback success";
      contactForm.reset();

      setTimeout(() => {
        formFeedback.textContent = "";
      }, 5000);
    });
  }
});
