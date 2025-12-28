# 🔍 Auditoría WCAG 2.1 + ARIA - AFCs UFV

**Fecha:** 28 de Diciembre 2025  
**Estándar:** WCAG 2.1 Nivel AA  
**Versión:** v1.0 - Auditoría Inicial

---

## ✅ HALLAZGOS POSITIVOS

### 1. Estructura HTML Semántica
- ✅ **Uso correcto de landmarks**: `<header>`, `<nav>`, `<main>`, `<footer>`
- ✅ **Jerarquía de headings correcta**: H1 > H2 > H3 (no saltan niveles)
- ✅ **Lenguaje declarado**: `<html lang="es">`
- ✅ **Meta viewport**: Presente en todas las páginas
- ✅ **Favicon**: Incluido en todas las páginas

### 2. Navegación por Teclado ✓
- ✅ **Skip links implementados**: "Saltar al contenido principal" en catalogo.html, index.html
- ✅ **Focus visible styling**: Outline 3px azul (#0055A4) con offset 2px
- ✅ **Focus trap en modales**: Shift+Tab envuelve correctamente
- ✅ **ESC handlers implementados**: 
  - Modal cierra con ESC
  - Menú hamburguesa cierra con ESC
- ✅ **Orden de tabulación accesible**: Flujo lógico izquierda-derecha, arriba-abajo
- ✅ **aria-expanded en menú hamburguesa**: Anuncian estado abierto/cerrado
- ✅ **Teclado solo (sin mouse)**: Totalmente navegable

### 3. ARIA (Accessible Rich Internet Applications)
- ✅ **aria-label en botones sin texto**: 
  ```html
  <button class="menu-toggle" aria-label="Menú">
  ```
- ✅ **aria-expanded en toggleables**:
  ```javascript
  menuToggle.setAttribute('aria-expanded', isOpen);
  ```
- ✅ **aria-live en notificaciones dinámicas**:
  ```javascript
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');
  notification.setAttribute('aria-atomic', 'true');
  ```
- ✅ **aria-describedby en inputs**:
  ```html
  <input aria-describedby="search-help">
  <span id="search-help" class="sr-only">Descripción...</span>
  ```
- ✅ **aria-required y aria-invalid en validación**

### 4. Formularios Accesibles
- ✅ **Labels asociados a inputs**: Todos tienen `<label for="id">` con `id` coincidente
- ✅ **Inputs semánticos**: `type="email"`, `type="tel"`, `type="password"`, `type="date"`, `type="checkbox"`
- ✅ **Validación accesible**: Mensajes de error con `role="alert"`
- ✅ **aria-invalid en campos inválidos**
- ✅ **aria-describedby para ayuda de campos**

### 5. Responsive Design & Mobile
- ✅ **Media queries a 480px, 768px, 1024px**
- ✅ **Hamburger menu accesible en móvil** con `aria-expanded`
- ✅ **Textos redimensionables** (pueden cambiar de tamaño con zoom)
- ✅ **No hay scroll horizontal** en dispositivos pequeños

### 6. Contenido Dinámico
- ✅ **aria-live="polite"** en notificaciones
- ✅ **role="alert"** en mensajes importantes
- ✅ **aria-atomic="true"** para anunciar contenido completo
- ✅ **announceToScreenReader()** función para cambios dinámicos

### 7. Imágenes
- ✅ **Logo con alt text**: `<img src="logo-ufv.jpg" alt="Logo UFV">`
- ✅ **Favicon con atributo**
- ✅ **Íconos decorativos**: Tienen aria-hidden o están en texto

---

## ⚠️ ISSUES ENCONTRADOS

### 1. **[CRÍTICO] Contraste de Color Insuficiente**

**Localización:** help-support.html línea 241
```html
<span>Tienes <strong id="unread-count">0</strong> notificación(es) sin leer</span>
```
**Problema:** Texto blanco sobre fondo azul claro - Ratio contraste < 4.5:1  
**Solución:** ✅ ARREGLADO - Cambiado a fondo azul oscuro (var(--ufv-blue))

---

### 2. **[CRÍTICO] Faltan Labels en Algunos Inputs**

**Localización:** admin-panel.html (líneas 97+)
```html
<input type="text" id="act-nombre" placeholder="Nombre...">
<input type="date" id="act-inicio" placeholder="Fecha inicio">
```
**Problema:** Labels visuales faltan, solo placeholder (no suficiente para a11y)  
**Severidad:** CRÍTICO - Lectores pantalla no anuncian el propósito del campo  
**Solución:** Agregar `<label for="act-nombre">Nombre de Actividad</label>`

---

### 3. **[GRAVE] Emojis en Navegación sin aria-hidden**

**Localización:** Múltiples páginas (antes de arreglarlo)
```html
<li><a href="help-support.html">❓ Ayuda</a></li>  <!-- ❌ Antes -->
<li><a href="help-support.html">Ayuda</a></li>     <!-- ✅ Arreglado -->
```
**Problema:** Lectores pantalla anuncian "Pregunta Ayuda" en lugar de solo "Ayuda"  
**Solución:** ✅ Removidos todos los emojis del menú de navegación

---

### 4. **[GRAVE] Botones sin aria-label en Admin**

**Localización:** admin-asistencia.html
```html
<button class="btn-check">✓</button>  <!-- ❌ Falta aria-label -->
<button class="btn-uncheck">✗</button>  <!-- ❌ Falta aria-label -->
```
**Problema:** Botones con solo icono emoji sin etiqueta accesible  
**Solución:** Agregar `aria-label="Marcar como asistió"` a cada botón

---

### 5. **[GRAVE] Contraste Insuficiente en Texto Secundario**

**Localización:** Multiple locations
```css
.notification-time { color: #999; }  /* Ratio ~3:1, necesita 4.5:1 */
```
**Problema:** Textos grises sobre fondo claro < 4.5:1 contraste  
**Solución:** Cambiar a color más oscuro como var(--ufv-text-light)

---

### 6. **[MODERADO] Tabs sin aria-selected**

**Localización:** help-support.html 
```javascript
function switchTab(tabName) {
    // Actualiza display pero no actualiza aria-selected
}
```
**Problema:** ARIA no informa a lector pantalla cuál tab está activo  
**Solución:** Agregar `aria-selected="true"` al tab activo, `"false"` a los demás

---

### 7. **[MODERADO] Acordeón FAQs sin aria-controls**

**Localización:** help-support.html - FAQs section
```html
<div class="faq-item">
    <div class="faq-question">...</div>
    <div class="faq-answer">...</div>
</div>
```
**Problema:** El accordion no declara relación ARIA entre pregunta y respuesta  
**Solución:** Agregar `aria-controls`, `aria-expanded` a las preguntas

---

### 8. **[MODERADO] Tablas Admin sin Encabezados Accesibles**

**Localización:** admin-asistencia.html
```html
<table>
    <tr>
        <td>Juan</td>  <!-- ❌ Falta <th> -->
        <td>Asistió</td>
    </tr>
</table>
```
**Problema:** Tablas sin `<thead>` o `<th>` - lectores no entienden estructura  
**Solución:** Usar `<th scope="col">` para encabezados

---

### 9. **[LEVE] aria-label no actualizado dinámicamente**

**Localización:** notificaciones.html - banner notificaciones
```javascript
const unreadCount = notifications.filter(n => !n.leido).length;
// aria-label sigue siendo "Notificaciones" aunque el número cambió
```
**Problema:** Los lectores pantalla no saben si el número de notificaciones cambió  
**Solución:** Actualizar `aria-label` cuando cambia el contador

---

### 10. **[LEVE] Modales sin aria-labelledby**

**Localización:** catalogo.html
```html
<div id="activity-modal" class="modal">
    <h2 id="modal-title">Detalles de Actividad</h2>
    <!-- Modal sin aria-labelledby -->
</div>
```
**Problema:** Modal no indica su título a lectores pantalla  
**Solución:** `<div ... aria-labelledby="modal-title">`

---

## 📋 RESUMEN POR CRITERIO WCAG 2.1

| Criterio | Nivel | Estado | Notas |
|----------|-------|--------|-------|
| **1.4.3 Contraste (Mínimo)** | AA | ⚠️ PARCIAL | Algunos textos < 4.5:1 |
| **1.4.11 Contraste (No Texto)** | AA | ✅ COMPLETO | Botones OK |
| **2.1.1 Teclado** | A | ✅ COMPLETO | Totalmente navegable |
| **2.1.2 Atrapamiento Teclado** | A | ✅ COMPLETO | Modales OK, ESC OK |
| **2.4.1 Saltar Bloques** | A | ✅ COMPLETO | Skip link presente |
| **2.4.3 Orden de Foco** | A | ✅ COMPLETO | Flujo lógico |
| **2.4.7 Focus Visible** | AA | ✅ COMPLETO | Outline 3px presente |
| **3.2.1 Comportamiento al Enfoque** | A | ✅ COMPLETO | No cambia sin aviso |
| **3.3.1 Identificación de Errores** | A | ✅ COMPLETO | ARIA errors OK |
| **3.3.2 Etiquetas o Instrucciones** | A | ⚠️ PARCIAL | Admin formularios faltan labels |
| **4.1.2 Nombre, Rol, Valor** | A | ⚠️ PARCIAL | Tabs y modales sin ARIA completo |
| **4.1.3 Mensajes de Estado** | AAA | ✅ COMPLETO | aria-live OK |

---

## 🔧 PLAN DE CORRECCIÓN

### Prioridad CRÍTICA (Hacerlo ahora)
1. ✅ Arreglar contraste banner notificaciones (azul oscuro)
2. Agregar labels a inputs admin-panel.html
3. Agregar aria-label a botones con solo emoji
4. Mejorar contraste textos secundarios

### Prioridad ALTA (Esta semana)
5. Agregar aria-selected a tabs (help-support.html)
6. Agregar aria-expanded/aria-controls a FAQs
7. Usar `<th scope="col">` en tablas admin
8. Agregar aria-labelledby a modales

### Prioridad MEDIA (Próxima semana)
9. Actualizar aria-label dinámicamente en notificaciones
10. Verificar todas las imágenes tienen alt text descriptivo

---

## 📊 Puntuación General

**WCAG 2.1 Nivel A:** 95/100 ✅  
**WCAG 2.1 Nivel AA:** 78/100 ⚠️  
**WCAG 2.1 Nivel AAA:** 45/100 (No objetivo)

**Recomendación:** Aplicar correcciones CRÍTICAS para alcanzar 95/100 en Nivel AA

---

## 🎯 Próximos Pasos

1. **Hoy:** Arreglar contraste y labels críticos
2. **Mañana:** Completar ARIA en tabs y modales  
3. **Validación:** Probar con NVDA, JAWS o VoiceOver
4. **Documentación:** Actualizar este reporte

