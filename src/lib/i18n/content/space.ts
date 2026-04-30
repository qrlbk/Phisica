import { Locale } from "@/lib/i18n/translations";

type PlanetText = {
  name: string;
  orbitPeriod: string;
  facts: [string, string, string];
};

type SpaceMissionText = {
  question: string;
  hint: string;
  explanation: string;
};

export const planetTextByLocale: Record<Locale, Record<string, PlanetText>> = {
  kk: {
    mercury: {
      name: "Меркурий",
      orbitPeriod: "88 Жер тәулігі",
      facts: [
        "Күнге ең жақын планета ең күшті тартылыс әсерін алады.",
        "Жоғары орбиталық жылдамдықтың арқасында Меркурий ең жылдам айналады.",
        "Атмосферасы өте жұқа болғандықтан температура қатты ауытқиды."
      ]
    },
    venus: {
      name: "Шолпан",
      orbitPeriod: "225 Жер тәулігі",
      facts: [
        "Тығыз атмосферасы жылуды қатты ұстап қалады.",
        "Күннен алысырақ болғандықтан Меркурийден баяу қозғалады.",
        "Күнге дейінгі қашықтық пен орбита периодының байланысын көрсетеді."
      ]
    },
    earth: {
      name: "Жер",
      orbitPeriod: "365 тәулік",
      facts: [
        "Жер орбитада жылдамдық пен тартылыс тепе-теңдігі арқылы ұсталады.",
        "Жылдамдық азайса, орбита Күнге жақындайды.",
        "Жылдамдық артса, орбита алыстай түседі."
      ]
    },
    mars: {
      name: "Марс",
      orbitPeriod: "687 тәулік",
      facts: [
        "Марс Күннен алысырақ болғандықтан Жерден баяу айналады.",
        "Оның орбиталық периоды Жерден шамамен екі есе ұзақ.",
        "Қашықтық пен жылдамдық байланысын түсіндіруге ыңғайлы."
      ]
    },
    jupiter: {
      name: "Юпитер",
      orbitPeriod: "11.9 Жер жылы",
      facts: [
        "Юпитер ең үлкен массаға ие, сондықтан басқа денелерге әсері күшті.",
        "Күннен алыс болғандықтан ішкі планеталарға қарағанда баяу қозғалады.",
        "Қашықтық артқан сайын период өсетінін көрсетеді."
      ]
    },
    saturn: {
      name: "Сатурн",
      orbitPeriod: "29.5 Жер жылы",
      facts: [
        "Сатурн сақиналарымен танымал, ал модельде оның алыс орбитасы маңызды.",
        "Күннен алысырақ болғандықтан Юпитерден де баяу қозғалады.",
        "Орбиталық периоды шамамен 30 жыл."
      ]
    },
    uranus: {
      name: "Уран",
      orbitPeriod: "84 Жер жылы",
      facts: [
        "Уран мұзды алыптар қатарына жатады және Күннен өте алыс орналасқан.",
        "Қашықтық артқанда Күн тартылысы әлсіреп, қозғалыс баяулайды.",
        "Бір айналымы ондаған Жер жылына созылады."
      ]
    },
    neptune: {
      name: "Нептун",
      orbitPeriod: "165 Жер жылы",
      facts: [
        "Нептун — Күн жүйесінің ең алыс сегізінші планетасы.",
        "Күннен қашық болғандықтан оның орбиталық периоды ең ұзындардың бірі.",
        "Алыс объектілердің неге баяу қозғалатынын айқын көрсетеді."
      ]
    },
    pluto: {
      name: "Плутон",
      orbitPeriod: "248 Жер жылы",
      facts: [
        "Плутон карликті планета саналады, бірақ оқу визуализациясы үшін пайдалы.",
        "Орбитасы өте алыс болғандықтан айналу периоды өте ұзақ.",
        "Планеталар мен карликті денелерді салыстыруға мүмкіндік береді."
      ]
    }
  },
  ru: {},
  en: {
    mercury: {
      name: "Mercury",
      orbitPeriod: "88 Earth days",
      facts: [
        "The closest planet to the Sun experiences the strongest gravitational pull.",
        "Due to its high orbital speed, Mercury completes revolutions faster than other planets.",
        "Its very thin atmosphere causes sharp temperature swings."
      ]
    },
    venus: {
      name: "Venus",
      orbitPeriod: "225 Earth days",
      facts: [
        "Venus has a dense atmosphere that traps heat effectively.",
        "It moves slower than Mercury because it is farther from the Sun.",
        "It is a good example of how distance affects orbital period."
      ]
    },
    earth: {
      name: "Earth",
      orbitPeriod: "365 days",
      facts: [
        "Earth stays in orbit due to the balance of speed and the Sun's gravity.",
        "If speed decreases, orbit shifts closer to the Sun.",
        "If speed increases, orbit moves farther away."
      ]
    },
    mars: {
      name: "Mars",
      orbitPeriod: "687 days",
      facts: [
        "Mars is farther from the Sun, so it orbits slower than Earth.",
        "Its orbital period is nearly twice as long as Earth's.",
        "Mars helps explain the link between distance and orbital speed."
      ]
    },
    jupiter: {
      name: "Jupiter",
      orbitPeriod: "11.9 Earth years",
      facts: [
        "Jupiter is the most massive planet and strongly influences nearby bodies.",
        "Being farther from the Sun, it moves slower than inner planets.",
        "It demonstrates how orbital period grows with distance."
      ]
    },
    saturn: {
      name: "Saturn",
      orbitPeriod: "29.5 Earth years",
      facts: [
        "Saturn is famous for rings; in this model its distant orbit is key.",
        "It moves slower than Jupiter due to greater distance from the Sun.",
        "Its orbital period is about 30 years."
      ]
    },
    uranus: {
      name: "Uranus",
      orbitPeriod: "84 Earth years",
      facts: [
        "Uranus is an ice giant located far from the Sun.",
        "At large distances, the Sun's gravity is weaker and orbital motion slows down.",
        "One orbit takes many decades."
      ]
    },
    neptune: {
      name: "Neptune",
      orbitPeriod: "165 Earth years",
      facts: [
        "Neptune is the farthest of the eight planets.",
        "Its great distance from the Sun gives it a very long orbital period.",
        "It clearly shows why distant objects move more slowly."
      ]
    },
    pluto: {
      name: "Pluto",
      orbitPeriod: "248 Earth years",
      facts: [
        "Pluto is classified as a dwarf planet but is useful for educational visualization.",
        "Its distant orbit gives it a very long revolution period.",
        "It helps compare planets and dwarf objects in one model."
      ]
    }
  }
};

