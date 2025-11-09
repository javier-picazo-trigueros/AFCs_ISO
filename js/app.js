// app.js — lógica para cargar y gestionar inscripciones usando la API
const API_BASE = '/api/inscripciones';

async function fetchInscripciones(){
  try{
    const res = await fetch(API_BASE);
    if(!res.ok) throw new Error('Error al obtener inscripciones');
    return await res.json();
  }catch(err){
    console.error(err);
    return [];
  }
}

function renderInscripciones(list){
  const container = document.getElementById('inscripciones-list');
  const tpl = document.getElementById('inscripcion-template');
  container.innerHTML = '';
  if(!list.length){
    container.innerHTML = '<p class="note">No tienes inscripciones activas.</p>';
    return;
  }
  list.forEach(item => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('.actividad-nombre').textContent = item.nombre;
    node.querySelector('.actividad-meta').textContent = `${item.ects} ECTS · ${item.fecha}`;

    const acciones = node.querySelector('.acciones');
    const row = document.createElement('div');
    row.className = 'actions-row';

    if(item.status === 'en_curso'){
      const btn = document.createElement('button');
      btn.textContent = 'En curso';
      btn.disabled = true;
      row.appendChild(btn);
    } else {
      const btnCancel = document.createElement('button');
      btnCancel.textContent = 'Cancelar inscripción';
      btnCancel.addEventListener('click', ()=> cancelInscripcion(item.id, node));
      row.appendChild(btnCancel);
    }

    acciones.appendChild(row);
    container.appendChild(node);
  });
}

async function cancelInscripcion(id, node){
  if(!confirm('¿Seguro que quieres cancelar esta inscripción?')) return;
  try{
    const res = await fetch(`${API_BASE}/${id}`,{method:'DELETE'});
    if(!res.ok) throw new Error('No se pudo cancelar');
    // refrescar lista
    loadAndRender();
  }catch(err){
    console.error(err);
    alert('Error al cancelar la inscripción');
  }
}

async function loadAndRender(){
  const data = await fetchInscripciones();
  renderInscripciones(data);
}

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', ()=>{
  loadAndRender();
});
