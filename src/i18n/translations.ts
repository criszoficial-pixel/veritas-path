import type { LanguageCode } from '@/types/language';

type TranslationKeys = {
  nav: {
    read: string;
    learn: string;
    quizzes: string;
    guide: string;
    profile: string;
  };
  reader: {
    chapter: string;
    previous: string;
    next: string;
    noAudio: string;
    loading: string;
  };
  audio: {
    play: string;
    pause: string;
    speed: string;
    sleepTimer: string;
    off: string;
    minutes: string;
  };
  books: {
    oldTestament: string;
    newTestament: string;
  };
  home: {
    dailyVerse: string;
    reflection: string;
    continueReading: string;
    quickActions: string;
  };
  profile: {
    language: string;
    settings: string;
    version: string;
    comingSoon: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
  };
};

export const translations: Record<LanguageCode, TranslationKeys> = {
  es: {
    nav: {
      read: 'Leer',
      learn: 'Aprender',
      quizzes: 'Quizzes',
      guide: 'Guía',
      profile: 'Perfil',
    },
    reader: {
      chapter: 'Capítulo',
      previous: 'Anterior',
      next: 'Siguiente',
      noAudio: 'Audio no disponible',
      loading: 'Cargando...',
    },
    audio: {
      play: 'Reproducir',
      pause: 'Pausar',
      speed: 'Velocidad',
      sleepTimer: 'Temporizador',
      off: 'Apagado',
      minutes: 'minutos',
    },
    books: {
      oldTestament: 'Antiguo Testamento',
      newTestament: 'Nuevo Testamento',
    },
    home: {
      dailyVerse: 'Versículo del Día',
      reflection: 'Reflexión',
      continueReading: 'Continuar Leyendo',
      quickActions: 'Acciones Rápidas',
    },
    profile: {
      language: 'Idioma',
      settings: 'Configuración',
      version: 'Versión Bíblica',
      comingSoon: 'Próximamente',
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      retry: 'Reintentar',
    },
  },
  en: {
    nav: {
      read: 'Read',
      learn: 'Learn',
      quizzes: 'Quizzes',
      guide: 'Guide',
      profile: 'Profile',
    },
    reader: {
      chapter: 'Chapter',
      previous: 'Previous',
      next: 'Next',
      noAudio: 'Audio not available',
      loading: 'Loading...',
    },
    audio: {
      play: 'Play',
      pause: 'Pause',
      speed: 'Speed',
      sleepTimer: 'Sleep Timer',
      off: 'Off',
      minutes: 'minutes',
    },
    books: {
      oldTestament: 'Old Testament',
      newTestament: 'New Testament',
    },
    home: {
      dailyVerse: 'Verse of the Day',
      reflection: 'Reflection',
      continueReading: 'Continue Reading',
      quickActions: 'Quick Actions',
    },
    profile: {
      language: 'Language',
      settings: 'Settings',
      version: 'Bible Version',
      comingSoon: 'Coming Soon',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
    },
  },
  ar: {
    nav: { read: 'اقرأ', learn: 'تعلم', quizzes: 'اختبارات', guide: 'دليل', profile: 'الملف الشخصي' },
    reader: { chapter: 'الفصل', previous: 'السابق', next: 'التالي', noAudio: 'الصوت غير متوفر', loading: 'جار التحميل...' },
    audio: { play: 'تشغيل', pause: 'إيقاف', speed: 'السرعة', sleepTimer: 'مؤقت النوم', off: 'إيقاف', minutes: 'دقائق' },
    books: { oldTestament: 'العهد القديم', newTestament: 'العهد الجديد' },
    home: { dailyVerse: 'آية اليوم', reflection: 'تأمل', continueReading: 'متابعة القراءة', quickActions: 'إجراءات سريعة' },
    profile: { language: 'اللغة', settings: 'الإعدادات', version: 'نسخة الكتاب المقدس', comingSoon: 'قريباً' },
    common: { loading: 'جار التحميل...', error: 'خطأ', retry: 'إعادة المحاولة' },
  },
  da: {
    nav: { read: 'Læs', learn: 'Lær', quizzes: 'Quizzer', guide: 'Guide', profile: 'Profil' },
    reader: { chapter: 'Kapitel', previous: 'Forrige', next: 'Næste', noAudio: 'Lyd ikke tilgængelig', loading: 'Indlæser...' },
    audio: { play: 'Afspil', pause: 'Pause', speed: 'Hastighed', sleepTimer: 'Sleep Timer', off: 'Fra', minutes: 'minutter' },
    books: { oldTestament: 'Det Gamle Testamente', newTestament: 'Det Nye Testamente' },
    home: { dailyVerse: 'Dagens vers', reflection: 'Refleksion', continueReading: 'Fortsæt med at læse', quickActions: 'Hurtige handlinger' },
    profile: { language: 'Sprog', settings: 'Indstillinger', version: 'Bibelversion', comingSoon: 'Kommer snart' },
    common: { loading: 'Indlæser...', error: 'Fejl', retry: 'Prøv igen' },
  },
  de: {
    nav: { read: 'Lesen', learn: 'Lernen', quizzes: 'Quiz', guide: 'Anleitung', profile: 'Profil' },
    reader: { chapter: 'Kapitel', previous: 'Zurück', next: 'Weiter', noAudio: 'Audio nicht verfügbar', loading: 'Laden...' },
    audio: { play: 'Abspielen', pause: 'Pause', speed: 'Geschwindigkeit', sleepTimer: 'Schlaftimer', off: 'Aus', minutes: 'Minuten' },
    books: { oldTestament: 'Altes Testament', newTestament: 'Neues Testament' },
    home: { dailyVerse: 'Vers des Tages', reflection: 'Reflexion', continueReading: 'Weiterlesen', quickActions: 'Schnellaktionen' },
    profile: { language: 'Sprache', settings: 'Einstellungen', version: 'Bibelversion', comingSoon: 'Demnächst' },
    common: { loading: 'Laden...', error: 'Fehler', retry: 'Erneut versuchen' },
  },
  el: {
    nav: { read: 'Διαβάστε', learn: 'Μάθετε', quizzes: 'Κουίζ', guide: 'Οδηγός', profile: 'Προφίλ' },
    reader: { chapter: 'Κεφάλαιο', previous: 'Προηγούμενο', next: 'Επόμενο', noAudio: 'Ήχος μη διαθέσιμος', loading: 'Φόρτωση...' },
    audio: { play: 'Αναπαραγωγή', pause: 'Παύση', speed: 'Ταχύτητα', sleepTimer: 'Χρονοδιακόπτης', off: 'Κλειστό', minutes: 'λεπτά' },
    books: { oldTestament: 'Παλαιά Διαθήκη', newTestament: 'Καινή Διαθήκη' },
    home: { dailyVerse: 'Στίχος της Ημέρας', reflection: 'Αντανάκλαση', continueReading: 'Συνέχεια Ανάγνωσης', quickActions: 'Γρήγορες Ενέργειες' },
    profile: { language: 'Γλώσσα', settings: 'Ρυθμίσεις', version: 'Έκδοση Βίβλου', comingSoon: 'Έρχεται σύντομα' },
    common: { loading: 'Φόρτωση...', error: 'Σφάλμα', retry: 'Επανάληψη' },
  },
  fi: {
    nav: { read: 'Lue', learn: 'Opi', quizzes: 'Tietovisat', guide: 'Opas', profile: 'Profiili' },
    reader: { chapter: 'Luku', previous: 'Edellinen', next: 'Seuraava', noAudio: 'Ääni ei saatavilla', loading: 'Ladataan...' },
    audio: { play: 'Toista', pause: 'Tauko', speed: 'Nopeus', sleepTimer: 'Uniajastin', off: 'Pois', minutes: 'minuuttia' },
    books: { oldTestament: 'Vanha Testamentti', newTestament: 'Uusi Testamentti' },
    home: { dailyVerse: 'Päivän jae', reflection: 'Pohdinta', continueReading: 'Jatka lukemista', quickActions: 'Pikatoiminnot' },
    profile: { language: 'Kieli', settings: 'Asetukset', version: 'Raamatun versio', comingSoon: 'Tulossa pian' },
    common: { loading: 'Ladataan...', error: 'Virhe', retry: 'Yritä uudelleen' },
  },
  fr: {
    nav: { read: 'Lire', learn: 'Apprendre', quizzes: 'Quiz', guide: 'Guide', profile: 'Profil' },
    reader: { chapter: 'Chapitre', previous: 'Précédent', next: 'Suivant', noAudio: 'Audio non disponible', loading: 'Chargement...' },
    audio: { play: 'Lecture', pause: 'Pause', speed: 'Vitesse', sleepTimer: 'Minuterie', off: 'Désactivé', minutes: 'minutes' },
    books: { oldTestament: 'Ancien Testament', newTestament: 'Nouveau Testament' },
    home: { dailyVerse: 'Verset du Jour', reflection: 'Réflexion', continueReading: 'Continuer la lecture', quickActions: 'Actions rapides' },
    profile: { language: 'Langue', settings: 'Paramètres', version: 'Version de la Bible', comingSoon: 'Bientôt disponible' },
    common: { loading: 'Chargement...', error: 'Erreur', retry: 'Réessayer' },
  },
  he: {
    nav: { read: 'קרא', learn: 'למד', quizzes: 'חידונים', guide: 'מדריך', profile: 'פרופיל' },
    reader: { chapter: 'פרק', previous: 'הקודם', next: 'הבא', noAudio: 'אודיו לא זמין', loading: 'טוען...' },
    audio: { play: 'נגן', pause: 'השהה', speed: 'מהירות', sleepTimer: 'טיימר שינה', off: 'כבוי', minutes: 'דקות' },
    books: { oldTestament: 'הברית הישנה', newTestament: 'הברית החדשה' },
    home: { dailyVerse: 'פסוק היום', reflection: 'הרהור', continueReading: 'המשך לקרוא', quickActions: 'פעולות מהירות' },
    profile: { language: 'שפה', settings: 'הגדרות', version: 'גרסת התנ"ך', comingSoon: 'בקרוב' },
    common: { loading: 'טוען...', error: 'שגיאה', retry: 'נסה שוב' },
  },
  hi: {
    nav: { read: 'पढ़ें', learn: 'सीखें', quizzes: 'प्रश्नोत्तरी', guide: 'मार्गदर्शिका', profile: 'प्रोफ़ाइल' },
    reader: { chapter: 'अध्याय', previous: 'पिछला', next: 'अगला', noAudio: 'ऑडियो उपलब्ध नहीं', loading: 'लोड हो रहा है...' },
    audio: { play: 'चलाएं', pause: 'रोकें', speed: 'गति', sleepTimer: 'स्लीप टाइमर', off: 'बंद', minutes: 'मिनट' },
    books: { oldTestament: 'पुराना नियम', newTestament: 'नया नियम' },
    home: { dailyVerse: 'आज का वचन', reflection: 'चिंतन', continueReading: 'पढ़ना जारी रखें', quickActions: 'त्वरित कार्य' },
    profile: { language: 'भाषा', settings: 'सेटिंग्स', version: 'बाइबल संस्करण', comingSoon: 'जल्द आ रहा है' },
    common: { loading: 'लोड हो रहा है...', error: 'त्रुटि', retry: 'पुनः प्रयास करें' },
  },
  it: {
    nav: { read: 'Leggi', learn: 'Impara', quizzes: 'Quiz', guide: 'Guida', profile: 'Profilo' },
    reader: { chapter: 'Capitolo', previous: 'Precedente', next: 'Successivo', noAudio: 'Audio non disponibile', loading: 'Caricamento...' },
    audio: { play: 'Riproduci', pause: 'Pausa', speed: 'Velocità', sleepTimer: 'Timer sonno', off: 'Spento', minutes: 'minuti' },
    books: { oldTestament: 'Antico Testamento', newTestament: 'Nuovo Testamento' },
    home: { dailyVerse: 'Versetto del Giorno', reflection: 'Riflessione', continueReading: 'Continua a leggere', quickActions: 'Azioni rapide' },
    profile: { language: 'Lingua', settings: 'Impostazioni', version: 'Versione della Bibbia', comingSoon: 'Prossimamente' },
    common: { loading: 'Caricamento...', error: 'Errore', retry: 'Riprova' },
  },
  ja: {
    nav: { read: '読む', learn: '学ぶ', quizzes: 'クイズ', guide: 'ガイド', profile: 'プロフィール' },
    reader: { chapter: '章', previous: '前へ', next: '次へ', noAudio: '音声なし', loading: '読み込み中...' },
    audio: { play: '再生', pause: '一時停止', speed: '速度', sleepTimer: 'スリープタイマー', off: 'オフ', minutes: '分' },
    books: { oldTestament: '旧約聖書', newTestament: '新約聖書' },
    home: { dailyVerse: '今日の聖句', reflection: '黙想', continueReading: '続きを読む', quickActions: 'クイックアクション' },
    profile: { language: '言語', settings: '設定', version: '聖書のバージョン', comingSoon: '近日公開' },
    common: { loading: '読み込み中...', error: 'エラー', retry: '再試行' },
  },
  ko: {
    nav: { read: '읽기', learn: '배우기', quizzes: '퀴즈', guide: '가이드', profile: '프로필' },
    reader: { chapter: '장', previous: '이전', next: '다음', noAudio: '오디오 없음', loading: '로딩 중...' },
    audio: { play: '재생', pause: '일시정지', speed: '속도', sleepTimer: '취침 타이머', off: '끄기', minutes: '분' },
    books: { oldTestament: '구약성경', newTestament: '신약성경' },
    home: { dailyVerse: '오늘의 말씀', reflection: '묵상', continueReading: '계속 읽기', quickActions: '빠른 작업' },
    profile: { language: '언어', settings: '설정', version: '성경 버전', comingSoon: '출시 예정' },
    common: { loading: '로딩 중...', error: '오류', retry: '다시 시도' },
  },
  ms: {
    nav: { read: 'Baca', learn: 'Belajar', quizzes: 'Kuiz', guide: 'Panduan', profile: 'Profil' },
    reader: { chapter: 'Bab', previous: 'Sebelum', next: 'Seterusnya', noAudio: 'Audio tidak tersedia', loading: 'Memuatkan...' },
    audio: { play: 'Main', pause: 'Jeda', speed: 'Kelajuan', sleepTimer: 'Pemasa Tidur', off: 'Mati', minutes: 'minit' },
    books: { oldTestament: 'Perjanjian Lama', newTestament: 'Perjanjian Baru' },
    home: { dailyVerse: 'Ayat Hari Ini', reflection: 'Renungan', continueReading: 'Teruskan Membaca', quickActions: 'Tindakan Pantas' },
    profile: { language: 'Bahasa', settings: 'Tetapan', version: 'Versi Alkitab', comingSoon: 'Akan Datang' },
    common: { loading: 'Memuatkan...', error: 'Ralat', retry: 'Cuba lagi' },
  },
  nl: {
    nav: { read: 'Lezen', learn: 'Leren', quizzes: 'Quiz', guide: 'Gids', profile: 'Profiel' },
    reader: { chapter: 'Hoofdstuk', previous: 'Vorige', next: 'Volgende', noAudio: 'Audio niet beschikbaar', loading: 'Laden...' },
    audio: { play: 'Afspelen', pause: 'Pauze', speed: 'Snelheid', sleepTimer: 'Slaaptimer', off: 'Uit', minutes: 'minuten' },
    books: { oldTestament: 'Oude Testament', newTestament: 'Nieuwe Testament' },
    home: { dailyVerse: 'Vers van de Dag', reflection: 'Reflectie', continueReading: 'Verder lezen', quickActions: 'Snelle acties' },
    profile: { language: 'Taal', settings: 'Instellingen', version: 'Bijbelversie', comingSoon: 'Binnenkort' },
    common: { loading: 'Laden...', error: 'Fout', retry: 'Opnieuw proberen' },
  },
  no: {
    nav: { read: 'Les', learn: 'Lær', quizzes: 'Quiz', guide: 'Guide', profile: 'Profil' },
    reader: { chapter: 'Kapittel', previous: 'Forrige', next: 'Neste', noAudio: 'Lyd ikke tilgjengelig', loading: 'Laster...' },
    audio: { play: 'Spill', pause: 'Pause', speed: 'Hastighet', sleepTimer: 'Søvntimer', off: 'Av', minutes: 'minutter' },
    books: { oldTestament: 'Det Gamle Testamente', newTestament: 'Det Nye Testamente' },
    home: { dailyVerse: 'Dagens vers', reflection: 'Refleksjon', continueReading: 'Fortsett å lese', quickActions: 'Hurtighandlinger' },
    profile: { language: 'Språk', settings: 'Innstillinger', version: 'Bibelversjon', comingSoon: 'Kommer snart' },
    common: { loading: 'Laster...', error: 'Feil', retry: 'Prøv igjen' },
  },
  pl: {
    nav: { read: 'Czytaj', learn: 'Ucz się', quizzes: 'Quizy', guide: 'Przewodnik', profile: 'Profil' },
    reader: { chapter: 'Rozdział', previous: 'Poprzedni', next: 'Następny', noAudio: 'Audio niedostępne', loading: 'Ładowanie...' },
    audio: { play: 'Odtwórz', pause: 'Pauza', speed: 'Prędkość', sleepTimer: 'Wyłącznik czasowy', off: 'Wyłączony', minutes: 'minut' },
    books: { oldTestament: 'Stary Testament', newTestament: 'Nowy Testament' },
    home: { dailyVerse: 'Werset Dnia', reflection: 'Refleksja', continueReading: 'Kontynuuj czytanie', quickActions: 'Szybkie akcje' },
    profile: { language: 'Język', settings: 'Ustawienia', version: 'Wersja Biblii', comingSoon: 'Wkrótce' },
    common: { loading: 'Ładowanie...', error: 'Błąd', retry: 'Ponów' },
  },
  pt: {
    nav: { read: 'Ler', learn: 'Aprender', quizzes: 'Quizzes', guide: 'Guia', profile: 'Perfil' },
    reader: { chapter: 'Capítulo', previous: 'Anterior', next: 'Próximo', noAudio: 'Áudio não disponível', loading: 'Carregando...' },
    audio: { play: 'Reproduzir', pause: 'Pausar', speed: 'Velocidade', sleepTimer: 'Temporizador', off: 'Desligado', minutes: 'minutos' },
    books: { oldTestament: 'Antigo Testamento', newTestament: 'Novo Testamento' },
    home: { dailyVerse: 'Versículo do Dia', reflection: 'Reflexão', continueReading: 'Continuar Lendo', quickActions: 'Ações Rápidas' },
    profile: { language: 'Idioma', settings: 'Configurações', version: 'Versão da Bíblia', comingSoon: 'Em breve' },
    common: { loading: 'Carregando...', error: 'Erro', retry: 'Tentar novamente' },
  },
  ru: {
    nav: { read: 'Читать', learn: 'Учиться', quizzes: 'Викторины', guide: 'Руководство', profile: 'Профиль' },
    reader: { chapter: 'Глава', previous: 'Предыдущая', next: 'Следующая', noAudio: 'Аудио недоступно', loading: 'Загрузка...' },
    audio: { play: 'Воспроизвести', pause: 'Пауза', speed: 'Скорость', sleepTimer: 'Таймер сна', off: 'Выкл', minutes: 'минут' },
    books: { oldTestament: 'Ветхий Завет', newTestament: 'Новый Завет' },
    home: { dailyVerse: 'Стих дня', reflection: 'Размышление', continueReading: 'Продолжить чтение', quickActions: 'Быстрые действия' },
    profile: { language: 'Язык', settings: 'Настройки', version: 'Версия Библии', comingSoon: 'Скоро' },
    common: { loading: 'Загрузка...', error: 'Ошибка', retry: 'Повторить' },
  },
  sv: {
    nav: { read: 'Läs', learn: 'Lär', quizzes: 'Quiz', guide: 'Guide', profile: 'Profil' },
    reader: { chapter: 'Kapitel', previous: 'Föregående', next: 'Nästa', noAudio: 'Ljud ej tillgängligt', loading: 'Laddar...' },
    audio: { play: 'Spela', pause: 'Paus', speed: 'Hastighet', sleepTimer: 'Sovtimer', off: 'Av', minutes: 'minuter' },
    books: { oldTestament: 'Gamla Testamentet', newTestament: 'Nya Testamentet' },
    home: { dailyVerse: 'Dagens vers', reflection: 'Reflektion', continueReading: 'Fortsätt läsa', quickActions: 'Snabbåtgärder' },
    profile: { language: 'Språk', settings: 'Inställningar', version: 'Bibelversion', comingSoon: 'Kommer snart' },
    common: { loading: 'Laddar...', error: 'Fel', retry: 'Försök igen' },
  },
  sw: {
    nav: { read: 'Soma', learn: 'Jifunze', quizzes: 'Maswali', guide: 'Mwongozo', profile: 'Wasifu' },
    reader: { chapter: 'Sura', previous: 'Iliyotangulia', next: 'Inayofuata', noAudio: 'Sauti haipatikani', loading: 'Inapakia...' },
    audio: { play: 'Cheza', pause: 'Simamisha', speed: 'Kasi', sleepTimer: 'Kipima Usingizi', off: 'Zima', minutes: 'dakika' },
    books: { oldTestament: 'Agano la Kale', newTestament: 'Agano Jipya' },
    home: { dailyVerse: 'Aya ya Leo', reflection: 'Tafakuri', continueReading: 'Endelea Kusoma', quickActions: 'Vitendo vya Haraka' },
    profile: { language: 'Lugha', settings: 'Mipangilio', version: 'Toleo la Biblia', comingSoon: 'Inakuja hivi karibuni' },
    common: { loading: 'Inapakia...', error: 'Hitilafu', retry: 'Jaribu tena' },
  },
  tr: {
    nav: { read: 'Oku', learn: 'Öğren', quizzes: 'Sınavlar', guide: 'Rehber', profile: 'Profil' },
    reader: { chapter: 'Bölüm', previous: 'Önceki', next: 'Sonraki', noAudio: 'Ses mevcut değil', loading: 'Yükleniyor...' },
    audio: { play: 'Oynat', pause: 'Duraklat', speed: 'Hız', sleepTimer: 'Uyku Zamanlayıcı', off: 'Kapalı', minutes: 'dakika' },
    books: { oldTestament: 'Eski Ahit', newTestament: 'Yeni Ahit' },
    home: { dailyVerse: 'Günün Ayeti', reflection: 'Düşünce', continueReading: 'Okumaya Devam Et', quickActions: 'Hızlı İşlemler' },
    profile: { language: 'Dil', settings: 'Ayarlar', version: 'İncil Sürümü', comingSoon: 'Yakında' },
    common: { loading: 'Yükleniyor...', error: 'Hata', retry: 'Tekrar dene' },
  },
  zh: {
    nav: { read: '阅读', learn: '学习', quizzes: '测验', guide: '指南', profile: '个人资料' },
    reader: { chapter: '章', previous: '上一章', next: '下一章', noAudio: '音频不可用', loading: '加载中...' },
    audio: { play: '播放', pause: '暂停', speed: '速度', sleepTimer: '睡眠定时器', off: '关闭', minutes: '分钟' },
    books: { oldTestament: '旧约', newTestament: '新约' },
    home: { dailyVerse: '今日经文', reflection: '默想', continueReading: '继续阅读', quickActions: '快捷操作' },
    profile: { language: '语言', settings: '设置', version: '圣经版本', comingSoon: '即将推出' },
    common: { loading: '加载中...', error: '错误', retry: '重试' },
  },
};