planetTextByLocale.ru = {
  mercury: { name: "Меркурий", orbitPeriod: "88 земных суток", facts: ["Ближайшая к Солнцу планета получает самое сильное притяжение.", "Из-за высокой орбитальной скорости Меркурий делает оборот быстрее остальных планет.", "На Меркурии почти нет атмосферы, поэтому температуры резко меняются."] },
  venus: { name: "Венера", orbitPeriod: "225 земных суток", facts: ["Венера имеет плотную атмосферу, которая сильно удерживает тепло.", "Планета движется по орбите медленнее Меркурия, так как находится дальше от Солнца.", "Это хороший пример влияния расстояния до Солнца на орбитальный период."] },
  earth: { name: "Земля", orbitPeriod: "365 суток", facts: ["Земля удерживается на орбите балансом скорости и гравитации Солнца.", "Если скорость уменьшить, орбита станет ближе к Солнцу.", "Если увеличить скорость, орбита станет более удаленной."] },
  mars: { name: "Марс", orbitPeriod: "687 суток", facts: ["Марс дальше от Солнца, поэтому делает оборот медленнее Земли.", "Его орбитальный период почти в два раза длиннее земного.", "Марс помогает понять связь расстояния и скорости движения."] },
  jupiter: { name: "Юпитер", orbitPeriod: "11.9 земных лет", facts: ["Юпитер — самая массивная планета, его гравитация заметно влияет на другие тела.", "Из-за большой удаленности от Солнца он движется по орбите медленнее внутренних планет.", "Его пример показывает, как орбитальный период растет с расстоянием."] },
  saturn: { name: "Сатурн", orbitPeriod: "29.5 земных лет", facts: ["Сатурн известен кольцами, но в модели главное — его дальняя орбита.", "Планета движется заметно медленнее Юпитера из-за большей дистанции до Солнца.", "Орбитальный период Сатурна почти 30 лет."] },
  uranus: { name: "Уран", orbitPeriod: "84 земных года", facts: ["Уран относится к ледяным гигантам и находится далеко от Солнца.", "На большом расстоянии гравитация Солнца слабее, поэтому орбитальное движение медленнее.", "Один оборот Урана длится десятки земных лет."] },
  neptune: { name: "Нептун", orbitPeriod: "165 земных лет", facts: ["Нептун — самая дальняя из восьми планет Солнечной системы.", "Большая дистанция до Солнца делает его орбиту самой длинной по времени среди планет.", "Это наглядный пример того, как медленно движутся далекие объекты."] },
  pluto: { name: "Плутон", orbitPeriod: "248 земных лет", facts: ["Плутон считается карликовой планетой, но полезен для учебной визуализации.", "Его орбита очень удалена, поэтому период обращения очень длинный.", "Плутон помогает сравнить планеты и карликовые объекты в одной модели."] }
};

