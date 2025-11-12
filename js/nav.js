// Lógica para mostrar/ocultar elementos según el estado de autenticación

function applyAuthVisibility() {
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin_user');
    
    let authState;
    if (admin) {
        authState = 'admin';
    } else if (user) {
        authState = 'user';
    } else {
        authState = 'guest';
    }

    const allElements = document.querySelectorAll('[data-auth]');

    allElements.forEach(el => {
        const visibility = el.dataset.auth;
        let show = false;

        switch (visibility) {
            case 'guest-only':
                show = (authState === 'guest');
                break;
            case 'user-only':
                show = (authState === 'user');
                break;
            case 'admin-only':
                show = (authState === 'admin');
                break;
            case 'guest-or-user':
                show = (authState === 'guest' || authState === 'user');
                break;
            case 'all':
                show = true;
                break;
        }

        el.style.display = show ? '' : 'none';
    });

    // Lógica para el botón de logout
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        const logoutLi = document.getElementById('logout-li');
        if (authState === 'user' || authState === 'admin') {
            logoutLi.style.display = '';
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user');
                localStorage.removeItem('admin_user');
                window.location.href = 'index.html';
            });
        } else {
            logoutLi.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', applyAuthVisibility);
