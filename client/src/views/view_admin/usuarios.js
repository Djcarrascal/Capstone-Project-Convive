import { loadComponent, initTopbarEvents } from '../components/global.js';

// Base de datos de prueba para replicar exactamente los datos de tu captura de pantalla
const usuariosBase = [
    {
        nombre: "Dra. Elena Mendoza",
        email: "elena.mendoza@convive.edu.co",
        identificacion: "CC 1.045.321.456",
        rol: "Psicóloga",
        institucion: "IED La Concepción",
        asignacion: "Especialista de Zona",
        activo: true
    },
    {
        nombre: "Prof. Carlos Torres",
        email: "carlos.torres@convive.edu.co",
        identificacion: "CC 72.345.123",
        rol: "Profesor",
        institucion: "IED Jorge Robledo",
        asignacion: "Asignado: 3° Grado A",
        activo: true
    },
    {
        nombre: "María Camila Gómez",
        email: "camila.gomez@mail.com",
        identificacion: "CC 32.765.432",
        rol: "Padre de Familia",
        institucion: "IED San José",
        asignacion: "Acudiente de: Juan Pérez",
        activo: true
    },
    {
        nombre: "Dr. Ricardo Silva",
        email: "ricardo.silva@convive.edu.co",
        identificacion: "CC 8.543.211",
        rol: "Rector / Admin",
        institucion: "IED La Concepción",
        asignacion: "Sede Principal",
        activo: false
    }
];

// Función para pintar la tabla y actualizar los KPIs superiores
function renderTable(usuarios) {
    const tableBody = document.getElementById('usuarios-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (usuarios.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="py-8 text-center text-slate-400">
                    No se encontraron usuarios que coincidan con la búsqueda.
                </td>
            </tr>
        `;
        return;
    }

    usuarios.forEach(user => {
        // Estilos dinámicos para los badges según el Rol
        let badgeColor = "bg-slate-100 text-slate-600";
        if (user.rol === "Psicóloga") badgeColor = "bg-purple-50 text-purple-600";
        else if (user.rol === "Profesor") badgeColor = "bg-orange-50 text-orange-600";
        else if (user.rol === "Padre de Familia") badgeColor = "bg-emerald-50 text-emerald-600";
        else if (user.rol === "Rector / Admin") badgeColor = "bg-sky-50 text-sky-600";

        // Estilos condicionales para la asignación escolar
        let asignacionStyle = "text-slate-400";
        if (user.rol === "Profesor") asignacionStyle = "text-amber-500 font-medium";
        else if (user.rol === "Padre de Familia") asignacionStyle = "text-emerald-500 font-medium";

        // Renderizado del HTML de la fila de tabla
        const row = document.createElement('tr');
        row.className = "hover:bg-slate-50/50 transition-colors";
        row.innerHTML = `
            <td class="py-4 px-6">
                <div class="font-bold text-slate-800">${user.nombre}</div>
                <div class="text-xs text-slate-400 mt-0.5">${user.email}</div>
            </td>
            <td class="py-4 px-6 text-slate-500 font-medium">${user.identificacion}</td>
            <td class="py-4 px-6">
                <span class="px-2.5 py-1 text-xs font-bold rounded-full ${badgeColor}">${user.rol}</span>
            </td>
            <td class="py-4 px-6">
                <div class="font-semibold text-slate-700">${user.institucion}</div>
                <div class="text-xs ${asignacionStyle} mt-0.5">${user.asignacion}</div>
            </td>
            <td class="py-4 px-6">
                <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full ${user.activo ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
                    <span class="text-xs font-bold ${user.activo ? 'text-slate-700' : 'text-slate-400'}">
                        ${user.activo ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            </td>
            <td class="py-4 px-6">
                <div class="flex items-center justify-center gap-2">
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors" title="Editar">
                        <i class="fa-solid fa-pen text-xs"></i>
                    </button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors" title="Ver credenciales">
                        <i class="fa-solid fa-key text-xs"></i>
                    </button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors" title="Desvincular">
                        <i class="fa-solid fa-user-slash text-xs"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para actualizar dinámicamente los KPIs de la parte superior
function updateKPIs(usuarios) {
    const psicologas = usuarios.filter(u => u.rol === "Psicóloga").length;
    const profesores = usuarios.filter(u => u.rol === "Profesor").length;
    const padres = usuarios.filter(u => u.rol === "Padre de Familia").length;
    const total = usuarios.length;

    document.getElementById('kpi-psicologas').innerText = psicologas;
    document.getElementById('kpi-profesores').innerText = profesores;
    document.getElementById('kpi-padres').innerText = padres;
    document.getElementById('kpi-total').innerText = total;
}

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Cargar dinámicamente componentes comunes e inicializar sus listeners
    await loadComponent('sidebar-target', '../components/sidebar.html');
    await loadComponent('topbar-target', '../components/topbar.html');
    
    // Cambiar la clase activa del sidebar al elemento "Usuarios" en lugar de "Inicio"
    setTimeout(() => {
        const sidebar = document.getElementById('sidebar-target');
        if (sidebar) {
            const activeItem = sidebar.querySelector('.sidebar-item.active');
            if (activeItem) {
                activeItem.classList.remove('active', 'bg-amber-500', 'text-white', 'font-bold');
                activeItem.classList.add('text-slate-500', 'font-medium');
            }
            const usuariosMenu = sidebar.querySelector('[data-page="usuarios"]');
            if (usuariosMenu) {
                usuariosMenu.classList.add('active', 'bg-amber-500', 'text-white', 'font-bold');
                usuariosMenu.classList.remove('text-slate-500', 'font-medium');
            }
        }
    }, 100);

    initTopbarEvents();

    // 2. Cargar los datos iniciales en la tabla y los KPIs
    renderTable(usuariosBase);
    updateKPIs(usuariosBase);

    // 3. Controladores para la lógica de búsqueda y filtrado en tiempo real
    const searchInput = document.getElementById('search-input');
    const filterRol = document.getElementById('filter-rol');
    const filterColegio = document.getElementById('filter-colegio');
    const btnCrear = document.getElementById('btn-crear-usuario');

    const handleFilter = () => {
        const query = searchInput.value.toLowerCase();
        const rolValue = filterRol.value;
        const colegioValue = filterColegio.value;

        const filtrados = usuariosBase.filter(user => {
            const matchesSearch = user.nombre.toLowerCase().includes(query) || 
                                  user.email.toLowerCase().includes(query) || 
                                  user.identificacion.toLowerCase().includes(query);
            
            const matchesRol = rolValue === "" || user.rol === rolValue;
            const matchesColegio = colegioValue === "" || user.institucion === colegioValue;

            return matchesSearch && matchesRol && matchesColegio;
        });

        renderTable(filtrados);
    };

    searchInput.addEventListener('input', handleFilter);
    filterRol.addEventListener('change', handleFilter);
    filterColegio.addEventListener('change', handleFilter);

    // Acción para el botón de crear usuario (Placeholder de interacción)
    if (btnCrear) {
        btnCrear.addEventListener('click', () => {
            alert("Apertura de modal para registro de nuevo usuario.");
        });
    }
});