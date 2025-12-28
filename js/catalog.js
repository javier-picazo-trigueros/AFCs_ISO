// catalog.js — carga actividades y aplica filtros

async function fetchActividades(){
  try{
    const res = await fetch('/api/actividades');
    if(!res.ok) throw new Error('No se pudieron obtener actividades');
    return await res.json();
  }catch(err){
    console.error(err);
    return [];
  }
}

// Obtener inscripciones del usuario actual
async function getUserInscripciones() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) return [];
    
    try {
        const res = await fetch(`/api/inscripciones?user_id=${user.id}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (err) {
        console.error('Error al obtener inscripciones:', err);
        return [];
    }
}

// Mostrar notificación con ARIA
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // WCAG 2.1: Agregar roles ARIA para notificaciones
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.setAttribute('aria-atomic', 'true');
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Abrir modal con detalles de la actividad
function openModal(activity) {
    // WCAG 2.1: Guardar elemento que tenía focus antes
    window.lastFocusedElement = document.activeElement;
    
    const modal = document.getElementById('activity-modal');
    document.getElementById('modal-title').textContent = activity.nombre;
    document.getElementById('modal-ects').textContent = activity.ects || 0;
    document.getElementById('modal-modalidad').textContent = activity.modalidad || 'Presencial';
    document.getElementById('modal-fecha-inicio').textContent = activity.fecha_inicio ? new Date(activity.fecha_inicio).toLocaleDateString() : 'No definida';
    document.getElementById('modal-fecha-fin').textContent = activity.fecha_fin ? new Date(activity.fecha_fin).toLocaleDateString() : 'No definida';
    document.getElementById('modal-description').textContent = activity.descripcion || 'No hay descripción disponible.';
    document.getElementById('modal-activity-id').value = activity.id;
    
    modal.style.display = 'block';
    
    // WCAG 2.1: Mover focus al modal
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.focus();
    }
}

// Cerrar modal con ESC y focus trap
function closeModal() {
    const modal = document.getElementById('activity-modal');
    modal.style.display = 'none';
    
    // WCAG 2.1: Retornar focus al elemento que abrió el modal
    if (window.lastFocusedElement) {
        window.lastFocusedElement.focus();
    }
}

// WCAG 2.1: Focus trap en modal
function setupModalFocusTrap() {
    const modal = document.getElementById('activity-modal');
    
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            return;
        }
        
        if (e.key !== 'Tab') return;
        
        const focusables = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusables.length === 0) return;
        
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

// Inscribir al usuario en una actividad
async function inscribirse(actividadId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
        window.location.href = 'register.html';
        return;
    }

    try {
        const res = await fetch('/api/inscribir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id, actividad_id: actividadId }),
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Error al realizar la inscripción');
        }

        showNotification('¡Inscripción realizada con éxito!', 'success');
        loadAndRender();

    } catch (err) {
        console.error('Error en la inscripción:', err);
        showNotification(`Error: ${err.message}`, 'error');
    }
}

// Darse de baja de una actividad
async function darseDeBaja(actividadId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) return;

    try {
        const res = await fetch(`/api/inscribir/${actividadId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id }),
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Error al desuscribirse');
        }

        showNotification('Te has dado de baja con éxito', 'success');
        loadAndRender();

    } catch (err) {
        console.error('Error en la baja:', err);
        showNotification(`Error: ${err.message}`, 'error');
    }
}

// Crear tarjeta de actividad con estructura HTML
function createActivityCard(a, userInscripciones) {
    const isInscribed = userInscripciones && userInscripciones.some(i => i.actividad_id === a.id);
    const logged = !!JSON.parse(localStorage.getItem('user'));
    
    let statusClass = 'available';
    let statusText = 'Disponible';
    
    if (a.disponibles <= 0) {
        statusClass = 'full';
        statusText = 'Completo';
    }

    const div = document.createElement('div');
    div.className = 'activity-card';
    div.setAttribute('role', 'article');
    
    const content = `
        <div class="card-header">
            <h3>${a.nombre}</h3>
            <span class="ects-badge">${a.ects || 0} ECTS</span>
        </div>
        <div class="card-body">
            <p>${a.descripcion ? a.descripcion.substring(0, 100) + '...' : 'Sin descripción'}</p>
            <div class="meta">
                <p><strong>Créditos:</strong> ${a.ects || 0}</p>
                <p><strong>Fecha:</strong> ${a.fecha_inicio ? new Date(a.fecha_inicio).toLocaleDateString() : 'No definida'}</p>
            </div>
        </div>
        <div class="card-footer">
            <div class="availability">
                <span class="status-dot ${statusClass}"></span>
                <span>${statusText}</span>
            </div>
        </div>
    `;
    
    div.innerHTML = content;

    // Crear contenedor de botones
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.gap = '0.5rem';
    buttonsDiv.style.marginTop = '1rem';

    // Botón "Ver más"
    const verMasBtn = document.createElement('button');
    verMasBtn.className = 'btn btn-secondary';
    verMasBtn.textContent = 'Ver más';
    verMasBtn.style.flex = '1';
    verMasBtn.onclick = () => openModal(a);
    buttonsDiv.appendChild(verMasBtn);

    // Botón de inscripción
    if (logged) {
        if (isInscribed) {
            const inscritoBtn = document.createElement('button');
            inscritoBtn.className = 'btn btn-success';
            inscritoBtn.textContent = '✓ Inscrito';
            inscritoBtn.disabled = true;
            inscritoBtn.style.flex = '1';
            buttonsDiv.appendChild(inscritoBtn);

            const bajaBtn = document.createElement('button');
            bajaBtn.className = 'btn btn-danger';
            bajaBtn.textContent = 'Dar de Baja';
            bajaBtn.style.flex = '1';
            bajaBtn.onclick = () => darseDeBaja(a.id);
            buttonsDiv.appendChild(bajaBtn);
        } else {
            const inscribirseBtn = document.createElement('button');
            inscribirseBtn.className = 'btn btn-primary';
            inscribirseBtn.textContent = a.disponibles <= 0 ? 'Completo' : 'Inscribirse';
            inscribirseBtn.disabled = a.disponibles <= 0;
            inscribirseBtn.style.flex = '2';
            inscribirseBtn.onclick = () => inscribirse(a.id);
            buttonsDiv.appendChild(inscribirseBtn);
        }
    } else {
        const loginBtn = document.createElement('button');
        loginBtn.className = 'btn btn-secondary';
        loginBtn.textContent = 'Identifícate';
        loginBtn.style.flex = '2';
        loginBtn.onclick = () => window.location.href = 'register.html';
        buttonsDiv.appendChild(loginBtn);
    }

    div.appendChild(buttonsDiv);
    return div;
}

