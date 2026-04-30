const allowedKeywords = [
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
  "космос"
];

export function isPhysicsQuestion(question: string): boolean {
  const normalized = question.toLowerCase();
  return allowedKeywords.some((keyword) => normalized.includes(keyword));
}
