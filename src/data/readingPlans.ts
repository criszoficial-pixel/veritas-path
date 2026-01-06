// Reading plans data

export interface ReadingPlanDay {
  day: number;
  readings: { bookSlug: string; chapter: number }[];
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalDays: number;
  icon: 'book' | 'calendar' | 'star' | 'heart';
  schedule: ReadingPlanDay[];
}

// All Bible books with chapter counts
const allBibleBooks = [
  // Old Testament (39 books, 929 chapters)
  { slug: 'genesis', chapters: 50 },
  { slug: 'exodo', chapters: 40 },
  { slug: 'levitico', chapters: 27 },
  { slug: 'numeros', chapters: 36 },
  { slug: 'deuteronomio', chapters: 34 },
  { slug: 'josue', chapters: 24 },
  { slug: 'jueces', chapters: 21 },
  { slug: 'rut', chapters: 4 },
  { slug: '1-samuel', chapters: 31 },
  { slug: '2-samuel', chapters: 24 },
  { slug: '1-reyes', chapters: 22 },
  { slug: '2-reyes', chapters: 25 },
  { slug: '1-cronicas', chapters: 29 },
  { slug: '2-cronicas', chapters: 36 },
  { slug: 'esdras', chapters: 10 },
  { slug: 'nehemias', chapters: 13 },
  { slug: 'ester', chapters: 10 },
  { slug: 'job', chapters: 42 },
  { slug: 'salmos', chapters: 150 },
  { slug: 'proverbios', chapters: 31 },
  { slug: 'eclesiastes', chapters: 12 },
  { slug: 'cantares', chapters: 8 },
  { slug: 'isaias', chapters: 66 },
  { slug: 'jeremias', chapters: 52 },
  { slug: 'lamentaciones', chapters: 5 },
  { slug: 'ezequiel', chapters: 48 },
  { slug: 'daniel', chapters: 12 },
  { slug: 'oseas', chapters: 14 },
  { slug: 'joel', chapters: 3 },
  { slug: 'amos', chapters: 9 },
  { slug: 'abdias', chapters: 1 },
  { slug: 'jonas', chapters: 4 },
  { slug: 'miqueas', chapters: 7 },
  { slug: 'nahum', chapters: 3 },
  { slug: 'habacuc', chapters: 3 },
  { slug: 'sofonias', chapters: 3 },
  { slug: 'hageo', chapters: 2 },
  { slug: 'zacarias', chapters: 14 },
  { slug: 'malaquias', chapters: 4 },
  // New Testament (27 books, 260 chapters)
  { slug: 'mateo', chapters: 28 },
  { slug: 'marcos', chapters: 16 },
  { slug: 'lucas', chapters: 24 },
  { slug: 'juan', chapters: 21 },
  { slug: 'hechos', chapters: 28 },
  { slug: 'romanos', chapters: 16 },
  { slug: '1-corintios', chapters: 16 },
  { slug: '2-corintios', chapters: 13 },
  { slug: 'galatas', chapters: 6 },
  { slug: 'efesios', chapters: 6 },
  { slug: 'filipenses', chapters: 4 },
  { slug: 'colosenses', chapters: 4 },
  { slug: '1-tesalonicenses', chapters: 5 },
  { slug: '2-tesalonicenses', chapters: 3 },
  { slug: '1-timoteo', chapters: 6 },
  { slug: '2-timoteo', chapters: 4 },
  { slug: 'tito', chapters: 3 },
  { slug: 'filemon', chapters: 1 },
  { slug: 'hebreos', chapters: 13 },
  { slug: 'santiago', chapters: 5 },
  { slug: '1-pedro', chapters: 5 },
  { slug: '2-pedro', chapters: 3 },
  { slug: '1-juan', chapters: 5 },
  { slug: '2-juan', chapters: 1 },
  { slug: '3-juan', chapters: 1 },
  { slug: 'judas', chapters: 1 },
  { slug: 'apocalipsis', chapters: 22 },
];

