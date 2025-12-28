document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Solo mostrar la demo para el usuario predeterminado
    if (!user || user.email !== 'alumnos@alumnos.ufv.es') {
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

    // Datos simulados para demostración (solo para alumnos@alumnos.ufv.es)
    const demoData = {
        creditos_obtenidos: 3,
        porcentaje_progreso: 50,
        actividades_completadas: [
            {
                id: 1,
                nombre: 'Voluntariado UFV Solidaria',
                ects: 2,
                creditos_otorgados: 2,
                fecha_verificacion: '2025-02-22'
            },
            {
                id: 2,
                nombre: 'Seminario de Innovación Social',
                ects: 1,
                creditos_otorgados: 1,
                fecha_verificacion: '2025-03-14'
            }
        ]
    };

    const creditosObtenidos = demoData.creditos_obtenidos || 0;
    const porcentaje = Math.min(demoData.porcentaje_progreso || 0, 100);

    console.log(`Créditos: ${creditosObtenidos}, Porcentaje: ${porcentaje}%`);

    // Actualizar el resumen y la barra de progreso
    totalEctsElement.textContent = creditosObtenidos;
    ectsPercentElement.textContent = porcentaje;
    progressBarFillElement.style.width = `${porcentaje}%`;
    
    // Hacer visible la barra
    progressBarFillElement.style.display = 'block';

    // Renderizar las actividades completadas
    if (demoData.actividades_completadas && demoData.actividades_completadas.length > 0) {
        console.log(`Se encontraron ${demoData.actividades_completadas.length} actividades completadas`);
        completedListElement.innerHTML = ''; // Limpiar el mensaje por defecto
        
        demoData.actividades_completadas.forEach(actividad => {
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
});
