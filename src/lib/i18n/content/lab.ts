import { Locale } from "@/lib/i18n/translations";
import { LabMissionId } from "@/data/labMissions";

export const labMissionLabelsByLocale: Record<Locale, Record<LabMissionId, string>> = {
  kk: {
    accelOver6: "Үдеуді 6 м/с²-тен жоғары жаса",
    currentNear2: "Токты 2 А маңына жеткіз",
    energyBalance: "Ek пен Ep тепе-теңдігіне жақында",
    overcomeFriction: "Үйкеліс шегінен ас"
  },
  ru: {
    accelOver6: "Сделай ускорение больше 6 м/с²",
    currentNear2: "Добейся тока около 2 А",
    energyBalance: "Сбалансируй Ek и Ep",
    overcomeFriction: "Преодолей порог трения"
  },
  en: {
    accelOver6: "Reach acceleration above 6 m/s²",
    currentNear2: "Reach current around 2 A",
    energyBalance: "Balance Ek and Ep",
    overcomeFriction: "Overcome friction threshold"
  }
};
