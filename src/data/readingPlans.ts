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

// Bible in 1 Year Plan - 3-4 chapters per day
const bibleIn1YearSchedule: ReadingPlanDay[] = [
  { day: 1, readings: [{ bookSlug: 'genesis', chapter: 1 }, { bookSlug: 'genesis', chapter: 2 }, { bookSlug: 'genesis', chapter: 3 }] },
  { day: 2, readings: [{ bookSlug: 'genesis', chapter: 4 }, { bookSlug: 'genesis', chapter: 5 }, { bookSlug: 'genesis', chapter: 6 }] },
  { day: 3, readings: [{ bookSlug: 'genesis', chapter: 7 }, { bookSlug: 'genesis', chapter: 8 }, { bookSlug: 'genesis', chapter: 9 }] },
  { day: 4, readings: [{ bookSlug: 'genesis', chapter: 10 }, { bookSlug: 'genesis', chapter: 11 }, { bookSlug: 'genesis', chapter: 12 }] },
  { day: 5, readings: [{ bookSlug: 'genesis', chapter: 13 }, { bookSlug: 'genesis', chapter: 14 }, { bookSlug: 'genesis', chapter: 15 }] },
  { day: 6, readings: [{ bookSlug: 'genesis', chapter: 16 }, { bookSlug: 'genesis', chapter: 17 }, { bookSlug: 'genesis', chapter: 18 }] },
  { day: 7, readings: [{ bookSlug: 'genesis', chapter: 19 }, { bookSlug: 'genesis', chapter: 20 }, { bookSlug: 'genesis', chapter: 21 }] },
  { day: 8, readings: [{ bookSlug: 'genesis', chapter: 22 }, { bookSlug: 'genesis', chapter: 23 }, { bookSlug: 'genesis', chapter: 24 }] },
  { day: 9, readings: [{ bookSlug: 'genesis', chapter: 25 }, { bookSlug: 'genesis', chapter: 26 }, { bookSlug: 'genesis', chapter: 27 }] },
  { day: 10, readings: [{ bookSlug: 'genesis', chapter: 28 }, { bookSlug: 'genesis', chapter: 29 }, { bookSlug: 'genesis', chapter: 30 }] },
];

// New Testament in 90 Days - ~3 chapters per day
const ntIn90DaysSchedule: ReadingPlanDay[] = [
  { day: 1, readings: [{ bookSlug: 'mateo', chapter: 1 }, { bookSlug: 'mateo', chapter: 2 }, { bookSlug: 'mateo', chapter: 3 }] },
  { day: 2, readings: [{ bookSlug: 'mateo', chapter: 4 }, { bookSlug: 'mateo', chapter: 5 }] },
  { day: 3, readings: [{ bookSlug: 'mateo', chapter: 6 }, { bookSlug: 'mateo', chapter: 7 }] },
  { day: 4, readings: [{ bookSlug: 'mateo', chapter: 8 }, { bookSlug: 'mateo', chapter: 9 }] },
  { day: 5, readings: [{ bookSlug: 'mateo', chapter: 10 }, { bookSlug: 'mateo', chapter: 11 }] },
  { day: 6, readings: [{ bookSlug: 'mateo', chapter: 12 }, { bookSlug: 'mateo', chapter: 13 }] },
  { day: 7, readings: [{ bookSlug: 'mateo', chapter: 14 }, { bookSlug: 'mateo', chapter: 15 }] },
  { day: 8, readings: [{ bookSlug: 'mateo', chapter: 16 }, { bookSlug: 'mateo', chapter: 17 }] },
  { day: 9, readings: [{ bookSlug: 'mateo', chapter: 18 }, { bookSlug: 'mateo', chapter: 19 }] },
  { day: 10, readings: [{ bookSlug: 'mateo', chapter: 20 }, { bookSlug: 'mateo', chapter: 21 }] },
];

