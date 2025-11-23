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

✅ **Catálogo Público** - Acceso sin login para invitados y externos 🆕

✅ **Gestión de Inscripciones** - Inscribirse, darse de baja, y seguimiento de créditos ECTS

✅ **Centro de Notificaciones** - Recibe notificaciones sobre tus actividades 🆕

✅ **Centro de Ayuda y Soporte** - FAQs, formulario de contacto, recursos 🆕

✅ **Panel Administrativo** - Crear, editar y eliminar actividades formativas

✅ **Panel de Progreso** - Visualización de créditos acumulados y actividades inscritas

✅ **Diseño Profesional** - Tema visual UFV con interfaz responsive y animaciones

---

## 🛠️ Instalación Rápida

**👉 [VER GUÍA COMPLETA: GUIA_INSTALACION_ARRANQUE.md](./GUIA_INSTALACION_ARRANQUE.md)**

### Resumen:
1. Instala Node.js desde https://nodejs.org/
2. Abre PowerShell en la carpeta del proyecto
3. Ejecuta: `npm install`
4. Ejecuta: `npm start`
5. Abre: http://localhost:3000

**¡Listo! La aplicación estará corriendo.**

---

## 👤 Uso Rápido

### Para Estudiantes:
1. Click en **"Registro/Login"**
2. Email: `tu_email@alumnos.ufv.es`
3. Contraseña: Mínimo 6 caracteres
4. ¡Entra y explora el catálogo!

### Para Administradores:
1. Click en **"Acceso Administradores"**
2. Email: `tu_email@ufv.es`
3. Gestiona actividades desde el panel

---

## 🌐 Características Nuevas (v1.0)

✨ **help-support.html** - Centro de Ayuda con 12 FAQs prediseñadas  
✨ **notificaciones.html** - Centro de Notificaciones para usuarios  
✨ **public-catalog.html** - Catálogo público para invitados (sin login)

---

```
AFCsDEMO/
├── server.js                         # Servidor Express + API + BD
├── package.json                      # Dependencias
├── README.md                         # Este archivo
├── FUNCIONALIDADES_COMPLETADAS.md    # Lista detallada de funcionalidades
├── NUEVAS_PAGINAS_CREADAS.md         # Documentación de 3 nuevas páginas 🆕
│
├── index.html                        # Página de inicio
├── catalogo.html                     # Catálogo de actividades (usuarios)
├── public-catalog.html               # Catálogo público para invitados 🆕
├── inscripciones.html                # Mis inscripciones
├── progreso.html                     # Mi progreso ECTS
├── notificaciones.html               # Centro de notificaciones 🆕
├── help-support.html                 # Centro de ayuda y soporte 🆕
├── register.html                     # Registro/Login
├── admin-panel.html                  # Panel administrativo
├── admin-login.html                  # Login de administrador
├── admin-register.html               # Registro de administrador
├── dashboard.html                    # Dashboard (legacy)
├── detalle.html                      # Detalle de actividad
│
├── css/
│   └── style.css                     # Estilos profesionales UFV
│
├── js/
│   ├── app.js                        # Lógica de inscripciones
│   ├── auth.js                       # Autenticación
│   ├── catalog.js                    # Catálogo y filtros
│   ├── nav.js                        # Navegación dinámica
│   ├── admin-auth.js                 # Autenticación admin
│   ├── admin-dashboard.js            # Lógica panel admin
│   └── progreso.js                   # Seguimiento de progreso
│
├── img/
│   └── logo-ufv.jpg                  # Logo UFV
│
└── db/
    └── inscripciones.db              # Base de datos (creada automáticamente)
```

---

## 📚 Documentación

- **[GUIA_INSTALACION_ARRANQUE.md](./GUIA_INSTALACION_ARRANQUE.md)** ← Cómo instalar y arrancar (LEER PRIMERO)
- **[COMANDOS_RAPIDOS.md](./COMANDOS_RAPIDOS.md)** - Referencia de comandos
- **[FUNCIONALIDADES_COMPLETADAS.md](./FUNCIONALIDADES_COMPLETADAS.md)** - Listado de features
- **[ESTADO_ACTUAL.md](./ESTADO_ACTUAL.md)** - Estado del proyecto

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

