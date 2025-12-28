// admin-asistencia.js — gestión de verificación de asistencia
let adminUser = null;
let selectedActividad = null;
let selectedActividadData = null;

function checkAuth(){
  const stored = localStorage.getItem('admin_user');
  if(!stored) {
    window.location.href = '/admin-login.html';
    return;
  }
  adminUser = JSON.parse(stored);
  document.getElementById('admin-name').textContent = adminUser.nombre || adminUser.email;
}

function logout(){
  localStorage.removeItem('admin_user');
  window.location.href = '/index.html';
}

async function loadActividades(){
  try{
    const res = await fetch('/api/actividades');
    if(!res.ok) throw new Error('Error al cargar actividades');
    const actividades = await res.json();
    renderActividadesList(actividades);
  }catch(err){
    console.error(err);
    alert('Error al cargar actividades');
  }
}

function renderActividadesList(actividades){
  const container = document.getElementById('actividades-list');
  container.innerHTML = '';
  
  actividades.forEach(a => {
    const div = document.createElement('div');
    div.className = 'actividad-item';
    div.innerHTML = `
      <strong>${a.nombre}</strong><br>
      <small>${a.ects} ECTS • ${new Date(a.fecha_fin).toLocaleDateString()}</small>
    `;
    div.onclick = () => selectActividad(a);
    container.appendChild(div);
  });
}

function selectActividad(actividad){
  selectedActividad = actividad.id;
  selectedActividadData = actividad;
  
  // Actualizar UI
  document.querySelectorAll('.actividad-item').forEach(el => el.classList.remove('active'));
  event.target.closest('.actividad-item').classList.add('active');
  
  loadInscritos(actividad);
}

async function loadInscritos(actividad){
  try{
    const res = await fetch(`/api/admin/actividad/${actividad.id}/inscritos`);
    if(!res.ok) throw new Error('Error al cargar inscritos');
    const inscritos = await res.json();
    renderDetail(actividad, inscritos);
  }catch(err){
    console.error(err);
    alert('Error al cargar inscritos');
  }
}

function renderDetail(actividad, inscritos){
  document.getElementById('no-selection').style.display = 'none';
  document.getElementById('detail-content').style.display = 'block';
  
  document.getElementById('detail-title').textContent = actividad.nombre;
  document.getElementById('detail-ects').textContent = actividad.ects || 0;
  document.getElementById('detail-inicio').textContent = new Date(actividad.fecha_inicio).toLocaleDateString();
  document.getElementById('detail-fin').textContent = new Date(actividad.fecha_fin).toLocaleDateString();
  document.getElementById('detail-inscritos').textContent = inscritos.length;
  
  const tbody = document.getElementById('estudiantes-tbody');
  tbody.innerHTML = '';
  
  inscritos.forEach(inscrito => {
    const row = document.createElement('tr');
    const asistio = inscrito.asistio === 1;
    const creditos = inscrito.creditos_otorgados || 0;
    
    row.innerHTML = `
      <td>${inscrito.nombre || 'Sin nombre'}</td>
      <td>${inscrito.email}</td>
      <td>
        <span class="estado-asistencia ${asistio ? 'estado-verificado' : inscrito.asistio === null ? 'estado-sin-info' : 'estado-no-verificado'}">
          ${asistio ? '✓ Asistió' : inscrito.asistio === null ? 'Sin verificar' : '✗ No asistió'}
        </span>
      </td>
      <td>${creditos} ECTS</td>
      <td>
        <div class="action-buttons">
          ${!asistio ? `<button class="btn-small btn-check" onclick="marcarAsistencia(${inscrito.inscripcion_id}, ${inscrito.user_id}, ${actividad.id}, true)" aria-label="Marcar a ${inscrito.nombre} como asistió">✓ Asistió</button>` : ''}
          ${asistio ? `<button class="btn-small btn-uncheck" onclick="marcarAsistencia(${inscrito.inscripcion_id}, ${inscrito.user_id}, ${actividad.id}, false)" aria-label="Desmarcar asistencia de ${inscrito.nombre}">✗ Desmarcar</button>` : `<button class="btn-small btn-uncheck" onclick="marcarAsistencia(${inscrito.inscripcion_id}, ${inscrito.user_id}, ${actividad.id}, false)" aria-label="Marcar a ${inscrito.nombre} como no asistió">✗ No asistió</button>`}
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function marcarAsistencia(inscripcionId, userId, actividadId, asistio){
  try{
    const res = await fetch('/api/admin/registrar-asistencia', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        inscripcion_id: inscripcionId,
        user_id: userId,
        actividad_id: actividadId,
        asistio: asistio,
        admin_id: adminUser.id
      })
    });
    
    if(!res.ok){
      const err = await res.json();
      throw new Error(err.error);
    }
    
    const data = await res.json();
    
    if(asistio){
      alert(`✓ Asistencia registrada. Se han otorgado ${data.creditos_otorgados} ECTS al alumno.`);
    } else {
      alert('✗ Se ha marcado como no asistió.');
    }
    
    // Recargar la lista
    if(selectedActividadData){
      loadInscritos(selectedActividadData);
    }
  }catch(err){
    console.error(err);
    alert('Error: ' + err.message);
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  checkAuth();
  loadActividades();
});
