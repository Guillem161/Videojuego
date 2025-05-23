const monedasEl = document.getElementById('monedas');
const corazonesEl = document.getElementById('corazones');
const habilidadesEl = document.getElementById('habilidades');
const misionesEl = document.getElementById('misiones-lista');
const tiendaEl = document.getElementById('tienda-items');
const recompensasEl = document.getElementById('recompensas-lista');
const huchaEl = document.getElementById('hucha');

let estado = JSON.parse(localStorage.getItem('videojuegoVida')) || {
  monedas: 0,
  corazones: 10,
  hucha: 0,
  habilidades: {
    Lectura: { nivel: 0, xp: 0 },
    Gimnasio: { nivel: 0, xp: 0 },
    Backtesting: { nivel: 0, xp: 0 },
    VidaEspiritual: { nivel: 0, xp: 0 },
    Alimentacion: { nivel: 0, xp: 0 },
    Estudio: { nivel: 0, xp: 0 },
    Social: { nivel: 0, xp: 0 },
    Idioma: { nivel: 0, xp: 0 }
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
  huchaEl.textContent = estado.hucha.toFixed(2);

  habilidadesEl.innerHTML = '';
  Object.entries(estado.habilidades).forEach(([nombre, { nivel, xp }]) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${nombre}</strong>
      <p>Nivel: ${nivel} | XP: ${xp} / ${100 * (nivel + 1)}</p>
    `;
    habilidadesEl.appendChild(div);
  });

  const tareas = [
    { nombre: 'Leer 30 min', hab: 'Lectura', xp: 10, monedas: 5 },
    { nombre: 'Gimnasio o correr', hab: 'Gimnasio', xp: 10, monedas: 10 },
    { nombre: 'Backtesting 2h', hab: 'Backtesting', xp: 10, monedas: 10 },
    { nombre: 'Meditar y agradecer', hab: 'VidaEspiritual', xp: 10, monedas: 5 },
    { nombre: 'Comer saludable', hab: 'Alimentacion', xp: 10, monedas: 10 },
    { nombre: 'Estudio 1h', hab: 'Estudio', xp: 10, monedas: 5 },
    { nombre: 'Conversación interesante', hab: 'Social', xp: 10, monedas: 5 },
    { nombre: 'Aprender Idioma', hab: 'Idioma', xp: 10, monedas: 5 }
  ];

  misionesEl.innerHTML = '';
  tareas.forEach((t) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Completar';
    btn.onclick = () => {
      estado.habilidades[t.hab].xp += t.xp;
      estado.monedas += t.monedas;
      if (estado.habilidades[t.hab].xp >= 100 * (estado.habilidades[t.hab].nivel + 1)) {
        estado.habilidades[t.hab].nivel++;
        estado.habilidades[t.hab].xp = 0; // Reset XP after leveling up
      }
      guardarEstado();
      render();
    };
    div.innerHTML = `<strong>${t.nombre}</strong><br/>+${t.xp} XP en ${t.hab} | +${t.monedas} 🪙`;
    div.appendChild(btn);
    misionesEl.appendChild(div);
  });

  const recompensas = [
    { nombre: '1 hora de videojuegos', costo: 100 },
    { nombre: 'Ver una película', costo: 100 },
    { nombre: 'Día libre de tareas', costo: 150 },
    { nombre: 'Comida en restaurante', costo: 300 },
    { nombre: 'Comer snack no saludable', costo: 100 },
    { nombre: 'Ruta en moto', costo: 350 },
    { nombre: 'Viaje de un día', costo: 500 },
    { nombre: 'Viaje de 2 días', costo: 1000 },
    { nombre: 'Viaje de 3 días', costo: 1500 },
    { nombre: 'Viaje internacional', costo: 3000 }
  ];

  tiendaEl.innerHTML = '';
  recompensas.forEach((r) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Comprar';
    btn.onclick = () => {
      if (estado.monedas >= r.costo) {
        estado.monedas -= r.costo;
        estado.recompensas.push(r.nombre);
        guardarEstado();
        render();
      } else {
        alert('No tienes suficientes monedas.');
      }
    };
    div.innerHTML = `<strong>${r.nombre}</strong><br/>Costo: ${r.costo} 🪙`;
    div.appendChild(btn);
    tiendaEl.appendChild(div);
  });

  recompensasEl.innerHTML = '';
  estado.recompensas.forEach((recompensa) => {
    const div = document.createElement('div');
    div.textContent = recompensa;
    recompensasEl.appendChild(div);
  });
}

function showTab(tab) {
  document.querySelectorAll('.tab').forEach((el) => {
    el.classList.remove('visible');
    el.classList.add('hidden');
  });
  document.getElementById(tab).classList.remove('hidden');
  document.getElementById(tab).classList.add('visible');
}

render();
