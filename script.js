const monedasEl = document.getElementById('monedas');
const corazonesEl = document.getElementById('corazones');
const habilidadesEl = document.getElementById('habilidades');
const misionesEl = document.getElementById('misiones');
const tiendaEl = document.getElementById('tienda-items');
const huchaEl = document.getElementById('hucha');

let estado = JSON.parse(localStorage.getItem('videojuegoVida')) || {
  monedas: 0,
  corazones: 10,
  hucha: 0, // Dinero real
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
  huchaEl.textContent = `💵 ${estado.hucha.toFixed(2)} €`;

  habilidadesEl.innerHTML = '';
  Object.entries(estado.habilidades).forEach(([nombre, nivel]) => {
    const div = document.createElement('div');
    div.textContent = `${nombre}: Nivel ${nivel}`;
    habilidadesEl.appendChild(div);

    // Visualización de la barra de nivel
    const barra = document.createElement('div');
    barra.style.display = 'flex';
    for (let i = 0; i < 10; i++) {
      const cuadrado = document.createElement('div');
      cuadrado.style.width = '20px';
      cuadrado.style.height = '20px';
      cuadrado.style.marginRight = '5px';
      cuadrado.style.backgroundColor = i < nivel ? 'green' : 'gray';
      barra.appendChild(cuadrado);
    }
    habilidadesEl.appendChild(barra);
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
    { nombre: '1 hora de videojuegos', costo: 100, descripcion: 'Disfruta de tu juego favorito.' },
    { nombre: 'Ver una película', costo: 100, descripcion: 'Relájate viendo una película o serie.' },
    { nombre: 'Día libre de tareas', costo: 150, descripcion: 'Un día sin tareas para relajarte.' },
    { nombre: 'Comida en restaurante', costo: 300, descripcion: 'Disfruta de una comida fuera de casa.' },
    { nombre: 'Comer snack no saludable', costo: 100, descripcion: 'De vez en cuando, disfruta de un capricho.' },
    { nombre: 'Ruta en moto', costo: 350, descripcion: 'Sal a disfrutar de una ruta en moto.' },
    { nombre: 'Viaje de un día', costo: 500, descripcion: 'Escápate a un destino cercano y disfruta del día.' },
    { nombre: 'Viaje de 2 días', costo: 1000, descripcion: 'Un viaje corto a un lugar nuevo.' },
    { nombre: 'Viaje de 3 días', costo: 1500, descripcion: 'Un viaje largo para relajarte y explorar.' },
    { nombre: 'Viaje internacional', costo: 3000, descripcion: 'Un viaje internacional a un destino que siempre has querido visitar.' },
    { nombre: 'Intercambiar monedas por dinero real', costo: 50, descripcion: 'Intercambia tus monedas virtuales por dinero real. 50 🪙 = 1 euro.' }
  ];

  tiendaEl.innerHTML = '';
  recompensas.forEach((r) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = `Comprar: ${r.nombre} - ${r.costo} 🪙`;
    btn.onclick = () => {
      if (estado.monedas >= r.costo) {
        estado.monedas -= r.costo;
        if (r.nombre === 'Intercambiar monedas por dinero real') {
          estado.hucha += (r.costo / 50); // Convierte monedas virtuales a dinero real
        }
        guardarEstado();
        render();
      }
    };
    div.innerHTML = `<strong>${r.nombre}</strong><br/>Costo: ${r.costo} 🪙<br/>Descripción: ${r.descripcion}`;
    div.appendChild(btn);
    tiendaEl.appendChild(div);
  });
}

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
}

render();
showTab('inicio');
