const monedasEl = document.getElementById('monedas');
const corazonesEl = document.getElementById('corazones');
const habilidadesEl = document.getElementById('habilidades');
const misionesEl = document.getElementById('misiones');
const tiendaEl = document.getElementById('tienda-items');
const recompensasEl = document.getElementById('recompensas-items');

let estado = JSON.parse(localStorage.getItem('videojuegoVida')) || {
  monedas: 0,
  corazones: 10,
  habilidades: {
    Lectura: { nivel: 1, xp: 0 },
    Gimnasio: { nivel: 1, xp: 0 },
    Backtesting: { nivel: 1, xp: 0 },
    VidaEspiritual: { nivel: 1, xp: 0 },
    Alimentacion: { nivel: 1, xp: 0 },
    Estudio: { nivel: 1, xp: 0 },
    Social: { nivel: 1, xp: 0 },
    Idioma: { nivel: 1, xp: 0 }
  },
  misiones: {},
  recompensas: []
};

function guardarEstado() {
  localStorage.setItem('videojuegoVida', JSON.stringify(estado));
}

function render() {
  monedasEl.textContent = `🪙 ${estado.monedas}`;
  corazonesEl.textContent = `❤️ ${estado.corazones}`;

  habilidadesEl.innerHTML = '';
  Object.entries(estado.habilidades).forEach(([nombre, { nivel, xp }]) => {
    const div = document.createElement('div');
    const barra = document.createElement('div');
    barra.classList.add('barra');
    barra.style.width = `${(xp / (100 * nivel)) * 100}%`;
    
    div.innerHTML = `${nombre}: Nivel ${nivel} <br/> XP: ${xp}`;
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
      if (estado.habilidades[t.hab].xp + t.xp >= 100 * estado.habilidades[t.hab].nivel) {
        estado.habilidades[t.hab].nivel += 1;
        estado.habilidades[t.hab].xp = 0;
      } else {
        estado.habilidades[t.hab].xp += t.xp;
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
    { nombre: '1 hora de videojuegos', costo: 50, descripcion: 'Disfruta de tu juego favorito.' },
    { nombre: 'Ver una película', costo: 60, descripcion: 'Relájate viendo una película o serie.' },
    { nombre: 'Comida en restaurante', costo: 150, descripcion: 'Disfruta de una comida fuera de casa.' },
    { nombre: 'Viaje corto', costo: 500, descripcion: 'Escápate a un destino cercano.' }
  ];
  tiendaEl.innerHTML = '';
  recompensas.forEach((r) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Comprar';
    btn.onclick = () => {
      if (estado.monedas >= r.costo) {
        estado.monedas -= r.costo;
        estado.recompensas.push(r);
        guardarEstado();
        render();
      }
    };
    div.innerHTML = `<strong>${r.nombre}</strong><br/>Costo: ${r.costo} 🪙 - ${r.descripcion}`;
    div.appendChild(btn);
    tiendaEl.appendChild(div);
  });

  recompensasEl.innerHTML = '';
  estado.recompensas.forEach((r) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Gastar';
    btn.onclick = () => {
      estado.recompensas = estado.recompensas.filter(recompensa => recompensa !== r);
      guardarEstado();
      render();
    };
    div.innerHTML = `<strong>${r.nombre}</strong><br/> ${r.descripcion}`;
    div.appendChild(btn);
    recompensasEl.appendChild(div);
  });
}

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
  document.getElementById(tabId).classList.add('visible');
}

render();
showTab('inicio');
