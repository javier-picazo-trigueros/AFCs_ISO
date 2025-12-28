// inscripciones.js - Gestión de mis inscripciones
let inscripciones = [];
let user = null;

// Verificar autenticación
function checkAuth() {
  const stored = localStorage.getItem('user');
  if (!stored) {
    window.location.href = '/register.html';
    return;
  }
  user = JSON.parse(stored);
}

// Cargar inscripciones del usuario
async function loadInscripciones() {
  try {
    if (!user) return;
    
    const res = await fetch(`/api/inscripciones?user_id=${user.id}`);
    if (!res.ok) throw new Error('Error al cargar inscripciones');
    
    inscripciones = await res.json();
    renderInscripciones();
  } catch (err) {
    console.error(err);
    document.getElementById('inscripciones-list').innerHTML = 
      '<p class="note">Error al cargar tus inscripciones.</p>';
  }
}

// Renderizar inscripciones
function renderInscripciones() {
  const container = document.getElementById('inscripciones-list');
  
  if (inscripciones.length === 0) {
    container.innerHTML = '<p class="note" data-i18n="inscriptions.no_inscriptions">Aún no estás inscrito en ninguna actividad.</p>';
    translatePageContent();
    return;
  }

  container.innerHTML = inscripciones.map(insc => `
    <div class="card" role="article">
      <h3 style="color: var(--ufv-blue); margin-bottom: 0.5rem;">${insc.nombre}</h3>
      <p style="color: var(--ufv-text-light); margin: 0.3rem 0; font-size: 0.9rem;">
        <strong data-i18n="inscriptions.ects">ECTS</strong>: ${insc.ects}
      </p>
      <p style="color: var(--ufv-text-light); margin: 0.3rem 0; font-size: 0.9rem;">
        <strong data-i18n="catalog.modality">Modalidad</strong>: ${insc.modalidad}
      </p>
      <p style="color: var(--ufv-text-light); margin: 0.3rem 0; font-size: 0.9rem;">
        <strong>Fecha:</strong> ${new Date(insc.fecha_inicio).toLocaleDateString()} - ${new Date(insc.fecha_fin).toLocaleDateString()}
      </p>
      <p style="margin: 0.5rem 0 0 0;">
        <span class="status-badge ${insc.asistio === 1 ? 'status-completed' : insc.asistio === 0 ? 'status-pending' : 'status-pending'}" data-i18n="status.${insc.asistio === 1 ? 'completed' : 'pending'}">
          ${insc.asistio === 1 ? t('status.completed') : t('status.pending')}
        </span>
      </p>
      <button class="btn btn-secondary" style="width: 100%; margin-top: 1rem;" onclick="cancelarInscripcion(${insc.inscripcion_id})" data-i18n="inscriptions.cancel">
        Cancelar Inscripción
      </button>
    </div>
  `).join('');
  translatePageContent();
}

// Cancelar inscripción
async function cancelarInscripcion(inscripcionId) {
  const confirmMsg = typeof t === 'function' ? t('inscriptions.cancel_confirmation') : '¿Estás seguro de que deseas cancelar esta inscripción?';
  if (!confirm(confirmMsg)) {
    return;
  }

  try {
    const res = await fetch(`/api/inscripciones/${inscripcionId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id })
    });

    if (!res.ok) throw new Error('Error al cancelar');

    alert('Inscripción cancelada correctamente');
    loadInscripciones();
  } catch (err) {
    console.error(err);
    alert('Error al cancelar la inscripción');
  }
}

// Agregar estilos para status badges
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .status-badge {
      display: inline-block;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .status-completed {
      background: #d4edda;
      color: #155724;
    }
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    body[data-theme="dark"] .status-completed {
      background: #1f3a1f;
      color: #4ade80;
    }
    body[data-theme="dark"] .status-pending {
      background: #3a3a1f;
      color: #fbbf24;
    }
  `;
  document.head.appendChild(style);
}

// Inicializar
window.addEventListener('DOMContentLoaded', () => {
  addStyles();
  checkAuth();
  loadInscripciones();
});
