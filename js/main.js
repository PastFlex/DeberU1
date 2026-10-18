/**
 * ============================================================================
 * CIER 2026 - Lógica Interactiva y Accesible (Vanilla JavaScript)
 * ============================================================================
 * Interacciones Implementadas:
 * 1. Menú adaptable (Mobile Navigation Drawer) con gestión accesible de foco.
 * 2. Filtro dinámico de ponentes por área académica con anuncio accesible (aria-live).
 * 3. Validación en tiempo real y accesible del formulario de inscripción.
 * 4. Modal de confirmación accesible con focus trap y escape handler.
 * 5. Acordeón accesible para sección de Preguntas Frecuentes (FAQ).
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Inicialización de componentes
  initMobileMenu();
  initSpeakerFilter();
  initRegistrationForm();
  initFaqAccordion();
});

/* ==========================================================================
   1. MENÚ ADAPTABLE ACCESIBLE (Mobile Navigation Drawer)
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

  if (!toggleBtn || !mainNav) return;

  function openMenu() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'Cerrar menú principal de navegación');
    mainNav.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  }

  function closeMenu() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Abrir menú principal de navegación');
    mainNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerrar el menú al seleccionar un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Accesibilidad con teclado: Cerrar menú con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });

  // Si la pantalla se amplía a escritorio, restaurar estilos
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && mainNav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   2. FILTRO DINÁMICO DE PONENTES CON ANUNCIO ARIA-LIVE
   ========================================================================== */
function initSpeakerFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const speakerCards = document.querySelectorAll('.speaker-card');
  const announcer = document.getElementById('filter-announcer');

  if (!filterButtons.length || !speakerCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.getAttribute('data-category');

      // Actualizar estado activo y accesibilidad (aria-pressed)
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Filtrar tarjetas
      let visibleCount = 0;
      speakerCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'todos' || cardCategory === selectedCategory) {
          card.classList.remove('is-hidden');
          visibleCount++;
        } else {
          card.classList.add('is-hidden');
        }
      });

      // Anuncio accesible para lectores de pantalla
      if (announcer) {
        const categoryName = btn.textContent.trim();
        const pluralWord = visibleCount === 1 ? 'conferencista' : 'conferencistas';
        announcer.textContent = `Filtro aplicado: ${categoryName}. Mostrando ${visibleCount} ${pluralWord}.`;
      }
    });
  });
}

/* ==========================================================================
   3. VALIDACIÓN ACCESIBLE DE FORMULARIO DE INSCRIPCIÓN
   ========================================================================== */
