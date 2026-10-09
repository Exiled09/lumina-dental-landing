const DESKTOP_QUERY = '(min-width: 768px)';
const LABEL_OPEN = 'Abrir menú de navegación';
const LABEL_CLOSE = 'Cerrar menú de navegación';

export function initMobileMenu() {
  const toggle = document.querySelector('.header__menu-toggle');
  const navList = document.getElementById('header-nav-list');

  // Si el HTML no tiene los elementos, no hacemos nada (evita errores en consola)
  if (!toggle || !navList) return;

  const desktopMedia = window.matchMedia(DESKTOP_QUERY);

  function setOpen(isOpen) {
    navList.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? LABEL_CLOSE : LABEL_OPEN);
  }

  function isOpen() {
    return navList.classList.contains('is-open');
  }

  // 1. Click en la hamburguesa: alterna el estado
  toggle.addEventListener('click', () => {
    setOpen(!isOpen());
  });

  // 2. Click en un link del menú: lo cierra (el scroll lo hace el navegador)
  navList.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setOpen(false);
    }
  });

  // 3. Escape: cierra y devuelve el foco al botón
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // 4. Al pasar a escritorio: restablece el estado
  desktopMedia.addEventListener('change', (event) => {
    if (event.matches) {
      setOpen(false);
    }
  });
}