import { Locale } from "@/lib/i18n/translations";
import { QuizDifficulty } from "@/data/qa";

export type LocalizedQuizQuestion = {
  id: string;
  category: string;
  difficulty: QuizDifficulty;
  question: string;
  options: [string, string, string, string];
  correctOption: number;
  hint: string;
  explanation: string;
};

export const quizQuestionsByLocale: Record<Locale, LocalizedQuizQuestion[]> = {
  ru: [],
  kk: [],
  en: []
};

quizQuestionsByLocale.ru = [
  { id: "easy-1", category: "Механика", difficulty: "easy", question: "Что произойдет с ускорением тела, если при той же силе уменьшить массу?", options: ["Ускорение уменьшится", "Ускорение увеличится", "Ускорение не изменится", "Тело остановится"], correctOption: 1, hint: "Вспомни формулу a = F/m.", explanation: "При постоянной силе ускорение обратно пропорционально массе." },
  { id: "easy-2", category: "Электричество", difficulty: "easy", question: "Если сопротивление постоянно, что будет при увеличении напряжения?", options: ["Ток уменьшится", "Ток не изменится", "Ток увеличится", "Провод исчезнет"], correctOption: 2, hint: "Используй соотношение I = U/R.", explanation: "При постоянном R, сила тока I растет вместе с напряжением U." },
  { id: "easy-3", category: "Космос", difficulty: "easy", question: "Почему планеты не падают прямо на Солнце?", options: ["Потому что в космосе нет гравитации", "Потому что они постоянно толкаются друг с другом", "Потому что у них есть скорость по орбите", "Потому что Солнце их отталкивает"], correctOption: 2, hint: "Подумай о движении по касательной к орбите.", explanation: "Планета одновременно притягивается к Солнцу и движется вперед, формируя орбиту." },
  { id: "medium-1", category: "Механика", difficulty: "medium", question: "Тело массой 2 кг движется с ускорением 3 м/с². Какая сила действует на тело?", options: ["1.5 Н", "5 Н", "6 Н", "9 Н"], correctOption: 2, hint: "Используй F = ma.", explanation: "F = 2 * 3 = 6 Н." },
  { id: "medium-2", category: "Электричество", difficulty: "medium", question: "При U = 12 В и R = 4 Ом, чему равна сила тока?", options: ["2 А", "3 А", "4 А", "48 А"], correctOption: 1, hint: "I = U/R.", explanation: "I = 12/4 = 3 А." },
  { id: "medium-3", category: "Космос", difficulty: "medium", question: "Какая из планет обычно движется по орбите медленнее?", options: ["Меркурий", "Венера", "Земля", "Нептун"], correctOption: 3, hint: "Дальние планеты делают оборот дольше.", explanation: "Нептун находится дальше от Солнца и движется медленнее внутренних планет." },
  { id: "hard-1", category: "Механика", difficulty: "hard", question: "Если силу увеличить в 2 раза, а массу в 2 раза, как изменится ускорение?", options: ["Увеличится в 2 раза", "Уменьшится в 2 раза", "Не изменится", "Станет нулевым"], correctOption: 2, hint: "Сравни отношение F/m до и после изменения.", explanation: "Отношение F/m остается прежним, поэтому ускорение не меняется." },
  { id: "hard-2", category: "Электричество", difficulty: "hard", question: "Если напряжение увеличили в 3 раза, а сопротивление в 3 раза, что будет с током?", options: ["Увеличится в 3 раза", "Не изменится", "Уменьшится в 3 раза", "Станет бесконечным"], correctOption: 1, hint: "I = U/R, сравни дробь.", explanation: "И числитель, и знаменатель увеличились одинаково, ток не меняется." },
  { id: "hard-3", category: "Космос", difficulty: "hard", question: "Что лучше объясняет, почему внешний объект вращается вокруг Солнца медленнее?", options: ["Слабее солнечный свет", "Гравитация Солнца на большем расстоянии слабее", "У объекта меньше масса", "У него всегда холодная поверхность"], correctOption: 1, hint: "Важна именно сила притяжения с расстоянием.", explanation: "С ростом расстояния сила гравитации уменьшается, и орбитальное движение становится медленнее." }
];

