// Cargar el estado del juego desde localStorage o establecer un estado inicial
const estadoInicial = {
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
  recompensas: []
};

// Función para cargar el estado desde localStorage
function cargarEstado() {
  const estadoGuardado = JSON.parse(localStorage.getItem("estado"));
  return estadoGuardado || estadoInicial;
}

// Función para guardar el estado en localStorage
function guardarEstado(estado) {
  localStorage.setItem("estado", JSON.stringify(estado));
}

// Función para renderizar la interfaz
function render() {
  const estado = cargarEstado();

  // Mostrar monedas, corazones y hucha
  document.getElementById('monedas').innerText = `🪙 ${estado.monedas}`;
  document.getElementById('corazones').innerText = `❤️ ${estado.corazones}`;
  document.getElementById('hucha').innerText = estado.hucha;

  // Mostrar habilidades
  const habilidadesEl = document.getElementById('habilidades');
  habilidadesEl.innerHTML = '';
  Object.entries(estado.habilidades).forEach(([nombre, { nivel, xp }]) => {
    const div = document.createElement('div');
    div.innerText = `${nombre}: Nivel ${nivel} | XP: ${xp}`;
    habilidadesEl.appendChild(div);
  });

  // Mostrar misiones
  const misionesEl = document.getElementById('misiones');
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
      
      // Verificar si la habilidad sube de nivel
      if (estado.habilidades[t.hab].xp >= estado.habilidades[t.hab].nivel * 100) {
        estado.habilidades[t.hab].nivel++;
        estado.habilidades[t.hab].xp = 0; // Reseteamos XP para el siguiente nivel
      }
      
      guardarEstado(estado);
      render();
    };
    div.innerHTML = `<strong>${t.nombre}</strong><br/>+${t.xp} XP en ${t.hab} | +${t.monedas} 🪙`;
    div.appendChild(btn);
    misionesEl.appendChild(div);
  });

  // Mostrar recompensas
  const recompensasEl = document.getElementById('recompensas-lista');
  recompensasEl.innerHTML = '';
  estado.recompensas.forEach((recompensa) => {
    const div = document.createElement('div');
    div.innerText = recompensa;
    recompensasEl.appendChild(div);
  });
}

// Función para restar 1€ de la hucha
function restarHucha() {
  const estado = cargarEstado();
  if (estado.hucha >= 1) {
    estado.hucha -= 1;
    guardarEstado(estado);
    render();
  }
}

// Función para mostrar las pestañas
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('visible');
    tab.classList.add('hidden');
  });
  document.getElementById(tabId).classList.remove('hidden');
  document.getElementById(tabId).classList.add('visible');
}

// Llamar a render para mostrar los datos
render();
showTab('inicio');
