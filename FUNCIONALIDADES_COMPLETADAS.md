# 📋 AFCs Demo - Funcionalidades Completadas

## ✅ Resumen General

La aplicación web AFCs (Actividades Formativas Complementarias) es una plataforma completa para gestionar inscripciones en actividades formativas de la UFV. Incluye sistema de autenticación, catálogo de actividades, gestión de inscripciones, y panel administrativo.

---

## 🎨 Interfaz y Diseño

### ✅ Tema Visual Profesional UFV
- **Colores corporativos UFV** implementados mediante variables CSS
- **Logo UFV** integrado en todas las páginas
- **Tipografía consistente** con Google Fonts (Poppins)
- **Diseño responsive** adaptado a móvil, tablet y desktop
- **Animaciones suaves** para mejorar experiencia de usuario

### ✅ Componentes Visuales
- **Tarjetas de actividades** con información clara
- **Modales de detalles** para ver información completa
- **Notificaciones tipo toast** para confirmaciones y errores
- **Barra de progreso ECTS** con visualización de créditos
- **Indicadores de disponibilidad** con estados (Disponible, Limitado, Completo)

---

## 🔐 Sistema de Autenticación

### ✅ Registro de Estudiantes
- **Email con validación** de formato @alumnos.ufv.es
- **Contraseña hasheada** con bcryptjs
- **Validación de campos** obligatorios
- **Prevención de duplicados** (un email solo se puede registrar una vez)

### ✅ Registro de Administradores
- **Email con validación** de formato @ufv.es
- **Sistema de rol** diferenciado
- **Acceso limitado** solo a cuentas admin

### ✅ Login / Logout
- **Autenticación basada en email y contraseña**
- **Gestión de sesiones** con localStorage
- **Token de usuario** almacenado localmente
- **Cierre de sesión** con limpieza de datos

---

## 📚 Catálogo de Actividades

### ✅ Visualización de Actividades
- **Tarjetas con información clave**:
  - Nombre de la actividad
  - Descripción resumida (primeras 100 caracteres)
  - Créditos ECTS
  - Fecha de inicio
  - Plazas disponibles

### ✅ Modal de Detalles Completos
- **Información extendida**:
  - Nombre completo
  - Descripción detallada
  - Créditos ECTS
  - Modalidad (Presencial, Online, Híbrido)
  - Fechas de inicio y fin
  - Plazas disponibles

### ✅ Filtrado y Búsqueda
- **Búsqueda por nombre/descripción** en tiempo real
- **Filtro por rango de ECTS**:
  - Menos de 1 crédito
  - 1 a 2 créditos
  - 2 a 3 créditos
  - 3 o más créditos
- **Filtro por disponibilidad**:
  - Solo con plazas disponibles
  - Solo actividades completas
- **Botón de limpieza** de filtros

### ✅ Botones de Acción en Tarjetas
- **"Ver más"**: Abre modal con detalles completos
- **"Inscribirse"**: Permite al usuario inscribirse (si hay plazas)
- **"✓ Inscrito"**: Muestra estado actual del usuario
- **"Dar de Baja"**: Permite desuscribirse con confirmación

---

## 📝 Gestión de Inscripciones

### ✅ Inscripción en Actividades
- **Validación de plazas disponibles**
- **Prevención de inscripciones duplicadas**
- **Notificaciones de éxito/error**
- **Actualización dinámica de interfaz**

### ✅ Página "Mis Inscripciones"
- **Listado de actividades inscritas**
- **Opción de darse de baja**
- **Visualización de créditos obtenidos**
- **Confirmación antes de darse de baja**

### ✅ Gestión de Plazas
- **Contador dinámico** de plazas disponibles
- **Actualización en tiempo real** al inscribirse/darse de baja
- **Indicadores visuales** del estado de ocupación
- **API endpoint** para obtener estadísticas (/api/actividades/{id}/stats)

---

## 👨‍💼 Panel Administrativo

### ✅ Funcionalidades Admin
- **Crear nuevas actividades**:
  - Nombre, descripción, créditos ECTS
  - Fecha de inicio y fin
  - Modalidad (Presencial, Online, Híbrido)
  - Número máximo de inscritos
- **Ver listado de actividades creadas**
- **Editar actividades existentes**
- **Eliminar actividades**
- **Acceso restringido** solo a cuentas @ufv.es

### ✅ Gestión de Datos
- **Visualización de inscritos por actividad**
- **Cálculo de plazas disponibles**
- **Información de creador de la actividad**

---

## 📊 Panel de Progreso

### ✅ Seguimiento de Créditos
- **Barra visual de progreso ECTS**
- **Cálculo automático** de créditos acumulados
- **Listado de actividades completadas/inscritas**
- **Información de modalidades**

### ✅ Estadísticas
- **Total de créditos cursados**
- **Actividades activas**
- **Avance visual** con porcentaje

---

## 🗄️ Base de Datos

### ✅ Tablas Implementadas

**usuarios**
- id, email, contraseña_hash, nombre, apellido, fecha_registro

