import { Sentences } from "../../drizzle/schema"; 
import { db } from "../../drizzle/db";
import { SentenceType } from "../../types/seedersType";

export const sentenceSeeder = async (userId: string, courseIds: Array<{ index: number; uuid: string; courseName: string }>) => {

  console.log("Seeding database...");

  const senteces: SentenceType[] = [
    /* ---------------------------------------------------------------------------------------------------------------- */
      /* level: A1-מבוא , course: Colors-1 , lesson: 1 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 0, 
        
        sentenceOneHebrew: "המכונית אדומה",
        sentenceTwoGerman: "Die Sonne ist gelb",
        
        sentenceOneGerman: "Das Auto ist rot",  
        sentenceTwoHebrew: "השמש צהובה",
        
        sentenceOneItalian: "La macchina è rossa",  
        sentenceTwoItalian: "Il sole è giallo",  
        
        sentenceOneSpanish: "El coche es rojo",  
        sentenceTwoSpanish: "El sol es amarillo",  
        
        sentenceOneFranch: "La voiture est rouge",  
        sentenceTwoFranch: "Le soleil est jaune",
    
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 2 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 1, 
        
        sentenceOneHebrew: "הפרח ורוד",
        sentenceTwoGerman: "Der Himmel ist blau",
        
        sentenceOneGerman: "Die Blume ist rosa",
        sentenceTwoHebrew: "השמיים כחולים",
        
        sentenceOneItalian: "Il fiore è rosa",
        sentenceTwoItalian: "Il cielo è blu",
        
        sentenceOneSpanish: "La flor es rosa",
        sentenceTwoSpanish: "El cielo es azul",
        
        sentenceOneFranch: "La fleur est rose",
        sentenceTwoFranch: "Le ciel est bleu",
    
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 3 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 2, 
        
        sentenceOneGerman: "Der Stuhl ist braun",
        sentenceOneHebrew: "הכיסא חום",
        sentenceTwoGerman: "Das Buch ist lila",
        sentenceTwoHebrew: "הספר סגול",
        
        sentenceOneItalian: "La sedia è marrone",  
        sentenceTwoItalian: "Il libro è viola",  
        
        sentenceOneSpanish: "La silla es marrón",  
        sentenceTwoSpanish: "El libro es morado",  
        
        sentenceOneFranch: "La chaise est marron",  
        sentenceTwoFranch: "Le livre est violet",
    
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 4 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 3, 

        sentenceOneHebrew: "התפוח אדום",
        sentenceTwoHebrew: "המנורה צהובה",
        
        sentenceOneGerman: "Der Apfel ist rot",
        sentenceTwoGerman: "Die Lampe ist gelb",
        
        sentenceOneItalian: "La mela è rossa",  
        sentenceTwoItalian: "La lampada è gialla",  
        
        sentenceOneSpanish: "La manzana es roja",  
        sentenceTwoSpanish: "La lámpara es amarilla",  
        
        sentenceOneFranch: "La pomme est rouge",  
        sentenceTwoFranch: "La lampe est jaune",        
    
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 5 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 4, 
        
        sentenceOneHebrew: "הדגל כחול",
        sentenceTwoHebrew: "הבית לבן",
        
        sentenceOneGerman: "Die Fahne ist blau",
        sentenceTwoGerman: "Das Haus ist weiß",
        
        sentenceOneItalian: "La bandiera è blu",  
        sentenceTwoItalian: "La casa è bianca",  
        
        sentenceOneSpanish: "La bandera es azul",  
        sentenceTwoSpanish: "La casa es blanca",  
        
        sentenceOneFranch: "Le drapeau est bleu",  
        sentenceTwoFranch: "La maison est blanche",
        
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 6 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 5, 
        
        sentenceOneHebrew: "החתול שחור",
        sentenceTwoHebrew: "הכלב גדול",
        
        sentenceOneGerman: "Die Katze ist schwarz",
        sentenceTwoGerman: "Der Hund ist groß",
        
        sentenceOneItalian: "Il gatto è nero",  
        sentenceTwoItalian: "Il cane è grande",  
        
        sentenceOneSpanish: "El gato es negro",  
        sentenceTwoSpanish: "El perro es grande",  
        
        sentenceOneFranch: "Le chat est noir",  
        sentenceTwoFranch: "Le chien est grand",
    
        finished: false
      },

    /* ---------------------------------------------------------------------------------------------------------------- */

      /* level: A1-מבוא , course: Numbers-2 , lesson: 1 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Numbers",
        lessonOrder: 0, 
    
        sentenceOneHebrew: "יש לי תפוח אחד",
        sentenceTwoHebrew: "אני רואה שתי מכוניות",
    
        sentenceOneGerman: "Ich habe einen Apfel",
        sentenceTwoGerman: "Ich sehe zwei Autos",
    
        sentenceOneItalian: "Ho una mela",
        sentenceTwoItalian: "Vedo due macchine",
    
        sentenceOneSpanish: "Tengo una manzana",
        sentenceTwoSpanish: "Veo dos coches",
    
        sentenceOneFranch: "J'ai une pomme",
        sentenceTwoFranch: "Je vois deux voitures",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Numbers-2 , lesson: 2 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Numbers",
        lessonOrder: 1, 
    
        sentenceOneHebrew: "בבית שלי יש שלוש קומות",
        sentenceTwoHebrew: "יש ארבעה כיסאות",
    
        sentenceOneGerman: "Mein Haus hat drei Stockwerke",
        sentenceTwoGerman: "Es gibt vier Stühle",
    
        sentenceOneItalian: "La mia casa ha tre piani",
        sentenceTwoItalian: "Ci sono quattro sedie",
    
        sentenceOneSpanish: "Mi casa tiene tres pisos",
        sentenceTwoSpanish: "Hay cuatro sillas",
    
        sentenceOneFranch: "Ma maison a trois étages",
        sentenceTwoFranch: "Il y a quatre chaises",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Numbers-2 , lesson: 3 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Numbers",
        lessonOrder: 2, 
    
        sentenceOneHebrew: "חמישה ילדים משחקים בחוץ",
        sentenceTwoHebrew: "שישה ציפורים עפות בשמיים",
    
        sentenceOneGerman: "Fünf Kinder spielen draußen",
        sentenceTwoGerman: "Sechs Vögel fliegen am Himmel",
    
        sentenceOneItalian: "Cinque bambini giocano fuori",
        sentenceTwoItalian: "Sei uccelli volano nel cielo",
    
        sentenceOneSpanish: "Cinco niños juegan afuera",
        sentenceTwoSpanish: "Seis pájaros vuelan en el cielo",
    
        sentenceOneFranch: "Cinq enfants jouent dehors",
        sentenceTwoFranch: "Six oiseaux volent dans le ciel",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Numbers-2 , lesson: 4 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Numbers",
        lessonOrder: 3, 
    
        sentenceOneHebrew: "יש שבעה עצים ביער",
        sentenceTwoHebrew: "שמונה חתולים מתחת לשולחן",
    
        sentenceOneGerman: "Es gibt sieben Bäume im Wald",
        sentenceTwoGerman: "Acht Katzen sind unter dem Tisch",
    
        sentenceOneItalian: "Ci sono sette alberi nella foresta",
        sentenceTwoItalian: "Otto gatti sono sotto il tavolo",
    
        sentenceOneSpanish: "Hay siete árboles en el bosque",
        sentenceTwoSpanish: "Ocho gatos están debajo de la mesa",
    
        sentenceOneFranch: "Il y a sept arbres dans la forêt",
        sentenceTwoFranch: "Huit chats sont sous la table",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Numbers-2 , lesson: 5 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Numbers",
        lessonOrder: 4, 
    
        sentenceOneHebrew: "תשעה דגים בבריכה",
        sentenceTwoHebrew: "עשרה תלמידים בכיתה",
    
        sentenceOneGerman: "Neun Fische sind im Teich",
        sentenceTwoGerman: "Zehn Schüler sind im Klassenzimmer",
    
        sentenceOneItalian: "Nove pesci sono nello stagno",
        sentenceTwoItalian: "Dieci studenti sono in classe",
    
        sentenceOneSpanish: "Nueve peces están en el estanque",
        sentenceTwoSpanish: "Diez estudiantes están en el aula",
    
        sentenceOneFranch: "Neuf poissons sont dans l'étang",
        sentenceTwoFranch: "Dix élèves sont dans la classe",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Numbers-2 , lesson: 6 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Numbers",
        lessonOrder: 5, 
    
        sentenceOneHebrew: "אחד עשרה כוכבים זורחים בלילה",
        sentenceTwoHebrew: "יש שתיים עשרה פרחים בגינה",
    
        sentenceOneGerman: "Elf Sterne leuchten in der Nacht",
        sentenceTwoGerman: "Es gibt zwölf Blumen im Garten",
    
        sentenceOneItalian: "Undici stelle brillano nella notte",
        sentenceTwoItalian: "Ci sono dodici fiori nel giardino",
    
        sentenceOneSpanish: "Once estrellas brillan en la noche",
        sentenceTwoSpanish: "Hay doce flores en el jardín",
    
        sentenceOneFranch: "Onze étoiles brillent dans la nuit",
        sentenceTwoFranch: "Il y a douze fleurs dans le jardin",
    
        finished: false
      },
    
  /* ---------------------------------------------------------------------------------------------------------------- */

    /* level: A1-מבוא , course: Family Members-3 , lesson: 1 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family Members",
      lessonOrder: 0, 
  
      sentenceOneHebrew: "אמא שלי נחמדה",
      sentenceTwoHebrew: "אבא שלי גבוה",
  
      sentenceOneGerman: "Meine Mutter ist nett",
      sentenceTwoGerman: "Mein Vater ist groß",
  
      sentenceOneItalian: "Mia madre è gentile",
      sentenceTwoItalian: "Mio padre è alto",
  
      sentenceOneSpanish: "Mi madre es amable",
      sentenceTwoSpanish: "Mi padre es alto",
  
      sentenceOneFranch: "Ma mère est gentille",
      sentenceTwoFranch: "Mon père est grand",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family Members-3 , lesson: 2 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family Members",
      lessonOrder: 1, 
  
      sentenceOneHebrew: "אחי משחק כדורגל",
      sentenceTwoHebrew: "אחותי אוהבת ספרים",
  
      sentenceOneGerman: "Mein Bruder spielt Fußball",
      sentenceTwoGerman: "Meine Schwester liebt Bücher",
  
      sentenceOneItalian: "Mio fratello gioca a calcio",
      sentenceTwoItalian: "Mia sorella ama i libri",
  
      sentenceOneSpanish: "Mi hermano juega al fútbol",
      sentenceTwoSpanish: "Mi hermana ama los libros",
  
      sentenceOneFranch: "Mon frère joue au football",
      sentenceTwoFranch: "Ma sœur aime les livres",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family Members-3 , lesson: 3 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family Members",
      lessonOrder: 2, 
  
      sentenceOneHebrew: "סבא שלי בן שבעים",
      sentenceTwoHebrew: "סבתא שלי אוהבת לבשל",
  
      sentenceOneGerman: "Mein Großvater ist siebzig Jahre alt",
      sentenceTwoGerman: "Meine Großmutter liebt es zu kochen",
  
      sentenceOneItalian: "Mio nonno ha settant'anni",
      sentenceTwoItalian: "Mia nonna ama cucinare",
  
      sentenceOneSpanish: "Mi abuelo tiene setenta años",
      sentenceTwoSpanish: "Mi abuela ama cocinar",
  
      sentenceOneFranch: "Mon grand-père a soixante-dix ans",
      sentenceTwoFranch: "Ma grand-mère aime cuisiner",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family Members-3 , lesson: 4 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family Members",
      lessonOrder: 3, 
  
      sentenceOneHebrew: "לדוד שלי יש בית גדול",
      sentenceTwoHebrew: "לדודה שלי יש כלב",
  
      sentenceOneGerman: "Mein Onkel hat ein großes Haus",
      sentenceTwoGerman: "Meine Tante hat einen Hund",
  
      sentenceOneItalian: "Mio zio ha una grande casa",
      sentenceTwoItalian: "Mia zia ha un cane",
  
      sentenceOneSpanish: "Mi tío tiene una casa grande",
      sentenceTwoSpanish: "Mi tía tiene un perro",
  
      sentenceOneFranch: "Mon oncle a une grande maison",
      sentenceTwoFranch: "Ma tante a un chien",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family Members-3 , lesson: 5 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family Members",
      lessonOrder: 4, 
  
      sentenceOneHebrew: "הנכדה שלי חכמה",
      sentenceTwoHebrew: "הנכד שלי אוהב לשחק",
  
      sentenceOneGerman: "Meine Enkelin ist klug",
      sentenceTwoGerman: "Mein Enkel liebt es zu spielen",
  
      sentenceOneItalian: "Mia nipote è intelligente",
      sentenceTwoItalian: "Mio nipote ama giocare",
  
      sentenceOneSpanish: "Mi nieta es inteligente",
      sentenceTwoSpanish: "Mi nieto ama jugar",
  
      sentenceOneFranch: "Ma petite-fille est intelligente",
      sentenceTwoFranch: "Mon petit-fils aime jouer",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family Members-3 , lesson: 6 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family Members",
      lessonOrder: 5, 
  
      sentenceOneHebrew: "האחיין שלי לומד בבית הספר",
      sentenceTwoHebrew: "האחיינית שלי אוהבת לשיר",
  
      sentenceOneGerman: "Mein Neffe geht zur Schule",
      sentenceTwoGerman: "Meine Nichte liebt es zu singen",
  
      sentenceOneItalian: "Mio nipote va a scuola",
      sentenceTwoItalian: "Mia nipote ama cantare",
  
      sentenceOneSpanish: "Mi sobrino va a la escuela",
      sentenceTwoSpanish: "Mi sobrina ama cantar",
  
      sentenceOneFranch: "Mon neveu va à l'école",
      sentenceTwoFranch: "Ma nièce aime chanter",
  
      finished: false
    },
  
  /* ---------------------------------------------------------------------------------------------------------------- */

    /* level: A1-מבוא , course: Days of the Week-4 , lesson: 1 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the Week",
      lessonOrder: 0, 
  
      sentenceOneHebrew: "ביום ראשון אנחנו הולכים לים",
      sentenceTwoHebrew: "ביום שני אני עובד",
  
      sentenceOneGerman: "Am Sonntag gehen wir ans Meer",
      sentenceTwoGerman: "Am Montag arbeite ich",
  
      sentenceOneItalian: "La domenica andiamo al mare",
      sentenceTwoItalian: "Il lunedì lavoro",
  
      sentenceOneSpanish: "El domingo vamos al mar",
      sentenceTwoSpanish: "El lunes trabajo",
  
      sentenceOneFranch: "Le dimanche nous allons à la mer",
      sentenceTwoFranch: "Le lundi je travaille",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the Week-4 , lesson: 2 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the Week",
      lessonOrder: 1, 
  
      sentenceOneHebrew: "ביום שלישי יש לי שיעור",
      sentenceTwoHebrew: "ביום רביעי אני מבשל",
  
      sentenceOneGerman: "Am Dienstag habe ich Unterricht",
      sentenceTwoGerman: "Am Mittwoch koche ich",
  
      sentenceOneItalian: "Il martedì ho lezione",
      sentenceTwoItalian: "Il mercoledì cucino",
  
      sentenceOneSpanish: "El martes tengo clase",
      sentenceTwoSpanish: "El miércoles cocino",
  
      sentenceOneFranch: "Le mardi j'ai cours",
      sentenceTwoFranch: "Le mercredi je cuisine",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the Week-4 , lesson: 3 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the Week",
      lessonOrder: 2, 
  
      sentenceOneHebrew: "ביום חמישי אנחנו נוסעים לטיול",
      sentenceTwoHebrew: "ביום שישי אנחנו אוכלים ארוחת ערב מיוחדת",
  
      sentenceOneGerman: "Am Donnerstag machen wir einen Ausflug",
      sentenceTwoGerman: "Am Freitag essen wir ein besonderes Abendessen",
  
      sentenceOneItalian: "Il giovedì facciamo una gita",
      sentenceTwoItalian: "Il venerdì ceniamo in modo speciale",
  
      sentenceOneSpanish: "El jueves hacemos una excursión",
      sentenceTwoSpanish: "El viernes cenamos algo especial",
  
      sentenceOneFranch: "Le jeudi nous faisons une excursion",
      sentenceTwoFranch: "Le vendredi nous dînons spécialement",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the Week-4 , lesson: 4 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the Week",
      lessonOrder: 3, 
  
      sentenceOneHebrew: "שבת הוא יום מנוחה",
      sentenceTwoHebrew: "ביום שבת אנחנו הולכים לטייל",
  
      sentenceOneGerman: "Samstag ist ein Ruhetag",
      sentenceTwoGerman: "Am Samstag gehen wir spazieren",
  
      sentenceOneItalian: "Il sabato è un giorno di riposo",
      sentenceTwoItalian: "Il sabato andiamo a fare una passeggiata",
  
      sentenceOneSpanish: "El sábado es un día de descanso",
      sentenceTwoSpanish: "El sábado vamos a pasear",
  
      sentenceOneFranch: "Le samedi est un jour de repos",
      sentenceTwoFranch: "Le samedi nous allons nous promener",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the Week-4 , lesson: 5 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the Week",
      lessonOrder: 4, 
  
      sentenceOneHebrew: "סוף שבוע הוא הזמן למשפחה",
      sentenceTwoHebrew: "יום עבודה הוא בדרך כלל עמוס",
  
      sentenceOneGerman: "Das Wochenende ist Zeit für die Familie",
      sentenceTwoGerman: "Ein Arbeitstag ist normalerweise anstrengend",
  
      sentenceOneItalian: "Il fine settimana è per la famiglia",
      sentenceTwoItalian: "Un giorno lavorativo è solitamente impegnativo",
  
      sentenceOneSpanish: "El fin de semana es para la familia",
      sentenceTwoSpanish: "Un día laboral suele ser ocupado",
  
      sentenceOneFranch: "Le week-end est pour la famille",
      sentenceTwoFranch: "Un jour de travail est généralement chargé",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the Week-4 , lesson: 6 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the Week",
      lessonOrder: 5, 
  
      sentenceOneHebrew: "יום חופשי הוא הזדמנות לנוח",
      sentenceTwoHebrew: "ביום חג אנחנו חוגגים יחד",
  
      sentenceOneGerman: "Ein freier Tag ist eine Gelegenheit zur Ruhe",
      sentenceTwoGerman: "An einem Feiertag feiern wir zusammen",
  
      sentenceOneItalian: "Un giorno libero è un'opportunità per riposare",
      sentenceTwoItalian: "In un giorno di festa celebriamo insieme",
  
      sentenceOneSpanish: "Un día libre es una oportunidad para descansar",
      sentenceTwoSpanish: "En un día de fiesta celebramos juntos",
  
      sentenceOneFranch: "Un jour libre est une occasion de se reposer",
      sentenceTwoFranch: "Lors d'un jour de fête, nous célébrons ensemble",
  
      finished: false
    },

  /* ---------------------------------------------------------------------------------------------------------------- */
  /* level: A1-מבוא , course: Months-5 , lesson: 1 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 0, 

    sentenceOneHebrew: "ינואר הוא החודש הראשון בשנה",
    sentenceTwoHebrew: "פברואר הוא החודש השני",

    sentenceOneGerman: "Januar ist der erste Monat des Jahres",
    sentenceTwoGerman: "Februar ist der zweite Monat",

    sentenceOneItalian: "Gennaio è il primo mese dell'anno",
    sentenceTwoItalian: "Febbraio è il secondo mese",

    sentenceOneSpanish: "Enero es el primer mes del año",
    sentenceTwoSpanish: "Febrero es el segundo mes",

    sentenceOneFranch: "Janvier est le premier mois de l'année",
    sentenceTwoFranch: "Février est le deuxième mois",

    finished: false
  },

  /* level: A1-מבוא , course: Months-5 , lesson: 2 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 1, 

    sentenceOneHebrew: "מרץ מגיע אחרי פברואר",
    sentenceTwoHebrew: "אפריל הוא חודש האביב",

    sentenceOneGerman: "März kommt nach Februar",
    sentenceTwoGerman: "April ist ein Frühlingsmonat",

    sentenceOneItalian: "Marzo viene dopo febbraio",
    sentenceTwoItalian: "Aprile è un mese primaverile",

    sentenceOneSpanish: "Marzo viene después de febrero",
    sentenceTwoSpanish: "Abril es un mes de primavera",

    sentenceOneFranch: "Mars vient après février",
    sentenceTwoFranch: "Avril est un mois de printemps",

    finished: false
  },

  /* level: A1-מבוא , course: Months-5 , lesson: 3 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 2, 

    sentenceOneHebrew: "מאי הוא חודש חם",
    sentenceTwoHebrew: "יוני מתחיל את הקיץ",

    sentenceOneGerman: "Mai ist ein warmer Monat",
    sentenceTwoGerman: "Juni beginnt den Sommer",

    sentenceOneItalian: "Maggio è un mese caldo",
    sentenceTwoItalian: "Giugno inizia l'estate",

    sentenceOneSpanish: "Mayo es un mes cálido",
    sentenceTwoSpanish: "Junio marca el inicio del verano",

    sentenceOneFranch: "Mai est un mois chaud",
    sentenceTwoFranch: "Juin commence l'été",

    finished: false
  },

  /* level: A1-מבוא , course: Months-5 , lesson: 4 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 3, 

    sentenceOneHebrew: "ביולי החום עולה",
    sentenceTwoHebrew: "אוגוסט הוא החודש הכי חם",

    sentenceOneGerman: "Im Juli steigen die Temperaturen",
    sentenceTwoGerman: "August ist der heißeste Monat",

    sentenceOneItalian: "A luglio le temperature salgono",
    sentenceTwoItalian: "Agosto è il mese più caldo",

    sentenceOneSpanish: "En julio suben las temperaturas",
    sentenceTwoSpanish: "Agosto es el mes más caluroso",

    sentenceOneFranch: "En juillet les températures montent",
    sentenceTwoFranch: "Août est le mois le plus chaud",

    finished: false
  },

  /* level: A1-מבוא , course: Months-5 , lesson: 5 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 4, 

    sentenceOneHebrew: "ספטמבר מביא את הסתיו",
    sentenceTwoHebrew: "אוקטובר הוא חודש קריר",

    sentenceOneGerman: "September bringt den Herbst",
    sentenceTwoGerman: "Oktober ist ein kühler Monat",

    sentenceOneItalian: "Settembre porta l'autunno",
    sentenceTwoItalian: "Ottobre è un mese fresco",

    sentenceOneSpanish: "Septiembre trae el otoño",
    sentenceTwoSpanish: "Octubre es un mes fresco",

    sentenceOneFranch: "Septembre apporte l'automne",
    sentenceTwoFranch: "Octobre est un mois frais",

    finished: false
  },

  /* level: A1-מבוא , course: Months-5 , lesson: 6 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 5, 

    sentenceOneHebrew: "נובמבר הוא חודש גשום",
    sentenceTwoHebrew: "דצמבר הוא סוף השנה",

    sentenceOneGerman: "November ist ein regnerischer Monat",
    sentenceTwoGerman: "Dezember ist das Ende des Jahres",

    sentenceOneItalian: "Novembre è un mese piovoso",
    sentenceTwoItalian: "Dicembre è la fine dell'anno",

    sentenceOneSpanish: "Noviembre es un mes lluvioso",
    sentenceTwoSpanish: "Diciembre es el final del año",

    sentenceOneFranch: "Novembre est un mois pluvieux",
    sentenceTwoFranch: "Décembre est la fin de l'année",

    finished: false
  },

  /* ---------------------------------------------------------------------------------------------------------------- */

  /* level: A1-מבוא , course: Introduction-6 , lesson: 1 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 0, 

    sentenceOneHebrew: "שלום, איך קוראים לך?",
    sentenceTwoHebrew: "תודה, אני בסדר",

    sentenceOneGerman: "Hallo, wie heißt du?",
    sentenceTwoGerman: "Danke, mir geht's gut",

    sentenceOneItalian: "Ciao, come ti chiami?",
    sentenceTwoItalian: "Grazie, sto bene",

    sentenceOneSpanish: "Hola, ¿cómo te llamas?",
    sentenceTwoSpanish: "Gracias, estoy bien",

    sentenceOneFranch: "Bonjour, comment tu t'appelles?",
    sentenceTwoFranch: "Merci, ça va bien",

    finished: false
  },

  /* level: A1-מבוא , course: Introduction-6 , lesson: 2 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 1, 

    sentenceOneHebrew: "אני לא מבין, סליחה",
    sentenceTwoHebrew: "איפה התחנה?",

    sentenceOneGerman: "Ich verstehe nicht, Entschuldigung",
    sentenceTwoGerman: "Wo ist die Station?",

    sentenceOneItalian: "Non capisco, scusa",
    sentenceTwoItalian: "Dove si trova la stazione?",

    sentenceOneSpanish: "No entiendo, perdón",
    sentenceTwoSpanish: "¿Dónde está la estación?",

    sentenceOneFranch: "Je ne comprends pas, excusez-moi",
    sentenceTwoFranch: "Où est la station?",

    finished: false
  },

  /* level: A1-מבוא , course: Introduction-6 , lesson: 3 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 2, 

    sentenceOneHebrew: "אני מבין את המצב",
    sentenceTwoHebrew: "כן, זה נכון",

    sentenceOneGerman: "Ich verstehe die Situation",
    sentenceTwoGerman: "Ja, das ist richtig",

    sentenceOneItalian: "Capisco la situazione",
    sentenceTwoItalian: "Sì, è vero",

    sentenceOneSpanish: "Entiendo la situación",
    sentenceTwoSpanish: "Sí, es verdad",

    sentenceOneFranch: "Je comprends la situation",
    sentenceTwoFranch: "Oui, c'est vrai",

    finished: false
  },

  /* level: A1-מבוא , course: Introduction-6 , lesson: 4 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 3, 

    sentenceOneHebrew: "בבקשה, עזור לי",
    sentenceTwoHebrew: "לא, זה לא בסדר",

    sentenceOneGerman: "Bitte, hilf mir",
    sentenceTwoGerman: "Nein, das ist nicht in Ordnung",

    sentenceOneItalian: "Per favore, aiutami",
    sentenceTwoItalian: "No, non va bene",

    sentenceOneSpanish: "Por favor, ayúdame",
    sentenceTwoSpanish: "No, no está bien",

    sentenceOneFranch: "S'il vous plaît, aidez-moi",
    sentenceTwoFranch: "Non, ce n'est pas correct",

    finished: false
  },

  /* level: A1-מבוא , course: Introduction-6 , lesson: 5 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 4, 

    sentenceOneHebrew: "מה שלומך? קוראים לי דני",
    sentenceTwoHebrew: "אני דני, ואתה?",

    sentenceOneGerman: "Wie geht's? Ich heiße Dani",
    sentenceTwoGerman: "Ich bin Dani, und du?",

    sentenceOneItalian: "Come stai? Mi chiamo Dani",
    sentenceTwoItalian: "Io sono Dani, e tu?",

    sentenceOneSpanish: "¿Cómo estás? Me llamo Dani",
    sentenceTwoSpanish: "Yo soy Dani, ¿y tú?",

    sentenceOneFranch: "Comment ça va? Je m'appelle Dani",
    sentenceTwoFranch: "Je suis Dani, et toi?",

    finished: false
  },

  /* level: A1-מבוא , course: Introduction-6 , lesson: 6 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 5, 

    sentenceOneHebrew: "כן, אני מבין אותך",
    sentenceTwoHebrew: "לא, אני לא מבין את השאלה",

    sentenceOneGerman: "Ja, ich verstehe dich",
    sentenceTwoGerman: "Nein, ich verstehe die Frage nicht",

    sentenceOneItalian: "Sì, ti capisco",
    sentenceTwoItalian: "No, non capisco la domanda",

    sentenceOneSpanish: "Sí, te entiendo",
    sentenceTwoSpanish: "No, no entiendo la pregunta",

    sentenceOneFranch: "Oui, je te comprends",
    sentenceTwoFranch: "Non, je ne comprends pas la question",

    finished: false
  },

  /* ---------------------------------------------------------------------------------------------------------------- */

  /* level: A1-מבוא , course: Weather-7 , lesson: 1 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 0, 

    sentenceOneHebrew: "מזג האוויר היום חם מאוד",
    sentenceTwoHebrew: "האם מזג האוויר יהיה שמשי מחר?",

    sentenceOneGerman: "Das Wetter ist heute sehr heiß",
    sentenceTwoGerman: "Wird das Wetter morgen sonnig sein?",

    sentenceOneItalian: "Il tempo oggi è molto caldo",
    sentenceTwoItalian: "Il tempo sarà soleggiato domani?",

    sentenceOneSpanish: "El tiempo hoy es muy caliente",
    sentenceTwoSpanish: "¿El tiempo estará soleado mañana?",

    sentenceOneFranch: "Il fait très chaud aujourd'hui",
    sentenceTwoFranch: "Le temps sera-t-il ensoleillé demain?",

    finished: false
  },

  /* level: A1-מבוא , course: Weather-7 , lesson: 2 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 1, 

    sentenceOneHebrew: "היום קר מאוד בחוץ",
    sentenceTwoHebrew: "אתמול היה גשום",

    sentenceOneGerman: "Es ist heute sehr kalt draußen",
    sentenceTwoGerman: "Gestern war es regnerisch",

    sentenceOneItalian: "Oggi fa molto freddo fuori",
    sentenceTwoItalian: "Ieri è stato piovoso",

    sentenceOneSpanish: "Hoy hace mucho frío afuera",
    sentenceTwoSpanish: "Ayer estuvo lluvioso",

    sentenceOneFranch: "Il fait très froid dehors aujourd'hui",
    sentenceTwoFranch: "Hier, il a plu",

    finished: false
  },

  /* level: A1-מבוא , course: Weather-7 , lesson: 3 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 2, 

    sentenceOneHebrew: "השמיים מעוננים היום",
    sentenceTwoHebrew: "הרוח חזקה מאוד בבוקר",

    sentenceOneGerman: "Der Himmel ist heute bewölkt",
    sentenceTwoGerman: "Der Wind war heute Morgen sehr stark",

    sentenceOneItalian: "Il cielo è nuvoloso oggi",
    sentenceTwoItalian: "Il vento era molto forte questa mattina",

    sentenceOneSpanish: "El cielo está nublado hoy",
    sentenceTwoSpanish: "El viento estaba muy fuerte esta mañana",

    sentenceOneFranch: "Le ciel est nuageux aujourd'hui",
    sentenceTwoFranch: "Le vent était très fort ce matin",

    finished: false
  },

  /* level: A1-מבוא , course: Weather-7 , lesson: 4 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 3, 

    sentenceOneHebrew: "הייתה סערה גדולה בלילה",
    sentenceTwoHebrew: "שלג ירד בהרים",

    sentenceOneGerman: "Es gab einen großen Sturm in der Nacht",
    sentenceTwoGerman: "Es hat in den Bergen geschneit",

    sentenceOneItalian: "C'è stata una grande tempesta nella notte",
    sentenceTwoItalian: "È nevicato sulle montagne",

    sentenceOneSpanish: "Hubo una gran tormenta por la noche",
    sentenceTwoSpanish: "Nevó en las montañas",

    sentenceOneFranch: "Il y a eu une grande tempête la nuit",
    sentenceTwoFranch: "Il a neigé dans les montagnes",

    finished: false
  },

  /* level: A1-מבוא , course: Weather-7 , lesson: 5 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 4, 

    sentenceOneHebrew: "ברקים ורעמים היו במהלך הסערה",
    sentenceTwoHebrew: "הטמפרטורה היום נמוכה מאוד",

    sentenceOneGerman: "Blitze und Donner gab es während des Sturms",
    sentenceTwoGerman: "Die Temperatur ist heute sehr niedrig",

    sentenceOneItalian: "Fulmini e tuoni ci sono stati durante la tempesta",
    sentenceTwoItalian: "La temperatura oggi è molto bassa",

    sentenceOneSpanish: "Relámpagos y truenos hubo durante la tormenta",
    sentenceTwoSpanish: "La temperatura hoy es muy baja",

    sentenceOneFranch: "Il y a eu des éclairs et du tonnerre pendant la tempête",
    sentenceTwoFranch: "La température est très basse aujourd'hui",

    finished: false
  },

  /* level: A1-מבוא , course: Weather-7 , lesson: 6 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 5, 

    sentenceOneHebrew: "מחר יהיה יום שמשי וחם",
    sentenceTwoHebrew: "האם ירד שלג בסוף השבוע?",

    sentenceOneGerman: "Morgen wird es sonnig und heiß sein",
    sentenceTwoGerman: "Wird es am Wochenende schneien?",

    sentenceOneItalian: "Domani sarà soleggiato e caldo",
    sentenceTwoItalian: "Nevicherà nel fine settimana?",

    sentenceOneSpanish: "Mañana estará soleado y caluroso",
    sentenceTwoSpanish: "¿Nevará el fin de semana?",

    sentenceOneFranch: "Demain, il fera ensoleillé et chaud",
    sentenceTwoFranch: "Neigera-t-il ce week-end?",

    finished: false
  },

  /* ---------------------------------------------------------------------------------------------------------------- */

  /* level: A1-מבוא , course: Clothes-8 , lesson: 1 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 0, 

    sentenceOneHebrew: "אני לובש חולצה חדשה",
    sentenceTwoHebrew: "המכנסיים שלי כחולים",

    sentenceOneGerman: "Ich trage ein neues Hemd",
    sentenceTwoGerman: "Meine Hose ist blau",

    sentenceOneItalian: "Indosso una maglietta nuova",
    sentenceTwoItalian: "I miei pantaloni sono blu",

    sentenceOneSpanish: "Llevo una camisa nueva",
    sentenceTwoSpanish: "Mis pantalones son azules",

    sentenceOneFranch: "Je porte une chemise neuve",
    sentenceTwoFranch: "Mon pantalon est bleu",

    finished: false
  },

  /* level: A1-מבוא , course: Clothes-8 , lesson: 2 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 1, 

    sentenceOneHebrew: "אני צריך מעיל לחורף",
    sentenceTwoHebrew: "הסוודר שלי נעים",

    sentenceOneGerman: "Ich brauche einen Mantel für den Winter",
    sentenceTwoGerman: "Mein Pullover ist gemütlich",

    sentenceOneItalian: "Ho bisogno di un cappotto per l'inverno",
    sentenceTwoItalian: "Il mio maglione è comodo",

    sentenceOneSpanish: "Necesito un abrigo para el invierno",
    sentenceTwoSpanish: "Mi suéter es cómodo",

    sentenceOneFranch: "J'ai besoin d'un manteau pour l'hiver",
    sentenceTwoFranch: "Mon pull est confortable",

    finished: false
  },

  /* level: A1-מבוא , course: Clothes-8 , lesson: 3 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 2, 

    sentenceOneHebrew: "החצאית של אחותי ורודה",
    sentenceTwoHebrew: "אני לובשת שמלה באירוע",

    sentenceOneGerman: "Der Rock meiner Schwester ist rosa",
    sentenceTwoGerman: "Ich trage ein Kleid bei der Veranstaltung",

    sentenceOneItalian: "La gonna di mia sorella è rosa",
    sentenceTwoItalian: "Indosso un vestito all'evento",

    sentenceOneSpanish: "La falda de mi hermana es rosa",
    sentenceTwoSpanish: "Llevo un vestido en el evento",

    sentenceOneFranch: "La jupe de ma sœur est rose",
    sentenceTwoFranch: "Je porte une robe à l'événement",

    finished: false
  },

  /* level: A1-מבוא , course: Clothes-8 , lesson: 4 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 3, 

    sentenceOneHebrew: "אני קונה נעליים חדשות",
    sentenceTwoHebrew: "הגרביים שלי אפורות",

    sentenceOneGerman: "Ich kaufe neue Schuhe",
    sentenceTwoGerman: "Meine Socken sind grau",

    sentenceOneItalian: "Compro scarpe nuove",
    sentenceTwoItalian: "I miei calzini sono grigi",

    sentenceOneSpanish: "Compro zapatos nuevos",
    sentenceTwoSpanish: "Mis calcetines son grises",

    sentenceOneFranch: "J'achète de nouvelles chaussures",
    sentenceTwoFranch: "Mes chaussettes sont grises",

    finished: false
  },

  /* level: A1-מבוא , course: Clothes-8 , lesson: 5 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 4, 

    sentenceOneHebrew: "אני לוקח תיק לעבודה",
    sentenceTwoHebrew: "אני חובש כובע בקיץ",

    sentenceOneGerman: "Ich nehme eine Tasche zur Arbeit",
    sentenceTwoGerman: "Ich trage einen Hut im Sommer",

    sentenceOneItalian: "Porto una borsa al lavoro",
    sentenceTwoItalian: "Indosso un cappello in estate",

    sentenceOneSpanish: "Llevo un bolso al trabajo",
    sentenceTwoSpanish: "Llevo un sombrero en verano",

    sentenceOneFranch: "Je prends un sac au travail",
    sentenceTwoFranch: "Je porte un chapeau en été",

    finished: false
  },

  /* level: A1-מבוא , course: Clothes-8 , lesson: 6 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 5, 

    sentenceOneHebrew: "אני שם משקפי שמש כשחם",
    sentenceTwoHebrew: "העניבה שלי שחורה",

    sentenceOneGerman: "Ich trage eine Sonnenbrille, wenn es heiß ist",
    sentenceTwoGerman: "Meine Krawatte ist schwarz",

    sentenceOneItalian: "Indosso gli occhiali da sole quando fa caldo",
    sentenceTwoItalian: "La mia cravatta è nera",

    sentenceOneSpanish: "Llevo gafas de sol cuando hace calor",
    sentenceTwoSpanish: "Mi corbata es negra",

    sentenceOneFranch: "Je porte des lunettes de soleil quand il fait chaud",
    sentenceTwoFranch: "Ma cravate est noire",

    finished: false
  },


  /* ---------------------------------------------------------------------------------------------------------------- */

  /* level: A1-מבוא , course: Food Products-9 , lesson: 1 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 0, 

    sentenceOneHebrew: "אני קונה לחם וחלב בחנות",
    sentenceTwoHebrew: "אני אוכל ביצה לארוחת בוקר",

    sentenceOneGerman: "Ich kaufe Brot und Milch im Laden",
    sentenceTwoGerman: "Ich esse ein Ei zum Frühstück",

    sentenceOneItalian: "Compro pane e latte al negozio",
    sentenceTwoItalian: "Mangio un uovo a colazione",

    sentenceOneSpanish: "Compro pan y leche en la tienda",
    sentenceTwoSpanish: "Como un huevo para el desayuno",

    sentenceOneFranch: "J'achète du pain et du lait au magasin",
    sentenceTwoFranch: "Je mange un œuf au petit-déjeuner",

    finished: false
  },

  /* level: A1-מבוא , course: Food Products-9 , lesson: 2 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 1, 

    sentenceOneHebrew: "אני מורח חמאה על הלחם",
    sentenceTwoHebrew: "הגבינה טעימה מאוד",

    sentenceOneGerman: "Ich streiche Butter auf das Brot",
    sentenceTwoGerman: "Der Käse ist sehr lecker",

    sentenceOneItalian: "Spalmo il burro sul pane",
    sentenceTwoItalian: "Il formaggio è molto buono",

    sentenceOneSpanish: "Unto mantequilla en el pan",
    sentenceTwoSpanish: "El queso está muy rico",

    sentenceOneFranch: "Je mets du beurre sur le pain",
    sentenceTwoFranch: "Le fromage est très bon",

    finished: false
  },

  /* level: A1-מבוא , course: Food Products-9 , lesson: 3 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 2, 

    sentenceOneHebrew: "אני מבשל תפוחי אדמה ועגבניות",
    sentenceTwoHebrew: "אני חותך מלפפונים לסלט",

    sentenceOneGerman: "Ich koche Kartoffeln und Tomaten",
    sentenceTwoGerman: "Ich schneide Gurken für den Salat",

    sentenceOneItalian: "Cucino patate e pomodori",
    sentenceTwoItalian: "Taglio i cetrioli per l'insalata",

    sentenceOneSpanish: "Cocino patatas y tomates",
    sentenceTwoSpanish: "Corto pepinos para la ensalada",

    sentenceOneFranch: "Je cuisine des pommes de terre et des tomates",
    sentenceTwoFranch: "Je coupe des concombres pour la salade",

    finished: false
  },

  /* level: A1-מבוא , course: Food Products-9 , lesson: 4 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 3, 

    sentenceOneHebrew: "העוף בתנור",
    sentenceTwoHebrew: "אני אוהב בשר על האש",

    sentenceOneGerman: "Das Hähnchen ist im Ofen",
    sentenceTwoGerman: "Ich mag Fleisch auf dem Grill",

    sentenceOneItalian: "Il pollo è nel forno",
    sentenceTwoItalian: "Mi piace la carne alla griglia",

    sentenceOneSpanish: "El pollo está en el horno",
    sentenceTwoSpanish: "Me gusta la carne a la parrilla",

    sentenceOneFranch: "Le poulet est au four",
    sentenceTwoFranch: "J'aime la viande au barbecue",

    finished: false
  },

  /* level: A1-מבוא , course: Food Products-9 , lesson: 5 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 4, 

    sentenceOneHebrew: "אני קונה דגים בשוק",
    sentenceTwoHebrew: "ממתקים הם החולשה שלי",

    sentenceOneGerman: "Ich kaufe Fisch auf dem Markt",
    sentenceTwoGerman: "Süßigkeiten sind meine Schwäche",

    sentenceOneItalian: "Compro pesce al mercato",
    sentenceTwoItalian: "I dolci sono la mia debolezza",

    sentenceOneSpanish: "Compro pescado en el mercado",
    sentenceTwoSpanish: "Los dulces son mi debilidad",

    sentenceOneFranch: "J'achète du poisson au marché",
    sentenceTwoFranch: "Les bonbons sont ma faiblesse",

    finished: false
  },

  /* level: A1-מבוא , course: Food Products-9 , lesson: 6 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 5, 

    sentenceOneHebrew: "אני מוסיף סוכר לקפה",
    sentenceTwoHebrew: "אני צריך קמח לאפייה",

    sentenceOneGerman: "Ich gebe Zucker in den Kaffee",
    sentenceTwoGerman: "Ich brauche Mehl zum Backen",

    sentenceOneItalian: "Aggiungo zucchero al caffè",
    sentenceTwoItalian: "Ho bisogno di farina per la cottura",

    sentenceOneSpanish: "Le agrego azúcar al café",
    sentenceTwoSpanish: "Necesito harina para hornear",

    sentenceOneFranch: "J'ajoute du sucre au café",
    sentenceTwoFranch: "J'ai besoin de farine pour la pâtisserie",

    finished: false
  },

  /* ---------------------------------------------------------------------------------------------------------------- */

  /* level: A1-מבוא , course: Beverages-10 , lesson: 1 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 0, 

    sentenceOneHebrew: "אני שותה מים כל יום",
    sentenceTwoHebrew: "אני שותה קפה בבוקר",

    sentenceOneGerman: "Ich trinke jeden Tag Wasser",
    sentenceTwoGerman: "Ich trinke morgens Kaffee",

    sentenceOneItalian: "Bevo acqua ogni giorno",
    sentenceTwoItalian: "Bevo caffè al mattino",

    sentenceOneSpanish: "Bebo agua todos los días",
    sentenceTwoSpanish: "Bebo café por la mañana",

    sentenceOneFranch: "Je bois de l'eau tous les jours",
    sentenceTwoFranch: "Je bois du café le matin",

    finished: false
  },

  /* level: A1-מבוא , course: Beverages-10 , lesson: 2 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 1, 

    sentenceOneHebrew: "אני מעדיף תה עם לימון",
    sentenceTwoHebrew: "אני אוהב מיץ תפוזים",

    sentenceOneGerman: "Ich bevorzuge Tee mit Zitrone",
    sentenceTwoGerman: "Ich liebe Orangensaft",

    sentenceOneItalian: "Preferisco tè con limone",
    sentenceTwoItalian: "Adoro il succo d'arancia",

    sentenceOneSpanish: "Prefiero té con limón",
    sentenceTwoSpanish: "Me encanta el jugo de naranja",

    sentenceOneFranch: "Je préfère le thé avec du citron",
    sentenceTwoFranch: "J'adore le jus d'orange",

    finished: false
  },

  /* level: A1-מבוא , course: Beverages-10 , lesson: 3 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 2, 

    sentenceOneHebrew: "אני שותה מיץ תפוחים בארוחת בוקר",
    sentenceTwoHebrew: "מיץ ענבים הוא הטעם האהוב עליי",

    sentenceOneGerman: "Ich trinke Apfelsaft zum Frühstück",
    sentenceTwoGerman: "Traubensaft ist mein Lieblingsgeschmack",

    sentenceOneItalian: "Bevo succo di mela a colazione",
    sentenceTwoItalian: "Il succo d'uva è il mio preferito",

    sentenceOneSpanish: "Bebo zumo de manzana en el desayuno",
    sentenceTwoSpanish: "El jugo de uva es mi favorito",

    sentenceOneFranch: "Je bois du jus de pomme au petit-déjeuner",
    sentenceTwoFranch: "Le jus de raisin est mon préféré",

    finished: false
  },

  /* level: A1-מבוא , course: Beverages-10 , lesson: 4 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 3, 

    sentenceOneHebrew: "אני קונה קולה למסיבה",
    sentenceTwoHebrew: "אני אוהב לשתות סודה קרה",

    sentenceOneGerman: "Ich kaufe Cola für die Party",
    sentenceTwoGerman: "Ich trinke gerne kaltes Sprudelwasser",

    sentenceOneItalian: "Compro cola per la festa",
    sentenceTwoItalian: "Mi piace bere acqua frizzante fredda",

    sentenceOneSpanish: "Compro cola para la fiesta",
    sentenceTwoSpanish: "Me gusta beber agua con gas fría",

    sentenceOneFranch: "J'achète du cola pour la fête",
    sentenceTwoFranch: "J'aime boire de l'eau pétillante froide",

    finished: false
  },

  /* level: A1-מבוא , course: Beverages-10 , lesson: 5 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 4, 

    sentenceOneHebrew: "אני מוסיף חלב לקפה שלי",
    sentenceTwoHebrew: "שוקו חם מושלם לחורף",

    sentenceOneGerman: "Ich gebe Milch in meinen Kaffee",
    sentenceTwoGerman: "Heiße Schokoladenmilch ist perfekt für den Winter",

    sentenceOneItalian: "Aggiungo latte al mio caffè",
    sentenceTwoItalian: "Il latte al cioccolato caldo è perfetto per l'inverno",

    sentenceOneSpanish: "Le agrego leche a mi café",
    sentenceTwoSpanish: "La leche con chocolate caliente es perfecta para el invierno",

    sentenceOneFranch: "J'ajoute du lait à mon café",
    sentenceTwoFranch: "Le lait au chocolat chaud est parfait pour l'hiver",

    finished: false
  },

  /* level: A1-מבוא , course: Beverages-10 , lesson: 6 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 5, 

    sentenceOneHebrew: "אני שותה בירה בערב עם חברים",
    sentenceTwoHebrew: "יין אדום הולך טוב עם ארוחה",

    sentenceOneGerman: "Ich trinke abends Bier mit Freunden",
    sentenceTwoGerman: "Rotwein passt gut zu einer Mahlzeit",

    sentenceOneItalian: "Bevo birra la sera con gli amici",
    sentenceTwoItalian: "Il vino rosso si abbina bene a un pasto",

    sentenceOneSpanish: "Bebo cerveza por la noche con amigos",
    sentenceTwoSpanish: "El vino tinto combina bien con una comida",

    sentenceOneFranch: "Je bois de la bière le soir avec des amis",
    sentenceTwoFranch: "Le vin rouge accompagne bien un repas",

    finished: false
  },


  /* ---------------------------------------------------------------------------------------------------------------- */

];

const getUuidByCourseName = ( courseIds: Array<{ index: number; uuid: string; courseName: string }>, courseName: string ): string => {
  const resultItem = courseIds.find((item) => item.courseName.toLowerCase() === courseName.toLowerCase());
  if (!resultItem) {
    throw new Error(`Course name "${courseName}" not found in courseIds`);
  }
  return resultItem.uuid;
};

const snetenceData = senteces.map((sentece) => ({
  ...sentece,
  userId,
  courseId: getUuidByCourseName(courseIds, sentece.courseNameEnglish),
}));

await db.insert(Sentences).values(snetenceData).returning();
};