// auth.js — validaciones y envío de formulario de registro
const DOMAIN = '@alumnos.ufv.es';

function showError(msg){
  const el = document.getElementById('form-error');
  el.textContent = msg || '';
}

async function submitForm(e){
  e.preventDefault();
  showError('');
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;

  if(!email.toLowerCase().endsWith(DOMAIN)){
    showError(`El email debe terminar en ${DOMAIN}`);
    return;
  }
  if(password.length < 6){
    showError('La contraseña debe tener al menos 6 caracteres');
    return;
  }
  if(password !== password2){
    showError('Las contraseñas no coinciden');
    return;
  }

  try{
    const res = await fetch('/api/users',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({nombre,email,password})
    });
    const data = await res.json();
    if(!res.ok){
      showError(data.error || 'Error al crear la cuenta');
      return;
    }
    // Éxito
    showError('Cuenta creada correctamente. Puedes cerrar esta ventana o ir a Inscripciones.');
    // Opcional: redirigir después de 1.5s
    setTimeout(()=>{
      window.location.href = '/inscripciones.html';
    },1500);
  }catch(err){
    console.error(err);
    showError('Error de red al crear la cuenta');
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('register-form');
  if(form) form.addEventListener('submit', submitForm);
});
