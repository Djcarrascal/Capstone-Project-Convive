// Carga e inyecta componentes dinámicos en la UI
export async function loadComponent(elementId, filepath) {
    try {
        const response = await fetch(filepath);
        if (!response.ok) throw new Error(`Error al cargar el componente: ${filepath}`);
        const html = await response.text();
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error de componente [${elementId}]:`, error);
    }
}

// Inicializa eventos interactivos del Topbar y el menú responsive
export function initTopbarEvents() {
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileArrow = document.getElementById('profile-arrow');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const logoutBtn = document.getElementById('logout-btn');

    // Elementos del menú responsive
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.querySelector('#sidebar-target > div'); // Selecciona el contenedor de sidebar.html
    const overlay = document.getElementById('sidebar-overlay');

    // Abrir/Cerrar Sidebar en móvil
    if (hamburgerBtn && sidebar && overlay) {
        const toggleSidebar = () => {
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
        };

        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });

        // Cerrar al pulsar cualquier opción del menú en móviles
        const sidebarItems = sidebar.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    sidebar.classList.add('-translate-x-full');
                    overlay.classList.add('hidden');
                }
            });
        });
    }

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
            if (profileArrow) profileArrow.classList.toggle('rotate-180');
            if (notificationDropdown) notificationDropdown.classList.add('hidden');
        });
    }

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('hidden');
            if (profileDropdown) profileDropdown.classList.add('hidden');
            if (profileArrow) profileArrow.classList.remove('rotate-180');
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            alert("Sesión cerrada correctamente. Redirigiendo...");
        });
    }

    // Cerrar menús desplegables al hacer clic en cualquier otra parte
    document.addEventListener('click', () => {
        if (profileDropdown) profileDropdown.classList.add('hidden');
        if (profileArrow) profileArrow.classList.remove('rotate-180');
        if (notificationDropdown) notificationDropdown.classList.add('hidden');
    });
}