export type PlanetInfo = {
  id: string;
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  fact: string;
};

export const planets: PlanetInfo[] = [
  {
    id: "mercury",
    name: "Меркурий",
    color: "#b0a89b",
    size: 0.2,
    orbitRadius: 2.3,
    orbitSpeed: 1.5,
    fact: "Ближайшая к Солнцу планета движется быстрее других из-за сильного притяжения."
  },
  {
    id: "venus",
    name: "Венера",
    color: "#e5c08a",
    size: 0.28,
    orbitRadius: 3.1,
    orbitSpeed: 1.1,
    fact: "Венера имеет плотную атмосферу и получает много тепла от Солнца."
  },
  {
    id: "earth",
    name: "Земля",
    color: "#4ba3ff",
    size: 0.32,
    orbitRadius: 4.1,
    orbitSpeed: 0.95,
    fact: "Земля удерживается на орбите балансом между скоростью движения и гравитацией Солнца."
  },
  {
    id: "mars",
    name: "Марс",
    color: "#ff7b63",
    size: 0.26,
    orbitRadius: 5.2,
    orbitSpeed: 0.8,
    fact: "Марс дальше от Солнца, поэтому его орбитальный период длиннее, чем у Земли."
  },
  {
    id: "jupiter",
    name: "Юпитер",
    color: "#d9b27f",
    size: 0.62,
    orbitRadius: 6.8,
    orbitSpeed: 0.56,
    fact: "Юпитер очень массивен и сильно влияет на движение других тел своей гравитацией."
  }
];
