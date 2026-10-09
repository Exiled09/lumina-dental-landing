export function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-item__trigger');

  // Si el HTML no tiene preguntas, no hacemos nada
  if (triggers.length === 0) return;

  function getAnswer(trigger) {
    return document.getElementById(trigger.getAttribute('aria-controls'));
  }

  // Única función que cambia el estado: aria-expanded y hidden siempre juntos
  function setExpanded(trigger, isExpanded) {
    const answer = getAnswer(trigger);
    if (!answer) return;

    trigger.setAttribute('aria-expanded', String(isExpanded));
    answer.hidden = !isExpanded;
  }

  function isExpanded(trigger) {
    return trigger.getAttribute('aria-expanded') === 'true';
  }

  // Estado inicial explícito: todo cerrado
  triggers.forEach((trigger) => setExpanded(trigger, false));

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const willOpen = !isExpanded(trigger);

      // Solo un ítem abierto a la vez: cierra todos los demás
      triggers.forEach((other) => {
        if (other !== trigger) setExpanded(other, false);
      });

      setExpanded(trigger, willOpen);
    });
  });
}