function applyFilters(items) {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const ectsFilter = document.getElementById('filter-ects').value;
    const modalidadFilter = document.getElementById('filter-modalidad').value;
    const disponibleFilter = document.getElementById('filter-disponible').value;

    return items.filter(item => {
        const matchesSearch = !searchTerm || item.nombre.toLowerCase().includes(searchTerm) || (item.descripcion && item.descripcion.toLowerCase().includes(searchTerm));
        
        let matchesEcts = true;
        if (ectsFilter) {
            const ects = item.ects || 0;
            if (ectsFilter === '1') matchesEcts = ects === 1;
            else if (ectsFilter === '2') matchesEcts = ects === 2;
            else if (ectsFilter === '3') matchesEcts = ects === 3;
            else if (ectsFilter === 'gte3') matchesEcts = ects >= 3;
        }
        
        let matchesModalidad = true;
        if (modalidadFilter) {
            matchesModalidad = (item.modalidad || 'Presencial') === modalidadFilter;
        }
        
        const matchesDisponible = !disponibleFilter || (disponibleFilter === '1' && item.disponibles > 0) || (disponibleFilter === '0' && item.disponibles <= 0);
        return matchesSearch && matchesEcts && matchesModalidad && matchesDisponible;
    });
}

async function loadAndRender() {
    const all = await fetchActividades();
    const userInscripciones = await getUserInscripciones();
    const container = document.getElementById('catalog-list');
    container.innerHTML = '';

    if (!all || all.length === 0) {
        container.innerHTML = '<p class="note" style="text-align:center; padding: 2rem;">No hay actividades disponibles.</p>';
        return;
    }

    const statsPromises = all.map(a =>
        fetch(`/api/actividades/${a.id}/stats`).then(res => res.json()).catch(() => null)
    );
    const stats = await Promise.all(statsPromises);

    const merged = all.map((a, i) => {
        const activityStats = stats[i] || {};
        return {
            ...a,
            inscritos: activityStats.inscritos ?? 0,
            disponibles: activityStats.disponibles ?? (a.max_inscritos || 0)
        };
    });

    const filtered = applyFilters(merged);
    if (filtered.length === 0) {
        container.innerHTML = '<p class="note" style="text-align:center; padding: 2rem;">No hay actividades con esos filtros.</p>';
        return;
    }

    // Renderizar cada actividad
    filtered.forEach(activity => {
        const card = createActivityCard(activity, userInscripciones);
        container.appendChild(card);
    });

    setupModalFocusTrap();
}

// Inicializar cuando carga el documento
document.addEventListener('DOMContentLoaded', () => {
    loadAndRender();

    // Agregar event listeners a los filtros
    document.getElementById('search').addEventListener('input', loadAndRender);
    document.getElementById('filter-ects').addEventListener('change', loadAndRender);
    document.getElementById('filter-modalidad').addEventListener('change', loadAndRender);
    document.getElementById('filter-disponible').addEventListener('change', loadAndRender);

    document.getElementById('btn-clear').addEventListener('click', () => {
        document.getElementById('search').value = '';
        document.getElementById('filter-ects').value = '';
        document.getElementById('filter-modalidad').value = '';
        document.getElementById('filter-disponible').value = '';
        loadAndRender();
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('activity-modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con botón de cerrar
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Botón de inscribirse en modal
    const inscribirBtn = document.getElementById('modal-inscribirse');
    if (inscribirBtn) {
        inscribirBtn.addEventListener('click', () => {
            const actividadId = Number(document.getElementById('modal-activity-id').value);
            inscribirse(actividadId);
            closeModal();
        });
    }
});


