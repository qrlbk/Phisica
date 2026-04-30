import { Locale } from "@/lib/i18n/translations";
import { planetTextByLocale } from "@/lib/i18n/content/space";

export type PlanetInfo = {
  id: string;
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitPeriod: string;
  periodDays: number;
  hasRings?: boolean;
  facts: [string, string, string];
};

export const planets: PlanetInfo[] = [
  {
    id: "mercury",
    name: "Меркурий",
    color: "#b0a89b",
    size: 0.2,
    orbitRadius: 2.1,
    orbitSpeed: 1.7,
    orbitPeriod: "88 земных суток",
    periodDays: 88,
    facts: [
      "Ближайшая к Солнцу планета получает самое сильное притяжение.",
      "Из-за высокой орбитальной скорости Меркурий делает оборот быстрее остальных планет.",
      "На Меркурии почти нет атмосферы, поэтому температуры резко меняются."
    ]
  },
  {
    id: "venus",
    name: "Венера",
    color: "#e5c08a",
    size: 0.27,
    orbitRadius: 2.9,
    orbitSpeed: 1.3,
    orbitPeriod: "225 земных суток",
    periodDays: 225,
    facts: [
      "Венера имеет плотную атмосферу, которая сильно удерживает тепло.",
      "Планета движется по орбите медленнее Меркурия, так как находится дальше от Солнца.",
      "Это хороший пример влияния расстояния до Солнца на орбитальный период."
    ]
  },
  {
    id: "earth",
    name: "Земля",
    color: "#4ba3ff",
    size: 0.32,
    orbitRadius: 3.8,
    orbitSpeed: 1.1,
    orbitPeriod: "365 суток",
    periodDays: 365,
    facts: [
      "Земля удерживается на орбите балансом скорости и гравитации Солнца.",
      "Если скорость уменьшить, орбита станет ближе к Солнцу.",
      "Если увеличить скорость, орбита станет более удаленной."
    ]
  },
  {
    id: "mars",
    name: "Марс",
    color: "#ff7b63",
    size: 0.26,
    orbitRadius: 4.7,
    orbitSpeed: 0.95,
    orbitPeriod: "687 суток",
    periodDays: 687,
    facts: [
      "Марс дальше от Солнца, поэтому делает оборот медленнее Земли.",
      "Его орбитальный период почти в два раза длиннее земного.",
      "Марс помогает понять связь расстояния и скорости движения."
    ]
  },
  {
    id: "jupiter",
    name: "Юпитер",
    color: "#d9b27f",
    size: 0.62,
    orbitRadius: 6.1,
    orbitSpeed: 0.72,
    orbitPeriod: "11.9 земных лет",
    periodDays: 4333,
    facts: [
      "Юпитер — самая массивная планета, его гравитация заметно влияет на другие тела.",
      "Из-за большой удаленности от Солнца он движется по орбите медленнее внутренних планет.",
      "Его пример показывает, как орбитальный период растет с расстоянием."
    ]
  },
  {
    id: "saturn",
    name: "Сатурн",
    color: "#cfb07a",
    size: 0.56,
    orbitRadius: 7.4,
    orbitSpeed: 0.63,
    orbitPeriod: "29.5 земных лет",
    periodDays: 10759,
    hasRings: true,
    facts: [
      "Сатурн известен кольцами, но в модели главное — его дальняя орбита.",
      "Планета движется заметно медленнее Юпитера из-за большей дистанции до Солнца.",
      "Орбитальный период Сатурна почти 30 лет."
    ]
  },
  {
    id: "uranus",
    name: "Уран",
    color: "#81d1d7",
    size: 0.44,
    orbitRadius: 8.7,
    orbitSpeed: 0.52,
    orbitPeriod: "84 земных года",
    periodDays: 30687,
    facts: [
      "Уран относится к ледяным гигантам и находится далеко от Солнца.",
      "На большом расстоянии гравитация Солнца слабее, поэтому орбитальное движение медленнее.",
      "Один оборот Урана длится десятки земных лет."
    ]
  },
  {
    id: "neptune",
    name: "Нептун",
    color: "#4f70ff",
    size: 0.43,
    orbitRadius: 10,
    orbitSpeed: 0.47,
    orbitPeriod: "165 земных лет",
    periodDays: 60190,
    facts: [
      "Нептун — самая дальняя из восьми планет Солнечной системы.",
      "Большая дистанция до Солнца делает его орбиту самой длинной по времени среди планет.",
      "Это наглядный пример того, как медленно движутся далекие объекты."
    ]
  },
  {
    id: "pluto",
    name: "Плутон",
    color: "#b99e8d",
    size: 0.16,
    orbitRadius: 11.3,
    orbitSpeed: 0.4,
    orbitPeriod: "248 земных лет",
    periodDays: 90520,
    facts: [
      "Плутон считается карликовой планетой, но полезен для учебной визуализации.",
      "Его орбита очень удалена, поэтому период обращения очень длинный.",
      "Плутон помогает сравнить планеты и карликовые объекты в одной модели."
    ]
  }
];

export function getPlanets(locale: Locale): PlanetInfo[] {
  const texts = planetTextByLocale[locale] ?? planetTextByLocale.ru;
  return planets.map((planet) => {
    const localized = texts[planet.id];
    if (!localized) {
      return planet;
    }
    return {
      ...planet,
      name: localized.name,
      orbitPeriod: localized.orbitPeriod,
      facts: localized.facts
    };
  });
}
