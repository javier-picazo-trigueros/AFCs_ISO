// settings-panel.js - Panel flotante de configuración
let settingsPanelInitialized = false;

function initSettingsPanel() {
  // Si ya se inicializó, no hacer nada
  if (settingsPanelInitialized) return;
  
  // Esperar a que las funciones estén disponibles
  if (typeof getCurrentLanguage === 'undefined' || typeof getThemePreference === 'undefined') {
    setTimeout(initSettingsPanel, 50);
    return;
  }

  settingsPanelInitialized = true;

  // Verificar si ya existe el panel
  if (document.body.querySelector('.settings-panel')) {
    return;
  }

  try {
    // Crear HTML del panel
    const panelHTML = `
      <div class="settings-panel">
        <button class="settings-button" id="settings-toggle" aria-label="Abrir configuración" title="Abrir configuración">
          ⚙️
        </button>
        <div class="settings-menu" id="settings-menu">
          <h3 style="margin: 0.5rem 0 0.5rem 0;">Idioma</h3>
          <div class="option-group">
            <label style="margin: 0.3rem 0;">
              <input type="radio" name="language" value="es">
              <span>Español</span>
            </label>
            <label style="margin: 0.3rem 0;">
              <input type="radio" name="language" value="en">
              <span>English</span>
            </label>
          </div>

          <h3 style="margin: 1rem 0 0.5rem 0;">Tema</h3>
          <div class="option-group">
            <label style="margin: 0.3rem 0;">
              <input type="radio" name="theme" value="light">
              <span>Claro</span>
            </label>
            <label style="margin: 0.3rem 0;">
              <input type="radio" name="theme" value="dark">
              <span>Oscuro</span>
            </label>
            <label style="margin: 0.3rem 0;">
              <input type="radio" name="theme" value="system">
              <span>Sistema</span>
            </label>
          </div>
        </div>
      </div>
    `;

    // Agregar al body
    document.body.insertAdjacentHTML('beforeend', panelHTML);

    // Configurar valores iniciales
    const langValue = getCurrentLanguage();
    const themeValue = getThemePreference();
    
    document.querySelector(`input[name="language"][value="${langValue}"]`).checked = true;
    document.querySelector(`input[name="theme"][value="${themeValue}"]`).checked = true;

    // Obtener elementos
    const toggle = document.getElementById('settings-toggle');
    const menu = document.getElementById('settings-menu');
    const languageRadios = document.querySelectorAll('input[name="language"]');
    const themeRadios = document.querySelectorAll('input[name="theme"]');

    if (!toggle || !menu) return;

    // Toggle menu
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
    });

    // Cerrar menu al hacer click afuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.settings-panel')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Cambiar idioma
    languageRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (typeof setLanguage !== 'undefined') {
          setLanguage(e.target.value);
        }
      });
    });

    // Cambiar tema
    themeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (typeof setTheme !== 'undefined') {
          setTheme(e.target.value);
        }
      });
    });

    // Escuchar cambios de idioma
    window.addEventListener('languageChanged', (e) => {
      const newLang = typeof getCurrentLanguage !== 'undefined' ? getCurrentLanguage() : 'es';
      document.querySelector(`input[name="language"][value="${newLang}"]`).checked = true;
    });

    // Escuchar cambios de tema
    window.addEventListener('themeChanged', (e) => {
      const newTheme = typeof getThemePreference !== 'undefined' ? getThemePreference() : 'light';
      document.querySelector(`input[name="theme"][value="${newTheme}"]`).checked = true;
    });

    // Cerrar menu con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  } catch (err) {
    console.error('Error al inicializar settings panel:', err);
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSettingsPanel);
} else {
  initSettingsPanel();
}
