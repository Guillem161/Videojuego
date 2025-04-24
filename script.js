const missions = [
  { name: "Leer 30 minutos", coins: 5 },
  { name: "Ir al gimnasio o correr", coins: 10 },
  { name: "2 horas de backtesting", coins: 10 },
  { name: "Meditar y agradecer a Dios", coins: 5 },
  { name: "Comer saludablemente todo el día", coins: 10 },
  { name: "Aprender algo nuevo por 1 hora", coins: 5 },
  { name: "Mantener una conversación interesante", coins: 5 },
  { name: "Aprender/practicar idiomas", coins: 5 },
];
let coins = 0;
let hearts = 10;
const list = document.getElementById("mission-list");
const coinDisplay = document.getElementById("coins");
const heartDisplay = document.getElementById("hearts");
missions.forEach((mission, index) => {
  const item = document.createElement("li");
  item.innerHTML = `
    <label>
      <input type="checkbox" onchange="completeMission(${index})"/>
      ${mission.name} (+${mission.coins} 🪙)
    </label>
  `;
  list.appendChild(item);
});
window.completeMission = (index) => {
  coins += missions[index].coins;
  coinDisplay.textContent = coins;
};
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
