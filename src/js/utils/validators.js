export function validateName(value) {
  if (value.trim().length < 2) {
    return 'Escribe tu nombre (mínimo 2 caracteres).';
  }
  return '';
}

export function validatePhone(value) {
  // Ignoramos espacios, guiones y paréntesis; todo lo demás cuenta
  const cleaned = value.replace(/[\s\-()]/g, '');

  if (cleaned.length === 0) {
    return 'Escribe tu teléfono.';
  }
  if (!/^\d{10}$/.test(cleaned)) {
    return 'El teléfono debe tener 10 dígitos. Puedes usar espacios, guiones o paréntesis.';
  }
  return '';
}

export function validateReason(value) {
  if (!value) {
    return 'Selecciona el motivo de tu consulta.';
  }
  return '';
}