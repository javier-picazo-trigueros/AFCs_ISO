# 📋 Prompts Completados — AFcS Portal

## ✅ Fase 1: Estructura y Limpieza de Código

- [x] **Revisar código HTML existente** y detectar errores
- [x] **Crear carpetas individuales** para CSS y JS (`css/`, `js/`)
- [x] **Extraer estilos inline** → `css/style.css` (limpieza y organización)
- [x] **Extraer lógica JavaScript** → `js/app.js` (separación de responsabilidades)
- [x] **Actualizar todos los HTML** para enlazar CSS y JS externos

## ✅ Fase 2: Backend y Base de Datos

- [x] **Crear servidor Node.js** con Express
- [x] **Instalar SQLite3** para persistencia de datos
- [x] **Crear tabla de inscripciones** (legacy)
- [x] **Crear tabla de usuarios** (`users`) con validación de dominio
- [x] **Implementar API REST** mínima para gestión de inscripciones
- [x] **Hashear contraseñas** con bcryptjs
- [x] **Insertar datos de demo** automáticamente

## ✅ Fase 3: Registro de Estudiantes

- [x] **Crear página de registro** (`register.html`)
- [x] **Validar email** con dominio `@alumnos.ufv.es` (cliente + servidor)
- [x] **Validar contraseña** (mínimo 6 caracteres, coincidencia)
- [x] **Crear endpoint POST /api/users** para registro
- [x] **Prevenir duplicados** de email en DB
- [x] **Mejorar UX del formulario** con mensajes de error claros

## ✅ Fase 4: Mejoras Visuales y Responsive

- [x] **Cambiar marca de "AFCS" a "AFcS"** (S minúscula) en todas las páginas
- [x] **Rediseñar página de inicio** (`index.html`) con hero section
- [x] **Agregar CTA de registro** en portada
- [x] **Añadir media queries** para dispositivos móviles (breakpoints: 900px, 480px)
- [x] **Mejorar estilos CSS** (gradientes, sombras, espaciado)
- [x] **Crear header responsivo** con navegación flexible
- [x] **Diseñar cards y botones** más estéticos

## ✅ Fase 5: Panel de Administrador

- [x] **Crear tabla `admin_users`** para personal @ufv.es
- [x] **Validar dominio diferenciado** (`@ufv.es` sin "alumnos")
- [x] **Endpoint POST /api/admin/register** para registro de admin
- [x] **Endpoint POST /api/admin/login** con verificación de contraseña
- [x] **Crear página de login admin** (`admin-login.html`)
- [x] **Crear página de registro admin** (`admin-register.html`)
- [x] **Guardar sesión admin** en localStorage

## ✅ Fase 6: CRUD de Actividades

- [x] **Crear tabla `actividades`** con campos: nombre, descripción, ects, fechas, capacidad
- [x] **Endpoint GET /api/actividades** para listar
- [x] **Endpoint POST /api/actividades** para crear (admin)
- [x] **Endpoint PUT /api/actividades/:id** para editar (admin)
- [x] **Endpoint DELETE /api/actividades/:id** para eliminar (admin)
- [x] **Insertar 3 actividades de demo** al iniciar servidor

## ✅ Fase 7: Dashboard de Administrador

- [x] **Crear panel de control** (`admin-panel.html`)
- [x] **Mostrar estadísticas en cards**: total actividades, total inscritos
- [x] **Renderizar tabla de actividades** con botones de acción
- [x] **Crear modal para nueva actividad** con formulario
- [x] **Implementar función eliminar actividad** con confirmación
- [x] **Placeholder para editar actividad** (en desarrollo)
- [x] **Comprobar autenticación** antes de mostrar panel

## ✅ Fase 8: Reportes y Estadísticas

- [x] **Crear tabla `inscripcion_actividades`** (relación usuario-actividad)
- [x] **Endpoint GET /api/admin/reporte** con JOIN y GROUP BY
- [x] **Mostrar inscritos por actividad** en tiempo real
- [x] **Calcular disponibles** (máximo - inscritos)
- [x] **Contar total de inscritos** en dashboard

## ✅ Fase 9: Mejora de Funcionalidad

- [x] **Crear endpoint POST /api/inscribir** para inscribirse a actividad
- [x] **Implementar lógica de inscripción** desde front
- [x] **Prevenir inscripción duplicada** con UNIQUE constraint
- [x] **Validar capacidad máxima** de actividad
- [x] **Mostrar disponibles** en tabla de admin

## ✅ Fase 10: UX y Debugging