export const spaceMissionsByLocale: Record<Locale, Record<string, SpaceMissionText>> = {
  kk: {
    "mission-fastest": {
      question: "Орбитасы ең жылдам планетаны тап.",
      hint: "Ол Күнге ең жақын орналасқан.",
      explanation: "Күнге жақын объектілерде тартылыс күштірек, сондықтан орбиталық жылдамдық жоғары болады."
    },
    "mission-longest-period": {
      question: "Орбиталық периоды ең ұзын объектіні таңда.",
      hint: "Бұл ең алыс орбитадағы карликті планета.",
      explanation: "Орбита үлкен болған сайын айналу жолы ұзарып, период та ұлғаяды."
    },
    "mission-rings": {
      question: "Айқын сақиналары бар объектіні тап.",
      hint: "Сақиналарымен ең танымал планета.",
      explanation: "Сатурн мектеп моделдерінде сақиналары арқылы бірден танылады."
    }
  },
  ru: {
    "mission-fastest": {
      question: "Найди самую быструю планету по орбите.",
      hint: "Она ближе всех к Солнцу.",
      explanation: "Ближе к Солнцу — сильнее гравитация, поэтому орбитальная скорость выше."
    },
    "mission-longest-period": {
      question: "Выбери объект с самым длинным орбитальным периодом.",
      hint: "Это карликовая планета на самой дальней орбите.",
      explanation: "Чем дальше орбита, тем длиннее путь и тем больше период обращения."
    },
    "mission-rings": {
      question: "Найди объект с заметными кольцами.",
      hint: "Самый известный обладатель колец в школьных учебниках.",
      explanation: "У Сатурна наиболее заметные кольца, поэтому он легко узнается в модели."
    }
  },
  en: {
    "mission-fastest": {
      question: "Find the fastest planet in orbit.",
      hint: "It is the closest one to the Sun.",
      explanation: "Closer to the Sun means stronger gravity, which requires higher orbital speed."
    },
    "mission-longest-period": {
      question: "Choose the object with the longest orbital period.",
      hint: "It is a dwarf planet on the farthest orbit.",
      explanation: "A larger orbit means a longer path, so the revolution period is longer."
    },
    "mission-rings": {
      question: "Find the object with visible rings.",
      hint: "The most famous ringed planet.",
      explanation: "Saturn has the most prominent rings, so it is easiest to identify."
    }
  }
};
