# Sistema de Verificación de Asistencia - AFCs UFV

## 🎯 Cambios Implementados

### 1. Login Unificado ✅
- **Mismo formulario de acceso** para alumnos y administradores
- **Detección automática por dominio**:
  - `@alumnos.ufv.es` → Acceso como **Alumno**
  - `@ufv.es` (sin "alumnos") → Acceso como **Administrador**
- Redirección automática al panel correspondiente

### 2. Sistema de Verificación de Asistencia ✅
- Nueva página: **admin-asistencia.html**
- Los administradores pueden:
  - Ver lista de actividades
  - Seleccionar una actividad
  - Ver todos los alumnos inscritos
  - Marcar asistencia (✓ Asistió / ✗ No asistió)
  - Verificar créditos otorgados por alumno

### 3. Asignación Automática de Créditos ✅
- Los créditos se asignan **SOLO** cuando el administrador verifica la asistencia
- **Proceso**:
  1. Alumno se inscribe en un AFC (estado: "inscrito")
  2. Pasa la fecha del AFC
  3. Administrador va a "Verificar Asistencia"
  4. Marca al alumno como "Asistió"
  5. El sistema le otorga automáticamente los ECTS de esa AFC
  6. Los créditos aparecen en "Mi Progreso" del alumno

### 4. Nuevas Tablas en BD ✅
```sql
-- Tabla de asistencias (verifica si el alumno asistió)
CREATE TABLE asistencias (
  id INTEGER PRIMARY KEY,
  inscripcion_id INTEGER,          -- referencia a inscripción
  user_id INTEGER,                 -- alumno
  actividad_id INTEGER,            -- AFC
  verificado_por INTEGER,          -- admin que verificó
  asistio INTEGER (0 o 1),        -- si asistió
  creditos_otorgados INTEGER,     -- ECTS otorgados
  fecha_verificacion TEXT          -- cuándo se verificó
);
```

---

## 👥 Credenciales de Prueba

### Alumno
```
Email: alumnos@alumnos.ufv.es
Contraseña: 123456
Estado: 0/6 ECTS (sin verificar aún)
```

### Administrador
```
Email: admin@ufv.es
Contraseña: 123456
```

---

## 📋 Flujo de Uso

### Como Alumno:
1. Ir a http://localhost:3000/register.html
2. Entrar con `alumnos@alumnos.ufv.es / 123456`
3. Ir a "Catálogo"
4. Inscribirse en actividades
5. Ir a "Mis Inscripciones" para ver el estado
6. Ir a "Mi Progreso" para ver créditos verificados (0 hasta que admin verifique)

### Como Administrador:
1. Ir a http://localhost:3000/register.html
2. Entrar con `admin@ufv.es / 123456`
3. Ir a Panel Admin
4. Hacer clic en **"📋 Verificar Asistencia"**
5. Seleccionar una actividad
6. Ver lista de inscritos
7. Hacer clic en **"✓ Asistió"** para cada alumno que vaya a la AFC
8. Los créditos se asignan automáticamente

---

## 🗄️ Endpoint API Nuevos

### Admin - Obtener inscritos en actividad
```
GET /api/admin/actividad/:id/inscritos
Retorna: lista de alumnos inscritos con estado de asistencia
```

### Admin - Registrar asistencia
```
POST /api/admin/registrar-asistencia
Body: { inscripcion_id, user_id, actividad_id, asistio, admin_id }
Retorna: { ok: true, creditos_otorgados: X }
```

### Alumno - Obtener créditos verificados
```
GET /api/users/:id/creditos
Retorna: { creditosVerificados: [], totalCreditos: X }
Nota: Solo cuenta ECTS verificados por admin
```

---

## 🔄 Flujo Técnico Completo

```
1. INSCRIPCIÓN
   alumno.inscribirse(AFC) 
   → inscripcion_actividades (status: 'inscrito')
   
2. ESPERAR FECHA
   fecha_fin de AFC pasa
   
3. VERIFICACIÓN (Admin)
   admin.verificarAsistencia(alumno, AFC, asistio=true)
   → asistencias (asistio: 1, creditos_otorgados: X)
   
4. PROGRESO (Alumno)
   alumno.verProgreso()
   → query: SELECT SUM(creditos_otorgados) WHERE asistio=1
   → Solo muestra créditos verificados
```

---

## 📝 Notas Importantes

✅ **Los créditos NO se asignan automáticamente**
- Solo se asignan cuando el admin marca "Asistió" en Verificar Asistencia

✅ **Los créditos se pueden desmarcar**
- Si admin marca "No asistió" después, los créditos se revocan

✅ **Cada alumno tiene solo 1 registro de asistencia por AFC**
- Si el admin intenta verificar 2 veces, se actualiza el anterior

✅ **Historial de verificación**
- Se guarda quién verificó (admin_id) y cuándo (fecha_verificacion)

✅ **El progreso es dinámico**
- Si admin verifica asistencia, los créditos aparecen inmediatamente en "Mi Progreso"

---

## 🚀 Para Probar

```bash
# 1. Iniciar servidor
npm start

# 2. Abrir navegador
http://localhost:3000/register.html

# 3. Pruebas recomendadas:
# - Entrar como alumno, inscribirse en 3-4 AFCs
# - Entrar como admin, verificar asistencia de solo 2
# - Volver a alumno, ver en "Mi Progreso" solo 2 AFCs con créditos
# - Admin puede cambiar verificación en cualquier momento
```

---

## 📂 Archivos Modificados/Creados

✅ **Creados:**
- `admin-asistencia.html` - Página de verificación de asistencia
- `js/admin-asistencia.js` - Lógica del sistema de asistencia

✅ **Modificados:**
- `server.js` - Nuevos endpoints + tabla asistencias
- `register.html` - Login unificado
- `js/auth.js` - Login inteligente (alumno/admin por dominio)
- `admin-panel.html` - Botón acceso a Verificar Asistencia
- `js/progreso.js` - Solo muestra créditos verificados

---

## 💡 Diferencia Clave

**Antes:** Créditos se sumaban automáticamente al completar la fecha

**Ahora:** Créditos solo se suman cuando:
1. La fecha del AFC ha pasado ✓
2. El alumno está inscrito ✓
3. El administrador verifica manualmente que "Asistió" ✓

Esto permite un control real de asistencia similar a las universidades reales.
