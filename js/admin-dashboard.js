// admin-dashboard.js — lógica del panel de administración
let adminUser = null;

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

async function refreshData(){
  try{
    const res = await fetch('/api/admin/reporte');
    if(!res.ok) {
      const errData = await res.text();
      console.error('Server response:', res.status, errData);
      throw new Error(`HTTP ${res.status}: ${errData}`);
    }
    const data = await res.json();
    renderActividades(data);
    updateStats(data);
  }catch(err){
    console.error('Error detallado:', err);
    const container = document.getElementById('actividades-tbody');
    if(container){
      container.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#c0392b;">Error al cargar: ${err.message}</td></tr>`;
    }
  }
}

function updateStats(actividades){
  const totalActi = actividades.length;
  const totalInscritos = actividades.reduce((sum, a) => sum + (a.inscritos || 0), 0);
  
  document.getElementById('total-actividades').textContent = totalActi;
  document.getElementById('total-inscritos').textContent = totalInscritos;
  // Para usuarios totales hacemos una llamada extra (simplificado aquí como demo)
  document.getElementById('total-usuarios').textContent = '?';
}

function renderActividades(actividades){
  const tbody = document.getElementById('actividades-tbody');
  tbody.innerHTML = '';
  
  if(!actividades.length){
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay actividades</td></tr>';
    return;
  }
  
  actividades.forEach(a => {
    const inscritos = a.inscritos || 0;
    const disponibles = Math.max(0, a.max_inscritos - inscritos);
    const row = `
      <tr>
        <td>${a.nombre}</td>
        <td>${a.ects || 0}</td>
        <td>${inscritos}</td>
        <td>${a.max_inscritos}</td>
        <td>${disponibles}</td>
        <td>
          <button class="action-btn" onclick="editActivity(${a.id})">Editar</button>
          <button class="action-btn delete-btn" onclick="deleteActivity(${a.id})">Eliminar</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function showNewActivityModal(){
  document.getElementById('activity-modal').classList.add('show');
}

function hideNewActivityModal(){
  document.getElementById('activity-modal').classList.remove('show');
}

async function submitNewActivity(e){
  e.preventDefault();
  const nombre = document.getElementById('act-nombre').value.trim();
  const descripcion = document.getElementById('act-descripcion').value.trim();
  const ects = Number(document.getElementById('act-ects').value);
  const fecha_inicio = document.getElementById('act-inicio').value;
  const fecha_fin = document.getElementById('act-fin').value;
  const max_inscritos = Number(document.getElementById('act-max').value);
  
  if(!nombre || !fecha_inicio || !fecha_fin) {
    alert('Completa todos los campos requeridos');
    return;
  }
  
  try{
    const res = await fetch('/api/actividades', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        nombre, descripcion, ects, fecha_inicio, fecha_fin, max_inscritos,
        admin_id: adminUser.id
      })
    });
    if(!res.ok) {
      const err = await res.json();
      alert('Error: ' + err.error);
      return;
    }
    hideNewActivityModal();
    document.getElementById('new-activity-form').reset();
    refreshData();
  }catch(err){
    console.error(err);
    alert('Error al crear actividad');
  }
}

function editActivity(id){
  // Simplificado: redirige o abre modal (aquí solo placeholder)
  alert('Editar actividad ' + id + ' (en desarrollo)');
}

async function deleteActivity(id){
  if(!confirm('¿Estás seguro de que quieres eliminar esta actividad?')) return;
  
  try{
    const res = await fetch(`/api/actividades/${id}`, {method: 'DELETE'});
    if(!res.ok) throw new Error('Error al eliminar');
    refreshData();
  }catch(err){
    console.error(err);
    alert('Error al eliminar');
  }
}

// Event listeners
window.addEventListener('DOMContentLoaded', async ()=>{
  checkAuth();
  const form = document.getElementById('new-activity-form');
  if(form) form.addEventListener('submit', submitNewActivity);
  
  // Health check antes de cargar datos
  try{
    const healthRes = await fetch('/api/health');
    if(!healthRes.ok) throw new Error('Servidor no disponible');
  }catch(err){
    console.error('Health check falló:', err);
    const container = document.getElementById('actividades-tbody');
    if(container){
      container.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#c0392b;"><strong>⚠️ Servidor no disponible</strong><br>Asegúrate de que el servidor está corriendo: npm start</td></tr>`;
    }
    return;
  }
  
  refreshData();
});