quizQuestionsByLocale.kk = [
  { id: "easy-1", category: "Механика", difficulty: "easy", question: "Сол күш сақталса, масса азайғанда үдеу қалай өзгереді?", options: ["Үдеу азаяды", "Үдеу артады", "Үдеу өзгермейді", "Дене тоқтайды"], correctOption: 1, hint: "a = F/m формуласын есіңе түсір.", explanation: "Күш тұрақты болса, үдеу массаға кері пропорционал." },
  { id: "easy-2", category: "Электр", difficulty: "easy", question: "Кедергі тұрақты болса, кернеу артқанда не болады?", options: ["Ток азаяды", "Ток өзгермейді", "Ток артады", "Сым жоғалады"], correctOption: 2, hint: "I = U/R қатынасын қолдан.", explanation: "R тұрақты болса, U өскенде I ток та өседі." },
  { id: "easy-3", category: "Ғарыш", difficulty: "easy", question: "Планеталар неге Күнге тікелей құлап кетпейді?", options: ["Ғарышта тартылыс жоқ", "Олар бірін-бірі итереді", "Оларда орбиталық жылдамдық бар", "Күн оларды тебеді"], correctOption: 2, hint: "Орбитадағы жанама бағыттағы қозғалысты ойла.", explanation: "Планета Күнге тартылып тұрып, алға қозғалғандықтан орбита құрайды." },
  { id: "medium-1", category: "Механика", difficulty: "medium", question: "Массасы 2 кг дене 3 м/с² үдеумен қозғалады. Күш неге тең?", options: ["1.5 Н", "5 Н", "6 Н", "9 Н"], correctOption: 2, hint: "F = ma қолдан.", explanation: "F = 2 * 3 = 6 Н." },
  { id: "medium-2", category: "Электр", difficulty: "medium", question: "U = 12 В және R = 4 Ом болса, ток күші неге тең?", options: ["2 А", "3 А", "4 А", "48 А"], correctOption: 1, hint: "I = U/R.", explanation: "I = 12/4 = 3 А." },
  { id: "medium-3", category: "Ғарыш", difficulty: "medium", question: "Қай планета әдетте орбитада баяуырақ қозғалады?", options: ["Меркурий", "Шолпан", "Жер", "Нептун"], correctOption: 3, hint: "Алыс планеталардың периоды ұзақ.", explanation: "Нептун Күннен алыс, сондықтан ішкі планеталардан баяу." },
  { id: "hard-1", category: "Механика", difficulty: "hard", question: "Күшті 2 есе, массаны 2 есе арттырсақ, үдеу қалай өзгереді?", options: ["2 есе артады", "2 есе кемиді", "Өзгермейді", "Нөл болады"], correctOption: 2, hint: "F/m қатынасын салыстыр.", explanation: "F/m қатынасы өзгермейді, сондықтан үдеу де өзгермейді." },
  { id: "hard-2", category: "Электр", difficulty: "hard", question: "Кернеуді 3 есе, кедергіні 3 есе арттырса, ток не болады?", options: ["3 есе артады", "Өзгермейді", "3 есе азаяды", "Шексіз болады"], correctOption: 1, hint: "I = U/R бөлшегін салыстыр.", explanation: "Алым мен бөлім бірдей артса, ток өзгермейді." },
  { id: "hard-3", category: "Ғарыш", difficulty: "hard", question: "Неге сыртқы объект Күнді баяуырақ айналады?", options: ["Күн сәулесі әлсіз", "Қашықта тартылыс күші әлсірейді", "Массасы аз", "Беті әрдайым суық"], correctOption: 1, hint: "Негізгісі — қашықтықтағы тартылыс күші.", explanation: "Қашықтық артқанда тартылыс азайып, орбиталық қозғалыс баяулайды." }
];

quizQuestionsByLocale.en = [
  { id: "easy-1", category: "Mechanics", difficulty: "easy", question: "What happens to acceleration if mass decreases while force stays the same?", options: ["Acceleration decreases", "Acceleration increases", "Acceleration does not change", "The object stops"], correctOption: 1, hint: "Recall the formula a = F/m.", explanation: "With constant force, acceleration is inversely proportional to mass." },
  { id: "easy-2", category: "Electricity", difficulty: "easy", question: "If resistance is constant, what happens when voltage increases?", options: ["Current decreases", "Current stays the same", "Current increases", "The wire disappears"], correctOption: 2, hint: "Use I = U/R.", explanation: "When R is constant, increasing U increases current I." },
  { id: "easy-3", category: "Space", difficulty: "easy", question: "Why don't planets fall directly into the Sun?", options: ["There is no gravity in space", "They continuously push each other", "They have orbital velocity", "The Sun repels them"], correctOption: 2, hint: "Think of tangential motion along the orbit.", explanation: "A planet is pulled by the Sun while moving forward, forming an orbit." },
  { id: "medium-1", category: "Mechanics", difficulty: "medium", question: "A body of mass 2 kg accelerates at 3 m/s². What force acts on it?", options: ["1.5 N", "5 N", "6 N", "9 N"], correctOption: 2, hint: "Use F = ma.", explanation: "F = 2 * 3 = 6 N." },
  { id: "medium-2", category: "Electricity", difficulty: "medium", question: "If U = 12 V and R = 4 Ω, what is the current?", options: ["2 A", "3 A", "4 A", "48 A"], correctOption: 1, hint: "I = U/R.", explanation: "I = 12/4 = 3 A." },
  { id: "medium-3", category: "Space", difficulty: "medium", question: "Which planet usually moves slower in orbit?", options: ["Mercury", "Venus", "Earth", "Neptune"], correctOption: 3, hint: "Distant planets have longer periods.", explanation: "Neptune is farther from the Sun and moves slower than inner planets." },
  { id: "hard-1", category: "Mechanics", difficulty: "hard", question: "If force doubles and mass doubles, how does acceleration change?", options: ["Doubles", "Halves", "Does not change", "Becomes zero"], correctOption: 2, hint: "Compare the ratio F/m before and after.", explanation: "The ratio F/m remains the same, so acceleration is unchanged." },
  { id: "hard-2", category: "Electricity", difficulty: "hard", question: "If voltage is increased 3x and resistance is increased 3x, what happens to current?", options: ["Increases 3x", "Does not change", "Decreases 3x", "Becomes infinite"], correctOption: 1, hint: "Compare I = U/R as a fraction.", explanation: "Numerator and denominator increase equally, so current stays the same." },
  { id: "hard-3", category: "Space", difficulty: "hard", question: "What best explains why an outer object orbits the Sun more slowly?", options: ["Sunlight is weaker", "Solar gravity is weaker at greater distance", "The object has less mass", "Its surface is always cold"], correctOption: 1, hint: "Key factor: gravitational pull vs distance.", explanation: "As distance increases, gravitational force decreases, making orbital motion slower." }
];
