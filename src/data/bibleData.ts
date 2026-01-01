import type { LanguageCode } from '@/types/language';

// Sample Bible data structure - In production, this would come from a database
export interface Book {
  id: number;
  name: string;
  shortName: string;
  testament: 'AT' | 'NT';
  chapters: number;
}

export interface Verse {
  number: number;
  text: string;
}

export interface DailyVerse {
  verse: string;
  reference: string;
  reflection: string;
}

// Book names by language
const bookNames: Record<LanguageCode, Record<number, { name: string; shortName: string }>> = {
  es: {
    1: { name: 'Génesis', shortName: 'Gén' },
    2: { name: 'Éxodo', shortName: 'Éx' },
    3: { name: 'Levítico', shortName: 'Lev' },
    4: { name: 'Números', shortName: 'Núm' },
    5: { name: 'Deuteronomio', shortName: 'Deut' },
    6: { name: 'Josué', shortName: 'Jos' },
    7: { name: 'Jueces', shortName: 'Jue' },
    8: { name: 'Rut', shortName: 'Rut' },
    9: { name: '1 Samuel', shortName: '1 Sam' },
    10: { name: '2 Samuel', shortName: '2 Sam' },
    11: { name: '1 Reyes', shortName: '1 Rey' },
    12: { name: '2 Reyes', shortName: '2 Rey' },
    13: { name: '1 Crónicas', shortName: '1 Cr' },
    14: { name: '2 Crónicas', shortName: '2 Cr' },
    15: { name: 'Esdras', shortName: 'Esd' },
    16: { name: 'Nehemías', shortName: 'Neh' },
    17: { name: 'Ester', shortName: 'Est' },
    18: { name: 'Job', shortName: 'Job' },
    19: { name: 'Salmos', shortName: 'Sal' },
    20: { name: 'Proverbios', shortName: 'Prov' },
    21: { name: 'Eclesiastés', shortName: 'Ecl' },
    22: { name: 'Cantares', shortName: 'Cnt' },
    23: { name: 'Isaías', shortName: 'Is' },
    24: { name: 'Jeremías', shortName: 'Jer' },
    25: { name: 'Lamentaciones', shortName: 'Lam' },
    26: { name: 'Ezequiel', shortName: 'Ez' },
    27: { name: 'Daniel', shortName: 'Dan' },
    28: { name: 'Oseas', shortName: 'Os' },
    29: { name: 'Joel', shortName: 'Jl' },
    30: { name: 'Amós', shortName: 'Am' },
    31: { name: 'Abdías', shortName: 'Abd' },
    32: { name: 'Jonás', shortName: 'Jon' },
    33: { name: 'Miqueas', shortName: 'Miq' },
    34: { name: 'Nahúm', shortName: 'Nah' },
    35: { name: 'Habacuc', shortName: 'Hab' },
    36: { name: 'Sofonías', shortName: 'Sof' },
    37: { name: 'Hageo', shortName: 'Hag' },
    38: { name: 'Zacarías', shortName: 'Zac' },
    39: { name: 'Malaquías', shortName: 'Mal' },
    40: { name: 'Mateo', shortName: 'Mt' },
    41: { name: 'Marcos', shortName: 'Mr' },
    42: { name: 'Lucas', shortName: 'Lc' },
    43: { name: 'Juan', shortName: 'Jn' },
    44: { name: 'Hechos', shortName: 'Hch' },
    45: { name: 'Romanos', shortName: 'Ro' },
    46: { name: '1 Corintios', shortName: '1 Co' },
    47: { name: '2 Corintios', shortName: '2 Co' },
    48: { name: 'Gálatas', shortName: 'Gá' },
    49: { name: 'Efesios', shortName: 'Ef' },
    50: { name: 'Filipenses', shortName: 'Fil' },
    51: { name: 'Colosenses', shortName: 'Col' },
    52: { name: '1 Tesalonicenses', shortName: '1 Ts' },
    53: { name: '2 Tesalonicenses', shortName: '2 Ts' },
    54: { name: '1 Timoteo', shortName: '1 Ti' },
    55: { name: '2 Timoteo', shortName: '2 Ti' },
    56: { name: 'Tito', shortName: 'Tit' },
    57: { name: 'Filemón', shortName: 'Flm' },
    58: { name: 'Hebreos', shortName: 'He' },
    59: { name: 'Santiago', shortName: 'Stg' },
    60: { name: '1 Pedro', shortName: '1 P' },
    61: { name: '2 Pedro', shortName: '2 P' },
    62: { name: '1 Juan', shortName: '1 Jn' },
    63: { name: '2 Juan', shortName: '2 Jn' },
    64: { name: '3 Juan', shortName: '3 Jn' },
    65: { name: 'Judas', shortName: 'Jud' },
    66: { name: 'Apocalipsis', shortName: 'Ap' },
  },
  en: {
    1: { name: 'Genesis', shortName: 'Gen' },
    2: { name: 'Exodus', shortName: 'Ex' },
    3: { name: 'Leviticus', shortName: 'Lev' },
    4: { name: 'Numbers', shortName: 'Num' },
    5: { name: 'Deuteronomy', shortName: 'Deut' },
    6: { name: 'Joshua', shortName: 'Josh' },
    7: { name: 'Judges', shortName: 'Judg' },
    8: { name: 'Ruth', shortName: 'Ruth' },
    9: { name: '1 Samuel', shortName: '1 Sam' },
    10: { name: '2 Samuel', shortName: '2 Sam' },
    11: { name: '1 Kings', shortName: '1 Kgs' },
    12: { name: '2 Kings', shortName: '2 Kgs' },
    13: { name: '1 Chronicles', shortName: '1 Chr' },
    14: { name: '2 Chronicles', shortName: '2 Chr' },
    15: { name: 'Ezra', shortName: 'Ezra' },
    16: { name: 'Nehemiah', shortName: 'Neh' },
    17: { name: 'Esther', shortName: 'Esth' },
    18: { name: 'Job', shortName: 'Job' },
    19: { name: 'Psalms', shortName: 'Ps' },
    20: { name: 'Proverbs', shortName: 'Prov' },
    21: { name: 'Ecclesiastes', shortName: 'Eccl' },
    22: { name: 'Song of Solomon', shortName: 'Song' },
    23: { name: 'Isaiah', shortName: 'Isa' },
    24: { name: 'Jeremiah', shortName: 'Jer' },
    25: { name: 'Lamentations', shortName: 'Lam' },
    26: { name: 'Ezekiel', shortName: 'Ezek' },
    27: { name: 'Daniel', shortName: 'Dan' },
    28: { name: 'Hosea', shortName: 'Hos' },
    29: { name: 'Joel', shortName: 'Joel' },
    30: { name: 'Amos', shortName: 'Amos' },
    31: { name: 'Obadiah', shortName: 'Obad' },
    32: { name: 'Jonah', shortName: 'Jonah' },
    33: { name: 'Micah', shortName: 'Mic' },
    34: { name: 'Nahum', shortName: 'Nah' },
    35: { name: 'Habakkuk', shortName: 'Hab' },
    36: { name: 'Zephaniah', shortName: 'Zeph' },
    37: { name: 'Haggai', shortName: 'Hag' },
    38: { name: 'Zechariah', shortName: 'Zech' },
    39: { name: 'Malachi', shortName: 'Mal' },
    40: { name: 'Matthew', shortName: 'Matt' },
    41: { name: 'Mark', shortName: 'Mark' },
    42: { name: 'Luke', shortName: 'Luke' },
    43: { name: 'John', shortName: 'John' },
    44: { name: 'Acts', shortName: 'Acts' },
    45: { name: 'Romans', shortName: 'Rom' },
    46: { name: '1 Corinthians', shortName: '1 Cor' },
    47: { name: '2 Corinthians', shortName: '2 Cor' },
    48: { name: 'Galatians', shortName: 'Gal' },
    49: { name: 'Ephesians', shortName: 'Eph' },
    50: { name: 'Philippians', shortName: 'Phil' },
    51: { name: 'Colossians', shortName: 'Col' },
    52: { name: '1 Thessalonians', shortName: '1 Thess' },
    53: { name: '2 Thessalonians', shortName: '2 Thess' },
    54: { name: '1 Timothy', shortName: '1 Tim' },
    55: { name: '2 Timothy', shortName: '2 Tim' },
    56: { name: 'Titus', shortName: 'Titus' },
    57: { name: 'Philemon', shortName: 'Phlm' },
    58: { name: 'Hebrews', shortName: 'Heb' },
    59: { name: 'James', shortName: 'Jas' },
    60: { name: '1 Peter', shortName: '1 Pet' },
    61: { name: '2 Peter', shortName: '2 Pet' },
    62: { name: '1 John', shortName: '1 John' },
    63: { name: '2 John', shortName: '2 John' },
    64: { name: '3 John', shortName: '3 John' },
    65: { name: 'Jude', shortName: 'Jude' },
    66: { name: 'Revelation', shortName: 'Rev' },
  },
  // Other languages default to English names until translations are added
  ar: {}, da: {}, de: {}, el: {}, fi: {}, fr: {}, he: {}, hi: {}, it: {},
  ja: {}, ko: {}, ms: {}, nl: {}, no: {}, pl: {}, pt: {}, ru: {}, sv: {},
  sw: {}, tr: {}, zh: {},
};

