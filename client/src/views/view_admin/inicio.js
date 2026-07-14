// --- 1. MODELO DE DATOS CENTRAL (Tu Base de Datos en Memoria) ---
let servidorSimulado = {
    resumen: {
        estudiantes: { total: 28560, incremento: 12, sube: true },
        alertasActivas: { total: 320, incremento: 8, sube: true },
        alertasCriticas: { total: 45, incremento: 5, sube: false },
        instituciones: { total: 120, incremento: 3, sube: true }
    },
    alertasMesLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    alertasMesData: [65, 80, 120, 142, 95, 320],
    alertasPorNivel: [45, 38, 17], // [Bajo, Medio, Alto]
    localidades: [
        { nombre: "Riomar", total: 120, porcentaje: 75 },
        { nombre: "Norte-Centro Histórico", total: 95, porcentaje: 60 },
        { font: "Suroccidente", nombre: "Suroccidente", total: 65, porcentaje: 40 }
    ],
    alertasRecientes: [
        { id: "1256", colegio: "IED La Concepción", nivel: "ALTO", color: "bg-red-100 text-red-600", tiempo: "Hace 15 min" },
        { id: "1255", colegio: "IED Simón Bolívar", nivel: "MEDIO", color: "bg-amber-100 text-amber-600", tiempo: "Hace 1 hora" },
        { id: "1254", colegio: "IED Las Flores", nivel: "BAJO", color: "bg-emerald-100 text-emerald-600", tiempo: "Hace 2 horas" }
    ]
};

// Instancias globales de gráficos para permitir recargas fluidas
let miGraficoLinea;
let miGraficoDona;

// --- 2. FUNCIÓN DE RENDERIZADO DE LA INTERFAZ ---
function actualizarInterfaz() {
    const formatNum = (val) => new Intl.NumberFormat('de-DE').format(val);

    // Actualizar Números de las Tarjetas
    document.getElementById('val-estudiantes').innerText = formatNum(servidorSimulado.resumen.estudiantes.total);
    document.getElementById('val-alertas').innerText = formatNum(servidorSimulado.resumen.alertasActivas.total);
    document.getElementById('val-criticas').innerText = formatNum(servidorSimulado.resumen.alertasCriticas.total);
    document.getElementById('val-instituciones').innerText = formatNum(servidorSimulado.resumen.instituciones.total);

    // Actualizar Flechas y Colores de Tendencia
    pintarTendencia('trend-estudiantes', servidorSimulado.resumen.estudiantes);
    pintarTendencia('trend-alertas', servidorSimulado.resumen.alertasActivas);
    pintarTendencia('trend-criticas', servidorSimulado.resumen.alertasCriticas);
    pintarTendencia('trend-instituciones', servidorSimulado.resumen.instituciones);

    // Actualizar Localidades
    const containerLocalidades = document.getElementById('contenedor-localidades');
    containerLocalidades.innerHTML = '';
    servidorSimulado.localidades.forEach(loc => {
        containerLocalidades.innerHTML += `
            <div>
                <div class="flex justify-between text-sm font-semibold mb-1">
                    <span class="text-gray-800">${loc.nombre}</span>
                    <span class="text-gray-500">${loc.total}</span>
                </div>
                <div class="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div class="bg-primary h-full rounded-full transition-all duration-500" style="width: ${loc.porcentaje}%"></div>
                </div>
            </div>
        `;
    });

    // Actualizar Alertas Recientes
    const containerRecientes = document.getElementById('contenedor-recientes');
    containerRecientes.innerHTML = '';
    servidorSimulado.alertasRecientes.forEach(alert => {
        containerRecientes.innerHTML += `
            <div class="p-3 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div>
                    <p class="text-xs font-bold text-gray-800">Caso #${alert.id}</p>
                    <p class="text-[11px] text-gray-500">${alert.colegio}</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="px-2 py-0.5 ${alert.color} text-[10px] font-bold rounded-md">${alert.nivel}</span>
                    <span class="text-[10px] text-gray-400">${alert.tiempo}</span>
                </div>
            </div>
        `;
    });

    // RE-RENDERS DE GRÁFICOS FUNCIONALES (Chart.js API)
    if (miGraficoLinea && miGraficoDona) {
        miGraficoLinea.data.datasets[0].data = servidorSimulado.alertasMesData;
        miGraficoLinea.update();

        miGraficoDona.data.datasets[0].data = servidorSimulado.alertasPorNivel;
        miGraficoDona.update();
    }
}