// Psalms and Proverbs in 30 Days
const psalmsProverbsSchedule: ReadingPlanDay[] = [
  { day: 1, readings: [{ bookSlug: 'salmos', chapter: 1 }, { bookSlug: 'salmos', chapter: 2 }, { bookSlug: 'salmos', chapter: 3 }, { bookSlug: 'salmos', chapter: 4 }, { bookSlug: 'salmos', chapter: 5 }, { bookSlug: 'proverbios', chapter: 1 }] },
  { day: 2, readings: [{ bookSlug: 'salmos', chapter: 6 }, { bookSlug: 'salmos', chapter: 7 }, { bookSlug: 'salmos', chapter: 8 }, { bookSlug: 'salmos', chapter: 9 }, { bookSlug: 'salmos', chapter: 10 }, { bookSlug: 'proverbios', chapter: 2 }] },
  { day: 3, readings: [{ bookSlug: 'salmos', chapter: 11 }, { bookSlug: 'salmos', chapter: 12 }, { bookSlug: 'salmos', chapter: 13 }, { bookSlug: 'salmos', chapter: 14 }, { bookSlug: 'salmos', chapter: 15 }, { bookSlug: 'proverbios', chapter: 3 }] },
  { day: 4, readings: [{ bookSlug: 'salmos', chapter: 16 }, { bookSlug: 'salmos', chapter: 17 }, { bookSlug: 'salmos', chapter: 18 }, { bookSlug: 'proverbios', chapter: 4 }] },
  { day: 5, readings: [{ bookSlug: 'salmos', chapter: 19 }, { bookSlug: 'salmos', chapter: 20 }, { bookSlug: 'salmos', chapter: 21 }, { bookSlug: 'salmos', chapter: 22 }, { bookSlug: 'salmos', chapter: 23 }, { bookSlug: 'proverbios', chapter: 5 }] },
  { day: 6, readings: [{ bookSlug: 'salmos', chapter: 24 }, { bookSlug: 'salmos', chapter: 25 }, { bookSlug: 'salmos', chapter: 26 }, { bookSlug: 'salmos', chapter: 27 }, { bookSlug: 'salmos', chapter: 28 }, { bookSlug: 'proverbios', chapter: 6 }] },
  { day: 7, readings: [{ bookSlug: 'salmos', chapter: 29 }, { bookSlug: 'salmos', chapter: 30 }, { bookSlug: 'salmos', chapter: 31 }, { bookSlug: 'salmos', chapter: 32 }, { bookSlug: 'proverbios', chapter: 7 }] },
  { day: 8, readings: [{ bookSlug: 'salmos', chapter: 33 }, { bookSlug: 'salmos', chapter: 34 }, { bookSlug: 'salmos', chapter: 35 }, { bookSlug: 'salmos', chapter: 36 }, { bookSlug: 'proverbios', chapter: 8 }] },
  { day: 9, readings: [{ bookSlug: 'salmos', chapter: 37 }, { bookSlug: 'salmos', chapter: 38 }, { bookSlug: 'salmos', chapter: 39 }, { bookSlug: 'salmos', chapter: 40 }, { bookSlug: 'proverbios', chapter: 9 }] },
  { day: 10, readings: [{ bookSlug: 'salmos', chapter: 41 }, { bookSlug: 'salmos', chapter: 42 }, { bookSlug: 'salmos', chapter: 43 }, { bookSlug: 'salmos', chapter: 44 }, { bookSlug: 'salmos', chapter: 45 }, { bookSlug: 'proverbios', chapter: 10 }] },
];

// Gospel of John - 1 chapter per day for 21 days
const johnGospelSchedule: ReadingPlanDay[] = Array.from({ length: 21 }, (_, i) => ({
  day: i + 1,
  readings: [{ bookSlug: 'juan', chapter: i + 1 }],
}));

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
];

export function getReadingPlan(planId: string): ReadingPlan | undefined {
  return readingPlans.find((p) => p.id === planId);
}

export function getDayReadings(planId: string, day: number): ReadingPlanDay | undefined {
  const plan = getReadingPlan(planId);
  if (!plan) return undefined;
  return plan.schedule.find((d) => d.day === day);
}
