document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
        window.location.href = 'register.html';
        return;
    }

    const totalEctsElement = document.getElementById('ects-total');
    const ectsPercentElement = document.getElementById('ects-percent');
    const progressBarFillElement = document.getElementById('progress-bar-fill');
    const completedListElement = document.getElementById('completed-activities-list');

    fetch(`/api/progreso/${user.id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el progreso del usuario.');
            }
            return response.json();
        })
        .then(data => {
            const creditosObtenidos = data.creditos_obtenidos || 0;
            const porcentaje = data.porcentaje_progreso || 0;

            // Actualizar el resumen y la barra de progreso
            totalEctsElement.textContent = creditosObtenidos;
            ectsPercentElement.textContent = porcentaje;
            progressBarFillElement.style.width = `${porcentaje}%`;

            // Renderizar las actividades completadas
            if (data.actividades_completadas && data.actividades_completadas.length > 0) {
                completedListElement.innerHTML = ''; // Limpiar el mensaje por defecto
                data.actividades_completadas.forEach(actividad => {
                    const card = document.createElement('div');
                    card.className = 'catalog-card completed';
                    card.innerHTML = `
                        <div class="card-header">
                            <h3>${actividad.nombre}</h3>
                            <span class="ects-badge">${actividad.creditos_otorgados} ECTS ✓</span>
                        </div>
                        <div class="card-body">
                            <p><strong>Verificado por administrador</strong></p>
                            <p style="font-size: 0.9rem; color: var(--ufv-secondary-blue);">ECTS totales de la actividad: ${actividad.ects}</p>
                        </div>
                        <div class="card-footer">
                            <p>Verificado el: ${new Date(actividad.fecha_verificacion).toLocaleDateString()}</p>
                            <span class="status-badge completed-badge">Créditos Confirmados</span>
                        </div>
                    `;
                    completedListElement.appendChild(card);
                });
            } else {
                completedListElement.innerHTML = '<p class="note">Aún no tienes créditos verificados por el administrador. Los créditos se asignan después de que se verifique tu asistencia.</p>';
            }
        })
        .catch(error => {
            console.error('Error al cargar el progreso:', error);
            completedListElement.innerHTML = '<p class="note error">Hubo un error al cargar tu progreso. Inténtalo de nuevo más tarde.</p>';
        });
});
