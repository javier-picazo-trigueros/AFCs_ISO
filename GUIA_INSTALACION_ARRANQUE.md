## 🚀 GUÍA DE INSTALACIÓN Y ARRANQUE - AFCs UFV

### ✅ Requisitos Previos

Antes de comenzar, necesitas tener instalados:

1. **Node.js** (v14 o superior)
2. **npm** (viene con Node.js)
3. **Git** (opcional, para clonar el repo)

---

## 📥 PASO 1: Verificar Instalación

Abre **PowerShell** y ejecuta estos comandos para verificar que todo está instalado:

```powershell
node --version
npm --version
```

**Esperado:**
```
v22.x.x (o superior)
10.x.x (o superior)
```

Si no te sale versión, descarga Node.js desde: https://nodejs.org/

---

## 📂 PASO 2: Descargar el Proyecto

### Opción A: Clonar desde GitHub

```powershell
git clone https://github.com/javier-picazo-trigueros/AFCs_ISO.git
cd AFCs_ISO
```

### Opción B: Descargar ZIP

1. Ve a: https://github.com/javier-picazo-trigueros/AFCs_ISO
2. Click en **Code** → **Download ZIP**
3. Descomprime la carpeta
4. Abre PowerShell en esa carpeta

---

## 📦 PASO 3: Instalar Dependencias

En PowerShell, dentro de la carpeta del proyecto, ejecuta:

```powershell
npm install
```

**Esto instalará:**
- ✅ express
- ✅ sqlite3
- ✅ bcryptjs
- ✅ cors

**Esperado:**
```
added 196 packages in 1m
```

---

## 🎯 PASO 4: Iniciar el Servidor

En PowerShell, ejecuta:

```powershell
npm start
```

**Esperado ver:**
```
🚀 Server listening on http://localhost:3000
📡 Accesible en red local: http://192.168.1.XX:3000
⚠️  Comparte esta URL con otros dispositivos en la WiFi
```

---

## 🌐 PASO 5: Abrir en Navegador

Una vez que veas el mensaje anterior, abre tu navegador y ve a:

```
http://localhost:3000
```

**¡Y listo! La aplicación debe cargar correctamente.** ✅

---

## 👤 Primeros Pasos en la App

### 1️⃣ Crear Cuenta de Estudiante

1. En la página de inicio, haz click en **"Registro/Login"**
2. Selecciona **"Registro de Estudiante"**
3. Usa un email que termine en `@alumnos.ufv.es` (ejemplo: `test@alumnos.ufv.es`)
4. Contraseña: mínimo 6 caracteres
5. Click en **"Registrarse"**

### 2️⃣ Iniciar Sesión

1. En la página de login, usa tus credenciales
2. Click en **"Iniciar Sesión"**

### 3️⃣ Explorar las Funcionalidades

Una vez logueado, verás:
- ✅ **Catálogo** - Explora las actividades
- ✅ **Mis Inscripciones** - Tus actividades
- ✅ **Mi Progreso** - Tus ECTS acumulados
- ✅ **Notificaciones** - Centro de noti (NUEVO)
- ✅ **❓ Ayuda** - FAQs y contacto (NUEVO)

---

## 🔑 Credenciales de Prueba

Si quieres usar una cuenta preexistente:

### Estudiante Demo:
```
Email: alumno@alumnos.ufv.es
Contraseña: 123456
```

### Admin Demo:
```
Email: director@ufv.es
Contraseña: 123456
```

---

## 🛑 Detener el Servidor

Para detener el servidor en cualquier momento:

1. En PowerShell, presiona: **Ctrl + C**
2. Te pedirá confirmación, presiona **Y** (Sí)

```
Terminar trabajo por lotes (S/N)? Y
```

---

## 🔄 Reiniciar el Servidor

Después de detener, solo ejecuta de nuevo:

```powershell
npm start
```

---

## 🌍 Acceso Desde Otros Dispositivos en la Red

Una vez que inicie el servidor, verás algo como:

```
📡 Accesible en red local: http://192.168.1.11:3000
```

