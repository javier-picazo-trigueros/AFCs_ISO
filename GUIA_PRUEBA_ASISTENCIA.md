# 🧪 Guía Rápida de Prueba - Sistema de Asistencia

## Paso 1: Iniciar Servidor
```bash
npm start
```
Espera a ver:
```
🚀 Server listening on http://localhost:3000
```

## Paso 2: Probar Login Unificado

### Como ALUMNO:
1. Ve a: http://localhost:3000/register.html
2. **Email:** `alumnos@alumnos.ufv.es`
3. **Contraseña:** `123456`
4. Clic en "Iniciar Sesión"
5. ✅ Te llevará a **Catálogo** (alumno)

### Como ADMIN:
1. Ve a: http://localhost:3000/register.html
2. **Email:** `admin@ufv.es`
3. **Contraseña:** `123456`
4. Clic en "Iniciar Sesión"
5. ✅ Te llevará a **Panel Admin**

## Paso 3: Probar Sistema de Asistencia

### Como ALUMNO - Inscribirse:
1. Ir a "Catálogo"
2. Hacer clic en **"Inscribirse"** en 3-4 actividades
3. Ir a "Mis Inscripciones" → Ver las 3-4 AFCs
4. Ir a "Mi Progreso" → Ver 0/6 ECTS (sin verificar)

### Como ADMIN - Verificar Asistencia:
1. Panel Admin
2. Clic en **"📋 Verificar Asistencia"**
3. Seleccionar una actividad (ej: "Voluntariado UFV Solidaria")
4. Ver lista de alumnos inscritos
5. Clic en **"✓ Asistió"** para 2 alumnos
6. Clic en **"✗ No asistió"** para 1 alumno

### Como ALUMNO - Ver Progreso:
1. Ir a "Mi Progreso"
2. ✅ Verás solo los ECTS de las 2 AFCs donde el admin verificó asistencia
3. Barra de progreso actualizada

## Paso 4: Verificar Cambios en Tiempo Real

**Caso 1: Admin cambia verificación**
- Admin desmerica "✓ Asistió"
- Marcas "✗ No asistió"
- Alumno refresca "Mi Progreso"
- ✅ Los ECTS desaparecen

**Caso 2: Crear nueva actividad**
- Admin crea actividad nueva
- Alumno se inscribe
- Admin verifica asistencia
- Alumno ve nuevos ECTS en progreso
- ✅ Todo sincronizado

---

## 📱 URLs Importantes

| Página | URL |
|--------|-----|
| Login Unificado | http://localhost:3000/register.html |
| Panel Admin | http://localhost:3000/admin-panel.html |
| Verificar Asistencia | http://localhost:3000/admin-asistencia.html |
| Catálogo | http://localhost:3000/catalogo.html |
| Mi Progreso | http://localhost:3000/progreso.html |

---

## 🎯 Casos de Prueba Recomendados

### ✅ Caso 1: Flujo Normal
1. Alumno se inscribe en 2 AFCs
2. Admin verifica asistencia en las 2
3. Alumno ve 2 AFCs completos en progreso

### ✅ Caso 2: Verificación Selectiva
1. Alumno se inscribe en 4 AFCs
2. Admin verifica asistencia solo en 2
3. Alumno ve solo 2 AFCs en progreso

### ✅ Caso 3: Cambio de Verificación
1. Admin verifica asistencia
2. Alumno ve créditos en progreso
3. Admin cambia a "No asistió"
4. Alumno refresca y ve 0 créditos

### ✅ Caso 4: Sin Verificación
1. Alumno se inscribe en AFC
2. Admin NO verifica
3. Alumno ve 0 créditos en progreso

---

## 🔍 Verificar en BD (Avanzado)

Si quieres ver la BD directamente:

```bash
# Instalar sqlite3 si no lo tienes
# Luego abrir:
sqlite3 db/inscripciones.db

# Ver tablas
.tables

# Ver inscritos en AFC 1
SELECT * FROM inscripcion_actividades WHERE actividad_id = 1;

# Ver asistencias verificadas
SELECT * FROM asistencias WHERE asistio = 1;

# Ver créditos totales de usuario 1
SELECT SUM(creditos_otorgados) FROM asistencias WHERE user_id = 1 AND asistio = 1;
```

---

## ⚠️ Posibles Problemas

**Problema:** "Email o contraseña incorrectos"
- ✅ Verifica que escribas exactamente: `alumnos@alumnos.ufv.es` o `admin@ufv.es`

**Problema:** Admin no ve botón "Verificar Asistencia"
- ✅ Abre http://localhost:3000/admin-asistencia.html directamente

**Problema:** Los créditos no aparecen en progreso
- ✅ Verifica que el admin haya marcado "✓ Asistió"
- ✅ Refresca la página (F5)

**Problema:** BD no se recrea
- ✅ Borra `db/inscripciones.db` manualmente
- ✅ Reinicia el servidor

---

## ✨ Funcionalidades Adicionales

Además del sistema de asistencia, también tienes:
- ✅ Edición de actividades (admin)
- ✅ Filtros mejorados (alumno)
- ✅ Login unificado (alumno/admin)
- ✅ Panel de verificación de asistencia (admin)
- ✅ Progreso dinámico basado en verificación (alumno)
