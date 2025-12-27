// accessibility.js - Funciones de accesibilidad WCAG 2.1

/**
 * Añadir validación accesible a un formulario
 * @param {string} formId - ID del formulario
 */
function setupFormAccessibility(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Agregar aria-required si es requerido
        if (input.required) {
            input.setAttribute('aria-required', 'true');
        }

        // Agregar evento de validación con ARIA
        input.addEventListener('invalid', (e) => {
            input.setAttribute('aria-invalid', 'true');
            
            // Crear mensaje de error accesible
            const errorId = `${input.id}-error`;
            const existingError = document.getElementById(errorId);
            
            if (!existingError) {
                const errorMsg = document.createElement('span');
                errorMsg.id = errorId;
                errorMsg.className = 'error-message';
                errorMsg.setAttribute('role', 'alert');
                errorMsg.textContent = input.validationMessage || 'Este campo es obligatorio';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
            
            input.setAttribute('aria-describedby', errorId);
        });

        input.addEventListener('change', () => {
            if (input.validity.valid) {
                input.setAttribute('aria-invalid', 'false');
                const errorId = `${input.id}-error`;
                const errorMsg = document.getElementById(errorId);
                if (errorMsg) {
                    errorMsg.remove();
                }
                input.removeAttribute('aria-describedby');
            }
        });
    });
}

/**
 * Anunciar cambios de contenido dinámico a lectores de pantalla
 * @param {string} message - Mensaje a anunciar
 * @param {string} priority - 'polite' (por defecto) o 'assertive'
 */
function announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remover después de que se anuncie
    setTimeout(() => announcement.remove(), 1000);
}

/**
 * Crear un tab group accesible
 * @param {string} tabListId - ID del contenedor de tabs
 */
function setupTabsAccessibility(tabListId) {
    const tabList = document.getElementById(tabListId);
    if (!tabList) return;

    const tabs = tabList.querySelectorAll('[role="tab"]');
    let selectedIndex = 0;

    tabs.forEach((tab, index) => {
        // Inicializar ARIA
        if (index === selectedIndex) {
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');
        } else {
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        }

        // Click handler
        tab.addEventListener('click', () => {
            selectTab(index, tabs, tabList);
        });

        // Keyboard navigation
        tab.addEventListener('keydown', (e) => {
            let newIndex = selectedIndex;
            
            if (e.key === 'ArrowRight') {
                newIndex = (selectedIndex + 1) % tabs.length;
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                newIndex = (selectedIndex - 1 + tabs.length) % tabs.length;
                e.preventDefault();
            } else if (e.key === 'Home') {
                newIndex = 0;
                e.preventDefault();
            } else if (e.key === 'End') {
                newIndex = tabs.length - 1;
                e.preventDefault();
            }
            
            if (newIndex !== selectedIndex) {
                selectTab(newIndex, tabs, tabList);
            }
        });
    });

    function selectTab(index, tabs, tabList) {
        selectedIndex = index;
        const tabId = tabs[index].getAttribute('id');
        const panelId = tabs[index].getAttribute('aria-controls');
        
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');
                if (panelId) {
                    const panel = document.getElementById(panelId);
                    if (panel) {
                        panel.style.display = 'block';
                    }
                }
            } else {
                tab.setAttribute('aria-selected', 'false');
                tab.setAttribute('tabindex', '-1');
                const otherPanelId = tab.getAttribute('aria-controls');
                if (otherPanelId) {
                    const panel = document.getElementById(otherPanelId);
                    if (panel) {
                        panel.style.display = 'none';
                    }
                }
            }
        });
        
        tabs[index].focus();
    }
}

/**
 * Hacer un elemento expandible accesible (accordion)
 * @param {string} triggerId - ID del botón que abre/cierra
 * @param {string} contentId - ID del contenido expandible
 */
function setupExpandableAccessibility(triggerId, contentId) {
    const trigger = document.getElementById(triggerId);
    const content = document.getElementById(contentId);
    
    if (!trigger || !content) return;

    // Inicializar ARIA
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', contentId);
    content.setAttribute('role', 'region');
    content.setAttribute('aria-labelledby', triggerId);

    trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', !isExpanded);
        content.style.display = isExpanded ? 'none' : 'block';
    });
}

// Inicializar todas las mejoras de accesibilidad cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar a todos los formularios de la página
    document.querySelectorAll('form').forEach(form => {
        setupFormAccessibility(form.id);
    });
});
