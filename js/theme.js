// theme.js - Sistema de tema claro/oscuro
const THEME_KEY = 'theme-preference';
const LIGHT = 'light';
const DARK = 'dark';
const SYSTEM = 'system';

// Obtener preferencia de tema
function getThemePreference() {
  return localStorage.getItem(THEME_KEY) || SYSTEM;
}

// Obtener tema actual (considerando sistema)
function getActualTheme() {
  const preference = getThemePreference();
  
  if (preference === SYSTEM) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }
  
  return preference;
}

// Cambiar tema
function setTheme(theme) {
  if ([LIGHT, DARK, SYSTEM].includes(theme)) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme();
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    return true;
  }
  return false;
}

// Aplicar tema al DOM
function applyTheme() {
  const actualTheme = getActualTheme();
  const root = document.documentElement;
  
  root.setAttribute('data-theme', actualTheme);
  root.classList.remove(LIGHT, DARK);
  root.classList.add(actualTheme);
}

// Inicializar tema
function initTheme() {
  applyTheme();
  
  // Escuchar cambios en preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getThemePreference() === SYSTEM) {
      applyTheme();
    }
  });
}

// Inicializar al cargar la página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