Puedes acceder desde otro dispositivo (móvil, laptop, etc.) usando esa IP:

```
http://192.168.1.11:3000
```

(Reemplaza `192.168.1.11` con la IP que salga en tu consola)

---

## 🐛 Solución de Problemas

### ❌ "npm: No se reconoce como comando"

**Solución:**
- Node.js no está instalado o no en PATH
- Descarga desde: https://nodejs.org/
- Reinicia PowerShell después de instalar

### ❌ "Puerto 3000 ya está en uso"

**Solución:**
```powershell
# Ver qué proceso usa el puerto 3000
netstat -ano | findstr ":3000"

# Matar el proceso (reemplaza PID con el número que sale)
taskkill /PID 12345 /F
```

Luego intenta `npm start` de nuevo.

### ❌ "Cannot find module 'cors'"

**Solución:**
```powershell
npm install cors
npm start
```

### ❌ "Error: Cannot find module 'sqlite3'"

**Solución:**
```powershell
npm install sqlite3
npm start
```

### ❌ "No puedo acceder a localhost:3000"

**Verifica:**
1. El servidor está corriendo en PowerShell? (debe decir "Server listening...")
2. Usa `http://` (no `https://`)
3. Intenta: `http://127.0.0.1:3000`
4. Intenta en otro navegador (Chrome, Firefox, etc.)

### ❌ "La base de datos no se crea"

**Solución:**
```powershell
# Si todo falla, resetea la BD
Remove-Item -Path "db\inscripciones.db" -Force
npm start
```

---

## 📁 Estructura del Proyecto

```
AFCs_ISO/
├── server.js                    ← Servidor principal
├── package.json                 ← Dependencias
├── README.md                    ← Guía general
├── ESTADO_ACTUAL.md             ← Estado del proyecto
│
├── index.html                   ← Página de inicio
├── catalogo.html                ← Catálogo de actividades
├── inscripciones.html           ← Mis inscripciones
├── progreso.html                ← Mi progreso ECTS
├── notificaciones.html          ← Centro de notificaciones (NUEVO)
├── help-support.html            ← Centro de ayuda (NUEVO)
├── public-catalog.html          ← Catálogo público (NUEVO)
├── admin-panel.html             ← Panel de admin
│
├── css/
│   └── style.css                ← Estilos UFV
│
├── js/
│   ├── app.js                   ← Lógica de inscripciones
│   ├── auth.js                  ← Autenticación
│   ├── catalog.js               ← Catálogo
│   ├── nav.js                   ← Navegación
│   └── ... (otros archivos)
│
├── img/
│   └── logo-ufv.jpg             ← Logo
│
└── db/
    └── inscripciones.db         ← Base de datos SQLite (se crea automáticamente)
```

---

## 🎯 Próximos Pasos

### Para Desarrollo Local:
```powershell
npm start
# Trabaja localmente en http://localhost:3000
```

### Para Deploy a Fly.io:
```powershell
# Primero instala flyctl: https://fly.io/docs/getting-started/installing-flyctl/
flyctl auth login
flyctl launch
flyctl deploy
```

### Para Guardar Cambios en GitHub:
```powershell
git add .
git commit -m "Mi mensaje"
git push origin main
```

---

## 💡 Tips Útiles

### Ver logs del servidor:
Los logs aparecen en PowerShell mientras el servidor está corriendo. Útil para debug.

### Limpiar caché del navegador:
Si ves páginas viejas:
- Presiona: **Ctrl + Shift + Supr**
- Selecciona "Cached images and files"
- Click "Clear data"

### Resetear Datos de Prueba:
```powershell
# En PowerShell del navegador (F12 → Console):
localStorage.clear()
```

---

## ✨ ¡Listo!

Con estos pasos ya deberías tener la aplicación corriendo localmente.

**Problemas?** Revisa la sección de "Solución de Problemas" arriba.

**¿Necesitas ayuda?** Abre un issue en GitHub o contacta al equipo.

---

**¡Bienvenido a AFCs UFV! 🎓**
