import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const db = getFirestore();

// Cargar el estado desde Firestore
async function cargarEstado() {
  const docRef = doc(db, "estado", "videojuego");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
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
    // Guarda el estado inicial si no existe
    await setDoc(docRef, estadoInicial);
    return estadoInicial;
  }
}

// Función para guardar el estado en Firestore
async function guardarEstado(estado) {
  const docRef = doc(db, "estado", "videojuego");
  await setDoc(docRef, estado);
}

