const monedasEl = document.getElementById('monedas');
const corazonesEl = document.getElementById('corazones');
const habilidadesEl = document.getElementById('habilidades');
const misionesEl = document.getElementById('misiones');
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

function xpNecesaria(nivel) {
  return 100 * (nivel + 1);
}

function render() {
  monedasEl.textContent = `🪙 ${estado.monedas}`;
  corazonesEl.textContent = `❤️ ${estado.corazones}`;
  huchaEl.textContent = estado.hucha.toFixed(2);

  habilidadesEl.innerHTML = '';
  Object.entries(estado.habilidades).forEach(([nombre, data]) => {
    const div = document.createElement('div');
    const xpTotal = data.xp;
    const nivel = data.nivel;
    const xpReq = xpNecesaria(nivel);
    div.textContent = `${nombre}: Nivel ${nivel} | XP: ${xpTotal}/${xpReq}`;
    habilidadesEl.appendChild(div);
  });

  const tareas = [
    { nombre: 'Leer 30 min', hab: 'Lectura', xp: 30, monedas: 5 },
    { nombre: 'Gimnasio o correr', hab: 'Gimnasio', xp: 40, monedas: 10 },
    { nombre: 'Backtesting 2h', hab: 'Backtesting', xp: 50, monedas: 10 },
    { nombre: 'Meditar y agradecer', hab: 'VidaEspiritual', xp: 20, monedas: 5 },
    { nombre: 'Comer saludable', hab: 'Alimentacion', xp: 30, monedas: 10 },
    { nombre: 'Estudio 1h', hab: 'Estudio', xp: 40, monedas: 5 },
    { nombre: 'Conversación interesante', hab: 'Social', xp: 25, monedas: 5 },
    { nombre: 'Aprender Idioma', hab: 'Idioma', xp: 35, monedas: 5 },
  ];

  misionesEl.innerHTML = '';
  tareas.forEach((t) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Completar';
    btn.onclick = () => {
      const hab = estado.habilidades[t.hab];
      if (hab.nivel < 10) {
        hab.xp += t.xp;
        while (hab.xp >= xpNecesaria(hab.nivel) && hab.nivel < 10) {
          hab.xp -= xpNecesaria(hab.nivel);
          hab.nivel++;
        }
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
    { nombre: '1 hora de videojuegos', costo: 100 },
    { nombre: 'Ver una película', costo: 100 },
    { nombre: 'Día libre de tareas', costo: 150 },
    { nombre: 'Comida en restaurante', costo: 300 },
    { nombre: 'Comer snack no saludable', costo: 100 },
    { nombre: 'Ruta en moto', costo: 350 },
    { nombre: 'Viaje de un día', costo: 500 },
    { nombre: 'Viaje de 2 días', costo: 1000 },
    { nombre: 'Viaje de 3 días', costo: 1500 },
    { nombre: 'Viaje internacional', costo: 3000 },
    { nombre: 'Intercambiar monedas por dinero real', costo: 50 },
    { nombre: 'Espada de diamante (fondo)', costo: 20, especial: true }
  ];

  tiendaEl.innerHTML = '';
  recompensas.forEach((r) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${r.nombre}</strong><br/>Costo: ${r.costo} 🪙`;

    const btn = document.createElement('button');
    btn.textContent = 'Comprar';
    btn.onclick = () => {
      if (estado.monedas >= r.costo) {
        estado.monedas -= r.costo;
        if (r.nombre === 'Intercambiar monedas por dinero real') {
          estado.hucha += 1;
        } else if (r.especial) {
          abrirVentanaEspada();
        } else {
          estado.recompensas.push(r.nombre);
        }
        guardarEstado();
        render();
      }
    };

    div.appendChild(btn);
    tiendaEl.appendChild(div);
  });

  recompensasEl.innerHTML = '';
  estado.recompensas.forEach((nombre, index) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Gastar';
    btn.onclick = () => {
      estado.recompensas.splice(index, 1);
      guardarEstado();
      render();
    };
    div.textContent = nombre;
    div.appendChild(btn);
    recompensasEl.appendChild(div);
  });
}

function restarHucha() {
  if (estado.hucha >= 1) {
    estado.hucha -= 1;
    guardarEstado();
    render();
  }
}

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('visible');
    tab.classList.add('hidden');
  });
  document.getElementById(tabId).classList.remove('hidden');
  document.getElementById(tabId).classList.add('visible');
}

function abrirVentanaEspada() {
  const win = window.open("", "EspadaDiamante", "width=400,height=400");
  win.document.write('<h1>Espada de Diamante 🔷</h1><img src="diamond_sword.png" style="width:300px;margin-top:20px;">');
}

render();
showTab('inicio');
