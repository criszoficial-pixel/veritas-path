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

export const books: Book[] = [
  // Antiguo Testamento
  { id: 1, name: 'Génesis', shortName: 'Gén', testament: 'AT', chapters: 50 },
  { id: 2, name: 'Éxodo', shortName: 'Éx', testament: 'AT', chapters: 40 },
  { id: 3, name: 'Levítico', shortName: 'Lev', testament: 'AT', chapters: 27 },
  { id: 4, name: 'Números', shortName: 'Núm', testament: 'AT', chapters: 36 },
  { id: 5, name: 'Deuteronomio', shortName: 'Deut', testament: 'AT', chapters: 34 },
  { id: 6, name: 'Josué', shortName: 'Jos', testament: 'AT', chapters: 24 },
  { id: 7, name: 'Jueces', shortName: 'Jue', testament: 'AT', chapters: 21 },
  { id: 8, name: 'Rut', shortName: 'Rut', testament: 'AT', chapters: 4 },
  { id: 9, name: '1 Samuel', shortName: '1 Sam', testament: 'AT', chapters: 31 },
  { id: 10, name: '2 Samuel', shortName: '2 Sam', testament: 'AT', chapters: 24 },
  { id: 11, name: '1 Reyes', shortName: '1 Rey', testament: 'AT', chapters: 22 },
  { id: 12, name: '2 Reyes', shortName: '2 Rey', testament: 'AT', chapters: 25 },
  { id: 13, name: '1 Crónicas', shortName: '1 Cr', testament: 'AT', chapters: 29 },
  { id: 14, name: '2 Crónicas', shortName: '2 Cr', testament: 'AT', chapters: 36 },
  { id: 15, name: 'Esdras', shortName: 'Esd', testament: 'AT', chapters: 10 },
  { id: 16, name: 'Nehemías', shortName: 'Neh', testament: 'AT', chapters: 13 },
  { id: 17, name: 'Ester', shortName: 'Est', testament: 'AT', chapters: 10 },
  { id: 18, name: 'Job', shortName: 'Job', testament: 'AT', chapters: 42 },
  { id: 19, name: 'Salmos', shortName: 'Sal', testament: 'AT', chapters: 150 },
  { id: 20, name: 'Proverbios', shortName: 'Prov', testament: 'AT', chapters: 31 },
  { id: 21, name: 'Eclesiastés', shortName: 'Ecl', testament: 'AT', chapters: 12 },
  { id: 22, name: 'Cantares', shortName: 'Cnt', testament: 'AT', chapters: 8 },
  { id: 23, name: 'Isaías', shortName: 'Is', testament: 'AT', chapters: 66 },
  { id: 24, name: 'Jeremías', shortName: 'Jer', testament: 'AT', chapters: 52 },
  { id: 25, name: 'Lamentaciones', shortName: 'Lam', testament: 'AT', chapters: 5 },
  { id: 26, name: 'Ezequiel', shortName: 'Ez', testament: 'AT', chapters: 48 },
  { id: 27, name: 'Daniel', shortName: 'Dan', testament: 'AT', chapters: 12 },
  { id: 28, name: 'Oseas', shortName: 'Os', testament: 'AT', chapters: 14 },
  { id: 29, name: 'Joel', shortName: 'Jl', testament: 'AT', chapters: 3 },
  { id: 30, name: 'Amós', shortName: 'Am', testament: 'AT', chapters: 9 },
  { id: 31, name: 'Abdías', shortName: 'Abd', testament: 'AT', chapters: 1 },
  { id: 32, name: 'Jonás', shortName: 'Jon', testament: 'AT', chapters: 4 },
  { id: 33, name: 'Miqueas', shortName: 'Miq', testament: 'AT', chapters: 7 },
  { id: 34, name: 'Nahúm', shortName: 'Nah', testament: 'AT', chapters: 3 },
  { id: 35, name: 'Habacuc', shortName: 'Hab', testament: 'AT', chapters: 3 },
  { id: 36, name: 'Sofonías', shortName: 'Sof', testament: 'AT', chapters: 3 },
  { id: 37, name: 'Hageo', shortName: 'Hag', testament: 'AT', chapters: 2 },
  { id: 38, name: 'Zacarías', shortName: 'Zac', testament: 'AT', chapters: 14 },
  { id: 39, name: 'Malaquías', shortName: 'Mal', testament: 'AT', chapters: 4 },
  // Nuevo Testamento
  { id: 40, name: 'Mateo', shortName: 'Mt', testament: 'NT', chapters: 28 },
  { id: 41, name: 'Marcos', shortName: 'Mr', testament: 'NT', chapters: 16 },
  { id: 42, name: 'Lucas', shortName: 'Lc', testament: 'NT', chapters: 24 },
  { id: 43, name: 'Juan', shortName: 'Jn', testament: 'NT', chapters: 21 },
  { id: 44, name: 'Hechos', shortName: 'Hch', testament: 'NT', chapters: 28 },
  { id: 45, name: 'Romanos', shortName: 'Ro', testament: 'NT', chapters: 16 },
  { id: 46, name: '1 Corintios', shortName: '1 Co', testament: 'NT', chapters: 16 },
  { id: 47, name: '2 Corintios', shortName: '2 Co', testament: 'NT', chapters: 13 },
  { id: 48, name: 'Gálatas', shortName: 'Gá', testament: 'NT', chapters: 6 },
  { id: 49, name: 'Efesios', shortName: 'Ef', testament: 'NT', chapters: 6 },
  { id: 50, name: 'Filipenses', shortName: 'Fil', testament: 'NT', chapters: 4 },
  { id: 51, name: 'Colosenses', shortName: 'Col', testament: 'NT', chapters: 4 },
  { id: 52, name: '1 Tesalonicenses', shortName: '1 Ts', testament: 'NT', chapters: 5 },
  { id: 53, name: '2 Tesalonicenses', shortName: '2 Ts', testament: 'NT', chapters: 3 },
  { id: 54, name: '1 Timoteo', shortName: '1 Ti', testament: 'NT', chapters: 6 },
  { id: 55, name: '2 Timoteo', shortName: '2 Ti', testament: 'NT', chapters: 4 },
  { id: 56, name: 'Tito', shortName: 'Tit', testament: 'NT', chapters: 3 },
  { id: 57, name: 'Filemón', shortName: 'Flm', testament: 'NT', chapters: 1 },
  { id: 58, name: 'Hebreos', shortName: 'He', testament: 'NT', chapters: 13 },
  { id: 59, name: 'Santiago', shortName: 'Stg', testament: 'NT', chapters: 5 },
  { id: 60, name: '1 Pedro', shortName: '1 P', testament: 'NT', chapters: 5 },
  { id: 61, name: '2 Pedro', shortName: '2 P', testament: 'NT', chapters: 3 },
  { id: 62, name: '1 Juan', shortName: '1 Jn', testament: 'NT', chapters: 5 },
  { id: 63, name: '2 Juan', shortName: '2 Jn', testament: 'NT', chapters: 1 },
  { id: 64, name: '3 Juan', shortName: '3 Jn', testament: 'NT', chapters: 1 },
  { id: 65, name: 'Judas', shortName: 'Jud', testament: 'NT', chapters: 1 },
  { id: 66, name: 'Apocalipsis', shortName: 'Ap', testament: 'NT', chapters: 22 },
];

// Sample verses for demonstration (Psalm 23 - Salmo 23)
export const sampleVerses: Record<string, Verse[]> = {
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
};

// Daily verses collection
export const dailyVerses: DailyVerse[] = [
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
];

export const getDailyVerse = (): DailyVerse => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return dailyVerses[dayOfYear % dailyVerses.length];
};

export const getVerses = (bookName: string, chapter: number): Verse[] => {
  const key = `${bookName}-${chapter}`;
  return sampleVerses[key] || [];
};