// New Testament books only
const ntBooks = allBibleBooks.slice(39); // From Mateo onwards

// Generate schedule distributing chapters across days
function generateFlexibleSchedule(
  books: { slug: string; chapters: number }[],
  totalDays: number
): ReadingPlanDay[] {
  // Create flat list of all chapters
  const allChapters: { bookSlug: string; chapter: number }[] = [];
  for (const book of books) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      allChapters.push({ bookSlug: book.slug, chapter: ch });
    }
  }

  const totalChapters = allChapters.length;
  const schedule: ReadingPlanDay[] = [];
  let chapterIndex = 0;

  for (let day = 1; day <= totalDays; day++) {
    const remainingDays = totalDays - day + 1;
    const remainingChapters = totalChapters - chapterIndex;
    const chaptersToday = Math.ceil(remainingChapters / remainingDays);

    const readings = allChapters.slice(chapterIndex, chapterIndex + chaptersToday);
    schedule.push({ day, readings });
    chapterIndex += chaptersToday;
  }

  return schedule;
}

// Bible in 1 Year Plan - 1,189 chapters in 365 days (~3.26 chapters/day)
const bibleIn1YearSchedule = generateFlexibleSchedule(allBibleBooks, 365);

// New Testament in 90 Days - 260 chapters in 90 days (~2.89 chapters/day)
const ntIn90DaysSchedule = generateFlexibleSchedule(ntBooks, 90);

// Psalms and Proverbs in 30 Days - 5 Psalms + 1 Proverb per day
function generatePsalmsProverbsSchedule(): ReadingPlanDay[] {
  const schedule: ReadingPlanDay[] = [];
  let psalmIndex = 1;

  for (let day = 1; day <= 30; day++) {
    const readings: { bookSlug: string; chapter: number }[] = [];

    // Add 5 Psalms per day (150 Psalms / 30 days = 5/day)
    for (let i = 0; i < 5 && psalmIndex <= 150; i++) {
      readings.push({ bookSlug: 'salmos', chapter: psalmIndex });
      psalmIndex++;
    }

    // Add 1 Proverb per day (31 Proverbs for 30 days)
    if (day <= 30) {
      readings.push({ bookSlug: 'proverbios', chapter: day });
    }
    // Add Proverbs 31 on day 30
    if (day === 30) {
      readings.push({ bookSlug: 'proverbios', chapter: 31 });
    }

    schedule.push({ day, readings });
  }

  return schedule;
}

const psalmsProverbsSchedule = generatePsalmsProverbsSchedule();

// Gospel of John - 1 chapter per day for 21 days
const johnGospelSchedule: ReadingPlanDay[] = Array.from({ length: 21 }, (_, i) => ({
  day: i + 1,
  readings: [{ bookSlug: 'juan', chapter: i + 1 }],
}));

// Gospels (Matthew, Mark, Luke, John) - 89 chapters in 60 days
const gospelsBooks = [
  { slug: 'mateo', chapters: 28 },
  { slug: 'marcos', chapters: 16 },
  { slug: 'lucas', chapters: 24 },
  { slug: 'juan', chapters: 21 },
];
const gospelsSchedule = generateFlexibleSchedule(gospelsBooks, 60);

// Paul's Letters - 87 chapters in 45 days
const paulLettersBooks = [
  { slug: 'romanos', chapters: 16 },
  { slug: '1-corintios', chapters: 16 },
  { slug: '2-corintios', chapters: 13 },
  { slug: 'galatas', chapters: 6 },
  { slug: 'efesios', chapters: 6 },
  { slug: 'filipenses', chapters: 4 },
  { slug: 'colosenses', chapters: 4 },
  { slug: '1-tesalonicenses', chapters: 5 },
  { slug: '2-tesalonicenses', chapters: 3 },
  { slug: '1-timoteo', chapters: 6 },
  { slug: '2-timoteo', chapters: 4 },
  { slug: 'tito', chapters: 3 },
  { slug: 'filemon', chapters: 1 },
];
const paulLettersSchedule = generateFlexibleSchedule(paulLettersBooks, 45);

