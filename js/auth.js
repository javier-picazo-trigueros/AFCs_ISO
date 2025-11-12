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
  // Seleccionar los IDs correctos para el formulario de registro
  const registerForm = document.getElementById('register-form');
  const registerNombreInput = document.getElementById('register-nombre');
  const registerEmailInput = document.getElementById('register-email');
  const registerPasswordInput = document.getElementById('register-password');
  const registerPasswordConfirmInput = document.getElementById('register-password-confirm');

  if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const nombre = registerNombreInput.value;
          const email = registerEmailInput.value;
          const password = registerPasswordInput.value;
          const passwordConfirm = registerPasswordConfirmInput.value;

          if (password !== passwordConfirm) {
              alert('Las contraseñas no coinciden.');
              return;
          }
          if (!email.endsWith('@alumnos.ufv.es')) {
              alert('El email debe ser del dominio @alumnos.ufv.es');
              return;
          }

          try {
              const response = await fetch('/api/users', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ nombre, email, password })
              });
              const data = await response.json();
              if (!response.ok) {
                  throw new Error(data.error || 'Error al crear la cuenta.');
              }
              alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
              // Opcional: cambiar a la vista de login automáticamente
              document.getElementById('show-login').click();
          } catch (error) {
              console.error('Error en el registro:', error);
              alert(error.message);
          }
      });
  }

  // Seleccionar los IDs correctos para el formulario de login
  const loginForm = document.getElementById('login-form');
  const loginEmailInput = document.getElementById('login-email');
  const loginPasswordInput = document.getElementById('login-password');

  if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = loginEmailInput.value;
          const password = loginPasswordInput.value;

          try {
              const response = await fetch('/api/users/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password })
              });
              const data = await response.json();
              if (!response.ok) {
                  throw new Error(data.error || 'Email o contraseña incorrectos.');
              }
              
              // Guardar datos del usuario en localStorage
              localStorage.setItem('user', JSON.stringify(data));
              
              // Redirigir al catálogo o al dashboard
              window.location.href = 'catalogo.html';

          } catch (error) {
              console.error('Error en el login:', error);
              alert(error.message);
          }
      });
  }
});
