let coins = 0;
let hearts = 10;

const missions = [
    { name: "Leer 30 minutos", xp: 10, coins: 5 },
    { name: "Ir al gimnasio o correr", xp: 15, coins: 10 },
    { name: "2 horas de backtesting", xp: 15, coins: 10 },
    { name: "Meditar y agradecer a Dios", xp: 10, coins: 5 },
    { name: "Comer saludablemente todo el día", xp: 15, coins: 10 },
    { name: "Aprender algo nuevo por 1 hora", xp: 10, coins: 5 },
    { name: "Mantener una conversación interesante", xp: 10, coins: 5 },
    { name: "Aprender/practicar idiomas", xp: 10, coins: 5 }
];

const skills = [
    { name: "Lectura", level: 1 },
    { name: "Gimnasio", level: 1 },
    { name: "Backtesting", level: 1 },
    { name: "Vida Espiritual", level: 1 },
    { name: "Alimentación", level: 1 },
    { name: "Estudio", level: 1 },
    { name: "Social", level: 1 },
    { name: "Idioma", level: 1 }
];

const rewards = [
    { name: "1 hora de videojuegos", cost: 100 },
    { name: "Ver una película", cost: 100 },
    { name: "Comer snack no saludable", cost: 100 },
    { name: "Día libre de tareas", cost: 150 },
    { name: "Saltarse la dieta", cost: 150 },
    { name: "Comida en restaurante", cost: 300 },
    { name: "Ruta en moto", cost: 350 },
    { name: "Viaje de 1 día", cost: 500 },
    { name: "Viaje de 2 días", cost: 700 },
    { name: "Viaje de 3 días", cost: 1000 },
    { name: "Intercambio de monedas por 1€", cost: 50 }
];

function showTab(tab) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tabContent => tabContent.style.display = 'none');
    document.getElementById(tab).style.display = 'block';
}

function updateStatus() {
    document.getElementById('coins').textContent = coins;
    document.getElementById('hearts').textContent = hearts;
}

function generateMissionList() {
    const missionList = document.getElementById('mission-list');
    missionList.innerHTML = '';
    missions.forEach(mission => {
        const li = document.createElement('li');
        li.textContent = mission.name;
        const button = document.createElement('button');
        button.className = 'complete';
        button.textContent = 'Completar';
        button.onclick = () => completeMission(mission);
        li.appendChild(button);
        missionList.appendChild(li);
    });
}

function generateSkillList() {
    const skillList = document.getElementById('skill-list');
    skillList.innerHTML = '';
    skills.forEach(skill => {
        const div = document.createElement('div');
        div.textContent = `${skill.name}: Nivel ${skill.level}`;
        skillList.appendChild(div);
    });
}

function generateShopList() {
    const shopList = document.getElementById('shop-list');
    shopList.innerHTML = '';
    rewards.forEach(reward => {
        const li = document.createElement('li');
        li.textContent = `${reward.name} - Costo: ${reward.cost} monedas`;
        const button = document.createElement('button');
        button.textContent = 'Gastar';
        button.onclick = () => spendReward(reward);
        li.appendChild(button);
        shopList.appendChild(li);
    });
}

function completeMission(mission) {
    coins += mission.coins;
    updateStatus();
    generateMissionList(); // Regenerar la lista de misiones
}

function spendReward(reward) {
    if (coins >= reward.cost) {
        coins -= reward.cost;
        alert(`Has gastado ${reward.cost} monedas en ${reward.name}`);
        updateStatus();
        generateShopList(); // Regenerar la lista de recompensas
    } else {
        alert('No tienes suficientes monedas.');
    }
}

generateMissionList();
generateSkillList();
generateShopList();
updateStatus();
