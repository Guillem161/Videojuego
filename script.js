// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';

// Tu configuración de Firebase (reemplaza estos valores con los tuyos)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://TU_PROJECT_ID.firebaseio.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referencias a elementos en el DOM
const monedasEl = document.getElementById('monedas');
const corazonesEl = document.getElementById('corazones');
const habilidadesEl = document.getElementById('habilidades');
const misionesEl = document.getElementById('misiones');
const tiendaEl = document.getElementById('tienda-items');

// Estado del juego, que se almacenará en Firebase
let estado = {
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

// Guardar el estado en Firebase
function guardarEstado() {
  const estadoRef = ref(db, 'estado/juego');
  set(estadoRef, estado);
}

// Cargar el estado desde Firebase
function cargarEstado() {
  const estadoRef = ref(db, 'estado/juego');
  get(estadoRef).then((snapshot) => {
    if (snapshot.exists()) {
      estado = snapshot.val();
      render();
    } else {
      // Si no hay datos, usar valores predeterminados
      estado = {
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
      render();
    }
  });
}

// Función para renderizar los datos en el DOM
function render() {
  monedasEl.textContent = `🪙 ${estado.monedas}`;
  corazonesEl.textContent = `❤️ ${estado.corazones}`;

  habilidadesEl.innerHTML = '';
  Object.entries(estado.habilidades).forEach(([nombre, nivel]) => {
    const div = document.createElement('div');
    div.innerHTML = `${nombre}: <div class="barra"><div class="nivel" style="width: ${nivel * 12}%"></div></div> Nivel ${nivel}`;
    habilidadesEl.appendChild(div);
  });

  // Mostrar misiones diarias
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

  // Recompensas disponibles en la tienda
  const recompensas = [
    { nombre: '1h videojuegos', costo: 100 },
    { nombre: 'Película', costo: 100 },
    { nombre: 'Comida en restaurante', costo: 300 },
  ];
  
  tiendaEl.innerHTML = '';
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
    tiendaEl.appendChild(div);
  });
}

// Cambiar de pestaña
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
  document.getElementById(tabId).classList.add('visible');
}

// Cargar el estado cuando la página se carga
window.onload = function() {
  cargarEstado();
};

