import { validateName, validatePhone, validateReason } from '../utils/validators.js';

const FIELDS = [
  { id: 'name', validate: validateName },
  { id: 'phone', validate: validatePhone },
  { id: 'reason', validate: validateReason },
];

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  if (!form || !successMessage) return;

  // Verificamos que cada campo y su mensaje de error existan antes de seguir
  const missing = FIELDS.filter(
    ({ id }) => !document.getElementById(id) || !document.getElementById(`${id}-error`)
  );
  if (missing.length > 0) {
    console.warn(
      'Formulario de contacto: faltan elementos para',
      missing.map((f) => f.id).join(', ')
    );
    return;
  }

  function getParts(id) {
    return {
      input: document.getElementById(id),
      error: document.getElementById(`${id}-error`),
    };
  }

  function getDescribedBy(input) {
    return (input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
  }

  function showError(id, message) {
    const { input, error } = getParts(id);
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');

    // Conserva descripciones previas y agrega la del error
    const ids = getDescribedBy(input);
    if (!ids.includes(error.id)) ids.push(error.id);
    input.setAttribute('aria-describedby', ids.join(' '));
  }

  function clearError(id) {
    const { input, error } = getParts(id);
    error.textContent = '';
    input.removeAttribute('aria-invalid');

    // Quita solo el ID del error; conserva el resto
    const ids = getDescribedBy(input).filter((value) => value !== error.id);
    if (ids.length > 0) {
      input.setAttribute('aria-describedby', ids.join(' '));
    } else {
      input.removeAttribute('aria-describedby');
    }
  }

  function checkField({ id, validate }) {
    const { input } = getParts(id);
    const message = validate(input.value);

    if (message) {
      showError(id, message);
      return false;
    }
    clearError(id);
    return true;
  }

  // Solo revalida campos que ya muestran error; el error se quita únicamente si el valor ya es válido
  FIELDS.forEach((field) => {
    const { input } = getParts(field.id);
    const revalidate = () => {
      if (input.getAttribute('aria-invalid') === 'true') {
        checkField(field);
      }
    };

    input.addEventListener('input', revalidate);
    input.addEventListener('change', revalidate);
    input.addEventListener('blur', revalidate);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    successMessage.hidden = true;

    const results = FIELDS.map((field) => ({ field, valid: checkField(field) }));
    const firstInvalid = results.find((r) => !r.valid);

    if (firstInvalid) {
      getParts(firstInvalid.field.id).input.focus();
      return;
    }

    // Simulación: no se envía nada. Restauramos valores y estado de accesibilidad.
    form.reset();
    FIELDS.forEach(({ id }) => clearError(id));
    successMessage.hidden = false;
  });
}