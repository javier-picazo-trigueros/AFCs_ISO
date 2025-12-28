// i18n.js - Sistema completo de traducciones multiidioma

const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.register': 'Registro/Login',
    'nav.catalog': 'Catálogo',
    'nav.inscriptions': 'Mis Inscripciones',
    'nav.progress': 'Mi Progreso',
    'nav.notifications': 'Notificaciones',
    'nav.admin': 'Panel Admin',
    'nav.logout': 'Cerrar Sesión',
    'nav.help': 'Ayuda',
    'nav.menu': 'Menú',
    
    'index.title': 'Actividades Formativas Complementarias',
    'index.subtitle': 'Explora, inscríbete y sigue tu progreso en las AFCs de la UFV. Forma parte de la vida universitaria y completa tus créditos de una manera sencilla y centralizada.',
    'index.explore': 'Explorar Catálogo',
    'index.public_catalog': 'Catálogo Público (Invitados)',
    'index.admin_login': 'Acceso Administradores',
    
    'page.title.help': 'Centro de Ayuda y Soporte',
    'page.title.faqs': 'Preguntas Frecuentes',
    'page.title.contact': 'Canales de Atención',
    'page.title.resources': 'Recursos Útiles',
    
    'tab.faqs': 'Preguntas Frecuentes',
    'tab.contact': 'Contactar',
    'tab.resources': 'Recursos',
    'tab.personalizacion': 'Personalización',
    
    'section.contact': 'Canales de Atención',
    'section.contact.form': 'Formulario de Contacto',
    'section.personalizacion': 'Personalización',
    
    'btn.settings': 'Configuración',
    'btn.send': 'Enviar',
    'btn.new_activity': '+ Nueva Actividad',
    'btn.explore': 'Explorar Catálogo',
    'btn.admin_login': 'Acceso Administradores',
    'btn.call': 'Llamar',
    'btn.email': 'Enviar Email',
    'btn.chat': 'Iniciar Chat',
    
    'form.subject': 'Asunto *',
    'form.category': 'Categoría *',
    'form.message': 'Mensaje *',
    'form.all': 'Todas',
    'form.general': 'General',
    'form.inscriptions': 'Inscripciones',
    'form.ects': 'Créditos ECTS',
    'form.technical': 'Técnico',
    
    'contact.email': 'Email',
    'contact.phone': 'Teléfono',
    'contact.chat': 'Chat',
    'contact.response_24h': 'Respuesta en 24h',
    'contact.hours': 'Lunes-Viernes 9:00-18:00',
    'contact.soon': 'Próximamente',
    'contact.email_addr': 'soporte@ufv.es',
    'contact.phone_num': '+34 91 870 90 00',
    
    'settings.title': 'Configuración',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.light': 'Claro ☀️',
    'settings.dark': 'Oscuro 🌙',
    'settings.system': 'Sistema ⚙️',
    'settings.spanish': 'Español 🇪🇸',
    'settings.english': 'English 🇬🇧',
    
    'faq.what_is_afc': '¿Qué son las AFCs?',
    'faq.what_is_afc_answer': 'Las Actividades Formativas Complementarias (AFCs) son actividades extracurriculares de la UFV que te permiten completar créditos ECTS participando en seminarios, voluntariado, deportes, talleres y más.',
    'faq.who_can_access': '¿Quién puede acceder a la plataforma?',
    'faq.who_can_access_answer': 'Todos los estudiantes de la UFV con email institucional @alumnos.ufv.es. También pueden registrarse invitados sin cuenta usando el acceso público.',
    'faq.how_to_register': '¿Cómo me inscribo en una actividad?',
    'faq.how_to_register_answer': 'Entra al catálogo, selecciona la actividad que te interese y haz clic en "Inscribirse". Recibirás una confirmación inmediata.',
    'faq.cancel_inscription': '¿Puedo cancelar mi inscripción?',
    'faq.cancel_inscription_answer': 'Sí, puedes cancelar tu inscripción hasta 48 horas antes del inicio de la actividad desde la sección "Mis Inscripciones".',
    'faq.how_many_ects': '¿Cuántos ECTS necesito acumular?',
    'faq.how_many_ects_answer': 'El objetivo es acumular 12 ECTS durante el curso académico. Puedes ver tu progreso en la sección "Mi Progreso".',
    'faq.login_issues': 'Tengo problemas para iniciar sesión',
    'faq.login_issues_answer': 'Verifica que tu email es correcto y que contenga el dominio @alumnos.ufv.es. Si persiste, contacta con soporte.',
    
    'status.loading': 'Cargando...',
    'status.no_activities': 'Aún no hay actividades disponibles',
    'status.no_inscriptions': 'Aún no te has inscrito en ninguna actividad',
    
    'index.how_works': '¿Cómo funciona?',
    'index.explore_step': 'Explora',
    'index.explore_desc': 'Navega por un catálogo dinámico de actividades: voluntariado, deportes, seminarios y más. Usa los filtros para encontrar exactamente lo que buscas.',
    'index.register_step': 'Inscríbete',
    'index.register_desc': 'Con un solo clic y usando tu cuenta de la UFV, apúntate a las actividades que te interesen. ¡Olvídate de formularios externos!',
    'index.participate_step': 'Participa y Suma ECTS',
    'index.participate_desc': 'Asiste a las actividades y sigue tu progreso de ECTS en tiempo real desde tu panel personal. Todo lo que necesitas para completar tus créditos, en un mismo lugar.',
    'index.welcome_back': 'Bienvenido de nuevo',
    'index.welcome_text': 'Accede directamente a tus secciones o explora nuevas actividades en el catálogo.',
    'index.admin_panel': 'Panel de Administrador',
    
    'catalog.title': 'Catálogo de Actividades',
    'catalog.search_placeholder': 'Buscar por nombre o palabra clave...',
    'catalog.filter_ects': 'Filtrar por créditos ECTS',
    'catalog.filter_modality': 'Filtrar por modalidad',
    'catalog.filter_available': 'Filtrar por disponibilidad',
    'catalog.clear_filters': 'Limpiar Filtros',
    'catalog.all_ects': 'Todos los ECTS',
    'catalog.all_modalities': 'Todas las modalidades',
    'catalog.any_availability': 'Cualquier disponibilidad',
    'catalog.with_spaces': 'Con plazas disponibles',
    'catalog.no_spaces': 'Sin plazas',
    'catalog.ects_credit': 'crédito',
    'catalog.ects_credits': 'créditos',
    'catalog.modality': 'Modalidad',
    'catalog.start_date': 'Fecha de inicio',
    'catalog.end_date': 'Fecha de fin',
    'catalog.description': 'Descripción',
    'catalog.close': 'Cerrar',
    'catalog.see_more': 'Ver más',
    'catalog.presencial': 'Presencial',
    'catalog.online': 'Online',
    'catalog.hibrido': 'Híbrido',
    
    'auth.sign_in': 'Iniciar Sesión',
    'auth.sign_up': 'Crear Cuenta de Alumno',
    'auth.email': 'Email Institucional',
    'auth.password': 'Contraseña',
    'auth.password_confirm': 'Confirmar Contraseña',
    'auth.name': 'Nombre (opcional)',
    'auth.name_placeholder': 'Tu nombre y apellidos',
    'auth.email_placeholder': 'alumnos@alumnos.ufv.es o admin@ufv.es',
    'auth.password_placeholder': 'Tu contraseña',
    'auth.password_new_placeholder': 'Mínimo 6 caracteres',
    'auth.password_confirm_placeholder': 'Repite la contraseña',
    'auth.no_account': '¿No tienes una cuenta?',
    'auth.create_account': 'Crear cuenta de alumno',
    'auth.have_account': '¿Ya tienes una cuenta?',
    'auth.sign_in_link': 'Volver a iniciar sesión',
    'auth.demo_students': '📚 Alumnos: alumnos@alumnos.ufv.es (contraseña: 123456)',
    'auth.demo_admin': '👨‍💼 Administradores: admin@ufv.es',
    
    'inscriptions.title': 'Mis Inscripciones',
    'inscriptions.no_inscriptions': 'No tienes inscripciones aún',
    'inscriptions.cancel': 'Cancelar',
    'inscriptions.cancel_confirmation': '¿Estás seguro de que deseas cancelar esta inscripción?',
    'inscriptions.ects': 'Créditos ECTS',
    'inscriptions.status': 'Estado',
    'inscriptions.date_start': 'Comienza',
    'inscriptions.date_end': 'Finaliza',
    
    'progress.title': 'Mi Progreso',
    'progress.total_ects': 'Total de ECTS acumulados',
    'progress.percent_complete': 'Has completado el',
    'progress.percent_required': '% de los créditos requeridos.',
    'progress.target_ects': 'Objetivo: 12 ECTS',
    'progress.completed': 'Completadas',
    'progress.pending': 'Pendientes',
    'progress.chart_title': 'Progreso de ECTS',
    'progress.no_activities': 'Aún no tienes créditos verificados por el administrador. Los créditos se asignan después de que se verifique tu asistencia.',
    'progress.error': 'Hubo un error al cargar tu progreso. Inténtalo de nuevo más tarde.',
    'progress.verified_by_admin': 'Verificado por administrador',
    'progress.total_ects_activity': 'ECTS totales de la actividad',
    'progress.verified_on': 'Verificado el',
    'progress.credits_confirmed': 'Créditos Confirmados',
    
    'catalog.no_activities_found': 'No se encontraron actividades con esos filtros.',
    'catalog.register': 'Inscribirse',
    'catalog.complete': 'Completo',
    'catalog.no_available': 'No hay actividades disponibles.',
    
    'public.search_activities': 'Buscar Actividades',
    'public.total_activities': 'Actividades disponibles',
    'public.total_enrolled': 'Invitados inscritos',
    'public.avg_ects': 'Promedio ECTS',
    'public.i_agree': 'Acepto los',
    'public.terms': 'términos de servicio',
    'public.confirm_registration': '✓ Confirmar Inscripción',
    'public.registration_error': 'Error al inscribirse. Intenta de nuevo.',
    'public.registration_success': '✓ ¡Inscripción confirmada! Te enviaremos un email de confirmación.',
    
    'notifications.title': 'Notificaciones',
    'notifications.no_notifications': 'No tienes notificaciones',
    'notifications.mark_read': 'Marcar como leído',
    'notifications.clear_all': 'Limpiar todas',
    'notifications.unread_count': 'Tienes',
    'notifications.unread_items': 'notificación(es) sin leer',
    'notifications.no_notifications_category': 'No hay notificaciones para mostrar en esta categoría.',
    'notifications.mark_unread': 'Marcar como no leído',
    'notifications.mark_as_read': 'Marcar como leído',
    'notifications.delete': 'Eliminar',
    'notifications.all': '📨 Todas',
    'notifications.unread': '🔔 Sin leer',
    'notifications.enrollments': '📝 Inscripciones',
    'notifications.progress': '📊 Progreso',
    'notifications.system': '⚙️ Sistema',
    
    'status.pending': 'Pendiente',
    'status.completed': '✓ Completada',
    'status.full': 'LLENO',
    'status.available': 'DISPONIBLE',
    'status.guest_instruction': 'Para inscribirte en actividades, completa el formulario de invitado.',
    
    'skip_link': 'Saltar al contenido principal',
  },
  en: {
    'nav.home': 'Home',
    'nav.register': 'Sign Up/Login',
    'nav.catalog': 'Catalog',
    'nav.inscriptions': 'My Registrations',
    'nav.progress': 'My Progress',
    'nav.notifications': 'Notifications',
    'nav.admin': 'Admin Panel',
    'nav.logout': 'Logout',
    'nav.help': 'Help',
    'nav.menu': 'Menu',
    
    'index.title': 'Complementary Training Activities',
    'index.subtitle': 'Explore, register and follow your progress in UFV AFCs. Be part of university life and complete your credits in a simple and centralized way.',
    'index.explore': 'Explore Catalog',
    'index.public_catalog': 'Public Catalog (Guests)',
    'index.admin_login': 'Administrator Access',
    
    'page.title.help': 'Help & Support Center',
    'page.title.faqs': 'Frequently Asked Questions',
    'page.title.contact': 'Contact Channels',
    'page.title.resources': 'Useful Resources',
    
    'tab.faqs': 'FAQs',
    'tab.contact': 'Contact',
    'tab.resources': 'Resources',
    'tab.personalizacion': 'Personalization',
    
    'section.contact': 'Contact Channels',
    'section.contact.form': 'Contact Form',
    'section.personalizacion': 'Personalization Settings',
    
    'btn.settings': 'Settings',
    'btn.send': 'Send',
    'btn.new_activity': '+ New Activity',
    'btn.explore': 'Explore Catalog',
    'btn.admin_login': 'Administrator Access',
    'btn.call': 'Call',
    'btn.email': 'Send Email',
    'btn.chat': 'Start Chat',
    
    'form.subject': 'Subject *',
    'form.category': 'Category *',
    'form.message': 'Message *',
    'form.all': 'All',
    'form.general': 'General',
    'form.inscriptions': 'Registrations',
    'form.ects': 'ECTS Credits',
    'form.technical': 'Technical',
    
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.chat': 'Chat',
    'contact.response_24h': 'Response in 24h',
    'contact.hours': 'Monday-Friday 9:00-18:00',
    'contact.soon': 'Coming Soon',
    'contact.email_addr': 'soporte@ufv.es',
    'contact.phone_num': '+34 91 870 90 00',
    
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.light': 'Light ☀️',
    'settings.dark': 'Dark 🌙',
    'settings.system': 'System ⚙️',
    'settings.spanish': 'Español 🇪🇸',
    'settings.english': 'English 🇬🇧',
    
    'faq.what_is_afc': 'What are AFCs?',
    'faq.what_is_afc_answer': 'Complementary Training Activities (AFCs) are extracurricular activities at UFV that allow you to earn ECTS credits by participating in seminars, volunteering, sports, workshops and more.',
    'faq.who_can_access': 'Who can access the platform?',
    'faq.who_can_access_answer': 'All UFV students with institutional email @alumnos.ufv.es. Guests can also register without an account using public access.',
    'faq.how_to_register': 'How do I register for an activity?',
    'faq.how_to_register_answer': 'Enter the catalog, select the activity you are interested in and click "Register". You will receive immediate confirmation.',
    'faq.cancel_inscription': 'Can I cancel my registration?',
    'faq.cancel_inscription_answer': 'Yes, you can cancel your registration up to 48 hours before the activity starts from the "My Registrations" section.',
    'faq.how_many_ects': 'How many ECTS do I need to accumulate?',
    'faq.how_many_ects_answer': 'The goal is to accumulate 12 ECTS during the academic year. You can see your progress in the "My Progress" section.',
    'faq.login_issues': 'I have problems logging in',
    'faq.login_issues_answer': 'Verify that your email is correct and that it contains the @alumnos.ufv.es domain. If it persists, contact support.',
    
    'status.loading': 'Loading...',
    'status.no_activities': 'No activities available yet',
    'status.no_inscriptions': 'You are not yet registered for any activity',
    
    'index.how_works': 'How it Works',
    'index.explore_step': 'Explore',
    'index.explore_desc': 'Browse a dynamic catalog of activities: volunteering, sports, seminars and more. Use filters to find exactly what you need.',
    'index.register_step': 'Register',
    'index.register_desc': 'With a single click and using your UFV account, sign up for the activities you are interested in. Say goodbye to external forms!',
    'index.participate_step': 'Participate and Earn ECTS',
    'index.participate_desc': 'Attend activities and track your ECTS progress in real time from your personal panel. Everything you need to complete your credits in one place.',
    'index.welcome_back': 'Welcome back',
    'index.welcome_text': 'Access your sections directly or explore new activities in the catalog.',
    'index.admin_panel': 'Administrator Panel',
    
    'catalog.title': 'Activity Catalog',
    'catalog.search_placeholder': 'Search by name or keyword...',
    'catalog.filter_ects': 'Filter by ECTS credits',
    'catalog.filter_modality': 'Filter by modality',
    'catalog.filter_available': 'Filter by availability',
    'catalog.clear_filters': 'Clear Filters',
    'catalog.all_ects': 'All ECTS',
    'catalog.all_modalities': 'All modalities',
    'catalog.any_availability': 'Any availability',
    'catalog.with_spaces': 'With available spaces',
    'catalog.no_spaces': 'No spaces',
    'catalog.ects_credit': 'credit',
    'catalog.ects_credits': 'credits',
    'catalog.modality': 'Modality',
    'catalog.start_date': 'Start date',
    'catalog.end_date': 'End date',
    'catalog.description': 'Description',
    'catalog.close': 'Close',
    'catalog.see_more': 'See more',
    'catalog.presencial': 'In-person',
    'catalog.online': 'Online',
    'catalog.hibrido': 'Hybrid',
    
    'auth.sign_in': 'Sign In',
    'auth.sign_up': 'Create Student Account',
    'auth.email': 'Institutional Email',
    'auth.password': 'Password',
    'auth.password_confirm': 'Confirm Password',
    'auth.name': 'Name (optional)',
    'auth.name_placeholder': 'Your name and surname',
    'auth.email_placeholder': 'alumnos@alumnos.ufv.es or admin@ufv.es',
    'auth.password_placeholder': 'Your password',
    'auth.password_new_placeholder': 'Minimum 6 characters',
    'auth.password_confirm_placeholder': 'Repeat the password',
    'auth.no_account': 'Don\'t have an account?',
    'auth.create_account': 'Create student account',
    'auth.have_account': 'Already have an account?',
    'auth.sign_in_link': 'Sign in again',
    'auth.demo_students': '📚 Students: alumnos@alumnos.ufv.es (password: 123456)',
    'auth.demo_admin': '👨‍💼 Administrators: admin@ufv.es',
    
    'inscriptions.title': 'My Registrations',
    'inscriptions.no_inscriptions': 'You have no registrations yet',
    'inscriptions.cancel': 'Cancel',
    'inscriptions.cancel_confirmation': 'Are you sure you want to cancel this registration?',
    'inscriptions.ects': 'ECTS Credits',
    'inscriptions.status': 'Status',
    'inscriptions.date_start': 'Starts',
    'inscriptions.date_end': 'Ends',
    
    'progress.title': 'My Progress',
    'progress.total_ects': 'Total ECTS earned',
    'progress.percent_complete': 'You have completed',
    'progress.percent_required': '% of the required credits.',
    'progress.target_ects': 'Target: 12 ECTS',
    'progress.completed': 'Completed',
    'progress.pending': 'Pending',
    'progress.chart_title': 'ECTS Progress',
    'progress.no_activities': 'You do not have credits verified by the administrator. Credits are assigned after your attendance is verified.',
    'progress.error': 'There was an error loading your progress. Try again later.',
    'progress.verified_by_admin': 'Verified by administrator',
    'progress.total_ects_activity': 'Total ECTS of the activity',
    'progress.verified_on': 'Verified on',
    'progress.credits_confirmed': 'Credits Confirmed',
    'progress.credits_confirmed': 'Credits Confirmed',
    
    'catalog.no_activities_found': 'No activities found with those filters.',
    'catalog.register': 'Register',
    'catalog.complete': 'Full',
    'catalog.no_available': 'No activities available.',
    
    'public.search_activities': 'Search Activities',
    'public.total_activities': 'Activities available',
    'public.total_enrolled': 'Guests enrolled',
    'public.avg_ects': 'Average ECTS',
    'public.i_agree': 'I agree to the',
    'public.terms': 'terms of service',
    'public.confirm_registration': '✓ Confirm Registration',
    'public.registration_error': 'Error registering. Try again.',
    'public.registration_success': '✓ Registration confirmed! We will send you a confirmation email.',
    
    'notifications.title': 'Notifications',
    'notifications.no_notifications': 'You have no notifications',
    'notifications.mark_read': 'Mark as read',
    'notifications.clear_all': 'Clear all',
    'notifications.unread_count': 'You have',
    'notifications.unread_items': 'unread notification(s)',
    
    'status.pending': 'Pending',
    'status.completed': '✓ Completed',
    'status.full': 'FULL',
    'status.available': 'AVAILABLE',
    'status.guest_instruction': 'To register for activities, complete the guest form.',
    
    'skip_link': 'Skip to main content',
  }
};

// Obtener idioma actual
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'es';
}

// Cambiar idioma
function setLanguage(lang) {
  if (translations[lang]) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    translatePageContent();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    return true;
  }
  return false;
}

// Traducir un string
function t(key, defaultValue = key) {
  const lang = getCurrentLanguage();
  return translations[lang]?.[key] || translations['es']?.[key] || defaultValue;
}

// Traducir TODO el contenido de la página (elementos con data-i18n)
function translatePageContent() {
  const lang = getCurrentLanguage();
  if (!lang || !translations[lang]) return;

  // Traducir elementos con data-i18n en textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) {
          el.placeholder = translations[lang][key];
        } else {
          el.value = translations[lang][key];
        }
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // Traducir atributos data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    if (translations[lang][key]) {
      el.title = translations[lang][key];
    }
  });

  // Traducir atributos data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Traducir atributos data-i18n-aria-label
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.dataset.i18nAriaLabel;
    if (translations[lang][key]) {
      el.setAttribute('aria-label', translations[lang][key]);
    }
  });
}

// Inicializar idioma al cargar
function initLanguage() {
  const lang = getCurrentLanguage();
  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
  translatePageContent();
}

// Escuchar cambios de idioma
window.addEventListener('languageChanged', translatePageContent);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}
