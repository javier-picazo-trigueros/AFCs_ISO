// app.js — lógica para cargar y gestionar inscripciones del usuario

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

async function fetchInscripciones(){
    try{
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) return [];
        
        const res = await fetch(`/api/inscripciones?user_id=${user.id}`);
        if(!res.ok) throw new Error('Error al obtener inscripciones');
        return await res.json();
    }catch(err){
        console.error(err);
        return [];
    }
}

function renderInscripcion(inscripcion) {
    const div = document.createElement('div');
    div.className = 'catalog-card';
    div.innerHTML = `
        <div class="card-header">
            <h3>${inscripcion.nombre}</h3>
            <span class="ects-badge">${inscripcion.ects || 0} ECTS</span>
        </div>
        <div class="card-body">
            <p>Inscrito el: ${new Date(inscripcion.inscrito_en).toLocaleDateString()}</p>
            <div class="meta">
                <p><strong>Créditos:</strong> ${inscripcion.ects || 0}</p>
                <p><strong>Fecha de inicio:</strong> ${inscripcion.fecha_inicio ? new Date(inscripcion.fecha_inicio).toLocaleDateString() : 'No definida'}</p>
            </div>
        </div>
        <div class="card-footer">
            <button onclick="darseDeBajaDesdeInscripciones(${inscripcion.inscripcion_id})" class="btn btn-danger" style="width: 100%;">Dar de Baja</button>
        </div>
    `;
    return div;
}

async function darseDeBajaDesdeInscripciones(inscripcionId) {
    if (!confirm('¿Estás seguro de que deseas darte de baja de esta actividad?')) return;
    
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await fetch(`/api/inscripciones/${inscripcionId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id })
        });

        if (!res.ok) {
            throw new Error('Error al darse de baja');
        }

        showNotification('Te has dado de baja correctamente', 'info');
        loadAndRender();

    } catch (err) {
        console.error('Error al dar de baja:', err);
        showNotification(`Error: ${err.message}`, 'error');
    }
}

async function loadAndRender(){
    const data = await fetchInscripciones();
    const container = document.getElementById('inscripciones-list');
    container.innerHTML = '';

    if (!data || data.length === 0) {
        container.innerHTML = '<p class="note" style="text-align:center; padding: 2rem;">Aún no estás inscrito en ninguna actividad. ¡Explora el catálogo y únete a alguna!</p>';
        return;
    }

    data.forEach(inscripcion => {
        const node = renderInscripcion(inscripcion);
        container.appendChild(node);
    });
}

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', ()=>{
    loadAndRender();
});