// Book chapter counts (same for all languages)
const bookChapters: Record<number, { testament: 'AT' | 'NT'; chapters: number }> = {
  1: { testament: 'AT', chapters: 50 },
  2: { testament: 'AT', chapters: 40 },
  3: { testament: 'AT', chapters: 27 },
  4: { testament: 'AT', chapters: 36 },
  5: { testament: 'AT', chapters: 34 },
  6: { testament: 'AT', chapters: 24 },
  7: { testament: 'AT', chapters: 21 },
  8: { testament: 'AT', chapters: 4 },
  9: { testament: 'AT', chapters: 31 },
  10: { testament: 'AT', chapters: 24 },
  11: { testament: 'AT', chapters: 22 },
  12: { testament: 'AT', chapters: 25 },
  13: { testament: 'AT', chapters: 29 },
  14: { testament: 'AT', chapters: 36 },
  15: { testament: 'AT', chapters: 10 },
  16: { testament: 'AT', chapters: 13 },
  17: { testament: 'AT', chapters: 10 },
  18: { testament: 'AT', chapters: 42 },
  19: { testament: 'AT', chapters: 150 },
  20: { testament: 'AT', chapters: 31 },
  21: { testament: 'AT', chapters: 12 },
  22: { testament: 'AT', chapters: 8 },
  23: { testament: 'AT', chapters: 66 },
  24: { testament: 'AT', chapters: 52 },
  25: { testament: 'AT', chapters: 5 },
  26: { testament: 'AT', chapters: 48 },
  27: { testament: 'AT', chapters: 12 },
  28: { testament: 'AT', chapters: 14 },
  29: { testament: 'AT', chapters: 3 },
  30: { testament: 'AT', chapters: 9 },
  31: { testament: 'AT', chapters: 1 },
  32: { testament: 'AT', chapters: 4 },
  33: { testament: 'AT', chapters: 7 },
  34: { testament: 'AT', chapters: 3 },
  35: { testament: 'AT', chapters: 3 },
  36: { testament: 'AT', chapters: 3 },
  37: { testament: 'AT', chapters: 2 },
  38: { testament: 'AT', chapters: 14 },
  39: { testament: 'AT', chapters: 4 },
  40: { testament: 'NT', chapters: 28 },
  41: { testament: 'NT', chapters: 16 },
  42: { testament: 'NT', chapters: 24 },
  43: { testament: 'NT', chapters: 21 },
  44: { testament: 'NT', chapters: 28 },
  45: { testament: 'NT', chapters: 16 },
  46: { testament: 'NT', chapters: 16 },
  47: { testament: 'NT', chapters: 13 },
  48: { testament: 'NT', chapters: 6 },
  49: { testament: 'NT', chapters: 6 },
  50: { testament: 'NT', chapters: 4 },
  51: { testament: 'NT', chapters: 4 },
  52: { testament: 'NT', chapters: 5 },
  53: { testament: 'NT', chapters: 3 },
  54: { testament: 'NT', chapters: 6 },
  55: { testament: 'NT', chapters: 4 },
  56: { testament: 'NT', chapters: 3 },
  57: { testament: 'NT', chapters: 1 },
  58: { testament: 'NT', chapters: 13 },
  59: { testament: 'NT', chapters: 5 },
  60: { testament: 'NT', chapters: 5 },
  61: { testament: 'NT', chapters: 3 },
  62: { testament: 'NT', chapters: 5 },
  63: { testament: 'NT', chapters: 1 },
  64: { testament: 'NT', chapters: 1 },
  65: { testament: 'NT', chapters: 1 },
  66: { testament: 'NT', chapters: 22 },
};