- [x] **Mejorar mensajes de error** en admin-dashboard.js
- [x] **Añadir health check endpoint** (`/api/health`)
- [x] **Crear guía de troubleshooting** en README
- [x] **Mostrar errores detallados** en tabla cuando falla fetch
- [x] **Documentar pasos para resolver "Error de Red"**

## ✅ Fase 11: Acceso en Red Local

- [x] **Modificar servidor** para escuchar en `0.0.0.0` (todas las interfaces)
- [x] **Detectar IP local automáticamente** usando `os.networkInterfaces()`
- [x] **Mostrar URLs** en logs: localhost y IP de red
- [x] **Permitir acceso desde otros dispositivos** en la WiFi
- [x] **Documentar cómo compartir URL** con compañeros

## 📊 Resumen de Archivos Creados/Modificados

### HTML (9 archivos)
- `index.html` — Portada con login + CTA admin
- `register.html` — Registro de estudiantes
- `admin-login.html` — Login de admin
- `admin-register.html` — Registro de admin
- `admin-panel.html` — Dashboard de administrador
- `dashboard.html`, `inscripciones.html`, `catalogo.html`, `progreso.html` — Actualizados a AFcS

### CSS (1 archivo)
- `css/style.css` — Estilos centralizados + responsive + media queries

### JavaScript (4 archivos)
- `js/app.js` — Lógica de inscripciones de usuario
- `js/auth.js` — Autenticación de estudiantes
- `js/admin-auth.js` — Autenticación de administradores
- `js/admin-dashboard.js` — Lógica del panel admin

### Backend
- `server.js` — Express + SQLite con 6 tablas + 15+ endpoints
- `package.json` — Dependencias (express, sqlite3, bcryptjs)

### Documentación
- `README.md` — Guía completa de instalación, uso y troubleshooting
- `PROMPTS_COMPLETADOS.md` — Este archivo (checklist de features)

## 📈 Base de Datos (SQLite)

**Tablas creadas:**
1. `inscripciones` — Legacy, inscripciones simples
2. `users` — Estudiantes con email @alumnos.ufv.es
3. `admin_users` — Administradores con email @ufv.es
4. `actividades` — Catálogo de actividades ECTS
5. `inscripcion_actividades` — Relación usuario-actividad

**Datos de demo insertados:**
- 3 actividades: Voluntariado, Seminario, Taller
- Tablas listas para crear nuevos usuarios y admin

## 🔐 Seguridad Implementada

- [x] Hash de contraseñas con bcryptjs (salt 10)
- [x] Validación de dominio en cliente y servidor
- [x] Validación de longitud mínima de contraseña (6 chars)
- [x] Prevención de duplicados con UNIQUE constraints
- [x] Separación de roles: alumno vs admin
- [x] Autenticación basada en localStorage (escalable a JWT)

## 🚀 API REST Endpoints (15+)

### Health & Demo
- `GET /api/health` — Check de servidor

### Estudiantes
- `POST /api/users` — Registrar
- `GET /api/actividades` — Listar actividades
- `POST /api/inscribir` — Inscribirse
- `GET /api/inscripciones` — Mis inscripciones (legacy)
- `DELETE /api/inscripciones/:id` — Cancelar
- `GET /api/actividades/:id/stats` — Stats de actividad

### Administradores
- `POST /api/admin/register` — Registrar admin
- `POST /api/admin/login` — Login admin
- `GET /api/actividades` — Listar actividades
- `POST /api/actividades` — Crear actividad
- `PUT /api/actividades/:id` — Editar actividad
- `DELETE /api/actividades/:id` — Eliminar actividad
- `GET /api/admin/reporte` — Reporte general

## 🎯 Próximas Mejoras Sugeridas

- [ ] Implementar edición de actividades en modal
- [ ] Añadir envío de emails de confirmación
- [ ] Sistema de notificaciones en tiempo real (WebSockets)
- [ ] Exportación de reportes (PDF/Excel)
- [ ] Autenticación real con JWT + refresh tokens
- [ ] Tests unitarios e integración
- [ ] Migración a PostgreSQL
- [ ] Despliegue en servidor (Heroku, AWS, etc.)
- [ ] Verificación de correo electrónico al registrarse
- [ ] Rate limiting y protección contra fuerza bruta
- [ ] Auditoría de acciones de admin
- [ ] Sistema de roles más granular (staff, profesor, etc.)

---

**Última actualización:** 9 de Noviembre de 2025  
**Estado:** ✅ Portal funcional en demo local  
**Usuarios en WiFi:** ✅ Compatible (acceso vía IP local)
