import type { BookInfo } from '@/types/bible';

export interface BookCategory {
  name: string;
  color: string; // HSL color for the spine
  textColor: string;
}

// Book categories with their colors
export const bookCategories: Record<string, BookCategory> = {
  pentateuco: {
    name: 'Pentateuco',
    color: 'hsl(220, 60%, 35%)', // Deep blue
    textColor: 'hsl(0, 0%, 95%)',
  },
  historicos: {
    name: 'Históricos',
    color: 'hsl(160, 50%, 30%)', // Emerald green
    textColor: 'hsl(0, 0%, 95%)',
  },
  poeticos: {
    name: 'Poéticos',
    color: 'hsl(45, 70%, 40%)', // Golden
    textColor: 'hsl(0, 0%, 10%)',
  },
  profetasMayores: {
    name: 'Profetas Mayores',
    color: 'hsl(280, 45%, 35%)', // Purple
    textColor: 'hsl(0, 0%, 95%)',
  },
  profetasMenores: {
    name: 'Profetas Menores',
    color: 'hsl(15, 55%, 40%)', // Terracotta
    textColor: 'hsl(0, 0%, 95%)',
  },
  evangelios: {
    name: 'Evangelios',
    color: 'hsl(0, 60%, 40%)', // Crimson red
    textColor: 'hsl(0, 0%, 95%)',
  },
  historiaNT: {
    name: 'Historia',
    color: 'hsl(30, 70%, 45%)', // Orange
    textColor: 'hsl(0, 0%, 10%)',
  },
  cartasPaulinas: {
    name: 'Cartas Paulinas',
    color: 'hsl(200, 55%, 45%)', // Sky blue
    textColor: 'hsl(0, 0%, 95%)',
  },
  cartasGenerales: {
    name: 'Cartas Generales',
    color: 'hsl(80, 40%, 35%)', // Olive green
    textColor: 'hsl(0, 0%, 95%)',
  },
  profeciaNT: {
    name: 'Profecía',
    color: 'hsl(270, 50%, 40%)', // Violet
    textColor: 'hsl(0, 0%, 95%)',
  },
};

// Map book IDs to their categories
const bookCategoryMap: Record<number, keyof typeof bookCategories> = {
  // Pentateuco (1-5)
  1: 'pentateuco', 2: 'pentateuco', 3: 'pentateuco', 4: 'pentateuco', 5: 'pentateuco',
  // Históricos (6-17)
  6: 'historicos', 7: 'historicos', 8: 'historicos', 9: 'historicos', 10: 'historicos',
  11: 'historicos', 12: 'historicos', 13: 'historicos', 14: 'historicos', 15: 'historicos',
  16: 'historicos', 17: 'historicos',
  // Poéticos (18-22)
  18: 'poeticos', 19: 'poeticos', 20: 'poeticos', 21: 'poeticos', 22: 'poeticos',
  // Profetas Mayores (23-27)
  23: 'profetasMayores', 24: 'profetasMayores', 25: 'profetasMayores', 
  26: 'profetasMayores', 27: 'profetasMayores',
  // Profetas Menores (28-39)
  28: 'profetasMenores', 29: 'profetasMenores', 30: 'profetasMenores', 31: 'profetasMenores',
  32: 'profetasMenores', 33: 'profetasMenores', 34: 'profetasMenores', 35: 'profetasMenores',
  36: 'profetasMenores', 37: 'profetasMenores', 38: 'profetasMenores', 39: 'profetasMenores',
  // Evangelios (40-43)
  40: 'evangelios', 41: 'evangelios', 42: 'evangelios', 43: 'evangelios',
  // Historia NT (44)
  44: 'historiaNT',
  // Cartas Paulinas (45-57)
  45: 'cartasPaulinas', 46: 'cartasPaulinas', 47: 'cartasPaulinas', 48: 'cartasPaulinas',
  49: 'cartasPaulinas', 50: 'cartasPaulinas', 51: 'cartasPaulinas', 52: 'cartasPaulinas',
  53: 'cartasPaulinas', 54: 'cartasPaulinas', 55: 'cartasPaulinas', 56: 'cartasPaulinas',
  57: 'cartasPaulinas',
  // Cartas Generales (58-65)
  58: 'cartasGenerales', 59: 'cartasGenerales', 60: 'cartasGenerales', 61: 'cartasGenerales',
  62: 'cartasGenerales', 63: 'cartasGenerales', 64: 'cartasGenerales', 65: 'cartasGenerales',
  // Profecía NT (66)
  66: 'profeciaNT',
};

export function getBookCategory(book: BookInfo): BookCategory {
  const categoryKey = bookCategoryMap[book.id];
  return bookCategories[categoryKey] || bookCategories.historicos;
}