function initRegistrationForm() {
  const form = document.getElementById('registration-form');
  const alertBox = document.getElementById('form-alert-box');

  if (!form) return;

  const fields = {
    fullname: {
      input: document.getElementById('fullname'),
      error: document.getElementById('fullname-error'),
      validate: (value) => {
        if (!value.trim()) return 'El nombre y apellidos son obligatorios.';
        if (value.trim().length < 4) return 'El nombre debe contener al menos 4 caracteres.';
        return '';
      }
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: (value) => {
        if (!value.trim()) return 'El correo electrónico es obligatorio.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Por favor ingrese un correo electrónico válido (ej. usuario@dominio.com).';
        return '';
      }
    },
    role: {
      input: document.getElementById('role'),
      error: document.getElementById('role-error'),
      validate: (value) => {
        if (!value) return 'Debe seleccionar su rol académico o profesional.';
        return '';
      }
    },
    preferredTrack: {
      input: document.getElementById('preferred-track'),
      error: document.getElementById('track-error'),
      validate: (value) => {
        if (!value) return 'Debe seleccionar un eje temático de interés.';
        return '';
      }
    },
    terms: {
      input: document.getElementById('terms-check'),
      error: document.getElementById('terms-error'),
      validate: (input) => {
        if (!input.checked) return 'Debe aceptar los términos y condiciones para continuar.';
        return '';
      }
    }
  };

  // Validación individual de un campo
  function validateField(fieldName) {
    const field = fields[fieldName];
    if (!field || !field.input) return true;

    let errorMessage = '';
    if (fieldName === 'terms') {
      errorMessage = field.validate(field.input);
    } else {
      errorMessage = field.validate(field.input.value);
    }

    if (errorMessage) {
      field.input.classList.add('is-invalid');
      field.input.setAttribute('aria-invalid', 'true');
      if (field.error) {
        field.error.textContent = errorMessage;
        field.error.classList.add('is-visible');
      }
      return false;
    } else {
      field.input.classList.remove('is-invalid');
      field.input.setAttribute('aria-invalid', 'false');
      if (field.error) {
        field.error.textContent = '';
        field.error.classList.remove('is-visible');
      }
      return true;
    }
  }

  // Validación para grupo de Radio buttons (Modalidad)
  function validateModality() {
    const radios = document.querySelectorAll('input[name="modality"]');
    const modalityError = document.getElementById('modality-error');
    const isChecked = Array.from(radios).some(r => r.checked);

    if (!isChecked) {
      if (modalityError) {
        modalityError.textContent = 'Debe seleccionar una modalidad de asistencia (Presencial o Virtual).';
        modalityError.classList.add('is-visible');
      }
      return false;
    } else {
      if (modalityError) {
        modalityError.textContent = '';
        modalityError.classList.remove('is-visible');
      }
      return true;
    }
  }

  // Escuchar evento blur en cada campo para retroalimentación inmediata
  Object.keys(fields).forEach(key => {
    const input = fields[key].input;
    if (input) {
      input.addEventListener('blur', () => validateField(key));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(key);
        }
      });
    }
  });

  // Manejador del envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    const errorsList = [];
    let firstInvalidInput = null;

    // Validar campos de texto y select
    Object.keys(fields).forEach(key => {
      const isValid = validateField(key);
      if (!isValid) {
        isFormValid = false;
        const input = fields[key].input;
        if (!firstInvalidInput) firstInvalidInput = input;
        const label = document.querySelector(`label[for="${input.id}"]`);
        const labelText = label ? label.textContent.replace('*', '').trim() : key;
        errorsList.push(`${labelText}: ${fields[key].error.textContent}`);
      }
    });

    // Validar modalidad
    const isModalityValid = validateModality();
    if (!isModalityValid) {
      isFormValid = false;
      errorsList.push('Modalidad: Debe seleccionar Presencial o Virtual.');
      if (!firstInvalidInput) {
        firstInvalidInput = document.querySelector('input[name="modality"]');
      }
    }

    if (!isFormValid) {
      // Mostrar resumen de errores accesible
      if (alertBox) {
        alertBox.classList.remove('sr-only');
        alertBox.innerHTML = `
          <strong>Por favor corrija los siguientes errores antes de continuar:</strong>
          <ul>${errorsList.map(err => `<li>${err}</li>`).join('')}</ul>
        `;
        alertBox.focus();
      }
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
    } else {
      // Éxito: Ocultar caja de alerta
      if (alertBox) {
        alertBox.classList.add('sr-only');
        alertBox.innerHTML = '';
      }

      // Obtener datos para el modal de confirmación
      const attendeeName = fields.fullname.input.value.trim();
      const attendeeEmail = fields.email.input.value.trim();
      const modalitySelected = document.querySelector('input[name="modality"]:checked').value;
      const modalityText = modalitySelected === 'presencial' ? 'Presencial (Campus Central)' : 'Virtual (Streaming HD)';

      // Disparar modal accesible de confirmación
      showConfirmationModal({
        name: attendeeName,
        email: attendeeEmail,
        modality: modalityText
      });

      // Resetear el formulario
      form.reset();
      Object.keys(fields).forEach(key => {
        fields[key].input.removeAttribute('aria-invalid');
      });
    }
  });
}

/* ==========================================================================
   4. MODAL ACCESIBLE DE CONFIRMACIÓN
   ========================================================================== */
function showConfirmationModal(data) {
  const modal = document.getElementById('confirmation-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const nameEl = document.getElementById('modal-attendee-name');
  const emailEl = document.getElementById('modal-ticket-email');
  const modalityEl = document.getElementById('modal-ticket-modality');
  const ticketEl = document.getElementById('modal-ticket-code');

  if (!modal || !closeBtn) return;

  // Llenar datos dinámicos
  if (nameEl) nameEl.textContent = data.name;
  if (emailEl) emailEl.textContent = data.email;
  if (modalityEl) modalityEl.textContent = data.modality;
  if (ticketEl) {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    ticketEl.textContent = `CIER-2026-X${randomCode}`;
  }

  // Guardar el elemento previamente enfocado
  const previouslyFocusedElement = document.activeElement;

  // Abrir modal
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
    document.removeEventListener('keydown', handleKeydown);
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
    // Trampa de foco (Focus Trap)
    if (e.key === 'Tab') {
      e.preventDefault();
      closeBtn.focus();
    }
  }

  closeBtn.addEventListener('click', closeModal, { once: true });
  document.addEventListener('keydown', handleKeydown);

  // Cerrar al hacer clic fuera del diálogo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. ACORDEÓN ACCESIBLE PARA PREGUNTAS FRECUENTES (FAQ)
   ========================================================================== */
function initFaqAccordion() {
  const buttons = document.querySelectorAll('.accordion-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const panelId = button.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      if (!panel) return;

      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        panel.setAttribute('hidden', '');
      } else {
        button.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      }
    });
  });
}