// Genesis to Exodus - 90 chapters in 30 days
const genesisExodusBooks = [
  { slug: 'genesis', chapters: 50 },
  { slug: 'exodo', chapters: 40 },
];
const genesisExodusSchedule = generateFlexibleSchedule(genesisExodusBooks, 30);

// Sermon on the Mount - Matthew 5, 6, 7 with reflection days
const sermonMountSchedule: ReadingPlanDay[] = [
  { day: 1, readings: [{ bookSlug: 'mateo', chapter: 5 }] },
  { day: 2, readings: [{ bookSlug: 'mateo', chapter: 5 }] },
  { day: 3, readings: [{ bookSlug: 'mateo', chapter: 6 }] },
  { day: 4, readings: [{ bookSlug: 'mateo', chapter: 6 }] },
  { day: 5, readings: [{ bookSlug: 'mateo', chapter: 7 }] },
  { day: 6, readings: [{ bookSlug: 'mateo', chapter: 7 }] },
  { day: 7, readings: [{ bookSlug: 'mateo', chapter: 5 }, { bookSlug: 'mateo', chapter: 6 }, { bookSlug: 'mateo', chapter: 7 }] },
];

export const readingPlans: ReadingPlan[] = [
  {
    id: 'bible-1-year',
    title: 'Biblia en 1 Año',
    description: 'Lee toda la Biblia en 365 días con 3-4 capítulos diarios',
    duration: '365 días',
    totalDays: 365,
    icon: 'book',
    schedule: bibleIn1YearSchedule,
  },
  {
    id: 'nt-90-days',
    title: 'Nuevo Testamento en 90 Días',
    description: 'Completa el Nuevo Testamento en 3 meses',
    duration: '90 días',
    totalDays: 90,
    icon: 'calendar',
    schedule: ntIn90DaysSchedule,
  },
  {
    id: 'psalms-proverbs',
    title: 'Salmos y Proverbios',
    description: 'Sabiduría y adoración en 30 días',
    duration: '30 días',
    totalDays: 30,
    icon: 'star',
    schedule: psalmsProverbsSchedule,
  },
  {
    id: 'john-gospel',
    title: 'Evangelio de Juan',
    description: 'Conoce a Jesús a través del discípulo amado',
    duration: '21 días',
    totalDays: 21,
    icon: 'heart',
    schedule: johnGospelSchedule,
  },
  {
    id: 'gospels',
    title: 'Los 4 Evangelios',
    description: 'Conoce la vida de Jesús desde 4 perspectivas diferentes',
    duration: '60 días',
    totalDays: 60,
    icon: 'book',
    schedule: gospelsSchedule,
  },
  {
    id: 'paul-letters',
    title: 'Cartas de Pablo',
    description: 'Toda la enseñanza del apóstol Pablo a las iglesias',
    duration: '45 días',
    totalDays: 45,
    icon: 'calendar',
    schedule: paulLettersSchedule,
  },
  {
    id: 'genesis-exodus',
    title: 'Génesis a Éxodo',
    description: 'Desde la creación hasta la liberación de Israel',
    duration: '30 días',
    totalDays: 30,
    icon: 'star',
    schedule: genesisExodusSchedule,
  },
  {
    id: 'sermon-mount',
    title: 'Sermón del Monte',
    description: 'Las enseñanzas fundamentales de Jesús en Mateo 5-7',
    duration: '7 días',
    totalDays: 7,
    icon: 'heart',
    schedule: sermonMountSchedule,
  },
];

export function getReadingPlan(planId: string): ReadingPlan | undefined {
  return readingPlans.find((p) => p.id === planId);
}

export function getDayReadings(planId: string, day: number): ReadingPlanDay | undefined {
  const plan = getReadingPlan(planId);
  if (!plan) return undefined;
  return plan.schedule.find((d) => d.day === day);
}