// Helper para tendencias de las tarjetas
function pintarTendencia(idElemento, metrica) {
    const wrapper = document.getElementById(idElemento);
    if (metrica.sube) {
        wrapper.className = "text-xs font-semibold text-emerald-500 flex items-center gap-1";
        wrapper.innerHTML = `<i class="fa-solid fa-arrow-up"></i> +${metrica.incremento}% este mes`;
    } else {
        wrapper.className = "text-xs font-semibold text-red-500 flex items-center gap-1";
        wrapper.innerHTML = `<i class="fa-solid fa-arrow-down"></i> -${metrica.incremento}% este mes`;
    }
}

// --- 3. INICIALIZADOR DE GRÁFICOS ---
function inicializarGraficos() {
    // Gráfico 1: Alertas por Mes (LÍNEAS)
    const ctxLineas = document.getElementById('canvasLineas').getContext('2d');
    miGraficoLinea = new Chart(ctxLineas, {
        type: 'line',
        data: {
            labels: servidorSimulado.alertasMesLabels,
            datasets: [{
                label: 'Alertas',
                data: servidorSimulado.alertasMesData,
                borderColor: '#f79c1d',
                backgroundColor: 'rgba(247, 156, 29, 0.05)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#f79c1d',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    min: 0,
                    ticks: { color: '#9ca3af', font: { size: 11 } },
                    grid: { color: '#f3f4f6' }
                },
                x: {
                    ticks: { color: '#9ca3af', font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });

    // Gráfico 2: Alertas por Nivel (DONA)
    const ctxDona = document.getElementById('canvasDona').getContext('2d');
    miGraficoDona = new Chart(ctxDona, {
        type: 'doughnut',
        data: {
            labels: ['Bajo', 'Medio', 'Alto'],
            datasets: [{
                data: servidorSimulado.alertasPorNivel,
                backgroundColor: ['#10b981', '#fbbf24', '#ef4444'],
                borderWidth: 3,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: { legend: { display: false } }
        }
    });
}

// --- 4. CARGA DINÁMICA DE LA PLANTILLA (INICIO) ---
document.addEventListener('DOMContentLoaded', () => {
    // Simulamos un fetch() de la vista fragmentada para incrustarla en el Layout principal
    fetch('inicio.html')
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar inicio.html");
            return response.text();
        })
        .then(html => {
            document.getElementById('contenido-dinamico').innerHTML = html;
            // Una vez cargado el HTML de inicio en el DOM, inicializamos y pintamos
            inicializarGraficos();
            actualizarInterfaz();
        })
        .catch(err => {
            console.error("Error cargando el componente de inicio:", err);
            // Mensaje de fallback por si corren el archivo localmente sin un servidor local (politicas de CORS)
            document.getElementById('contenido-dinamico').innerHTML = `
                <div class="p-6 bg-red-50 border border-red-200 text-red-800 rounded-xl">
                    <h3 class="font-bold mb-2">Aviso del Sistema:</h3>
                    <p class="text-sm">Para realizar solicitudes de carga de archivos locales como 'inicio.html' con JavaScript modular, por favor abre tu proyecto en VS Code utilizando la extensión <strong>Live Server</strong> o un servidor local equivalente (debido a las políticas de seguridad CORS de los navegadores).</p>
                </div>
            `;
        });
});

// --- 5. PANEL DE SIMULACIÓN ---
function simularActualizacion() {
    const estVal = parseInt(document.getElementById('input-estudiantes').value) || 0;
    const actVal = parseInt(document.getElementById('input-activas').value) || 0;
    const critVal = parseInt(document.getElementById('input-criticas').value) || 0;
    const junVal = parseInt(document.getElementById('input-junio').value) || 0;

    servidorSimulado.resumen.estudiantes.total = estVal;
    servidorSimulado.resumen.alertasActivas.total = actVal;
    servidorSimulado.resumen.alertasCriticas.total = critVal;
    servidorSimulado.alertasMesData[5] = junVal;

    servidorSimulado.alertasPorNivel[2] = critVal; // Críticas (Alto)
    servidorSimulado.alertasPorNivel[1] = Math.round(actVal * 0.4); // 40% Medio
    servidorSimulado.alertasPorNivel[0] = Math.max(1, actVal - critVal - servidorSimulado.alertasPorNivel[1]); // Resto Bajo

    actualizarInterfaz();
}

// --- 6. MENÚ DESPLEGABLE DE PERFIL Y CAMBIO DE ROL ---
const dropdownBtn = document.getElementById('profileDropdownBtn');
const dropdownMenu = document.getElementById('profileDropdownMenu');
const dropdownArrow = document.getElementById('dropdownArrow');

dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const esOculto = dropdownMenu.classList.contains('hidden');
    if (esOculto) {
        dropdownMenu.classList.remove('hidden');
        dropdownArrow.classList.add('rotate-180');
    } else {
        dropdownMenu.classList.add('hidden');
        dropdownArrow.classList.remove('rotate-180');
    }
});

document.addEventListener('click', () => {
    dropdownMenu.classList.add('hidden');
    dropdownArrow.classList.remove('rotate-180');
});

function cambiarRol(rol) {
    const saludo = document.getElementById('topbar-saludo');
    const badge = document.getElementById('topbar-rol-badge');
    const avatar = document.getElementById('avatar-letras');
    const dropdownNombre = document.getElementById('nombre-usuario-dropdown');
    const dropdownNombreCompleto = document.getElementById('dropdown-nombre-completo');
    const dropdownCorreo = document.getElementById('dropdown-correo');

    if (rol === 'administrador') {
        saludo.innerText = "Bienvenido, Administrador";
        badge.className = "text-xs font-semibold text-primary mt-0.5";
        badge.innerHTML = `<i class="fa-solid fa-shield-halved mr-1"></i>Rol: Administrador General`;
        avatar.className = "w-9 h-9 bg-amber-100 text-primary font-semibold rounded-lg flex items-center justify-center border border-amber-200 text-sm";
        avatar.innerText = "AD";
        dropdownNombre.innerText = "Administrador";
        dropdownNombreCompleto.innerText = "Admin Central";
        dropdownCorreo.innerText = "admin@barranquillaconvive.gov.co";
    } else if (rol === 'psicologa') {
        saludo.innerText = "Buenos días, Dra. Laura";
        badge.className = "text-xs font-semibold text-sky-600 mt-0.5";
        badge.innerHTML = `<i class="fa-solid fa-user-doctor mr-1"></i>Rol: Psicóloga Especialista`;
        avatar.className = "w-9 h-9 bg-sky-100 text-sky-700 font-semibold rounded-lg flex items-center justify-center border border-sky-200 text-sm";
        avatar.innerText = "LM";
        dropdownNombre.innerText = "Dra. Laura";
        dropdownNombreCompleto.innerText = "Laura Mendoza";
        dropdownCorreo.innerText = "l.mendoza@barranquillaconvive.gov.co";
    } else if (rol === 'profesor') {
        saludo.innerText = "Bienvenido, Prof. Carlos";
        badge.className = "text-xs font-semibold text-emerald-600 mt-0.5";
        badge.innerHTML = `<i class="fa-solid fa-chalkboard-user mr-1"></i>Rol: Docente Orientador`;
        avatar.className = "w-9 h-9 bg-emerald-100 text-emerald-700 font-semibold rounded-lg flex items-center justify-center border border-emerald-200 text-sm";
        avatar.innerText = "CP";
        dropdownNombre.innerText = "Prof. Carlos";
        dropdownNombreCompleto.innerText = "Carlos Pérez";
        dropdownCorreo.innerText = "c.perez@iedsimonbolivar.edu.co";
    } else if (rol === 'padre') {
        saludo.innerText = "Hola, Sra. María";
        badge.className = "text-xs font-semibold text-purple-600 mt-0.5";
        badge.innerHTML = `<i class="fa-solid fa-children mr-1"></i>Rol: Padre de Familia`;
        avatar.className = "w-9 h-9 bg-purple-100 text-purple-700 font-semibold rounded-lg flex items-center justify-center border border-purple-200 text-sm";
        avatar.innerText = "MG";
        dropdownNombre.innerText = "Sra. María";
        dropdownNombreCompleto.innerText = "María Gómez";
        dropdownCorreo.innerText = "maria.gomez@correo.com";
    }
    dropdownMenu.classList.add('hidden');
    dropdownArrow.classList.remove('rotate-180');
}

function cerrarSesion() {
    const confirmacion = confirm("¿Estás seguro de que deseas cerrar la sesión actual?");
    if (confirmacion) {
        alert("Cerrando sesión...");
        window.location.reload();
    }
}