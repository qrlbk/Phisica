import { Locale } from "@/lib/i18n/translations";
import { spaceMissionsByLocale } from "@/lib/i18n/content/space";

export type SpaceMission = {
  id: string;
  question: string;
  answerPlanetId: string;
  hint: string;
  explanation: string;
};

export const spaceMissions: SpaceMission[] = [
  {
    id: "mission-fastest",
    question: "Найди самую быструю планету по орбите.",
    answerPlanetId: "mercury",
    hint: "Она ближе всех к Солнцу.",
    explanation: "Ближе к Солнцу — сильнее гравитация, поэтому орбитальная скорость выше."
  },
  {
    id: "mission-longest-period",
    question: "Выбери объект с самым длинным орбитальным периодом.",
    answerPlanetId: "pluto",
    hint: "Это карликовая планета на самой дальней орбите.",
    explanation: "Чем дальше орбита, тем длиннее путь и тем больше период обращения."
  },
  {
    id: "mission-rings",
    question: "Найди объект с заметными кольцами.",
    answerPlanetId: "saturn",
    hint: "Самый известный обладатель колец в школьных учебниках.",
    explanation: "У Сатурна наиболее заметные кольца, поэтому он легко узнается в модели."
  }
];

export function getSpaceMissions(locale: Locale): SpaceMission[] {
  const texts = spaceMissionsByLocale[locale] ?? spaceMissionsByLocale.ru;
  return spaceMissions.map((mission) => {
    const localized = texts[mission.id];
    if (!localized) {
      return mission;
    }
    return {
      ...mission,
      question: localized.question,
      hint: localized.hint,
      explanation: localized.explanation
    };
  });
}
