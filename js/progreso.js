document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
        // Si no hay usuario, redirigir a la página de login o mostrar un mensaje.
        window.location.href = 'register.html';
        return;
    }

    const totalEctsElement = document.getElementById('ects-total');
    const ectsPercentElement = document.getElementById('ects-percent');
    const progressBarFillElement = document.getElementById('progress-bar-fill');
    const completedListElement = document.getElementById('completed-activities-list');

    const ECTS_GOAL = 6; // El objetivo de ECTS a completar

    fetch(`/api/users/${user.id}/progreso`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el progreso del usuario.');
            }
            return response.json();
        })
        .then(data => {
            const totalEcts = data.totalEcts || 0;
            const percentage = Math.min(100, (totalEcts / ECTS_GOAL) * 100);

            // Actualizar el resumen y la barra de progreso
            totalEctsElement.textContent = totalEcts;
            ectsPercentElement.textContent = Math.round(percentage);
            progressBarFillElement.style.width = `${percentage}%`;

            // Renderizar las actividades completadas
            if (data.actividadesCompletadas && data.actividadesCompletadas.length > 0) {
                completedListElement.innerHTML = ''; // Limpiar el mensaje por defecto
                data.actividadesCompletadas.forEach(actividad => {
                    const card = document.createElement('div');
                    card.className = 'catalog-card completed';
                    card.innerHTML = `
                        <div class="card-header">
                            <h3>${actividad.nombre}</h3>
                            <span class="ects-badge">${actividad.ects} ECTS</span>
                        </div>
                        <div class="card-body">
                            <p>${actividad.descripcion || 'Actividad completada.'}</p>
                        </div>
                        <div class="card-footer">
                            <p>Completada el: ${new Date(actividad.fecha_fin).toLocaleDateString()}</p>
                            <span class="status-badge completed-badge">Completada</span>
                        </div>
                    `;
                    completedListElement.appendChild(card);
                });
            } else {
                completedListElement.innerHTML = '<p class="note">Aún no has completado ninguna actividad que otorgue ECTS.</p>';
            }
        })
        .catch(error => {
            console.error('Error al cargar el progreso:', error);
            completedListElement.innerHTML = '<p class="note error">Hubo un error al cargar tu progreso. Inténtalo de nuevo más tarde.</p>';
        });
});
