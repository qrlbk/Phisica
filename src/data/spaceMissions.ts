export type SpaceMission = {
  id: string;
  question: string;
  answerPlanetId: string;
  hint: string;
};

export const spaceMissions: SpaceMission[] = [
  {
    id: "mission-fastest",
    question: "Найди самую быструю планету по орбите.",
    answerPlanetId: "mercury",
    hint: "Она ближе всех к Солнцу."
  },
  {
    id: "mission-longest-period",
    question: "Выбери объект с самым длинным орбитальным периодом.",
    answerPlanetId: "pluto",
    hint: "Это карликовая планета на самой дальней орбите."
  },
  {
    id: "mission-rings",
    question: "Найди объект с заметными кольцами.",
    answerPlanetId: "saturn",
    hint: "Самый известный обладатель колец в школьных учебниках."
  }
];
