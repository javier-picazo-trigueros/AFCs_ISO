# 🎓 AFCs Demo - Plataforma de Actividades Formativas Complementarias

Una aplicación web profesional para gestionar inscripciones en Actividades Formativas Complementarias (AFCs) de la Universidad Francisco de Vitoria (UFV).

![UFV Theme](https://img.shields.io/badge/Theme-UFV%20Professional-003366)
![Node.js](https://img.shields.io/badge/Node.js-Express.js-green)
![Database](https://img.shields.io/badge/Database-SQLite3-blue)
![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS-yellow)

---

## 📋 Características Principales

✅ **Sistema de Autenticación** - Registro/Login para estudiantes (@alumnos.ufv.es) y administradores (@ufv.es)

✅ **Catálogo de Actividades** - Visualización con filtros avanzados por ECTS, búsqueda, y detalles completos

✅ **Gestión de Inscripciones** - Inscribirse, darse de baja, y seguimiento de créditos ECTS

✅ **Panel Administrativo** - Crear, editar y eliminar actividades formativas

✅ **Panel de Progreso** - Visualización de créditos acumulados y actividades inscritas

✅ **Diseño Profesional** - Tema visual UFV con interfaz responsive y animaciones

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalados:

- **Node.js** (v14 o superior) - [Descargar](https://nodejs.org/)
- **npm** (gestor de paquetes de Node.js, incluido con Node.js)

### Verificar instalación

Abre PowerShell y ejecuta:

```powershell
node --version
npm --version
```

Deberías ver los números de versión de ambos.

---

## 📦 Instalación

### 1️⃣ Abrir PowerShell en la Carpeta del Proyecto

```powershell
# Navega a la carpeta del proyecto
cd "C:\ruta\a\tu\carpeta\AFCsDEMO"
```

### 2️⃣ Instalar Dependencias

```powershell
npm install
```

Esto instalará:
- **express** - Servidor web
- **sqlite3** - Base de datos
- **bcryptjs** - Encriptación de contraseñas

---

## 🚀 Cómo Iniciar la Aplicación

### Comando Principal

```powershell
npm start
```

**Salida esperada:**
```
🚀 Server listening on http://localhost:3000
📡 Accesible en red local: http://10.10.61.187:3000
⚠️  Comparte esta URL con otros dispositivos en la WiFi
```

### Acceder a la Aplicación

Una vez que el servidor esté ejecutándose, abre tu navegador y ve a:

```
http://localhost:3000
```

---

## 👤 Primeros Pasos - Guía Rápida

### 1️⃣ Crear una Cuenta de Estudiante

1. En la página de inicio, haz clic en **"Registrarse"**
2. Selecciona **"Registro de Estudiante"**
3. Completa el formulario:
   - **Email**: Debe terminar en `@alumnos.ufv.es` (ej: `juan@alumnos.ufv.es`)
   - **Contraseña**: Mínimo 6 caracteres
   - **Nombre y Apellido**: Tus datos
4. Haz clic en **"Registrarse"**
5. Inicia sesión con tus credenciales

### 2️⃣ Explorar el Catálogo

1. Ve a **"Catálogo"** desde el menú
2. **Busca** actividades por nombre
3. **Filtra** por:
   - Rango de ECTS
   - Disponibilidad
4. Haz clic en **"Ver más"** para ver detalles completos
5. Haz clic en **"Inscribirse"** para participar

### 3️⃣ Gestionar Inscripciones

1. Ve a **"Mis Inscripciones"** desde el menú
2. Verás todas tus actividades
3. Puedes hacer clic en **"Dar de Baja"** para desuscribirte

### 4️⃣ Ver Mi Progreso

1. Ve a **"Mi Progreso"** desde el menú
2. Visualiza tu barra de progreso ECTS
3. Ve todas tus actividades activas

---

## 👨‍💼 Acceso Administrativo

### Crear Cuenta de Administrador

1. Haz clic en **"Registrarse"**
2. Selecciona **"Registro de Administrador"**
3. Completa con:
   - **Email**: Debe terminar en `@ufv.es` (ej: `admin@ufv.es`)
   - **Contraseña**: Mínimo 6 caracteres
4. Inicia sesión

### Usar el Panel Admin

Una vez logueado como admin:

1. Ve a **"Panel Admin"** desde el menú
2. **Crear Actividades**:
   - Nombre, descripción, créditos ECTS
   - Fecha inicio/fin
   - Modalidad (Presencial, Online, Híbrido)
   - Máximo de inscritos
3. **Editar/Eliminar** tus actividades desde el listado

---

## 🔧 Detener el Servidor

Para detener en cualquier momento:

1. Regresa a PowerShell
2. Presiona `Ctrl + C`

Para reiniciar, simplemente ejecuta `npm start` de nuevo.

---

## 📁 Estructura del Proyecto

```
AFCsDEMO/
├── server.js                         # Servidor Express + API + BD
├── package.json                      # Dependencias
├── README.md                         # Este archivo
├── FUNCIONALIDADES_COMPLETADAS.md    # Lista detallada de funcionalidades
│
├── index.html                        # Página de inicio
├── catalogo.html                     # Catálogo de actividades
├── inscripciones.html                # Mis inscripciones
├── progreso.html                     # Mi progreso ECTS
├── register.html                     # Registro/Login
├── dashboard.html                    # Panel administrativo
│
├── css/
│   └── style.css                     # Estilos profesionales UFV
│
├── js/
│   ├── app.js                        # Lógica de inscripciones
│   ├── auth.js                       # Autenticación
│   ├── catalog.js                    # Catálogo y filtros
│   ├── nav.js                        # Navegación dinámica
│   └── progreso.js                   # Seguimiento de progreso
│
├── img/
│   └── logo-ufv.jpg                  # Logo UFV
│
└── db/
    └── inscripciones.db              # Base de datos (creada automáticamente)
```

---

## 🐛 Solución de Problemas

### El servidor no inicia

**Problema**: `npm start` no funciona

**Solución**:
1. Verifica: `node --version`
2. Asegúrate de estar en `AFCsDEMO`: `cd AFCsDEMO`
3. Reinstala: `npm install`

### No puedo acceder a http://localhost:3000

**Problema**: "Conexión rechazada"

**Solución**:
1. Verifica que el servidor esté corriendo en PowerShell
2. Usa `http://` (no `https://`)
3. Intenta `http://127.0.0.1:3000`
4. El puerto 3000 debe estar libre

### El correo no valida

**Problema**: "Email debe terminar en @alumnos.ufv.es"

**Solución**:
- Estudiantes: `email@alumnos.ufv.es`
- Admins: `email@ufv.es`

### Los datos desaparecen

**Problema**: Las inscripciones no se guardan

**Solución**: Los datos SE guardan en la base de datos. Si cierras el navegador/sesión, al volver a iniciar sesión verás tus inscripciones.

### Restablecer Base de Datos

Para empezar de cero:

```powershell
Remove-Item -Path "db\inscripciones.db" -Force
npm start
```

---

## 📚 Documentación Completa

Para ver la lista detallada de todas las funcionalidades implementadas:

👉 **[FUNCIONALIDADES_COMPLETADAS.md](./FUNCIONALIDADES_COMPLETADAS.md)**

---

## 🔐 Seguridad

✅ Contraseñas hasheadas con bcryptjs  
✅ Validación de emails por rol  
✅ Sesiones en localStorage  
✅ Validación en servidor  
✅ Confirmaciones para acciones críticas  

---

## 📊 Base de Datos

SQLite3 - Base de datos local y automática.

**Tablas**:
- `usuarios` - Estudiantes
- `admin_usuarios` - Administradores
- `actividades` - Catálogo de actividades
- `inscripcion_actividades` - Inscripciones

La BD se crea automáticamente con datos de prueba.

---

## 🚀 API REST Endpoints

### Autenticación
- `POST /api/users/register` - Registrar estudiante
- `POST /api/users/login` - Login estudiante
- `POST /api/admin/register` - Registrar admin
- `POST /api/admin/login` - Login admin

### Actividades
- `GET /api/actividades` - Obtener todas
- `GET /api/actividades/:id/stats` - Estadísticas
- `POST /api/admin/actividades` - Crear (admin)
- `PUT /api/admin/actividades/:id` - Editar (admin)
- `DELETE /api/admin/actividades/:id` - Eliminar (admin)

### Inscripciones
- `GET /api/inscripciones` - Mis inscripciones
- `POST /api/inscribir` - Inscribirse
- `DELETE /api/inscripciones/:id` - Darse de baja

---

## 📞 Soporte Rápido

1. Revisa la sección "Solución de Problemas"
2. Verifica que Node.js está actualizado
3. Limpia caché: `Ctrl + Shift + Supr`
4. Reinicia: Detén el servidor y `npm start` de nuevo

---

## ✨ ¡A Disfrutar!

**Happy coding! 🚀**

