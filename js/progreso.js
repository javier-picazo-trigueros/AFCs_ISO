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

    if (!totalEctsElement || !ectsPercentElement || !progressBarFillElement || !completedListElement) {
        console.error('Elementos necesarios no encontrados en el DOM');
        return;
    }

    fetch(`/api/progreso/${user.id}`)
        .then(response => {
            console.log('Respuesta del servidor:', response.status);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            
            const creditosObtenidos = data.creditos_obtenidos || 0;
            const porcentaje = Math.min(data.porcentaje_progreso || 0, 100);

            console.log(`Créditos: ${creditosObtenidos}, Porcentaje: ${porcentaje}%`);

            // Actualizar el resumen y la barra de progreso
            totalEctsElement.textContent = creditosObtenidos;
            ectsPercentElement.textContent = porcentaje;
            progressBarFillElement.style.width = `${porcentaje}%`;
            
            // Hacer visible la barra
            progressBarFillElement.style.display = 'block';

            // Renderizar las actividades completadas
            if (data.actividades_completadas && data.actividades_completadas.length > 0) {
                console.log(`Se encontraron ${data.actividades_completadas.length} actividades completadas`);
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
                            <p><strong data-i18n="progress.verified_by_admin">Verificado por administrador</strong></p>
                            <p style="font-size: 0.9rem; color: var(--ufv-secondary-blue);">ECTS de la actividad: <strong>${actividad.ects}</strong></p>
                        </div>
                        <div class="card-footer">
                            <p><span data-i18n="progress.verified_on">Verificado el</span>: ${new Date(actividad.fecha_verificacion).toLocaleDateString()}</p>
                            <span class="status-badge completed-badge" data-i18n="progress.credits_confirmed">Créditos Confirmados</span>
                        </div>
                    `;
                    completedListElement.appendChild(card);
                });
                
                // Traducir el contenido recién añadido
                if (typeof translatePageContent === 'function') {
                    translatePageContent();
                }
            } else {
                console.log('No hay actividades completadas');
                const noActivitiesMsg = typeof t === 'function' ? t('progress.no_activities') : 'Aún no tienes créditos verificados por el administrador. Los créditos se asignan después de que se verifique tu asistencia.';
                completedListElement.innerHTML = `<p class="note">${noActivitiesMsg}</p>`;
            }
        })
        .catch(error => {
            console.error('Error al cargar el progreso:', error);
            const errorMsg = typeof t === 'function' ? t('progress.error') : 'Hubo un error al cargar tu progreso. Inténtalo de nuevo más tarde.';
            completedListElement.innerHTML = `<p class="note error">${errorMsg}</p>`;
            
            // También mostrar en la consola para debugging
            console.error('Detalles del error:', error.message);
        });
