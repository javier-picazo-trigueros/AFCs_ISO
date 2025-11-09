// admin-auth.js — autenticación y registro de administradores
const DOMAIN = '@ufv.es';

function showError(msg){
  const el = document.getElementById('form-error');
  if(!el) return;
  el.textContent = msg || '';
}

// Manejo del formulario de login
const loginForm = document.getElementById('admin-login-form');
if(loginForm){
  loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    showError('');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if(!email.toLowerCase().endsWith(DOMAIN) || email.toLowerCase().includes('alumnos')){
      showError(`El email debe ser institucional ${DOMAIN} (no alumnos)`);
      return;
    }

    try{
      const res = await fetch('/api/admin/login',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email,password})
      });
      const data = await res.json();
      if(!res.ok){
        showError(data.error || 'Error al iniciar sesión');
        return;
      }
      // Guardar admin en localStorage
      localStorage.setItem('admin_user', JSON.stringify(data));
      // Redirigir a panel
      window.location.href = '/admin-panel.html';
    }catch(err){
      console.error(err);
      showError('Error de red');
    }
  });
}

// Manejo del formulario de registro
const regForm = document.getElementById('admin-register-form');
if(regForm){
  regForm.addEventListener('submit', async (e)=>{
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
    if(email.toLowerCase().includes('alumnos')){
      showError('No puedes usar una cuenta de alumno para admin');
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
      const res = await fetch('/api/admin/register',{
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
      showError('Cuenta de admin creada correctamente. Redirigiendo...');
      setTimeout(()=>{
        window.location.href = '/admin-login.html';
      },1500);
    }catch(err){
      console.error(err);
      showError('Error de red');
    }
  });
}
