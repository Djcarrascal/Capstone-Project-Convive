import { loadComponent } from './views/components/global.js';

const routes = {
    'inicio': 'views/view_admin/inicio.html',
    'usuarios': 'views/view_admin/usuarios.html',
    // Aquí agregarás: 'instituciones': 'views/view_admin/instituciones.html', etc.
};

export async function navigateTo(page) {
    const appView = document.getElementById('app-view');
    const route = routes[page];

    if (route) {
        try {
            const response = await fetch(route);
            const html = await response.text();
            appView.innerHTML = html;
            
            // Aquí llamaríamos a la función de inicialización de cada vista si fuera necesario
            // Por ejemplo: if(page === 'usuarios') initUsuarios();
        } catch (error) {
            console.error("Error al cargar la ruta:", error);
        }
    }
}