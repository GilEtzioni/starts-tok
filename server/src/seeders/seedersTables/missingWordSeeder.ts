import { MissingWords } from "../../drizzle/schema"; 
import { db } from "../../drizzle/db";
import { MissingWordsType } from "../../types/seedersType";

export const missingWordSeeder = async (userId: string, courseIds: Array<{ index: number; uuid: string; courseName: string }>) => {

  console.log("Seeding database...");

  const missingWords: MissingWordsType[] = [
    /* ---------------------------------------------------------------------------------------------------------------- */
      /* level: A1-מבוא , course: Colors-1  */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 0,

        missingSentenceOneHebrew: "הדלת כתומה",
        missingSentenceTwoHebrew: "החלון כחול",
        missingWordOneHebrew: "כתום",
        missingWordTwoHebrew: "כחול",
        
        missingSentenceOneGerman: "Die Tür ist orange",
        missingWordOneGerman: "orange",
        missingSentenceTwoGerman: "Das Fenster ist blau",
        missingWordTwoGerman: "blau",
        
        missingSentenceOneItalian: "La porta è arancione", 
        missingWordOneItalian: "arancione", 
        missingSentenceTwoItalian: "La finestra è blu",  
        missingWordTwoItalian: "blu", 
        
        missingSentenceOneSpanish: "La puerta es naranja", 
        missingWordOneSpanish: "naranja", 
        missingSentenceTwoSpanish: "La ventana es azul",  
        missingWordTwoSpanish: "azul", 
        
        missingSentenceOneFrench: "La porte est orange", 
        missingWordOneFrench: "orange", 
        missingSentenceTwoFrench: "La fenêtre est bleue",  
        missingWordTwoFrench: "bleue",        
        finished: false,
    
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 1,

        missingSentenceOneHebrew: "השולחן ירוק",
        missingSentenceTwoHebrew: "הכיסא אפור",
        missingWordOneHebrew: "ירוק",
        missingWordTwoHebrew: "אפור",
        
        missingSentenceOneGerman: "Der Tisch ist grün",
        missingWordOneGerman: "grün",
        missingSentenceTwoGerman: "Der Stuhl ist grau",
        missingWordTwoGerman: "grau",
        
        missingSentenceOneItalian: "Il tavolo è verde", 
        missingWordOneItalian: "verde", 
        missingSentenceTwoItalian: "La sedia è grigia",  
        missingWordTwoItalian: "grigia", 
        
        missingSentenceOneSpanish: "La mesa es verde", 
        missingWordOneSpanish: "verde", 
        missingSentenceTwoSpanish: "La silla es gris",  
        missingWordTwoSpanish: "gris", 
        
        missingSentenceOneFrench: "La table est verte", 
        missingWordOneFrench: "verte", 
        missingSentenceTwoFrench: "La chaise est grise",  
        missingWordTwoFrench: "grise",

        finished: false,
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 2,

        missingSentenceOneHebrew: "הספר ירוק",
        missingSentenceTwoHebrew: "העט ורוד",
        missingWordOneHebrew: "ירוק",
        missingWordTwoHebrew: "ורוד",
        
        missingSentenceOneGerman: "Das Buch ist grün",
        missingWordOneGerman: "grün",
        missingSentenceTwoGerman: "Der Stift ist rosa",
        missingWordTwoGerman: "rosa",
        
        missingSentenceOneItalian: "Il libro è verde", 
        missingWordOneItalian: "verde", 
        missingSentenceTwoItalian: "La penna è rosa",  
        missingWordTwoItalian: "rosa", 
        
        missingSentenceOneSpanish: "El libro es verde", 
        missingWordOneSpanish: "verde", 
        missingSentenceTwoSpanish: "El bolígrafo es rosa",  
        missingWordTwoSpanish: "rosa", 
        
        missingSentenceOneFrench: "Le livre est vert", 
        missingWordOneFrench: "vert", 
        missingSentenceTwoFrench: "Le stylo est rose",  
        missingWordTwoFrench: "rose",        
               
        finished: false,
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 3, 

        missingSentenceOneHebrew: "המחשב שחור",
        missingSentenceTwoHebrew: "המקלדת לבנה",
        missingWordOneHebrew: "שחור",
        missingWordTwoHebrew: "לבנה",
        
        missingSentenceOneGerman: "Der Computer ist schwarz",
        missingWordOneGerman: "schwarz",
        missingSentenceTwoGerman: "Die Tastatur ist weiß",
        missingWordTwoGerman: "weiß",
        
        missingSentenceOneItalian: "Il computer è nero", 
        missingWordOneItalian: "nero", 
        missingSentenceTwoItalian: "La tastiera è bianca",  
        missingWordTwoItalian: "bianca", 
        
        missingSentenceOneSpanish: "El ordenador es negro", 
        missingWordOneSpanish: "negro", 
        missingSentenceTwoSpanish: "El teclado es blanco",  
        missingWordTwoSpanish: "blanco", 
        
        missingSentenceOneFrench: "L'ordinateur est noir", 
        missingWordOneFrench: "noir", 
        missingSentenceTwoFrench: "Le clavier est blanc",  
        missingWordTwoFrench: "blanc",        
               
        finished: false,
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 4,

        missingSentenceOneHebrew: "הכובע אדום",
        missingSentenceTwoHebrew: "המעיל כחול",
        missingWordOneHebrew: "אדום",
        missingWordTwoHebrew: "כחול",
        
        missingSentenceOneGerman: "Der Hut ist rot",
        missingWordOneGerman: "rot",
        missingSentenceTwoGerman: "Der Mantel ist blau",
        missingWordTwoGerman: "blau",
        
        missingSentenceOneItalian: "Il cappello è rosso", 
        missingWordOneItalian: "rosso", 
        missingSentenceTwoItalian: "Il cappotto è blu",  
        missingWordTwoItalian: "blu", 
        
        missingSentenceOneSpanish: "El sombrero es rojo", 
        missingWordOneSpanish: "rojo", 
        missingSentenceTwoSpanish: "El abrigo es azul",  
        missingWordTwoSpanish: "azul", 
        
        missingSentenceOneFrench: "Le chapeau est rouge", 
        missingWordOneFrench: "rouge", 
        missingSentenceTwoFrench: "Le manteau est bleu",  
        missingWordTwoFrench: "bleu",        
               
        finished: false,
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOrder: 5,

        missingSentenceOneHebrew: "התיק ירוק",
        missingSentenceTwoHebrew: "הנעליים חומות",
        missingWordOneHebrew: "ירוק",
        missingWordTwoHebrew: "חומות",
        
        missingSentenceOneGerman: "Die Tasche ist grün",
        missingWordOneGerman: "grün",
        missingSentenceTwoGerman: "Die Schuhe sind braun",
        missingWordTwoGerman: "braun",
        
        missingSentenceOneItalian: "La borsa è verde", 
        missingWordOneItalian: "verde", 
        missingSentenceTwoItalian: "Le scarpe sono marroni",  
        missingWordTwoItalian: "marroni", 
        
        missingSentenceOneSpanish: "La bolsa es verde", 
        missingWordOneSpanish: "verde", 
        missingSentenceTwoSpanish: "Los zapatos son marrones",  
        missingWordTwoSpanish: "marrones", 
        
        missingSentenceOneFrench: "Le sac est vert", 
        missingWordOneFrench: "vert", 
        missingSentenceTwoFrench: "Les chaussures sont marron",  
        missingWordTwoFrench: "marron",        
               
        finished: false,
      },


  /* ---------------------------------------------------------------------------------------------------------------- */

    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Numbers",
      lessonOrder: 0,
  
      missingSentenceOneHebrew: "יש לי תפוח",
      missingSentenceTwoHebrew: "יש לה שתיים שקיות",
      missingWordOneHebrew: "אחד",
      missingWordTwoHebrew: "שתיים",
  
      missingSentenceOneGerman: "Ich habe eins Äpfel",
      missingWordOneGerman: "eins",
      missingSentenceTwoGerman: "Sie hat zwei Taschen",
      missingWordTwoGerman: "zwei",
  
      missingSentenceOneItalian: "Ho una mela",
      missingWordOneItalian: "uno",
      missingSentenceTwoItalian: "Lei ha due borse",
      missingWordTwoItalian: "due",
  
      missingSentenceOneSpanish: "Tengo una manzana",
      missingWordOneSpanish: "uno",
      missingSentenceTwoSpanish: "Ella tiene dos bolsas",
      missingWordTwoSpanish: "dos",
  
      missingSentenceOneFrench: "J'ai une pomme",
      missingWordOneFrench: "un",
      missingSentenceTwoFrench: "Elle a deux sacs",
      missingWordTwoFrench: "deux",
  
      finished: false
    },
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Numbers",
      lessonOrder: 1,
  
      missingSentenceOneHebrew: "יש שלוש עטים על השולחן",
      missingSentenceTwoHebrew: "יש ארבע כיסאות בחדר",
      missingWordOneHebrew: "שלוש",
      missingWordTwoHebrew: "ארבע",
  
      missingSentenceOneGerman: "Es gibt drei Stifte auf dem Tisch",
      missingWordOneGerman: "drei",
      missingSentenceTwoGerman: "Es gibt vier Stühle im Zimmer",
      missingWordTwoGerman: "vier",
  
      missingSentenceOneItalian: "Ci sono tre penne sul tavolo",
      missingWordOneItalian: "tre",
      missingSentenceTwoItalian: "Ci sono quattro sedie nella stanza",
      missingWordTwoItalian: "quattro",
  
      missingSentenceOneSpanish: "Hay tres bolígrafos en la mesa",
      missingWordOneSpanish: "tres",
      missingSentenceTwoSpanish: "Hay cuatro sillas en la habitación",
      missingWordTwoSpanish: "cuatro",
  
      missingSentenceOneFrench: "Il y a trois stylos sur la table",
      missingWordOneFrench: "trois",
      missingSentenceTwoFrench: "Il y a quatre chaises dans la pièce",
      missingWordTwoFrench: "quatre",
  
      finished: false
    },
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Numbers",
      lessonOrder: 2,
  
      missingSentenceOneHebrew: "יש חמש ספרים על המדף",
      missingSentenceTwoHebrew: "יש שש תמונות בקיר",
      missingWordOneHebrew: "חמש",
      missingWordTwoHebrew: "שש",
  
      missingSentenceOneGerman: "Es gibt fünf Bücher im Regal",
      missingWordOneGerman: "fünf",
      missingSentenceTwoGerman: "Es gibt sechs Bilder an der Wand",
      missingWordTwoGerman: "sechs",
  
      missingSentenceOneItalian: "Ci sono cinque libri sullo scaffale",
      missingWordOneItalian: "cinque",
      missingSentenceTwoItalian: "Ci sono sei quadri sul muro",
      missingWordTwoItalian: "sei",
  
      missingSentenceOneSpanish: "Hay cinco libros en la estantería",
      missingWordOneSpanish: "cinco",
      missingSentenceTwoSpanish: "Hay seis cuadros en la pared",
      missingWordTwoSpanish: "seis",
  
      missingSentenceOneFrench: "Il y a cinq livres sur l'étagère",
      missingWordOneFrench: "cinq",
      missingSentenceTwoFrench: "Il y a six tableaux sur le mur",
      missingWordTwoFrench: "six",
  
      finished: false
    },
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Numbers",
      lessonOrder: 3,
  
      missingSentenceOneHebrew: "יש שבע ציפורים בשמים",
      missingSentenceTwoHebrew: "יש שמונה כלבים בפארק",
      missingWordOneHebrew: "שבע",
      missingWordTwoHebrew: "שמונה",
  
      missingSentenceOneGerman: "Es gibt sieben Vögel am Himmel",
      missingWordOneGerman: "sieben",
      missingSentenceTwoGerman: "Es gibt acht Hunde im Park",
      missingWordTwoGerman: "acht",
  
      missingSentenceOneItalian: "Ci sono sette uccelli nel cielo",
      missingWordOneItalian: "sette",
      missingSentenceTwoItalian: "Ci sono otto cani nel parco",
      missingWordTwoItalian: "otto",
  
      missingSentenceOneSpanish: "Hay siete pájaros en el cielo",
      missingWordOneSpanish: "siete",
      missingSentenceTwoSpanish: "Hay ocho perros en el parque",
      missingWordTwoSpanish: "ocho",
  
      missingSentenceOneFrench: "Il y a sept oiseaux dans le ciel",
      missingWordOneFrench: "sept",
      missingSentenceTwoFrench: "Il y a huit chiens dans le parc",
      missingWordTwoFrench: "huit",
  
      finished: false
    },
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Numbers",
      lessonOrder: 4,
  
      missingSentenceOneHebrew: "יש תשע פרחים בגינה",
      missingSentenceTwoHebrew: "יש עשר תפוזים בקערה",
      missingWordOneHebrew: "תשע",
      missingWordTwoHebrew: "עשר",
  
      missingSentenceOneGerman: "Es gibt neun Blumen im Garten",
      missingWordOneGerman: "neun",
      missingSentenceTwoGerman: "Es gibt zehn Orangen in der Schale",
      missingWordTwoGerman: "zehn",
  
      missingSentenceOneItalian: "Ci sono nove fiori nel giardino",
      missingWordOneItalian: "nove",
      missingSentenceTwoItalian: "Ci sono dieci arance nella ciotola",
      missingWordTwoItalian: "dieci",
  
      missingSentenceOneSpanish: "Hay nueve flores en el jardín",
      missingWordOneSpanish: "nueve",
      missingSentenceTwoSpanish: "Hay diez naranjas en el cuenco",
      missingWordTwoSpanish: "diez",
  
      missingSentenceOneFrench: "Il y a neuf fleurs dans le jardin",
      missingWordOneFrench: "neuf",
      missingSentenceTwoFrench: "Il y a dix oranges dans le bol",
      missingWordTwoFrench: "dix",
  
      finished: false
    },
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Numbers",
      lessonOrder: 5,
  
      missingSentenceOneHebrew: "יש אחד עשרה תלמידים בכיתה",
      missingSentenceTwoHebrew: "יש שתים עשרה שולחנות בכיתה",
      missingWordOneHebrew: "אחד עשרה",
      missingWordTwoHebrew: "שתיים עשרה",
  
      missingSentenceOneGerman: "Es gibt elf Schüler in der Klasse",
      missingWordOneGerman: "elf",
      missingSentenceTwoGerman: "Es gibt zwölf Tische in der Klasse",
      missingWordTwoGerman: "zwölf",
  
      missingSentenceOneItalian: "Ci sono undici studenti in classe",
      missingWordOneItalian: "undici",
      missingSentenceTwoItalian: "Ci sono dodici tavoli in classe",
      missingWordTwoItalian: "dodici",
  
      missingSentenceOneSpanish: "Hay once estudiantes en la clase",
      missingWordOneSpanish: "once",
      missingSentenceTwoSpanish: "Hay doce mesas en la clase",
      missingWordTwoSpanish: "doce",
  
      missingSentenceOneFrench: "Il y a onze élèves dans la classe",
      missingWordOneFrench: "onze",
      missingSentenceTwoFrench: "Il y a douze tables dans la classe",
      missingWordTwoFrench: "douze",
  
      finished: false
    },

  /* ---------------------------------------------------------------------------------------------------------------- */

  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Family Members",
    lessonOrder: 0,

    missingSentenceOneHebrew: "אמא שלי אוהבת לבשל",
    missingSentenceTwoHebrew: "אבא שלי עובד במשרד",
    missingWordOneHebrew: "אמא",
    missingWordTwoHebrew: "אבא",

    missingSentenceOneGerman: "Meine Mutter kocht gerne",
    missingWordOneGerman: "Mutter",
    missingSentenceTwoGerman: "Mein Vater arbeitet im Büro",
    missingWordTwoGerman: "Vater",

    missingSentenceOneItalian: "Mia madre ama cucinare",
    missingWordOneItalian: "madre",
    missingSentenceTwoItalian: "Mio padre lavora in ufficio",
    missingWordTwoItalian: "padre",

    missingSentenceOneSpanish: "Mi madre ama cocinar",
    missingWordOneSpanish: "madre",
    missingSentenceTwoSpanish: "Mi padre trabaja en una oficina",
    missingWordTwoSpanish: "padre",

    missingSentenceOneFrench: "Ma mère aime cuisiner",
    missingWordOneFrench: "mère",
    missingSentenceTwoFrench: "Mon père travaille dans un bureau",
    missingWordTwoFrench: "père",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Family Members",
    lessonOrder: 1,

    missingSentenceOneHebrew: "אח שלי משחק כדורגל",
    missingSentenceTwoHebrew: "אחות שלי קוראת ספר",
    missingWordOneHebrew: "אח",
    missingWordTwoHebrew: "אחות",

    missingSentenceOneGerman: "Mein Bruder spielt Fußball",
    missingWordOneGerman: "Bruder",
    missingSentenceTwoGerman: "Meine Schwester liest ein Buch",
    missingWordTwoGerman: "Schwester",

    missingSentenceOneItalian: "Mio fratello gioca a calcio",
    missingWordOneItalian: "fratello",
    missingSentenceTwoItalian: "Mia sorella legge un libro",
    missingWordTwoItalian: "sorella",

    missingSentenceOneSpanish: "Mi hermano juega al fútbol",
    missingWordOneSpanish: "hermano",
    missingSentenceTwoSpanish: "Mi hermana está leyendo un libro",
    missingWordTwoSpanish: "hermana",

    missingSentenceOneFrench: "Mon frère joue au football",
    missingWordOneFrench: "frère",
    missingSentenceTwoFrench: "Ma sœur lit un livre",
    missingWordTwoFrench: "sœur",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Family Members",
    lessonOrder: 2,

    missingSentenceOneHebrew: "סבא שלי גר בכפר",
    missingSentenceTwoHebrew: "סבתא שלי מכינה עוגה",
    missingWordOneHebrew: "סבא",
    missingWordTwoHebrew: "סבתא",

    missingSentenceOneGerman: "Mein Großvater lebt auf dem Land",
    missingWordOneGerman: "Großvater",
    missingSentenceTwoGerman: "Meine Großmutter backt einen Kuchen",
    missingWordTwoGerman: "Großmutter",

    missingSentenceOneItalian: "Mio nonno vive in campagna",
    missingWordOneItalian: "nonno",
    missingSentenceTwoItalian: "Mia nonna fa una torta",
    missingWordTwoItalian: "nonna",

    missingSentenceOneSpanish: "Mi abuelo vive en el campo",
    missingWordOneSpanish: "abuelo",
    missingSentenceTwoSpanish: "Mi abuela está haciendo un pastel",
    missingWordTwoSpanish: "abuela",

    missingSentenceOneFrench: "Mon grand-père habite à la campagne",
    missingWordOneFrench: "grand-père",
    missingSentenceTwoFrench: "Ma grand-mère fait un gâteau",
    missingWordTwoFrench: "grand-mère",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Family Members",
    lessonOrder: 3,

    missingSentenceOneHebrew: "דוד שלי נוהג באוטובוס",
    missingSentenceTwoHebrew: "דודה שלי עובדת בבית חולים",
    missingWordOneHebrew: "דוד",
    missingWordTwoHebrew: "דודה",

    missingSentenceOneGerman: "Mein Onkel fährt Bus",
    missingWordOneGerman: "Onkel",
    missingSentenceTwoGerman: "Meine Tante arbeitet im Krankenhaus",
    missingWordTwoGerman: "Tante",

    missingSentenceOneItalian: "Mio zio guida un autobus",
    missingWordOneItalian: "zio",
    missingSentenceTwoItalian: "Mia zia lavora in ospedale",
    missingWordTwoItalian: "zia",

    missingSentenceOneSpanish: "Mi tío conduce un autobús",
    missingWordOneSpanish: "tío",
    missingSentenceTwoSpanish: "Mi tía trabaja en un hospital",
    missingWordTwoSpanish: "tía",

    missingSentenceOneFrench: "Mon oncle conduit un bus",
    missingWordOneFrench: "oncle",
    missingSentenceTwoFrench: "Ma tante travaille dans un hôpital",
    missingWordTwoFrench: "tante",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Family Members",
    lessonOrder: 4,

    missingSentenceOneHebrew: "נכדה שלי מציירת תמונה",
    missingSentenceTwoHebrew: "נכד שלי בונה בית בלגו",
    missingWordOneHebrew: "נכדה",
    missingWordTwoHebrew: "נכד",

    missingSentenceOneGerman: "Meine Enkelin malt ein Bild",
    missingWordOneGerman: "Enkelin",
    missingSentenceTwoGerman: "Mein Enkel baut ein Haus mit Lego",
    missingWordTwoGerman: "Enkel",

    missingSentenceOneItalian: "Mia nipote sta dipingendo un quadro",
    missingWordOneItalian: "nipote",
    missingSentenceTwoItalian: "Mio nipote sta costruendo una casa con i Lego",
    missingWordTwoItalian: "nipote",

    missingSentenceOneSpanish: "Mi nieta está pintando un cuadro",
    missingWordOneSpanish: "nieta",
    missingSentenceTwoSpanish: "Mi nieto está construyendo una casa con Lego",
    missingWordTwoSpanish: "nieto",

    missingSentenceOneFrench: "Ma petite-fille peint un tableau",
    missingWordOneFrench: "petite-fille",
    missingSentenceTwoFrench: "Mon petit-fils construit une maison avec des Lego",
    missingWordTwoFrench: "petit-fils",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Family Members",
    lessonOrder: 5,
  
    missingSentenceOneHebrew: "אחיין שלי אוהב לקרוא",
    missingSentenceTwoHebrew: "אחיינית שלי אוהבת לשחק",
    missingWordOneHebrew: "אחיין",
    missingWordTwoHebrew: "אחיינית",
  
    missingSentenceOneGerman: "Mein Neffe liebt es zu lesen",
    missingWordOneGerman: "Neffe",
    missingSentenceTwoGerman: "Meine Nichte liebt es zu spielen",
    missingWordTwoGerman: "Nichte",
  
    missingSentenceOneItalian: "Mio nipote ama leggere",
    missingWordOneItalian: "nipote",
    missingSentenceTwoItalian: "Mia nipote ama giocare",
    missingWordTwoItalian: "nipote",
  
    missingSentenceOneSpanish: "Mi sobrino ama leer",
    missingWordOneSpanish: "sobrino",
    missingSentenceTwoSpanish: "Mi sobrina ama jugar",
    missingWordTwoSpanish: "sobrina",
  
    missingSentenceOneFrench: "Mon neveu aime lire",
    missingWordOneFrench: "neveu",
    missingSentenceTwoFrench: "Ma nièce aime jouer",
    missingWordTwoFrench: "nièce",
  
    finished: false
  },

  /* ---------------------------------------------------------------------------------------------------------------- */

  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Days of the Week",
    lessonOrder: 0,
  
    missingSentenceOneHebrew: "ביום ראשון אני משחק",
    missingSentenceTwoHebrew: "ביום שני אני עובד",
    missingWordOneHebrew: "ראשון",
    missingWordTwoHebrew: "שני",
  
    missingSentenceOneGerman: "Am Sonntag spiele ich",
    missingWordOneGerman: "Sonntag",
    missingSentenceTwoGerman: "Am Montag arbeite ich",
    missingWordTwoGerman: "Montag",
  
    missingSentenceOneItalian: "La domenica gioco",
    missingWordOneItalian: "domenica",
    missingSentenceTwoItalian: "Il lunedì lavoro",
    missingWordTwoItalian: "lunedì",
  
    missingSentenceOneSpanish: "El domingo juego",
    missingWordOneSpanish: "domingo",
    missingSentenceTwoSpanish: "El lunes trabajo",
    missingWordTwoSpanish: "lunes",
  
    missingSentenceOneFrench: "Le dimanche je joue",
    missingWordOneFrench: "dimanche",
    missingSentenceTwoFrench: "Le lundi je travaille",
    missingWordTwoFrench: "lundi",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Days of the Week",
    lessonOrder: 1,
  
    missingSentenceOneHebrew: "ביום שלישי אני עובד",
    missingSentenceTwoHebrew: "ביום רביעי אני רץ",
    missingWordOneHebrew: "שלישי",
    missingWordTwoHebrew: "רביעי",
  
    missingSentenceOneGerman: "Am Dienstag arbeite ich",
    missingWordOneGerman: "Dienstag",
    missingSentenceTwoGerman: "Am Mittwoch laufe ich",
    missingWordTwoGerman: "Mittwoch",
  
    missingSentenceOneItalian: "Il martedì lavoro",
    missingWordOneItalian: "martedì",
    missingSentenceTwoItalian: "Il mercoledì corro",
    missingWordTwoItalian: "mercoledì",
  
    missingSentenceOneSpanish: "El martes trabajo",
    missingWordOneSpanish: "martes",
    missingSentenceTwoSpanish: "El miércoles corro",
    missingWordTwoSpanish: "miércoles",
  
    missingSentenceOneFrench: "Le mardi je travaille",
    missingWordOneFrench: "mardi",
    missingSentenceTwoFrench: "Le mercredi je cours",
    missingWordTwoFrench: "mercredi",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Days of the Week",
    lessonOrder: 2,
  
    missingSentenceOneHebrew: "ביום חמישי אני מבשל",
    missingSentenceTwoHebrew: "ביום שישי אני ישן",
    missingWordOneHebrew: "חמישי",
    missingWordTwoHebrew: "שישי",
  
    missingSentenceOneGerman: "Am Donnerstag koche ich",
    missingWordOneGerman: "Donnerstag",
    missingSentenceTwoGerman: "Am Freitag schlafe ich",
    missingWordTwoGerman: "Freitag",
  
    missingSentenceOneItalian: "Il giovedì cucino",
    missingWordOneItalian: "giovedì",
    missingSentenceTwoItalian: "Il venerdì dormo",
    missingWordTwoItalian: "venerdì",
  
    missingSentenceOneSpanish: "El jueves cocino",
    missingWordOneSpanish: "jueves",
    missingSentenceTwoSpanish: "El viernes duermo",
    missingWordTwoSpanish: "viernes",
  
    missingSentenceOneFrench: "Le jeudi je cuisine",
    missingWordOneFrench: "jeudi",
    missingSentenceTwoFrench: "Le vendredi je dors",
    missingWordTwoFrench: "vendredi",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Days of the Week",
    lessonOrder: 3,
  
    missingSentenceOneHebrew: "ביום שבת אנחנו משחקים",
    missingSentenceTwoHebrew: "סוף שבוע הוא הזמן לנוח",
    missingWordOneHebrew: "שבת",
    missingWordTwoHebrew: "סוף שבוע",
  
    missingSentenceOneGerman: "Am Samstag spielen wir",
    missingWordOneGerman: "Samstag",
    missingSentenceTwoGerman: "Das Wochenende ist die Zeit zum Ausruhen",
    missingWordTwoGerman: "Wochenende",
  
    missingSentenceOneItalian: "Il sabato giochiamo",
    missingWordOneItalian: "sabato",
    missingSentenceTwoItalian: "Il fine settimana è il momento per riposare",
    missingWordTwoItalian: "fine settimana",
  
    missingSentenceOneSpanish: "El sábado jugamos",
    missingWordOneSpanish: "sábado",
    missingSentenceTwoSpanish: "El fin de semana es el momento para descansar",
    missingWordTwoSpanish: "fin de semana",
  
    missingSentenceOneFrench: "Le samedi nous jouons",
    missingWordOneFrench: "samedi",
    missingSentenceTwoFrench: "Le week-end est le moment de se reposer",
    missingWordTwoFrench: "week-end",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Days of the Week",
    lessonOrder: 4,
  
    missingSentenceOneHebrew: "יום מנוחה חשוב לבריאות",
    missingSentenceTwoHebrew: "יום עבודה מתחיל מוקדם",
    missingWordOneHebrew: "יום מנוחה",
    missingWordTwoHebrew: "יום עבודה",
  
    missingSentenceOneGerman: "Wichtig für die Gesundheit ist ein Ruhetag",
    missingWordOneGerman: "Ruhetag",
    missingSentenceTwoGerman: "Ein Arbeitstag beginnt früh",
    missingWordTwoGerman: "Arbeitstag",
  
    missingSentenceOneItalian: "Importante per la salute è un giorno di riposo",
    missingWordOneItalian: "giorno di riposo",
    missingSentenceTwoItalian: "Un giorno lavorativo inizia presto",
    missingWordTwoItalian: "giorno lavorativo",
  
    missingSentenceOneSpanish: "Importante para la salud es un día de descanso",
    missingWordOneSpanish: "día de descanso",
    missingSentenceTwoSpanish: "Un día laboral comienza temprano",
    missingWordTwoSpanish: "día laboral",
  
    missingSentenceOneFrench: "Important pour la santé est un jour de repos",
    missingWordOneFrench: "jour de repos",
    missingSentenceTwoFrench: "Un jour de travail commence tôt",
    missingWordTwoFrench: "jour de travail",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Days of the Week",
    lessonOrder: 5,
  
    missingSentenceOneHebrew: "מחר יש לי יום חופשי",
    missingSentenceTwoHebrew: "יום חג הוא יום שמח",
    missingWordOneHebrew: "יום חופשי",
    missingWordTwoHebrew: "יום חג",
  
    missingSentenceOneGerman: "Morgen habe ich einen freien Tag",
    missingWordOneGerman: "freien Tag",
    missingSentenceTwoGerman: "Ein Feiertag ist ein fröhlicher Tag",
    missingWordTwoGerman: "Feiertag",
  
    missingSentenceOneItalian: "Domani ho un giorno libero",
    missingWordOneItalian: "giorno libero",
    missingSentenceTwoItalian: "Un giorno di festa è un giorno felice",
    missingWordTwoItalian: "giorno di festa",
  
    missingSentenceOneSpanish: "Mañana tengo un día libre",
    missingWordOneSpanish: "día libre",
    missingSentenceTwoSpanish: "Un día de fiesta es un día feliz",
    missingWordTwoSpanish: "día de fiesta",
  
    missingSentenceOneFrench: "Demain, j'ai un jour libre",
    missingWordOneFrench: "jour libre",
    missingSentenceTwoFrench: "Un jour de fête est un jour joyeux",
    missingWordTwoFrench: "jour de fête",
  
    finished: false
  },

  /* ---------------------------------------------------------------------------------------------------------------- */

  // Months
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 0,

    missingSentenceOneHebrew: "ינואר הוא החודש הראשון בשנה",
    missingSentenceTwoHebrew: "פברואר הוא החודש השני",
    missingWordOneHebrew: "ינואר",
    missingWordTwoHebrew: "פברואר",

    missingSentenceOneGerman: "Januar ist der erste Monat des Jahres",
    missingWordOneGerman: "Januar",
    missingSentenceTwoGerman: "Februar ist der zweite Monat",
    missingWordTwoGerman: "Februar",

    missingSentenceOneItalian: "Gennaio è il primo mese dell'anno",
    missingWordOneItalian: "gennaio",
    missingSentenceTwoItalian: "Febbraio è il secondo mese",
    missingWordTwoItalian: "febbraio",

    missingSentenceOneSpanish: "Enero es el primer mes del año",
    missingWordOneSpanish: "enero",
    missingSentenceTwoSpanish: "Febrero es el segundo mes",
    missingWordTwoSpanish: "febrero",

    missingSentenceOneFrench: "Janvier est le premier mois de l'année",
    missingWordOneFrench: "janvier",
    missingSentenceTwoFrench: "Février est le deuxième mois",
    missingWordTwoFrench: "février",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 1,

    missingSentenceOneHebrew: "מרץ הוא חודש האביב",
    missingSentenceTwoHebrew: "אפריל הוא חודש יפה",
    missingWordOneHebrew: "מרץ",
    missingWordTwoHebrew: "אפריל",

    missingSentenceOneGerman: "März ist ein Frühlingsmonat",
    missingWordOneGerman: "März",
    missingSentenceTwoGerman: "April ist ein schöner Monat",
    missingWordTwoGerman: "April",

    missingSentenceOneItalian: "Marzo è un mese primaverile",
    missingWordOneItalian: "marzo",
    missingSentenceTwoItalian: "Aprile è un mese bello",
    missingWordTwoItalian: "aprile",

    missingSentenceOneSpanish: "Marzo es un mes de primavera",
    missingWordOneSpanish: "marzo",
    missingSentenceTwoSpanish: "Abril es un mes bonito",
    missingWordTwoSpanish: "abril",

    missingSentenceOneFrench: "Mars est un mois de printemps",
    missingWordOneFrench: "mars",
    missingSentenceTwoFrench: "Avril est un mois agréable",
    missingWordTwoFrench: "avril",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 2,

    missingSentenceOneHebrew: "מאי הוא חודש חם",
    missingSentenceTwoHebrew: "יוני הוא תחילת הקיץ",
    missingWordOneHebrew: "מאי",
    missingWordTwoHebrew: "יוני",

    missingSentenceOneGerman: "Mai ist ein warmer Monat",
    missingWordOneGerman: "Mai",
    missingSentenceTwoGerman: "Juni ist der Beginn des Sommers",
    missingWordTwoGerman: "Juni",

    missingSentenceOneItalian: "Maggio è un mese caldo",
    missingWordOneItalian: "maggio",
    missingSentenceTwoItalian: "Giugno è l'inizio dell'estate",
    missingWordTwoItalian: "giugno",

    missingSentenceOneSpanish: "Mayo es un mes cálido",
    missingWordOneSpanish: "mayo",
    missingSentenceTwoSpanish: "Junio es el comienzo del verano",
    missingWordTwoSpanish: "junio",

    missingSentenceOneFrench: "Mai est un mois chaud",
    missingWordOneFrench: "mai",
    missingSentenceTwoFrench: "Juin est le début de l'été",
    missingWordTwoFrench: "juin",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 3,

    missingSentenceOneHebrew: "יולי הוא חודש חם",
    missingSentenceTwoHebrew: "אוגוסט הוא סוף הקיץ",
    missingWordOneHebrew: "יולי",
    missingWordTwoHebrew: "אוגוסט",

    missingSentenceOneGerman: "Juli ist ein heißer Monat",
    missingWordOneGerman: "Juli",
    missingSentenceTwoGerman: "August ist das Ende des Sommers",
    missingWordTwoGerman: "August",

    missingSentenceOneItalian: "Luglio è un mese caldo",
    missingWordOneItalian: "luglio",
    missingSentenceTwoItalian: "Agosto è la fine dell'estate",
    missingWordTwoItalian: "agosto",

    missingSentenceOneSpanish: "Julio es un mes caluroso",
    missingWordOneSpanish: "julio",
    missingSentenceTwoSpanish: "Agosto es el final del verano",
    missingWordTwoSpanish: "agosto",

    missingSentenceOneFrench: "Juillet est un mois chaud",
    missingWordOneFrench: "juillet",
    missingSentenceTwoFrench: "Août est la fin de l'été",
    missingWordTwoFrench: "août",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 4,

    missingSentenceOneHebrew: "ספטמבר הוא חודש הסתיו",
    missingSentenceTwoHebrew: "אוקטובר הוא חודש קריר",
    missingWordOneHebrew: "ספטמבר",
    missingWordTwoHebrew: "אוקטובר",

    missingSentenceOneGerman: "September ist ein Herbstmonat",
    missingWordOneGerman: "September",
    missingSentenceTwoGerman: "Oktober ist ein kühler Monat",
    missingWordTwoGerman: "Oktober",

    missingSentenceOneItalian: "Settembre è un mese autunnale",
    missingWordOneItalian: "settembre",
    missingSentenceTwoItalian: "Ottobre è un mese fresco",
    missingWordTwoItalian: "ottobre",

    missingSentenceOneSpanish: "Septiembre es un mes otoñal",
    missingWordOneSpanish: "septiembre",
    missingSentenceTwoSpanish: "Octubre es un mes fresco",
    missingWordTwoSpanish: "octubre",

    missingSentenceOneFrench: "Septembre est un mois d'automne",
    missingWordOneFrench: "septembre",
    missingSentenceTwoFrench: "Octobre est un mois frais",
    missingWordTwoFrench: "octobre",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Months",
    lessonOrder: 5,

    missingSentenceOneHebrew: "נובמבר הוא חודש גשום",
    missingSentenceTwoHebrew: "דצמבר הוא חודש החורף",
    missingWordOneHebrew: "נובמבר",
    missingWordTwoHebrew: "דצמבר",

    missingSentenceOneGerman: "November ist ein regnerischer Monat",
    missingWordOneGerman: "November",
    missingSentenceTwoGerman: "Dezember ist ein Wintermonat",
    missingWordTwoGerman: "Dezember",

    missingSentenceOneItalian: "Novembre è un mese piovoso",
    missingWordOneItalian: "novembre",
    missingSentenceTwoItalian: "Dicembre è un mese invernale",
    missingWordTwoItalian: "dicembre",

    missingSentenceOneSpanish: "Noviembre es un mes lluvioso",
    missingWordOneSpanish: "noviembre",
    missingSentenceTwoSpanish: "Diciembre es un mes de invierno",
    missingWordTwoSpanish: "diciembre",

    missingSentenceOneFrench: "Novembre est un mois pluvieux",
    missingWordOneFrench: "novembre",
    missingSentenceTwoFrench: "Décembre est un mois d'hiver",
    missingWordTwoFrench: "décembre",

    finished: false
  },


  /* ---------------------------------------------------------------------------------------------------------------- */

  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 0,
  
    missingSentenceOneHebrew: "שלום, בוקר טוב",
    missingSentenceTwoHebrew: "תודה! יום טוב",
    missingWordOneHebrew: "שלום",
    missingWordTwoHebrew: "תודה",
  
    missingSentenceOneGerman: "Hallo, guten Morgen",
    missingWordOneGerman: "Hallo",
    missingSentenceTwoGerman: "Danke! Einen schönen Tag",
    missingWordTwoGerman: "Danke",
  
    missingSentenceOneItalian: "Ciao, buongiorno",
    missingWordOneItalian: "Ciao",
    missingSentenceTwoItalian: "Grazie! Buona giornata",
    missingWordTwoItalian: "Grazie",
  
    missingSentenceOneSpanish: "Hola, buenos días",
    missingWordOneSpanish: "Hola",
    missingSentenceTwoSpanish: "¡Gracias! Que tengas un buen día",
    missingWordTwoSpanish: "Gracias",
  
    missingSentenceOneFrench: "Bonjour, bon matin",
    missingWordOneFrench: "Bonjour",
    missingSentenceTwoFrench: "Merci! Bonne journée",
    missingWordTwoFrench: "Merci",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 1,
  
    missingSentenceOneHebrew: "אפשר מים בבקשה?",
    missingSentenceTwoHebrew: "סליחה, אני מצטער",
    missingWordOneHebrew: "בבקשה",
    missingWordTwoHebrew: "סליחה",
  
    missingSentenceOneGerman: "Kann ich bitte Wasser haben?",
    missingWordOneGerman: "bitte",
    missingSentenceTwoGerman: "Entschuldigung, es tut mir leid",
    missingWordTwoGerman: "Entschuldigung",
  
    missingSentenceOneItalian: "Posso avere dell'acqua per favore?",
    missingWordOneItalian: "per favore",
    missingSentenceTwoItalian: "Scusa, mi dispiace",
    missingWordTwoItalian: "Scusa",
  
    missingSentenceOneSpanish: "¿Puedo tener agua por favor?",
    missingWordOneSpanish: "por favor",
    missingSentenceTwoSpanish: "Perdón, lo siento",
    missingWordTwoSpanish: "Perdón",
  
    missingSentenceOneFrench: "Puis-je avoir de l'eau s'il vous plaît?",
    missingWordOneFrench: "s'il vous plaît",
    missingSentenceTwoFrench: "Excusez-moi, je suis désolé",
    missingWordTwoFrench: "Excusez-moi",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 2,
  
    missingSentenceOneHebrew: "מה שלומך היום?",
    missingSentenceTwoHebrew: "אני בסדר, תודה",
    missingWordOneHebrew: "מה שלומך",
    missingWordTwoHebrew: "אני בסדר",
  
    missingSentenceOneGerman: "Wie geht's dir heute?",
    missingWordOneGerman: "Wie geht's",
    missingSentenceTwoGerman: "Mir geht's gut, danke",
    missingWordTwoGerman: "Mir geht's gut",
  
    missingSentenceOneItalian: "Come stai oggi?",
    missingWordOneItalian: "Come stai",
    missingSentenceTwoItalian: "Sto bene, grazie",
    missingWordTwoItalian: "Sto bene",
  
    missingSentenceOneSpanish: "¿Cómo estás hoy?",
    missingWordOneSpanish: "¿Cómo estás?",
    missingSentenceTwoSpanish: "Estoy bien, gracias",
    missingWordTwoSpanish: "Estoy bien",
  
    missingSentenceOneFrench: "Comment ça va aujourd'hui?",
    missingWordOneFrench: "Comment ça va",
    missingSentenceTwoFrench: "Ça va bien, merci",
    missingWordTwoFrench: "Ça va bien",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 3,

    missingSentenceOneHebrew: "איך קוראים לך? קוראים לי דוד",
    missingSentenceTwoHebrew: "קוראים לי דני",
    missingWordOneHebrew: "איך קוראים לך",
    missingWordTwoHebrew: "קוראים לי",

    missingSentenceOneGerman: "Wie heißt du? Ich heiße David",
    missingWordOneGerman: "Wie heißt du",
    missingSentenceTwoGerman: "Ich heiße Dani",
    missingWordTwoGerman: "Ich heiße",
  
    missingSentenceOneItalian: "Come ti chiami? Mi chiamo Davide",
    missingWordOneItalian: "Come ti chiami",
    missingSentenceTwoItalian: "Mi chiamo Daniele",
    missingWordTwoItalian: "Mi chiamo",
  
    missingSentenceOneSpanish: "Cómo te llamas? Me llamo David",
    missingWordOneSpanish: "Cómo te llamas",
    missingSentenceTwoSpanish: "Me llamo Dani",
    missingWordTwoSpanish: "Me llamo",
  
    missingSentenceOneFrench: "Comment tu t'appelles? Je m'appelle David",
    missingWordOneFrench: "Comment tu t'appelles",
    missingSentenceTwoFrench: "Je m'appelle Dani",
    missingWordTwoFrench: "Je m'appelle",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 4,

    missingSentenceOneHebrew: "כן אני מבין את השאלה",
    missingSentenceTwoHebrew: "לא, אני לא מבין את זה",
    missingWordOneHebrew: "כן",
    missingWordTwoHebrew: "לא",

    missingSentenceOneGerman: "Ja, ich verstehe die Frage",
    missingWordOneGerman: "Ja",
    missingSentenceTwoGerman: "Nein, ich verstehe das nicht",
    missingWordTwoGerman: "Nein",

    missingSentenceOneItalian: "Sì, capisco la domanda",
    missingWordOneItalian: "Sì",
    missingSentenceTwoItalian: "No, non capisco questo",
    missingWordTwoItalian: "No",

    missingSentenceOneSpanish: "Sí, entiendo la pregunta",
    missingWordOneSpanish: "Sí",
    missingSentenceTwoSpanish: "No, no entiendo esto",
    missingWordTwoSpanish: "No",

    missingSentenceOneFrench: "Oui, je comprends la question",
    missingWordOneFrench: "Oui",
    missingSentenceTwoFrench: "Non, je ne comprends pas ça",
    missingWordTwoFrench: "Non",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Introduction",
    lessonOrder: 5,
  
    missingSentenceOneHebrew: "איפה אתה עכשיו?",
    missingSentenceTwoHebrew: "כן, אני בסדר. תודה!",
    missingWordOneHebrew: "איפה",
    missingWordTwoHebrew: "אני בסדר",
  
    missingSentenceOneGerman: "Wo bist du jetzt?",
    missingWordOneGerman: "Wo",
    missingSentenceTwoGerman: "Ja, mir geht's gut. Danke!",
    missingWordTwoGerman: "mir geht's gut",
  
    missingSentenceOneItalian: "Dove sei adesso?",
    missingWordOneItalian: "Dove",
    missingSentenceTwoItalian: "Sì, sto bene. Grazie!",
    missingWordTwoItalian: "sto bene",
  
    missingSentenceOneSpanish: "¿Dónde estás ahora?",
    missingWordOneSpanish: "¿Dónde?",
    missingSentenceTwoSpanish: "Sí, estoy bien. ¡Gracias!",
    missingWordTwoSpanish: "estoy bien",
  
    missingSentenceOneFrench: "Où es-tu maintenant?",
    missingWordOneFrench: "Où",
    missingSentenceTwoFrench: "Oui, ça va bien. Merci!",
    missingWordTwoFrench: "ça va bien",
  
    finished: false
  },

  /* ---------------------------------------------------------------------------------------------------------------- */

  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 0,
  
    missingSentenceOneHebrew: "יש היום מזג אוויר חם",
    missingSentenceTwoHebrew: "בחורף יש מזג אוויר קר",
    missingWordOneHebrew: "מזג אוויר",
    missingWordTwoHebrew: "קר",
  
    missingSentenceOneGerman: "Heute gibt es heißes Wetter",
    missingWordOneGerman: "Wetter",
    missingSentenceTwoGerman: "Im Winter gibt es kaltes Wetter",
    missingWordTwoGerman: "kalt",
  
    missingSentenceOneItalian: "Oggi c'è tempo caldo",
    missingWordOneItalian: "tempo",
    missingSentenceTwoItalian: "In inverno c'è tempo freddo",
    missingWordTwoItalian: "freddo",
  
    missingSentenceOneSpanish: "Hoy hay tiempo caluroso",
    missingWordOneSpanish: "tiempo",
    missingSentenceTwoSpanish: "En invierno hay tiempo frío",
    missingWordTwoSpanish: "frío",
  
    missingSentenceOneFrench: "Aujourd'hui, il fait chaud",
    missingWordOneFrench: "météo",
    missingSentenceTwoFrench: "En hiver, il fait froid",
    missingWordTwoFrench: "froid",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 1,
  
    missingSentenceOneHebrew: "ביום שמשי חם מאוד",
    missingSentenceTwoHebrew: "יש עכשיו סערה",
    missingWordOneHebrew: "שמשי",
    missingWordTwoHebrew: "סערה",
  
    missingSentenceOneGerman: "An einem sonnigen Tag ist es sehr heiß",
    missingWordOneGerman: "sonnigen",
    missingSentenceTwoGerman: "Es gibt jetzt einen Sturm",
    missingWordTwoGerman: "Sturm",
  
    missingSentenceOneItalian: "In una giornata soleggiata fa molto caldo",
    missingWordOneItalian: "soleggiata",
    missingSentenceTwoItalian: "C'è una tempesta adesso",
    missingWordTwoItalian: "tempesta",
  
    missingSentenceOneSpanish: "En un día soleado hace mucho calor",
    missingWordOneSpanish: "soleado",
    missingSentenceTwoSpanish: "Ahora hay una tormenta",
    missingWordTwoSpanish: "tormenta",
  
    missingSentenceOneFrench: "Par une journée ensoleillée, il fait très chaud",
    missingWordOneFrench: "ensoleillée",
    missingSentenceTwoFrench: "Il y a une tempête maintenant",
    missingWordTwoFrench: "tempête",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 2,
  
    missingSentenceOneHebrew: "יש עכשיו רוח חזקה",
    missingSentenceTwoHebrew: "יש שלג בחוץ",
    missingWordOneHebrew: "רוח",
    missingWordTwoHebrew: "שלג",
  
    missingSentenceOneGerman: "Es gibt jetzt starken Wind",
    missingWordOneGerman: "Wind",
    missingSentenceTwoGerman: "Es gibt Schnee draußen",
    missingWordTwoGerman: "Schnee",
  
    missingSentenceOneItalian: "C'è un vento forte adesso",
    missingWordOneItalian: "vento",
    missingSentenceTwoItalian: "C'è neve fuori",
    missingWordTwoItalian: "neve",
  
    missingSentenceOneSpanish: "Hay un viento fuerte ahora",
    missingWordOneSpanish: "viento",
    missingSentenceTwoSpanish: "Hay nieve afuera",
    missingWordTwoSpanish: "nieve",
  
    missingSentenceOneFrench: "Il y a un vent fort maintenant",
    missingWordOneFrench: "vent",
    missingSentenceTwoFrench: "Il y a de la neige dehors",
    missingWordTwoFrench: "neige",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 3,
  
    missingSentenceOneHebrew: "ברקים ורעמים זה מפחיד",
    missingSentenceTwoHebrew: "תהיה טמפרטורה נמוכה מחר",
    missingWordOneHebrew: "ברקים ורעמים",
    missingWordTwoHebrew: "טמפרטורה",
  
    missingSentenceOneGerman: "Blitze und Donner sind beängstigend",
    missingWordOneGerman: "Blitze und Donner",
    missingSentenceTwoGerman: "Es wird morgen eine niedrige Temperatur geben",
    missingWordTwoGerman: "Temperatur",
  
    missingSentenceOneItalian: "Fulmini e tuoni sono spaventosi",
    missingWordOneItalian: "fulmini e tuoni",
    missingSentenceTwoItalian: "Ci sarà una temperatura bassa domani",
    missingWordTwoItalian: "temperatura",
  
    missingSentenceOneSpanish: "Relámpagos y truenos son aterradores",
    missingWordOneSpanish: "relámpagos y truenos",
    missingSentenceTwoSpanish: "Habrá una temperatura baja mañana",
    missingWordTwoSpanish: "temperatura",
  
    missingSentenceOneFrench: "Les éclairs et le tonnerre sont effrayants",
    missingWordOneFrench: "éclairs et tonnerre",
    missingSentenceTwoFrench: "Il fera une température basse demain",
    missingWordTwoFrench: "température",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 4,
  
    missingSentenceOneHebrew: "יש היום מזג אוויר חם",
    missingSentenceTwoHebrew: "מחר יהי מעונן",
    missingWordOneHebrew: "מזג אוויר",
    missingWordTwoHebrew: "מעונן",
  
    missingSentenceOneGerman: "Heute gibt es heißes Wetter",
    missingWordOneGerman: "Wetter",
    missingSentenceTwoGerman: "Morgen wird es bewölkt sein",
    missingWordTwoGerman: "bewölkt",
  
    missingSentenceOneItalian: "Oggi c'è tempo caldo",
    missingWordOneItalian: "tempo",
    missingSentenceTwoItalian: "Domani sarà nuvoloso",
    missingWordTwoItalian: "nuvoloso",
  
    missingSentenceOneSpanish: "Hoy hay tiempo caluroso",
    missingWordOneSpanish: "tiempo",
    missingSentenceTwoSpanish: "Mañana estará nublado",
    missingWordTwoSpanish: "nublado",
  
    missingSentenceOneFrench: "Aujourd'hui, il fait chaud",
    missingWordOneFrench: "météo",
    missingSentenceTwoFrench: "Demain, il fera nuageux",
    missingWordTwoFrench: "nuageux",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Weather",
    lessonOrder: 5,
  
    missingSentenceOneHebrew: "מחר יהיה חם מאוד",
    missingSentenceTwoHebrew: "היום היה שלג",
    missingWordOneHebrew: "חם",
    missingWordTwoHebrew: "שלג",
  
    missingSentenceOneGerman: "Morgen wird es sehr heiß sein",
    missingWordOneGerman: "heiß",
    missingSentenceTwoGerman: "Heute gab es Schnee",
    missingWordTwoGerman: "Schnee",
  
    missingSentenceOneItalian: "Domani farà molto caldo",
    missingWordOneItalian: "caldo",
    missingSentenceTwoItalian: "Oggi c'è stata neve",
    missingWordTwoItalian: "neve",
  
    missingSentenceOneSpanish: "Mañana hará mucho calor",
    missingWordOneSpanish: "calor",
    missingSentenceTwoSpanish: "Hoy hubo nieve",
    missingWordTwoSpanish: "nieve",
  
    missingSentenceOneFrench: "Demain, il fera très chaud",
    missingWordOneFrench: "chaud",
    missingSentenceTwoFrench: "Aujourd'hui, il y avait de la neige",
    missingWordTwoFrench: "neige",
  
    finished: false
  },  

  /* ---------------------------------------------------------------------------------------------------------------- */

  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 0,
  
    missingSentenceOneHebrew: "אני לובש חולצה כחולה",
    missingSentenceTwoHebrew: "יש לי מכנסיים ארוכים",
    missingWordOneHebrew: "חולצה",
    missingWordTwoHebrew: "מכנסיים",
  
    missingSentenceOneGerman: "Ich trage ein blaues Hemd",
    missingWordOneGerman: "Hemd",
    missingSentenceTwoGerman: "Ich habe eine lange Hose",
    missingWordTwoGerman: "Hose",
  
    missingSentenceOneItalian: "Indosso una maglietta blu",
    missingWordOneItalian: "maglietta",
    missingSentenceTwoItalian: "Ho dei pantaloni lunghi",
    missingWordTwoItalian: "pantaloni",
  
    missingSentenceOneSpanish: "Llevo una camisa azul",
    missingWordOneSpanish: "camisa",
    missingSentenceTwoSpanish: "Tengo pantalones largos",
    missingWordTwoSpanish: "pantalones",
  
    missingSentenceOneFrench: "Je porte une chemise bleue",
    missingWordOneFrench: "chemise",
    missingSentenceTwoFrench: "J'ai un pantalon long",
    missingWordTwoFrench: "pantalon",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 1,
  
    missingSentenceOneHebrew: "אני לובשת מעיל חם בחורף",
    missingSentenceTwoHebrew: "אני לובש סוודר בערב",
    missingWordOneHebrew: "מעיל",
    missingWordTwoHebrew: "סוודר",
  
    missingSentenceOneGerman: "Ich trage einen warmen Mantel im Winter",
    missingWordOneGerman: "Mantel",
    missingSentenceTwoGerman: "Ich trage einen Pullover am Abend",
    missingWordTwoGerman: "Pullover",
  
    missingSentenceOneItalian: "Indosso un cappotto caldo in inverno",
    missingWordOneItalian: "cappotto",
    missingSentenceTwoItalian: "Indosso un maglione di sera",
    missingWordTwoItalian: "maglione",
  
    missingSentenceOneSpanish: "Llevo un abrigo cálido en invierno",
    missingWordOneSpanish: "abrigo",
    missingSentenceTwoSpanish: "Llevo un suéter por la noche",
    missingWordTwoSpanish: "suéter",
  
    missingSentenceOneFrench: "Je porte un manteau chaud en hiver",
    missingWordOneFrench: "manteau",
    missingSentenceTwoFrench: "Je porte un pull le soir",
    missingWordTwoFrench: "pull",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 2,
  
    missingSentenceOneHebrew: "יש לך חצאית אדומה",
    missingSentenceTwoHebrew: "יש לי שמלה ארוכה ויפה",
    missingWordOneHebrew: "חצאית",
    missingWordTwoHebrew: "שמלה",
  
    missingSentenceOneGerman: "Hast du einen roten Rock?",
    missingWordOneGerman: "Rock",
    missingSentenceTwoGerman: "Ich habe ein langes und schönes Kleid",
    missingWordTwoGerman: "Kleid",
  
    missingSentenceOneItalian: "Hai una gonna rossa?",
    missingWordOneItalian: "gonna",
    missingSentenceTwoItalian: "Ho un vestito lungo e bello",
    missingWordTwoItalian: "vestito",
  
    missingSentenceOneSpanish: "¿Tienes una falda roja?",
    missingWordOneSpanish: "falda",
    missingSentenceTwoSpanish: "Tengo un vestido largo y bonito",
    missingWordTwoSpanish: "vestido",
  
    missingSentenceOneFrench: "As-tu une jupe rouge?",
    missingWordOneFrench: "jupe",
    missingSentenceTwoFrench: "J'ai une robe longue et belle",
    missingWordTwoFrench: "robe",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 3,
  
    missingSentenceOneHebrew: "יש לך נעליים חדשות",
    missingSentenceTwoHebrew: "יש לי גרביים בצבע כחול",
    missingWordOneHebrew: "נעליים",
    missingWordTwoHebrew: "גרביים",
  
    missingSentenceOneGerman: "Hast du neue Schuhe?",
    missingWordOneGerman: "Schuhe",
    missingSentenceTwoGerman: "Ich habe blaue Socken",
    missingWordTwoGerman: "Socken",
  
    missingSentenceOneItalian: "Hai delle scarpe nuove?",
    missingWordOneItalian: "scarpe",
    missingSentenceTwoItalian: "Ho dei calzini blu",
    missingWordTwoItalian: "calzini",
  
    missingSentenceOneSpanish: "¿Tienes zapatos nuevos?",
    missingWordOneSpanish: "zapatos",
    missingSentenceTwoSpanish: "Tengo calcetines azules",
    missingWordTwoSpanish: "calcetines",
  
    missingSentenceOneFrench: "As-tu de nouvelles chaussures?",
    missingWordOneFrench: "chaussures",
    missingSentenceTwoFrench: "J'ai des chaussettes bleues",
    missingWordTwoFrench: "chaussettes",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 4,
  
    missingSentenceOneHebrew: "יש לי חצאית כחולה",
    missingSentenceTwoHebrew: "יש לי שמלה ארוכה ויפה",
    missingWordOneHebrew: "חצאית",
    missingWordTwoHebrew: "שמלה",
  
    missingSentenceOneGerman: "Ich habe einen blauen Rock",
    missingWordOneGerman: "Rock",
    missingSentenceTwoGerman: "Ich habe ein langes und schönes Kleid",
    missingWordTwoGerman: "Kleid",
  
    missingSentenceOneItalian: "Ho una gonna blu",
    missingWordOneItalian: "gonna",
    missingSentenceTwoItalian: "Ho un vestito lungo e bello",
    missingWordTwoItalian: "vestito",
  
    missingSentenceOneSpanish: "Tengo una falda azul",
    missingWordOneSpanish: "falda",
    missingSentenceTwoSpanish: "Tengo un vestido largo y bonito",
    missingWordTwoSpanish: "vestido",
  
    missingSentenceOneFrench: "J'ai une jupe bleue",
    missingWordOneFrench: "jupe",
    missingSentenceTwoFrench: "J'ai une robe longue et belle",
    missingWordTwoFrench: "robe",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Clothes",
    lessonOrder: 5,
  
    missingSentenceOneHebrew: "יש לך משקפי שמש חדשות",
    missingSentenceTwoHebrew: "יש לי עניבה בצבע לבן",
    missingWordOneHebrew: "משקפי שמש",
    missingWordTwoHebrew: "עניבה",
  
    missingSentenceOneGerman: "Hast du eine neue Sonnenbrille?",
    missingWordOneGerman: "Sonnenbrille",
    missingSentenceTwoGerman: "Ich habe eine weiße Krawatte",
    missingWordTwoGerman: "Krawatte",
  
    missingSentenceOneItalian: "Hai degli occhiali da sole nuovi?",
    missingWordOneItalian: "occhiali da sole",
    missingSentenceTwoItalian: "Ho una cravatta bianca",
    missingWordTwoItalian: "cravatta",
  
    missingSentenceOneSpanish: "¿Tienes gafas de sol nuevas?",
    missingWordOneSpanish: "gafas de sol",
    missingSentenceTwoSpanish: "Tengo una corbata blanca",
    missingWordTwoSpanish: "corbata",
  
    missingSentenceOneFrench: "As-tu de nouvelles lunettes de soleil?",
    missingWordOneFrench: "lunettes de soleil",
    missingSentenceTwoFrench: "J'ai une cravate blanche",
    missingWordTwoFrench: "cravate",
  
    finished: false
  },  
  
  /* ---------------------------------------------------------------------------------------------------------------- */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 0,
  
    missingSentenceOneHebrew: "אני אוהב לאכול לחם",
    missingSentenceTwoHebrew: "אני שותה חלב כל יום",
    missingWordOneHebrew: "לחם",
    missingWordTwoHebrew: "חלב",
  
    missingSentenceOneGerman: "Ich esse gerne Brot",
    missingWordOneGerman: "Brot",
    missingSentenceTwoGerman: "Ich trinke jeden Tag Milch",
    missingWordTwoGerman: "Milch",
  
    missingSentenceOneItalian: "Mi piace mangiare pane",
    missingWordOneItalian: "pane",
    missingSentenceTwoItalian: "Bevo latte ogni giorno",
    missingWordTwoItalian: "latte",
  
    missingSentenceOneSpanish: "Me gusta comer pan",
    missingWordOneSpanish: "pan",
    missingSentenceTwoSpanish: "Bebo leche todos los días",
    missingWordTwoSpanish: "leche",
  
    missingSentenceOneFrench: "J'aime manger du pain",
    missingWordOneFrench: "pain",
    missingSentenceTwoFrench: "Je bois du lait tous les jours",
    missingWordTwoFrench: "lait",
  
    finished: false
  },  
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 1,
  
    missingSentenceOneHebrew: "אני מוסיף ביצה לעוגה",
    missingSentenceTwoHebrew: "אני אוהב לאכול חמאה",
    missingWordOneHebrew: "ביצה",
    missingWordTwoHebrew: "חמאה",
  
    missingSentenceOneGerman: "Ich füge ein Ei zum Kuchen hinzu",
    missingWordOneGerman: "Ei",
    missingSentenceTwoGerman: "Ich esse gerne Butter",
    missingWordTwoGerman: "Butter",
  
    missingSentenceOneItalian: "Aggiungo un uovo alla torta",
    missingWordOneItalian: "uovo",
    missingSentenceTwoItalian: "Mi piace mangiare burro",
    missingWordTwoItalian: "burro",
  
    missingSentenceOneSpanish: "Agrego un huevo al pastel",
    missingWordOneSpanish: "huevo",
    missingSentenceTwoSpanish: "Me gusta comer mantequilla",
    missingWordTwoSpanish: "mantequilla",
  
    missingSentenceOneFrench: "J'ajoute un œuf au gâteau",
    missingWordOneFrench: "œuf",
    missingSentenceTwoFrench: "J'aime manger du beurre",
    missingWordTwoFrench: "beurre",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 2,
  
    missingSentenceOneHebrew: "אני אוהב לאכול גבינה",
    missingSentenceTwoHebrew: "תפוח אדמה זה בריא",
    missingWordOneHebrew: "גבינה",
    missingWordTwoHebrew: "תפוח אדמה",
  
    missingSentenceOneGerman: "Ich esse gerne Käse",
    missingWordOneGerman: "Käse",
    missingSentenceTwoGerman: "Eine Kartoffel ist gesund",
    missingWordTwoGerman: "Kartoffel",
  
    missingSentenceOneItalian: "Mi piace mangiare formaggio",
    missingWordOneItalian: "formaggio",
    missingSentenceTwoItalian: "La patata è salutare",
    missingWordTwoItalian: "patata",
  
    missingSentenceOneSpanish: "Me gusta comer queso",
    missingWordOneSpanish: "queso",
    missingSentenceTwoSpanish: "La papa es saludable",
    missingWordTwoSpanish: "papa",
  
    missingSentenceOneFrench: "J'aime manger du fromage",
    missingWordOneFrench: "fromage",
    missingSentenceTwoFrench: "La pomme de terre est saine",
    missingWordTwoFrench: "pomme de terre",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 3,

    missingSentenceOneHebrew: "אני קונה עגבנייה בסופר",
    missingSentenceTwoHebrew: "אני מוסיף מלפפון לסלט",
    missingWordOneHebrew: "עגבנייה",
    missingWordTwoHebrew: "מלפפון",

    missingSentenceOneGerman: "Ich kaufe eine Tomate im Supermarkt",
    missingWordOneGerman: "Tomate",
    missingSentenceTwoGerman: "Ich füge eine Gurke zum Salat hinzu",
    missingWordTwoGerman: "Gurke",

    missingSentenceOneItalian: "Compro un pomodoro al supermercato",
    missingWordOneItalian: "pomodoro",
    missingSentenceTwoItalian: "Aggiungo un cetriolo all'insalata",
    missingWordTwoItalian: "cetriolo",

    missingSentenceOneSpanish: "Compro un tomate en el supermercado",
    missingWordOneSpanish: "tomate",
    missingSentenceTwoSpanish: "Agrego un pepino a la ensalada",
    missingWordTwoSpanish: "pepino",

    missingSentenceOneFrench: "J'achète une tomate au supermarché",
    missingWordOneFrench: "tomate",
    missingSentenceTwoFrench: "J'ajoute un concombre à la salade",
    missingWordTwoFrench: "concombre",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 4,
  
    missingSentenceOneHebrew: "עוף זה טעים",
    missingSentenceTwoHebrew: "בשר זה בריא",
    missingWordOneHebrew: "עוף",
    missingWordTwoHebrew: "בשר",
  
    missingSentenceOneGerman: "Hähnchen ist lecker",
    missingWordOneGerman: "Hähnchen",
    missingSentenceTwoGerman: "Fleisch ist gesund",
    missingWordTwoGerman: "Fleisch",
  
    missingSentenceOneItalian: "Il pollo è delizioso",
    missingWordOneItalian: "pollo",
    missingSentenceTwoItalian: "La carne è salutare",
    missingWordTwoItalian: "carne",
  
    missingSentenceOneSpanish: "El pollo es delicioso",
    missingWordOneSpanish: "pollo",
    missingSentenceTwoSpanish: "La carne es saludable",
    missingWordTwoSpanish: "carne",
  
    missingSentenceOneFrench: "Le poulet est délicieux",
    missingWordOneFrench: "poulet",
    missingSentenceTwoFrench: "La viande est saine",
    missingWordTwoFrench: "viande",
  
    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Food Products",
    lessonOrder: 5,

    missingSentenceOneHebrew: "אני אוהב לאכול דג",
    missingSentenceTwoHebrew: "ממתקים זה לא בריא",
    missingWordOneHebrew: "דג",
    missingWordTwoHebrew: "ממתקים",
  
    missingSentenceOneGerman: "Ich esse gerne Fisch",
    missingWordOneGerman: "Fisch",
    missingSentenceTwoGerman: "Süßigkeiten sind ungesund",
    missingWordTwoGerman: "Süßigkeiten",
  
    missingSentenceOneItalian: "Mi piace mangiare pesce",
    missingWordOneItalian: "pesce",
    missingSentenceTwoItalian: "I dolci non sono salutari",
    missingWordTwoItalian: "dolci",
  
    missingSentenceOneSpanish: "Me gusta comer pescado",
    missingWordOneSpanish: "pescado",
    missingSentenceTwoSpanish: "Los dulces no son saludables",
    missingWordTwoSpanish: "dulces",
  
    missingSentenceOneFrench: "J'aime manger du poisson",
    missingWordOneFrench: "poisson",
    missingSentenceTwoFrench: "Les bonbons ne sont pas sains",
    missingWordTwoFrench: "bonbons",
  
    finished: false
  },

  /* ---------------------------------------------------------------------------------------------------------------- */

  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 0,

    missingSentenceOneHebrew: "אני שותה מים כל יום",
    missingSentenceTwoHebrew: "אני אוהב לשתות קפה בבוקר",
    missingWordOneHebrew: "מים",
    missingWordTwoHebrew: "קפה",

    missingSentenceOneGerman: "Ich trinke jeden Tag Wasser",
    missingWordOneGerman: "Wasser",
    missingSentenceTwoGerman: "Ich trinke gerne Kaffee am Morgen",
    missingWordTwoGerman: "Kaffee",

    missingSentenceOneItalian: "Bevo acqua ogni giorno",
    missingWordOneItalian: "acqua",
    missingSentenceTwoItalian: "Mi piace bere caffè la mattina",
    missingWordTwoItalian: "caffè",

    missingSentenceOneSpanish: "Bebo agua todos los días",
    missingWordOneSpanish: "agua",
    missingSentenceTwoSpanish: "Me gusta tomar café por la mañana",
    missingWordTwoSpanish: "café",

    missingSentenceOneFrench: "Je bois de l'eau tous les jours",
    missingWordOneFrench: "eau",
    missingSentenceTwoFrench: "J'aime boire du café le matin",
    missingWordTwoFrench: "café",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 1,

    missingSentenceOneHebrew: "אני שותה תה בערב",
    missingSentenceTwoHebrew: "אני אוהב מיץ תפוזים בבוקר",
    missingWordOneHebrew: "תה",
    missingWordTwoHebrew: "מיץ תפוזים",

    missingSentenceOneGerman: "Ich trinke abends Tee",
    missingWordOneGerman: "Tee",
    missingSentenceTwoGerman: "Ich mag Orangensaft am Morgen",
    missingWordTwoGerman: "Orangensaft",

    missingSentenceOneItalian: "Bevo tè la sera",
    missingWordOneItalian: "tè",
    missingSentenceTwoItalian: "Mi piace il succo d'arancia al mattino",
    missingWordTwoItalian: "succo d'arancia",

    missingSentenceOneSpanish: "Bebo té por la noche",
    missingWordOneSpanish: "té",
    missingSentenceTwoSpanish: "Me gusta el jugo de naranja por la mañana",
    missingWordTwoSpanish: "jugo de naranja",

    missingSentenceOneFrench: "Je bois du thé le soir",
    missingWordOneFrench: "thé",
    missingSentenceTwoFrench: "J'aime le jus d'orange le matin",
    missingWordTwoFrench: "jus d'orange",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 2,

    missingSentenceOneHebrew: "אני אוהב מיץ תפוחים",
    missingSentenceTwoHebrew: "יש לי מיץ ענבים במקרר",
    missingWordOneHebrew: "מיץ תפוחים",
    missingWordTwoHebrew: "מיץ ענבים",

    missingSentenceOneGerman: "Ich mag Apfelsaft",
    missingWordOneGerman: "Apfelsaft",
    missingSentenceTwoGerman: "Ich habe Traubensaft im Kühlschrank",
    missingWordTwoGerman: "Traubensaft",

    missingSentenceOneItalian: "Mi piace il succo di mela",
    missingWordOneItalian: "succo di mela",
    missingSentenceTwoItalian: "Ho succo d'uva nel frigorifero",
    missingWordTwoItalian: "succo d'uva",

    missingSentenceOneSpanish: "Me gusta el zumo de manzana",
    missingWordOneSpanish: "zumo de manzana",
    missingSentenceTwoSpanish: "Tengo jugo de uva en la nevera",
    missingWordTwoSpanish: "jugo de uva",

    missingSentenceOneFrench: "J'aime le jus de pomme",
    missingWordOneFrench: "jus de pomme",
    missingSentenceTwoFrench: "J'ai du jus de raisin au réfrigérateur",
    missingWordTwoFrench: "jus de raisin",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 3,

    missingSentenceOneHebrew: "אני מזמין קולה במסעדה",
    missingSentenceTwoHebrew: "אני שותה סודה בארוחת ערב",
    missingWordOneHebrew: "קולה",
    missingWordTwoHebrew: "סודה",

    missingSentenceOneGerman: "Ich bestelle Cola im Restaurant",
    missingWordOneGerman: "Cola",
    missingSentenceTwoGerman: "Ich trinke Sprudelwasser zum Abendessen",
    missingWordTwoGerman: "Sprudelwasser",

    missingSentenceOneItalian: "Ordino una cola al ristorante",
    missingWordOneItalian: "cola",
    missingSentenceTwoItalian: "Bevo acqua frizzante a cena",
    missingWordTwoItalian: "acqua frizzante",

    missingSentenceOneSpanish: "Pido una cola en el restaurante",
    missingWordOneSpanish: "cola",
    missingSentenceTwoSpanish: "Bebo agua con gas en la cena",
    missingWordTwoSpanish: "agua con gas",

    missingSentenceOneFrench: "Je commande un cola au restaurant",
    missingWordOneFrench: "cola",
    missingSentenceTwoFrench: "Je bois de l'eau pétillante au dîner",
    missingWordTwoFrench: "eau pétillante",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 4,

    missingSentenceOneHebrew: "אני שותה חלב בבוקר",
    missingSentenceTwoHebrew: "אני אוהב לאכול יוגורט",
    missingWordOneHebrew: "חלב",
    missingWordTwoHebrew: "יוגורט",

    missingSentenceOneGerman: "Ich trinke morgens Milch",
    missingWordOneGerman: "Milch",
    missingSentenceTwoGerman: "Ich esse gerne Joghurt",
    missingWordTwoGerman: "Joghurt",

    missingSentenceOneItalian: "Bevo latte al mattino",
    missingWordOneItalian: "latte",
    missingSentenceTwoItalian: "Mi piace mangiare yogurt",
    missingWordTwoItalian: "yogurt",

    missingSentenceOneSpanish: "Bebo leche por la mañana",
    missingWordOneSpanish: "leche",
    missingSentenceTwoSpanish: "Me gusta comer yogur",
    missingWordTwoSpanish: "yogur",

    missingSentenceOneFrench: "Je bois du lait le matin",
    missingWordOneFrench: "lait",
    missingSentenceTwoFrench: "J'aime manger du yaourt",
    missingWordTwoFrench: "yaourt",

    finished: false
  },
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Beverages",
    lessonOrder: 5,

    missingSentenceOneHebrew: "אני שותה שוקו בערב",
    missingSentenceTwoHebrew: "אני אוהב לשתות בירה",
    missingWordOneHebrew: "שוקו",
    missingWordTwoHebrew: "בירה",

    missingSentenceOneGerman: "Ich trinke abends Schokoladenmilch",
    missingWordOneGerman: "Schokoladenmilch",
    missingSentenceTwoGerman: "Ich trinke gerne Bier",
    missingWordTwoGerman: "Bier",

    missingSentenceOneItalian: "Bevo latte al cioccolato la sera",
    missingWordOneItalian: "latte al cioccolato",
    missingSentenceTwoItalian: "Mi piace bere birra",
    missingWordTwoItalian: "birra",

    missingSentenceOneSpanish: "Bebo leche con chocolate por la noche",
    missingWordOneSpanish: "leche con chocolate",
    missingSentenceTwoSpanish: "Me gusta beber cerveza",
    missingWordTwoSpanish: "cerveza",

    missingSentenceOneFrench: "Je bois du lait au chocolat le soir",
    missingWordOneFrench: "lait au chocolat",
    missingSentenceTwoFrench: "J'aime boire de la bière",
    missingWordTwoFrench: "bière",

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

const missingWordData = missingWords.map((missingWord) => ({
  ...missingWord,
  userId,
  courseId: getUuidByCourseName(courseIds, missingWord.courseNameEnglish),
}));

await db.insert(MissingWords).values(missingWordData).returning();
};