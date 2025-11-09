# AFcS DEMO — Portal de Actividades Extracurriculares

## Características principales

### Para Estudiantes
- **Registro de usuarios** con validación de email @alumnos.ufv.es
- **Visualización de actividades** disponibles
- **Sistema de inscripciones** a actividades
- **Gestión de mis inscripciones** con opción de cancelar
- **Panel de progreso** para seguir ECTS conseguidos

### Para Administradores
- **Registro de admin** con validación de email @ufv.es (personal no alumno)
- **Panel de control** con estadísticas de inscripciones
- **CRUD completo de actividades** (crear, editar, eliminar)
- **Visualización de inscritos** por actividad
- **Reporte general** de uso del portal

## Cómo usar (Windows PowerShell)

### Instalación y arranque

1. Instalar Node.js: https://nodejs.org/
2. Abrir PowerShell en la carpeta del proyecto
3. Instalar dependencias: `npm install`
4. Iniciar servidor: `npm start`
5. Abrir navegador: http://localhost:3000/

**El servidor debe mostrar:** `Server listening on http://localhost:3000`

### ⚠️ Solucionar "Error de Red" en Admin Dashboard

Si ves "Error de Red" al intentar entrar al panel admin:

1. **Verifica que el servidor está corriendo**
   - Abre otra terminal/PowerShell en la misma carpeta
   - Ejecuta: `npm start`
   - Debe aparecer: `Server listening on http://localhost:3000`

2. **Verifica la conexión**
   - En el navegador, abre: http://localhost:3000/api/health
   - Debe mostrar: `{"status":"ok","timestamp":"..."}`

3. **Limpia localStorage si tuviste error anterior**
   - Abre la consola (F12)
   - Ejecuta: `localStorage.clear()` y recarga la página

4. **Revisa los logs del servidor**
   - Busca mensajes de error en la terminal donde corre `npm start`
   - Los errores aparecerán allí

### Flujo Como Estudiante
1. Ir a http://localhost:3000
2. Crear cuenta con email @alumnos.ufv.es
3. Navegar a Catálogo o Mis inscripciones

### Flujo Como Admin
1. Ir a http://localhost:3000/admin-login.html
2. Crear cuenta con email @ufv.es (no alumnos)
3. Acceder al panel de control para gestionar actividades

## Base de Datos

Estructura creada automáticamente:
- **admin_users**: administradores @ufv.es
- **users**: estudiantes @alumnos.ufv.es
- **actividades**: catálogo de actividades ECTS
- **inscripcion_actividades**: relación usuario-actividad

3 actividades de demo incluidas:
- Voluntariado UFV Solidaria (2 ECTS, max 30)
- Seminario de Innovación Social (2 ECTS, max 25)
- Taller de Liderazgo (1 ECTS, max 20)

## API REST Endpoints

### Admin
- POST /api/admin/register
- POST /api/admin/login
- GET /api/admin/reporte
- POST/PUT/DELETE /api/actividades/:id

### Estudiantes
- POST /api/users
- GET /api/actividades
- POST /api/inscribir
- DELETE /api/inscripciones/:id
- GET /api/actividades/:id/stats

## Notas de Seguridad

⚠️ Demo: antes de producción añadir HTTPS, rate limiting, JWT, verificación email, CSRF protection, validación exhaustiva de inputs, auditoría, backups y logs.

## Dependencias

- express ^4.18.2
- sqlite3 ^5.1.6
- bcryptjs ^2.4.3

