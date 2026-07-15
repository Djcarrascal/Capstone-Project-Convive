import { loadComponent, initTopbarEvents } from '../components/global.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Cargar componentes usando la ruta relativa correcta para tu estructura de carpetas
    await loadComponent('sidebar-target', '../components/sidebar.html');
    await loadComponent('topbar-target', '../components/topbar.html');

    // 2. Inicializar eventos interactivos (Menús desplegables, cerrar sesión)
    initTopbarEvents();

    // 3. Renderizar Gráfico de Línea - Alertas por Mes
    const lineCtx = document.getElementById('chartAlertasMes').getContext('2d');
    const orangeGradient = lineCtx.createLinearGradient(0, 0, 0, 250);
    orangeGradient.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
    orangeGradient.addColorStop(1, 'rgba(245, 158, 11, 0)');

    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Alertas',
                data: [65, 78, 122, 142, 95, 320],
                borderColor: '#F59E0B',
                borderWidth: 3,
                pointBackgroundColor: '#F59E0B',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 5,
                tension: 0.45,
                fill: true,
                backgroundColor: orangeGradient,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { min: 50, max: 350 }
            }
        }
    });

    // 4. Renderizar Gráfico de Dona - Alertas por Nivel
    const donutCtx = document.getElementById('chartAlertasNivel').getContext('2d');
    new Chart(donutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Bajo', 'Medio', 'Alto'],
            datasets: [{
                data: [45, 38, 17],
                backgroundColor: ['#22C55E', '#EAB308', '#EF4444'],
                borderWidth: 2,
                borderColor: '#FFFFFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: { legend: { display: false } }
        }
    });
});