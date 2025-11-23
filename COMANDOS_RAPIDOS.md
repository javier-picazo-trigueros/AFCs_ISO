## ⚡ COMANDOS RÁPIDOS - REFERENCIA

Aquí están todos los comandos que necesitas para trabajar con el proyecto AFCs.

---

## 🚀 INICIAR EL PROYECTO

### 1. Descargar (solo la primera vez)
```powershell
# Opción A: Clonar desde GitHub
git clone https://github.com/javier-picazo-trigueros/AFCs_ISO.git
cd AFCs_ISO

# Opción B: Descargar ZIP y descomprimirlo
```

### 2. Instalar dependencias (solo la primera vez)
```powershell
npm install
```

### 3. Iniciar el servidor
```powershell
npm start
```

**Resultado esperado:**
```
🚀 Server listening on http://localhost:3000
```

### 4. Abrir en navegador
```
http://localhost:3000
```

---

## 🛑 DETENER Y REINICIAR

### Detener el servidor
```powershell
Ctrl + C
```
(Presiona Y si te pide confirmación)

### Reiniciar el servidor
```powershell
npm start
```

---

## 🔍 VERIFICAR INSTALACIÓN

### Ver versión de Node.js
```powershell
node --version
```

### Ver versión de npm
```powershell
npm --version
```

### Ver qué procesos usan puerto 3000
```powershell
netstat -ano | findstr ":3000"
```

---

## 🗑️ RESETEAR BASE DE DATOS

### Eliminar base de datos actual
```powershell
Remove-Item -Path "db\inscripciones.db" -Force
npm start
```

Se creará una nueva BD con datos de prueba.

---

## 🐛 SOLUCIONAR PROBLEMAS

### Puerto 3000 en uso
```powershell
# Ver qué proceso lo usa
netstat -ano | findstr ":3000"

# Matar el proceso (reemplaza XXXX con el PID)
taskkill /PID XXXX /F

# Luego:
npm start
```

### Módulos no encontrados
```powershell
# Instalar cors
npm install cors

# Instalar sqlite3
npm install sqlite3

# O reinstalar todo
npm install
```

---

## 📝 GIT - GUARDAR CAMBIOS

### Ver archivos modificados
```powershell
git status
```

### Agregar todos los cambios
```powershell
git add .
```

### Confirmar cambios
```powershell
git commit -m "Descripción de lo que cambió"
```

### Enviar a GitHub
```powershell
git push origin main
```

### Actualizar desde GitHub
```powershell
git pull origin main
```

---

## 🚀 DEPLOY A FLY.IO

### 1. Instalar flyctl
Descargar desde: https://fly.io/docs/getting-started/installing-flyctl/

### 2. Autenticarse
```powershell
flyctl auth login
```

### 3. Primera vez (setup)
```powershell
flyctl launch
```

### 4. Hacer deploy
```powershell
flyctl deploy
```

### 5. Ver logs
```powershell
flyctl logs
```

### 6. Ver estado
```powershell
flyctl status
```

---

## 📦 INSTALAR NUEVAS DEPENDENCIAS

### Agregar un paquete
```powershell
npm install nombre-del-paquete
```

### Agregar como dependencia de desarrollo
```powershell
npm install --save-dev nombre-del-paquete
```

### Desinstalar un paquete
```powershell
npm uninstall nombre-del-paquete
```

### Ver todos los paquetes instalados
```powershell
npm list
```

---

## 🧹 LIMPIAR Y MANTENIMIENTO

### Limpiar caché de npm
```powershell
npm cache clean --force
```

### Ver uso de disco de node_modules
```powershell
du -sh node_modules
```

### Eliminar node_modules y reinstalar
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 🌐 DESARROLLO LOCAL

### Acceder desde otro dispositivo en la red
```
http://192.168.X.XXX:3000
```
(Reemplaza X con la IP que sale en la consola)

### Abrir DevTools del navegador
```
F12  o  Ctrl + Shift + I
```

### Abrir consola JavaScript
```
F12 → Console
```

### Limpiar caché del navegador
```
Ctrl + Shift + Supr
```

---

## 📁 NAVEGACIÓN EN POWERSHELL

### Listar archivos
```powershell
ls
# o
dir
```

### Cambiar directorio
```powershell
cd nombre-carpeta
```

### Ir a carpeta anterior
```powershell
cd ..
```

### Ir a home
```powershell
cd ~
```

---

## 💡 TIPS ÚTILES

### Ver los últimos 10 logs
```powershell
npm start 2>&1 | Select-Object -Last 10
```

### Ejecutar comando cada vez que saves
```powershell
npm install -g nodemon
nodemon server.js
```

### Ver archivos .md del proyecto
```powershell
ls *.md
```

### Contar líneas de código
```powershell
(gci -r -include *.js,*.html,*.css | measure -line).Lines
```

---

## 🎯 FLUJO TÍPICO DE DESARROLLO

```powershell
# 1. Abrir proyecto
cd "c:\ruta\al\proyecto"

# 2. Iniciar servidor
npm start

# 3. Abrir navegador
# Ir a http://localhost:3000

# 4. Hacer cambios en los archivos

# 5. Ver cambios en navegador (auto-reload)

# 6. Cuando termines, guardar en Git
git add .
git commit -m "Mi cambio"
git push

# 7. Deploy a producción (si está listo)
flyctl deploy

# 8. Detener servidor (cuando no lo necesites)
# En PowerShell: Ctrl + C
```

---

**¡Que disfrutes desarrollando! 🚀**