**admin_usuarios**
- id, email, contraseña_hash, nombre, apellido, fecha_registro

**actividades**
- id, nombre, descripcion, ects, fecha_inicio, fecha_fin
- modalidad, max_inscritos, created_by, created_at

**inscripcion_actividades**
- inscripcion_id, user_id, actividad_id, fecha_inscripcion

### ✅ SQLite
- **Base de datos local** en carpeta db/
- **Inicialización automática** al arrancar el servidor
- **Datos de prueba** precargados
- **Persistencia de datos** entre sesiones

---

## 🔗 API REST

### ✅ Endpoints Implementados

**Autenticación**
- `POST /api/users/register` - Registrar estudiante
- `POST /api/users/login` - Login estudiante
- `POST /api/admin/register` - Registrar admin
- `POST /api/admin/login` - Login admin

**Actividades**
- `GET /api/actividades` - Obtener todas las actividades
- `GET /api/actividades/{id}` - Obtener detalles de una actividad
- `GET /api/actividades/{id}/stats` - Obtener estadísticas (inscritos/disponibles)
- `POST /api/admin/actividades` - Crear nueva actividad (admin)
- `PUT /api/admin/actividades/{id}` - Editar actividad (admin)
- `DELETE /api/admin/actividades/{id}` - Eliminar actividad (admin)

**Inscripciones**
- `GET /api/inscripciones` - Obtener inscripciones del usuario
- `POST /api/inscribir` - Inscribirse en una actividad
- `DELETE /api/inscripciones/{id}` - Darse de baja de una actividad

---

## 📱 Navegación y Menú

### ✅ Menú Dinámico según Rol
- **Usuario No Autenticado**:
  - Inicio
  - Catálogo (lectura)
  - Registrarse/Login

- **Estudiante Autenticado**:
  - Inicio
  - Catálogo (lectura + inscripción)
  - Mis Inscripciones
  - Mi Progreso
  - Logout

- **Administrador**:
  - Inicio
  - Catálogo
  - Mis Inscripciones
  - Mi Progreso
  - Panel Admin
  - Logout

### ✅ Páginas Implementadas
- `index.html` - Página de inicio con bloques por rol
- `catalogo.html` - Catálogo de actividades con filtros
- `inscripciones.html` - Mis inscripciones
- `progreso.html` - Seguimiento de créditos ECTS
- `register.html` - Registro/Login combinado
- `dashboard.html` - Panel administrativo (admin)

---

## 🎯 Características Especiales

### ✅ Sistema de Notificaciones
- **Toast notifications** con auto-dismiss
- **Tipos**: success, error, info, warning
- **Animaciones** suave de entrada/salida
- **Posicionamiento fijo** en pantalla

### ✅ Validaciones
- **Email válido** con formato @alumnos.ufv.es o @ufv.es
- **Contraseña** mínimo 6 caracteres
- **Campos obligatorios** verificados
- **Validación de disponibilidad** antes de inscribirse
- **Prevención de acciones duplicadas**

### ✅ Seguridad
- **Contraseñas hasheadas** con bcryptjs
- **Tokens de sesión** en localStorage
- **Validación de autenticación** en endpoints sensibles
- **Restricción de acceso** por rol
- **Prevención de acceso directo** a páginas admin

### ✅ Responsabilidad del Usuario
- **Confirmaciones** antes de acciones críticas (darse de baja)
- **Mensajes claros** de error
- **Feedback visual** de estados
- **Redirección** a login cuando no autenticado

---

## 📈 Optimizaciones Implementadas

### ✅ Rendimiento
- **Carga de datos** en paralelo (Promise.all)
- **Renderizado dinámico** sin recargas de página
- **Caché de datos** en memoria durante sesión
- **Búsqueda/filtrado** en cliente (no requiere servidor)

### ✅ UX
- **Transiciones suaves** con CSS
- **Indicadores de carga** implícitos
- **Botones deshabilitados** cuando no aplica
- **Interfaz intuitiva** y consistente

### ✅ Código
- **Modular**: Archivos JS separados por funcionalidad
- **Mantenible**: Funciones bien documentadas
- **Limpio**: Eliminación de código redundante
- **Escalable**: Estructura preparada para expansión

---

## 🚀 Próximas Mejoras Sugeridas

- [ ] Paginación en catálogo
- [ ] Descarga de certificados
- [ ] Sistema de calificaciones
- [ ] Notificaciones por email
- [ ] Exportación de datos (CSV/PDF)
- [ ] Sistema de comentarios/reviews
- [ ] API con autenticación JWT
- [ ] Dashboard con gráficos
- [ ] Integración con calendario
- [ ] Sistema de recordatorios

---

## 📝 Notas de Desarrollo

- **Tecnología Backend**: Node.js con Express.js
- **Base de Datos**: SQLite3
- **Frontend**: HTML5, CSS3, JavaScript vanilla (ES6)
- **Autenticación**: Email + Contraseña hasheada
- **Almacenamiento de sesión**: localStorage
- **Comunicación**: Fetch API (REST)

