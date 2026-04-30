const allowedKeywords = [
  "physics",
  "force",
  "acceleration",
  "mass",
  "energy",
  "electric",
  "voltage",
  "current",
  "resistance",
  "gravity",
  "orbit",
  "mechanics",
  "space",
  "физика",
  "сила",
  "ускорение",
  "масса",
  "энергия",
  "электр",
  "напряжение",
  "ток",
  "сопротивление",
  "гравитац",
  "орбита",
  "механика",
  "космос",
  "күш",
  "үдеу",
  "масса",
  "энергия",
  "кернеу",
  "ток",
  "кедергі",
  "тартылыс",
  "орбита",
  "ғарыш"
];

export function isPhysicsQuestion(question: string): boolean {
  const normalized = question.toLowerCase();
  return allowedKeywords.some((keyword) => normalized.includes(keyword));
}
