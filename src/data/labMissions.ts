import { Locale } from "@/lib/i18n/translations";
import { labMissionLabelsByLocale } from "@/lib/i18n/content/lab";

export type LabMissionId = "accelOver6" | "currentNear2" | "energyBalance" | "overcomeFriction";

export const labMissions: Array<{ id: LabMissionId; label: string; points: number }> = [
  { id: "accelOver6", label: "Сделай ускорение больше 6 м/с²", points: 20 },
  { id: "currentNear2", label: "Добейся тока около 2 А", points: 20 },
  { id: "energyBalance", label: "Сбалансируй Ek и Ep", points: 30 },
  { id: "overcomeFriction", label: "Преодолей порог трения", points: 30 }
];

export function getLabMissions(locale: Locale): Array<{ id: LabMissionId; label: string; points: number }> {
  const labels = labMissionLabelsByLocale[locale] ?? labMissionLabelsByLocale.ru;
  return labMissions.map((mission) => ({
    ...mission,
    label: labels[mission.id]
  }));
}
