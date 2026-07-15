import { loadComponent, initTopbarEvents } from '../components/global.js';

const data = [
    { nombre: "IED La Concepción", dane: "108001002341", dir: "Cl. 75 # 65-10", loc: "Riomar", rector: "Dr. Ricardo Silva", psic: "Dra. Elena Mendoza", docentes: 42, alertas: { crit: 5, med: 12 }, status: 'alert' },
    { nombre: "IED Jorge Robledo", dane: "108001005982", dir: "Cra. 21B # 68C-45", loc: "Suroccidente", rector: "Lic. Martha Gómez", psic: "Dra. Ana Milena Rey", docentes: 56, alertas: { crit: 0, med: 4 }, status: 'warning' },
    { nombre: "IED San José", dane: "108001001122", dir: "Cl. 38 # 22-05", loc: "Suroriente", rector: "Ing. Marcos Pineda", psic: "Sin Asignar", docentes: 31, alertas: {}, status: 'safe' }
];

function renderTable() {
    const tbody = document.getElementById('instituciones-body');
    tbody.innerHTML = data.map(i => `
        <tr class="hover:bg-slate-50">
            <td class="py-4 px-6">
                <div class="font-bold">${i.nombre}</div>
                <div class="text-[10px] text-slate-400 uppercase">DANE: ${i.dane}</div>
                <div class="text-[10px] text-slate-400">${i.dir}</div>
            </td>
            <td class="py-4 px-6">${i.loc}</td>
            <td class="py-4 px-6">
                <div class="text-[11px] text-slate-500">Rector: <span class="text-slate-800 font-medium">${i.rector}</span></div>
                <div class="text-[11px] text-slate-500">Psicóloga: <span class="${i.psic === 'Sin Asignar' ? 'text-rose-500 font-bold' : 'text-slate-800 font-medium'}">${i.psic}</span></div>
            </td>
            <td class="py-4 px-6 font-semibold">${i.docentes} <span class="text-slate-400 font-normal">Profesores</span></td>
            <td class="py-4 px-6">
                ${i.status === 'alert' ? `
                    <div class="space-y-1">
                        <span class="block w-20 text-center text-[10px] font-bold bg-rose-50 text-rose-600 rounded py-0.5">${i.alertas.crit} Críticas</span>
                        <span class="block w-20 text-center text-[10px] font-bold bg-amber-50 text-amber-600 rounded py-0.5">${i.alertas.med} Medias</span>
                    </div>` : 
                    i.status === 'warning' ? `
                    <div class="space-y-1">
                        <span class="block w-20 text-center text-[10px] font-bold bg-slate-100 text-slate-400 rounded py-0.5">0 Críticas</span>
                        <span class="block w-20 text-center text-[10px] font-bold bg-amber-50 text-amber-600 rounded py-0.5">${i.alertas.med} Medias</span>
                    </div>` :
                    `<span class="w-16 block text-center text-[10px] font-bold bg-emerald-50 text-emerald-600 rounded py-0.5">Estable</span>`
                }
            </td>
            <td class="py-4 px-6">
                <div class="flex justify-center gap-2">
                    <button class="w-8 h-8 rounded-lg border hover:bg-slate-50 text-slate-400"><i class="fa-solid fa-pen text-[10px]"></i></button>
                    <button class="w-8 h-8 rounded-lg border hover:bg-slate-50 ${i.psic === 'Sin Asignar' ? 'text-rose-400' : 'text-slate-400'}"><i class="fa-solid fa-user-group text-[10px]"></i></button>
                    <button class="w-8 h-8 rounded-lg border hover:bg-slate-50 text-slate-400"><i class="fa-solid fa-eye text-[10px]"></i></button>
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
            const institucionesMenu = sidebar.querySelector('[data-page="instituciones"]');
            if (institucionesMenu) {
                institucionesMenu.classList.add('active', 'bg-amber-500', 'text-white', 'font-bold');
                institucionesMenu.classList.remove('text-slate-500', 'font-medium');
            }
        }
    }, 100); // Pequeño retraso para asegurar que el sidebar se haya cargado


    initTopbarEvents();
    renderTable();
});