// Get books for a specific language
export function getBooks(languageCode: LanguageCode = 'es'): Book[] {
  const langNames = bookNames[languageCode];
  const fallbackNames = bookNames.en;

  return Object.entries(bookChapters).map(([idStr, data]) => {
    const id = parseInt(idStr);
    const names = langNames[id] || fallbackNames[id] || { name: `Book ${id}`, shortName: `B${id}` };
    return {
      id,
      name: names.name,
      shortName: names.shortName,
      testament: data.testament,
      chapters: data.chapters,
    };
  });
}

// Legacy export for backward compatibility
export const books = getBooks('es');

// Sample verses by language
const sampleVersesByLanguage: Record<LanguageCode, Record<string, Verse[]>> = {
  es: {
    'Salmos-23': [
      { number: 1, text: 'Jehová es mi pastor; nada me faltará.' },
      { number: 2, text: 'En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.' },
      { number: 3, text: 'Confortará mi alma; me guiará por sendas de justicia por amor de su nombre.' },
      { number: 4, text: 'Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento.' },
      { number: 5, text: 'Aderezas mesa delante de mí en presencia de mis angustiadores; unges mi cabeza con aceite; mi copa está rebosando.' },
      { number: 6, text: 'Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa de Jehová moraré por largos días.' },
    ],
    'Génesis-1': [
      { number: 1, text: 'En el principio creó Dios los cielos y la tierra.' },
      { number: 2, text: 'Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.' },
      { number: 3, text: 'Y dijo Dios: Sea la luz; y fue la luz.' },
      { number: 4, text: 'Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas.' },
      { number: 5, text: 'Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día.' },
      { number: 6, text: 'Luego dijo Dios: Haya expansión en medio de las aguas, y separe las aguas de las aguas.' },
      { number: 7, text: 'E hizo Dios la expansión, y separó las aguas que estaban debajo de la expansión, de las aguas que estaban sobre la expansión. Y fue así.' },
      { number: 8, text: 'Y llamó Dios a la expansión Cielos. Y fue la tarde y la mañana el día segundo.' },
    ],
    'Juan-3': [
      { number: 1, text: 'Había un hombre de los fariseos que se llamaba Nicodemo, un principal entre los judíos.' },
      { number: 2, text: 'Este vino a Jesús de noche, y le dijo: Rabí, sabemos que has venido de Dios como maestro; porque nadie puede hacer estas señales que tú haces, si no está Dios con él.' },
      { number: 3, text: 'Respondió Jesús y le dijo: De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios.' },
      { number: 16, text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.' },
      { number: 17, text: 'Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.' },
    ],
  },
  en: {
    'Psalms-23': [
      { number: 1, text: 'The LORD is my shepherd; I shall not want.' },
      { number: 2, text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
      { number: 3, text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.' },
      { number: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
      { number: 5, text: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.' },
      { number: 6, text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.' },
    ],
    'Genesis-1': [
      { number: 1, text: 'In the beginning God created the heaven and the earth.' },
      { number: 2, text: 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.' },
      { number: 3, text: 'And God said, Let there be light: and there was light.' },
      { number: 4, text: 'And God saw the light, that it was good: and God divided the light from the darkness.' },
      { number: 5, text: 'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.' },
      { number: 6, text: 'And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.' },
      { number: 7, text: 'And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.' },
      { number: 8, text: 'And God called the firmament Heaven. And the evening and the morning were the second day.' },
    ],
    'John-3': [
      { number: 1, text: 'There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:' },
      { number: 2, text: 'The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.' },
      { number: 3, text: 'Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.' },
      { number: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
      { number: 17, text: 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.' },
    ],
  },
  // Other languages - empty until real translations are added
  ar: {}, da: {}, de: {}, el: {}, fi: {}, fr: {}, he: {}, hi: {}, it: {},
  ja: {}, ko: {}, ms: {}, nl: {}, no: {}, pl: {}, pt: {}, ru: {}, sv: {},
  sw: {}, tr: {}, zh: {},
};

// Legacy export
export const sampleVerses = sampleVersesByLanguage.es;

// Daily verses by language
const dailyVersesByLanguage: Record<LanguageCode, DailyVerse[]> = {
  es: [
    {
      verse: 'Jehová es mi pastor; nada me faltará.',
      reference: 'Salmos 23:1',
      reflection: 'Dios cuida de nosotros como un pastor amoroso cuida de sus ovejas. En Él encontramos todo lo que necesitamos.',
    },
    {
      verse: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
      reference: 'Juan 3:16',
      reflection: 'El amor de Dios es tan inmenso que dio lo más preciado por nuestra salvación. Este es el corazón del evangelio.',
    },
    {
      verse: 'Todo lo puedo en Cristo que me fortalece.',
      reference: 'Filipenses 4:13',
      reflection: 'No estamos solos en nuestras luchas. Cristo nos da la fortaleza para superar cualquier desafío.',
    },
    {
      verse: 'Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia.',
      reference: 'Proverbios 3:5',
      reflection: 'La verdadera sabiduría comienza cuando depositamos nuestra confianza completa en Dios.',
    },
    {
      verse: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.',
      reference: 'Isaías 41:10',
      reflection: 'En momentos de incertidumbre, Dios nos recuerda que Su presencia constante es nuestra mayor fortaleza.',
    },
  ],
  en: [
    {
      verse: 'The LORD is my shepherd; I shall not want.',
      reference: 'Psalm 23:1',
      reflection: 'God cares for us as a loving shepherd cares for his sheep. In Him we find everything we need.',
    },
    {
      verse: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
      reference: 'John 3:16',
      reflection: 'God\'s love is so immense that He gave His most precious gift for our salvation. This is the heart of the gospel.',
    },
    {
      verse: 'I can do all things through Christ which strengtheneth me.',
      reference: 'Philippians 4:13',
      reflection: 'We are not alone in our struggles. Christ gives us strength to overcome any challenge.',
    },
    {
      verse: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
      reference: 'Proverbs 3:5',
      reflection: 'True wisdom begins when we place our complete trust in God.',
    },
    {
      verse: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God.',
      reference: 'Isaiah 41:10',
      reflection: 'In moments of uncertainty, God reminds us that His constant presence is our greatest strength.',
    },
  ],
  // Other languages use English as fallback
  ar: [], da: [], de: [], el: [], fi: [], fr: [], he: [], hi: [], it: [],
  ja: [], ko: [], ms: [], nl: [], no: [], pl: [], pt: [], ru: [], sv: [],
  sw: [], tr: [], zh: [],
};

// Legacy export
export const dailyVerses = dailyVersesByLanguage.es;

export const getDailyVerse = (languageCode: LanguageCode = 'es'): DailyVerse => {
  const verses = dailyVersesByLanguage[languageCode];
  const fallbackVerses = dailyVersesByLanguage.en;
  const versesToUse = verses.length > 0 ? verses : fallbackVerses;
  
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return versesToUse[dayOfYear % versesToUse.length];
};

export const getVerses = (bookName: string, chapter: number, languageCode: LanguageCode = 'es'): Verse[] => {
  const key = `${bookName}-${chapter}`;
  const langVerses = sampleVersesByLanguage[languageCode];
  return langVerses?.[key] || [];
};
