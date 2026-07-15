import { loadComponent, initTopbarEvents } from '../components/global.js';

const alertasData = [
    { id: "#1256", ied: "IED La Concepción", sede: "Sede Principal - Riomar", tipo: "Riesgo Psicosocial / Ansiedad", riesgo: "Alto / Crítico", fecha: "Hace 15 min", estado: "Pendiente", color: "rose" },
    { id: "#1255", ied: "IED Jorge Robledo", sede: "Suroccidente", tipo: "Acoso Escolar (Bullying)", riesgo: "Medio", fecha: "Hace 1 hora", estado: "En Proceso", color: "sky" },
    { id: "#1254", ied: "IED San José", sede: "Suroriente", tipo: "Deserción / Ausentismo", riesgo: "Bajo", fecha: "Hace 3 horas", estado: "Resuelto", color: "emerald" }
];

function renderAlertas() {
    const tbody = document.getElementById('alertas-body');
    tbody.innerHTML = alertasData.map(a => `
        <tr class="hover:bg-slate-50">
            <td class="py-4 px-6 font-bold text-slate-800">${a.id}</td>
            <td class="py-4 px-6">
                <div class="font-bold">${a.ied}</div>
                <div class="text-[10px] text-slate-400">${a.sede}</div>
            </td>
            <td class="py-4 px-6 text-slate-600">${a.tipo}</td>
            <td class="py-4 px-6">
                <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-600">${a.riesgo}</span>
            </td>
            <td class="py-4 px-6 text-slate-500">${a.fecha}</td>
            <td class="py-4 px-6">
                <span class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-${a.color}-50 text-${a.color}-600">${a.estado}</span>
            </td>
            <td class="py-4 px-6">
                <div class="flex justify-center gap-2">
                    <button class="w-8 h-8 rounded-lg border hover:bg-slate-50 text-slate-400"><i class="fa-solid fa-folder-open text-[10px]"></i></button>
                    <button class="w-8 h-8 rounded-lg border hover:bg-slate-50 text-slate-400"><i class="fa-solid fa-share-nodes text-[10px]"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('sidebar-target', '../components/sidebar.html');
    await loadComponent('topbar-target', '../components/topbar.html');
    setTimeout(() => {
        const sidebar = document.getElementById('sidebar-target');
        if (sidebar) {
            const activeItem = sidebar.querySelector('.sidebar-item.active');
            if (activeItem) {
                activeItem.classList.remove('active', 'bg-amber-500', 'text-white', 'font-bold');
                activeItem.classList.add('text-slate-500', 'font-medium');
            }
            const alertasMenu = sidebar.querySelector('[data-page="alertas"]');
            if (alertasMenu) {
                alertasMenu.classList.add('active', 'bg-amber-500', 'text-white', 'font-bold');
                alertasMenu.classList.remove('text-slate-500', 'font-medium');
            }
        }
    }, 100); // Pequeño retraso para asegurar que el sidebar se haya cargado

    initTopbarEvents();
    renderAlertas();
});