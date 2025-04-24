const monedasEl = document.getElementById('monedas');
const corazonesEl = document.getElementById('corazones');
const habilidadesEl = document.getElementById('habilidades');
const misionesEl = document.getElementById('misiones');
const tiendaEl = document.getElementById('tienda-items');
const recompensasEl = document.getElementById('recompensas-list');

let estado = JSON.parse(localStorage.getItem('videojuegoVida')) || {
  monedas: 0,
  corazones: 10,
  habilidades: {
    Lectura: 0,
    Gimnasio: 0,
    Backtesting: 0,
    VidaEspiritual: 0,
    Alimentacion: 0,
    Estudio: 0,
    Social: 0,
    Idioma: 0
  },
  misiones: {}
};

function guardarEstado() {
  localStorage.setItem('videojuegoVida', JSON.stringify(estado));
}

function render() {
  monedasEl.textContent = `🪙 ${estado.monedas}`;
  corazonesEl.textContent = `❤️ ${estado.corazones}`;

  habilidadesEl.innerHTML = '';
  Object.entries(estado.habilidades).forEach(([nombre, nivel]) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${nombre}:</strong> Nivel ${nivel}`;
    const barra = document.createElement('div');
    barra.style.display = 'flex';
    for (let i = 0; i < 10; i++) {
      const cuadrado = document.createElement('div');
      cuadrado.style.width = '20px';
      cuadrado.style.height = '20px';
      cuadrado.style.margin = '2px';
      cuadrado.style.background = i < nivel ? '#4CAF50' : '#ddd';
      barra.appendChild(cuadrado);
    }
    div.appendChild(barra);
    habilidadesEl.appendChild(div);
  });

  const tareas = [
    { nombre: 'Leer 30 min', hab: 'Lectura', xp: 1, monedas: 5 },
    { nombre: 'Gimnasio o correr', hab: 'Gimnasio', xp: 1, monedas: 10 },
    { nombre: 'Backtesting 2h', hab: 'Backtesting', xp: 1, monedas: 10 },
    { nombre: 'Meditar y agradecer', hab: 'VidaEspiritual', xp: 1, monedas: 5 },
    { nombre: 'Comer saludable', hab: 'Alimentacion', xp: 1, monedas: 10 },
    { nombre: 'Estudio 1h', hab: 'Estudio', xp: 1, monedas: 5 },
    { nombre: 'Conversación interesante', hab: 'Social', xp: 1, monedas: 5 },
    { nombre: 'Aprender Idioma', hab: 'Idioma', xp: 1, monedas: 5 },
  ];

  misionesEl.innerHTML = '';
  tareas.forEach((t) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Completar';
    btn.onclick = () => {
      estado.habilidades[t.hab] += t.xp;
      estado.monedas += t.monedas;
      guardarEstado();
      render();
    };
    div.innerHTML = `<strong>${t.nombre}</strong><br/>+${t.xp} XP en ${t.hab} | +${t.monedas} 🪙`;
    div.appendChild(btn);
    misionesEl.appendChild(div);
  });

  const recompensas = [
    { nombre: '1h videojuegos', costo: 100 },
    { nombre: 'Película', costo: 100 },
    { nombre: 'Comida en restaurante', costo: 300 },
    { nombre: 'Nuevo gadget', costo: 500 },
    { nombre: 'Viaje', costo: 1000 },
    { nombre: 'Entrada a concierto', costo: 150 },
    { nombre: 'Masajes', costo: 200 }
  ];

  recompensasEl.innerHTML = '';
  recompensas.forEach((r) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Comprar';
    btn.onclick = () => {
      if (estado.monedas >= r.costo) {
        estado.monedas -= r.costo;
        guardarEstado();
        render();
      }
    };
    div.innerHTML = `<strong>${r.nombre}</strong><br/>Costo: ${r.costo} 🪙`;
    div.appendChild(btn);
    recompensasEl.appendChild(div);
  });

  const tiendaItems = [
    { nombre: 'Poción de vida', costo: 50 },
    { nombre: 'Aumento de habilidad', costo: 200 },
  ];

  tiendaEl.innerHTML = '';
  tiendaItems.forEach((r) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Comprar';
    btn.onclick = () => {
      if (estado.monedas >= r.costo) {
        estado.monedas -= r.costo;
        guardarEstado();
        render();
      }
    };
    div.innerHTML = `<strong>${r.nombre}</strong><br/>Costo: ${r.costo} 🪙`;
    div.appendChild(btn);
    tiendaEl.appendChild(div);
  });
}

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
  document.getElementById(tabId).classList.add('visible');
}

render();
showTab('inicio');
