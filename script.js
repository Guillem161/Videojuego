const monedasEl = document.getElementById('monedas');
const corazonesEl = document.getElementById('corazones');
const habilidadesEl = document.getElementById('habilidades');
const misionesEl = document.getElementById('misiones');
const tiendaEl = document.getElementById('tienda-items');
const recompensasEl = document.getElementById('recompensas-list');
const recompensasCanjeadasEl = document.getElementById('recompensas-canjeadas');

let estado = JSON.parse(localStorage.getItem('videojuegoVida')) || {
  monedas: 0,
  corazones: 10,
  habilidades: {
    Lectura: { nivel: 0, experiencia: 0 },
    Gimnasio: { nivel: 0, experiencia: 0 },
    Backtesting: { nivel: 0, experiencia: 0 },
    VidaEspiritual: { nivel: 0, experiencia: 0 },
    Alimentacion: { nivel: 0, experiencia: 0 },
    Estudio: { nivel: 0, experiencia: 0 },
    Social: { nivel: 0, experiencia: 0 },
    Idioma: { nivel: 0, experiencia: 0 }
  },
  misiones: {},
  recompensasCanjeadas: []
};

function guardarEstado() {
  localStorage.setItem('videojuegoVida', JSON.stringify(estado));
}

function render() {
  monedasEl.textContent = `🪙 ${estado.monedas}`;
  corazonesEl.textContent = `❤️ ${estado.corazones}`;

  habilidadesEl.innerHTML = '';
  Object.entries(estado.habilidades).forEach(([nombre, { nivel, experiencia }]) => {
    const div = document.createElement('div');
    const barra = document.createElement('div');
    barra.classList.add('barra-nivel');

    for (let i = 0; i < 10; i++) {
      const cuadrado = document.createElement('div');
      cuadrado.style.background = i < nivel ? '#4CAF50' : '#ddd';
      barra.appendChild(cuadrado);
    }

    div.innerHTML = `<strong>${nombre}:</strong> Nivel ${nivel} | ${experiencia} XP`;
    div.appendChild(barra);
    habilidadesEl.appendChild(div);
  });

  const tareas = [
    { nombre: 'Leer 30 min', hab: 'Lectura', xp: 100, monedas: 5 },
    { nombre: 'Gimnasio o correr', hab: 'Gimnasio', xp: 100, monedas: 10 },
    { nombre: 'Backtesting 2h', hab: 'Backtesting', xp: 100, monedas: 10 },
    { nombre: 'Meditar y agradecer', hab: 'VidaEspiritual', xp: 100, monedas: 5 },
    { nombre: 'Comer saludable', hab: 'Alimentacion', xp: 100, monedas: 10 },
    { nombre: 'Estudio 1h', hab: 'Estudio', xp: 100, monedas: 5 },
    { nombre: 'Conversación interesante', hab: 'Social', xp: 100, monedas: 5 },
    { nombre: 'Aprender Idioma', hab: 'Idioma', xp: 100, monedas: 5 },
  ];

  misionesEl.innerHTML = '';
  tareas.forEach((t) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Completar';
    btn.onclick = () => {
      estado.habilidades[t.hab].experiencia += t.xp;
      if (estado.habilidades[t.hab].experiencia >= (100 * (estado.habilidades[t.hab].nivel + 1))) {
        estado.habilidades[t.hab].nivel++;
      }
      estado.monedas += t.monedas;
      guardarEstado();
      render();
    };
    div.innerHTML = `<strong>${t.nombre}</strong><br/>+${t.xp} XP en ${t.hab} | +${t.monedas} 🪙`;
    div.appendChild(btn);
    misionesEl.appendChild(div);
  });

  const recompensas = [
    { nombre: '1 hora de videojuegos', costo: 50, requisito: '-', descripcion: 'Disfruta de tu juego favorito.' },
    { nombre: 'Ver una película', costo: 60, requisito: '-', descripcion: 'Relájate viendo una película o serie.' },
    { nombre: 'Día libre de tareas', costo: 100, requisito: '-', descripcion: 'Un día sin tareas para relajarte.' },
    { nombre: 'Comida en restaurante', costo: 150, requisito: '-', descripcion: 'Disfruta de una comida fuera de casa.' },
    { nombre: 'Comer snack no saludable', costo: 50, requisito: '-', descripcion: 'De vez en cuando, disfruta de un capricho.' },
    { nombre: 'Ruta en moto', costo: 200, requisito: '-', descripcion: 'Sal a disfrutar de una ruta en moto.' },
    { nombre: 'Viaje de un día', costo: 500, requisito: 'Nivel 3 en cualquier habilidad', descripcion: 'Escápate a un destino cercano y disfruta del día.' },
    { nombre: 'Viaje de 2 días', costo: 1000, requisito: 'Nivel 5 en cualquier habilidad', descripcion: 'Un viaje corto a un lugar nuevo.' },
    { nombre: 'Viaje de 3 días', costo: 1500, requisito: 'Nivel 7 en cualquier habilidad', descripcion: 'Un viaje largo para relajarte y explorar.' },
    { nombre: 'Viaje internacional', costo: 3000, requisito: 'Nivel 9 en cualquier habilidad', descripcion: 'Un viaje internacional a un destino que siempre has querido visitar.' },
    { nombre: 'Intercambiar monedas por dinero real', costo: 5000, requisito: '-', descripcion: 'Intercambia tus monedas virtuales por dinero real.' }
  ];

  recompensasEl.innerHTML = '';
  recompensas.forEach((r) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Comprar';
    const requisitoCumplido = (r.requisito === '-' || Object.values(estado.habilidades).some(h => h.nivel >= parseInt(r.requisito.split(' ')[1])));
    
    btn.disabled = !requisitoCumplido || estado.monedas < r.costo;
    btn.onclick = () => {
      if (estado.monedas >= r.costo && requisitoCumplido) {
        estado.monedas -= r.costo;
        estado.recompensasCanjeadas.push(r.nombre);
        guardarEstado();
        render();
      }
    };
    div.innerHTML = `<strong>${r.nombre}</strong><br/>Costo: ${r.costo} 🪙 | Requisito: ${r.requisito}<br/>${r.descripcion}`;
    div.appendChild(btn);
    recompensasEl.appendChild(div);
  });
}

function mostrarRecompensasCanjeadas() {
  recompensasCanjeadasEl.innerHTML = '';
  estado.recompensasCanjeadas.forEach((recompensa) => {
    const div = document.createElement('div');
    div.textContent = recompensa;
    recompensasCanjeadasEl.appendChild(div);
  });
}

function showTab(tabName) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('visible'));
  document.getElementById(tabName).classList.add('visible');
}

render();
