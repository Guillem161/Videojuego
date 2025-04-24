
const habilidades = [
    { nombre: "Lectura", nivel: 1, xp: 0 },
    { nombre: "Gimnasio", nivel: 1, xp: 0 },
    { nombre: "Backtesting", nivel: 1, xp: 0 },
    { nombre: "Vida Espiritual", nivel: 1, xp: 0 },
    { nombre: "Alimentación", nivel: 1, xp: 0 },
    { nombre: "Estudio", nivel: 1, xp: 0 },
    { nombre: "Social", nivel: 1, xp: 0 },
    { nombre: "Idioma", nivel: 1, xp: 0 }
];

const misiones = [
    { nombre: "Leer 30 minutos", xp: 10 },
    { nombre: "Ir al gimnasio o correr", xp: 15 },
    { nombre: "2 horas de backtesting", xp: 15 },
    { nombre: "Meditar y agradecer", xp: 10 },
    { nombre: "Comer saludablemente", xp: 15 },
    { nombre: "Aprender algo nuevo", xp: 10 },
    { nombre: "Conversación interesante", xp: 10 },
    { nombre: "Practicar idiomas", xp: 10 }
];

const tienda = [
    { nombre: "1 hora de videojuegos", costo: 100 },
    { nombre: "Ver una película", costo: 100 },
    { nombre: "Snack no saludable", costo: 100 }
];

let monedas = 0;
let corazones = 10;

function showTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
}

function renderHabilidades() {
    const contenedor = document.getElementById('habilidades');
    contenedor.innerHTML = '';
    habilidades.forEach(h => {
        const div = document.createElement('div');
        div.className = 'skill';
        div.textContent = `${h.nombre}: Nivel ${h.nivel} (${h.xp}/100 XP)`;
        contenedor.appendChild(div);
    });
}

function renderMisiones() {
    const contenedor = document.getElementById('misiones-container');
    contenedor.innerHTML = '';
    misiones.forEach((m, index) => {
        const div = document.createElement('div');
        div.className = 'mission';
        div.innerHTML = `<strong>${m.nombre}</strong><br>+${m.xp} XP <br><button class="complete-btn" onclick="completarMision(${index})">Completar</button>`;
        contenedor.appendChild(div);
    });
}

function completarMision(index) {
    const mision = misiones[index];
    monedas += 5;
    habilidades[index % habilidades.length].xp += mision.xp;
    if (habilidades[index % habilidades.length].xp >= 100) {
        habilidades[index % habilidades.length].nivel += 1;
        habilidades[index % habilidades.length].xp = 0;
    }
    updateStats();
    renderHabilidades();
}

function renderTienda() {
    const contenedor = document.getElementById('tienda-container');
    contenedor.innerHTML = '';
    tienda.forEach((r) => {
        const div = document.createElement('div');
        div.className = 'reward';
        div.innerHTML = `<strong>${r.nombre}</strong><br>${r.costo} 🪙 <br><button class="complete-btn" onclick="comprar('${r.nombre}', ${r.costo})">Canjear</button>`;
        contenedor.appendChild(div);
    });
}

function comprar(nombre, costo) {
    if (monedas >= costo) {
        monedas -= costo;
        alert(`Has canjeado: ${nombre}`);
        updateStats();
    } else {
        alert("No tienes suficientes monedas.");
    }
}

function updateStats() {
    document.getElementById('coins').textContent = `🪙 x${monedas}`;
    document.getElementById('hearts').textContent = `❤️ x${corazones}`;
}

renderHabilidades();
renderMisiones();
renderTienda();
