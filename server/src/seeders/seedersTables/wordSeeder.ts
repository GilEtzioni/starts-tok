import { Words } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { Word } from "../../types/seedersType";
import { v4 as uuidv4 } from "uuid";

export const wordSeeder = async (userId: string, courseIds: Array<{ index: number; uuid: string; courseName: string }>) => {

  console.log("Seeding database...");
  const words: Word[] = [
  // Colors - 1
    { hebrewWord: "אדום", germanWord: "rot", italianWord: "rosso", spanishWord: "rojo", frenchWord: "rouge", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "כחול", germanWord: "blau", italianWord: "blu", spanishWord: "azul", frenchWord: "bleu", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "ירוק", germanWord: "grün", italianWord: "verde", spanishWord: "verde", frenchWord: "vert", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "צהוב", germanWord: "gelb", italianWord: "giallo", spanishWord: "amarillo", frenchWord: "jaune", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "שחור", germanWord: "schwarz", italianWord: "nero", spanishWord: "negro", frenchWord: "noir", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "לבן", germanWord: "weiß", italianWord: "bianco", spanishWord: "blanco", frenchWord: "blanc", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "כתום", germanWord: "orange", italianWord: "arancione", spanishWord: "naranja", frenchWord: "orange", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "ורוד", germanWord: "rosa", italianWord: "rosa", spanishWord: "rosa", frenchWord: "rose", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "אפור", germanWord: "grau", italianWord: "grigio", spanishWord: "gris", frenchWord: "gris", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "חום", germanWord: "braun", italianWord: "marrone", spanishWord: "marrón", frenchWord: "marron", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "סגול", germanWord: "lila", italianWord: "viola", spanishWord: "morado", frenchWord: "violet", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "תכלת", germanWord: "hellblau", italianWord: "azzurro", spanishWord: "celeste", frenchWord: "bleu clair", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Colors", courseOrder: 1 },

  // Numbers - 2
  { hebrewWord: "אחד", germanWord: "eins", italianWord: "uno", spanishWord: "uno", frenchWord: "un", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "שתיים", germanWord: "zwei", italianWord: "due", spanishWord: "dos", frenchWord: "deux", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "שלוש", germanWord: "drei", italianWord: "tre", spanishWord: "tres", frenchWord: "trois", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "אבע", germanWord: "vier", italianWord: "quattro", spanishWord: "cuatro", frenchWord: "quatre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "חמש", germanWord: "fünf", italianWord: "cinque", spanishWord: "cinco", frenchWord: "cinq", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "שש", germanWord: "sechs", italianWord: "sei", spanishWord: "seis", frenchWord: "six", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "שבע", germanWord: "sieben", italianWord: "sette", spanishWord: "siete", frenchWord: "sept", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "שמונה", germanWord: "acht", italianWord: "otto", spanishWord: "ocho", frenchWord: "huit", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "תשע", germanWord: "neun", italianWord: "nove", spanishWord: "nueve", frenchWord: "neuf", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "עשר", germanWord: "zehn", italianWord: "dieci", spanishWord: "diez", frenchWord: "dix", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "אחד עשרה", germanWord: "elf", italianWord: "undici", spanishWord: "once", frenchWord: "onze", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },
  { hebrewWord: "שתיים עשרה", germanWord: "zwölf", italianWord: "dodici", spanishWord: "doce", frenchWord: "douze", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Numbers", courseOrder: 2 },

  // Family Members - 3
  { hebrewWord: "אמא", germanWord: "Mutter", italianWord: "madre", spanishWord: "madre", frenchWord: "mère", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "אבא", germanWord: "Vater", italianWord: "padre", spanishWord: "padre", frenchWord: "père", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "אח", germanWord: "Bruder", italianWord: "fratello", spanishWord: "hermano", frenchWord: "frère", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "אחות", germanWord: "Schwester", italianWord: "sorella", spanishWord: "hermana", frenchWord: "sœur", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "סבא", germanWord: "Großvater", italianWord: "nonno", spanishWord: "abuelo", frenchWord: "grand-père", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "סבתא", germanWord: "Großmutter", italianWord: "nonna", spanishWord: "abuela", frenchWord: "grand-mère", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "דוד", germanWord: "Onkel", italianWord: "zio", spanishWord: "tío", frenchWord: "oncle", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "דודה", germanWord: "Tante", italianWord: "zia", spanishWord: "tía", frenchWord: "tante", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "נכדה", germanWord: "Enkelin", italianWord: "nipote", spanishWord: "nieta", frenchWord: "petite-fille", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "נכד", germanWord: "Enkel", italianWord: "nipote", spanishWord: "nieto", frenchWord: "petit-fils", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "אחיין", germanWord: "Neffe", italianWord: "nipote", spanishWord: "sobrino", frenchWord: "neveu", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "אחיינית", germanWord: "Nichte", italianWord: "nipote", spanishWord: "sobrina", frenchWord: "nièce", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },
  { hebrewWord: "הורים", germanWord: "Eltern", italianWord: "genitori", spanishWord: "padres", frenchWord: "parents", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Family Members", courseOrder: 3 },

  // Days of the Week - 4
  { hebrewWord: "ראשון", germanWord: "Sonntag", italianWord: "domenica", spanishWord: "domingo", frenchWord: "dimanche", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "שני", germanWord: "Montag", italianWord: "lunedì", spanishWord: "lunes", frenchWord: "lundi", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "שלישי", germanWord: "Dienstag", italianWord: "martedì", spanishWord: "martes", frenchWord: "mardi", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "רביעי", germanWord: "Mittwoch", italianWord: "mercoledì", spanishWord: "miércoles", frenchWord: "mercredi", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "חמישי", germanWord: "Donnerstag", italianWord: "giovedì", spanishWord: "jueves", frenchWord: "jeudi", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "שישי", germanWord: "Freitag", italianWord: "venerdì", spanishWord: "viernes", frenchWord: "vendredi", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "שבת", germanWord: "Samstag", italianWord: "sabato", spanishWord: "sábado", frenchWord: "samedi", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "יום מנוחה", germanWord: "Ruhetag", italianWord: "giorno di riposo", spanishWord: "día de descanso", frenchWord: "jour de repos", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "סוף שבוע", germanWord: "Wochenende", italianWord: "fine settimana", spanishWord: "fin de semana", frenchWord: "week-end", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "יום עבודה", germanWord: "Arbeitstag", italianWord: "giorno lavorativo", spanishWord: "día laboral", frenchWord: "jour de travail", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "יום חופשי", germanWord: "Freier Tag", italianWord: "giorno libero", spanishWord: "día libre", frenchWord: "jour libre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },
  { hebrewWord: "יום חג", germanWord: "Feiertag", italianWord: "giorno di festa", spanishWord: "día de fiesta", frenchWord: "jour de fête", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Days of the Week", courseOrder: 4 },

  // Months - 5
  { hebrewWord: "ינואר", germanWord: "Januar", italianWord: "gennaio", spanishWord: "enero", frenchWord: "janvier", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "פברואר", germanWord: "Februar", italianWord: "febbraio", spanishWord: "febrero", frenchWord: "février", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "מרץ", germanWord: "März", italianWord: "marzo", spanishWord: "marzo", frenchWord: "mars", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "אפריל", germanWord: "April", italianWord: "aprile", spanishWord: "abril", frenchWord: "avril", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "מאי", germanWord: "Mai", italianWord: "maggio", spanishWord: "mayo", frenchWord: "mai", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "יוני", germanWord: "Juni", italianWord: "giugno", spanishWord: "junio", frenchWord: "juin", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "יולי", germanWord: "Juli", italianWord: "luglio", spanishWord: "julio", frenchWord: "juillet", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "אוגוסט", germanWord: "August", italianWord: "agosto", spanishWord: "agosto", frenchWord: "août", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "ספטמבר", germanWord: "September", italianWord: "settembre", spanishWord: "septiembre", frenchWord: "septembre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "אוקטובר", germanWord: "Oktober", italianWord: "ottobre", spanishWord: "octubre", frenchWord: "octobre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "נובמבר", germanWord: "November", italianWord: "novembre", spanishWord: "noviembre", frenchWord: "novembre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },
  { hebrewWord: "דצמבר", germanWord: "Dezember", italianWord: "dicembre", spanishWord: "diciembre", frenchWord: "décembre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Months", courseOrder: 5 },

  // Introduction - 6
  { hebrewWord: "שלום", germanWord: "Hallo", italianWord: "Ciao", spanishWord: "Hola", frenchWord: "Bonjour", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "שלום", germanWord: "Hallo", italianWord: "Ciao", spanishWord: "Hola", frenchWord: "Bonjour", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "תודה", germanWord: "Danke", italianWord: "Grazie", spanishWord: "Gracias", frenchWord: "Merci", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "בבקשה", germanWord: "Bitte", italianWord: "Prego", spanishWord: "Por favor", frenchWord: "S'il vous plaît", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "סליחה", germanWord: "Entschuldigung", italianWord: "Scusa", spanishWord: "Perdón", frenchWord: "Excusez-moi", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "מה שלומך", germanWord: "Wie geht's", italianWord: "Come stai", spanishWord: "Cómo estás", frenchWord: "Comment ça va", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "אני בסדר", germanWord: "Mir geht's gut", italianWord: "Sto bene", spanishWord: "Estoy bien", frenchWord: "Ça va bien", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "איך קוראים לך", germanWord: "Wie heißt du", italianWord: "Come ti chiami", spanishWord: "Cómo te llamas", frenchWord: "Comment tu t'appelles", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "קוראים לי", germanWord: "Ich heiße", italianWord: "Mi chiamo", spanishWord: "Me llamo", frenchWord: "Je m'appelle", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "אני", germanWord: "Ich bin", italianWord: "Io sono", spanishWord: "Yo soy", frenchWord: "Je suis", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "אתה", germanWord: "Du bist", italianWord: "Tu sei", spanishWord: "Tú eres", frenchWord: "Tu es", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "איפה", germanWord: "Wo", italianWord: "Dove", spanishWord: "Dónde", frenchWord: "Où", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "כן", germanWord: "Ja", italianWord: "Sì", spanishWord: "Sí", frenchWord: "Oui", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "לא", germanWord: "Nein", italianWord: "No", spanishWord: "No", frenchWord: "Non", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "אני לא מבין", germanWord: "Ich verstehe nicht", italianWord: "Non capisco", spanishWord: "No entiendo", frenchWord: "Je ne comprends pas", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "אני מבין", germanWord: "Ich verstehe", italianWord: "Capisco", spanishWord: "Entiendo", frenchWord: "Je comprends", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },
  { hebrewWord: "עזור לי", germanWord: "Helf mir", italianWord: "Aiutami", spanishWord: "Ayúdame", frenchWord: "Aide-moi", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Introduction", courseOrder: 6 },

  // Weather - 7
  { hebrewWord: "מזג אוויר", germanWord: "Wetter", italianWord: "tempo", spanishWord: "tiempo", frenchWord: "météo", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "חם", germanWord: "heiß", italianWord: "caldo", spanishWord: "calor", frenchWord: "chaud", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "קר", germanWord: "kalt", italianWord: "freddo", spanishWord: "frío", frenchWord: "froid", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "גשום", germanWord: "regnerisch", italianWord: "piovoso", spanishWord: "lluvioso", frenchWord: "pluvieux", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "מעונן", germanWord: "bewölkt", italianWord: "nuvoloso", spanishWord: "nublado", frenchWord: "nuageux", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "שמשי", germanWord: "sonnig", italianWord: "soleggiato", spanishWord: "soleado", frenchWord: "ensoleillé", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "סערה", germanWord: "Sturm", italianWord: "tempesta", spanishWord: "tormenta", frenchWord: "tempête", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "רוח", germanWord: "Wind", italianWord: "vento", spanishWord: "viento", frenchWord: "vent", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "שלג", germanWord: "Schnee", italianWord: "neve", spanishWord: "nieve", frenchWord: "neige", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "ברקים ורעמים", germanWord: "Blitze und Donner", italianWord: "fulmini e tuoni", spanishWord: "relámpagos y truenos", frenchWord: "éclairs et tonnerre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "טמפרטורה", germanWord: "Temperatur", italianWord: "temperatura", spanishWord: "temperatura", frenchWord: "température", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },
  { hebrewWord: "חם מאוד", germanWord: "sehr heiß", italianWord: "molto caldo", spanishWord: "muy caliente", frenchWord: "très chaud", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Weather", courseOrder: 7 },

  // // Clothes - 8
  { hebrewWord: "חולצה", germanWord: "Hemd", italianWord: "maglietta", spanishWord: "camisa", frenchWord: "chemise", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "מכנסיים", germanWord: "Hose", italianWord: "pantaloni", spanishWord: "pantalones", frenchWord: "pantalon", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "מעיל", germanWord: "Mantel", italianWord: "cappotto", spanishWord: "abrigo", frenchWord: "manteau", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "סוודר", germanWord: "Pullover", italianWord: "maglione", spanishWord: "suéter", frenchWord: "pull", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "חצאית", germanWord: "Rock", italianWord: "gonna", spanishWord: "falda", frenchWord: "jupe", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "שמלה", germanWord: "Kleid", italianWord: "vestito", spanishWord: "vestido", frenchWord: "robe", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "נעליים", germanWord: "Schuhe", italianWord: "scarpe", spanishWord: "zapatos", frenchWord: "chaussures", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "גרביים", germanWord: "Socken", italianWord: "calzini", spanishWord: "calcetines", frenchWord: "chaussettes", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "תיק", germanWord: "Tasche", italianWord: "borsa", spanishWord: "bolso", frenchWord: "sac", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "כובע", germanWord: "Hut", italianWord: "cappello", spanishWord: "sombrero", frenchWord: "chapeau", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "משקפי שמש", germanWord: "Sonnenbrille", italianWord: "occhiali da sole", spanishWord: "gafas de sol", frenchWord: "lunettes de soleil", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "עניבה", germanWord: "Krawatte", italianWord: "cravatta", spanishWord: "corbata", frenchWord: "cravate", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "טי שירט", germanWord: "T-Shirt", italianWord: "maglietta", spanishWord: "camiseta", frenchWord: "T-shirt", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },
  { hebrewWord: "מעיל רוח", germanWord: "Windjacke", italianWord: "giacca a vento", spanishWord: "chaqueta cortavientos", frenchWord: "veste coupe-vent", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Clothes", courseOrder: 8 },

  // // Food Products - 9
  { hebrewWord: "לחם", germanWord: "Brot", italianWord: "pane", spanishWord: "pan", frenchWord: "pain", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "חלב", germanWord: "Milch", italianWord: "latte", spanishWord: "leche", frenchWord: "lait", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "ביצה", germanWord: "Ei", italianWord: "uovo", spanishWord: "huevo", frenchWord: "œuf", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "חמאה", germanWord: "Butter", italianWord: "burro", spanishWord: "mantequilla", frenchWord: "beurre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "גבינה", germanWord: "Käse", italianWord: "formaggio", spanishWord: "queso", frenchWord: "fromage", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "תפוח אדמה", germanWord: "Kartoffel", italianWord: "patata", spanishWord: "papa", frenchWord: "pomme de terre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "עגבנייה", germanWord: "Tomate", italianWord: "pomodoro", spanishWord: "tomate", frenchWord: "tomate", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "מלפפון", germanWord: "Gurke", italianWord: "cetriolo", spanishWord: "pepino", frenchWord: "concombre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "עוף", germanWord: "Hähnchen", italianWord: "pollo", spanishWord: "pollo", frenchWord: "poulet", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "בשר", germanWord: "Fleisch", italianWord: "carne", spanishWord: "carne", frenchWord: "viande", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "דג", germanWord: "Fisch", italianWord: "pesce", spanishWord: "pescado", frenchWord: "poisson", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "ממתקים", germanWord: "Süßigkeiten", italianWord: "dolci", spanishWord: "dulces", frenchWord: "bonbons", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "סוכר", germanWord: "Zucker", italianWord: "zucchero", spanishWord: "azúcar", frenchWord: "sucre", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "מלח", germanWord: "Salz", italianWord: "sale", spanishWord: "sal", frenchWord: "sel", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },
  { hebrewWord: "קמח", germanWord: "Mehl", italianWord: "farina", spanishWord: "harina", frenchWord: "farine", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Food Products", courseOrder: 9 },

  // // Beverages - 10
  { hebrewWord: "מים", germanWord: "Wasser", italianWord: "acqua", spanishWord: "agua", frenchWord: "eau", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "קפה", germanWord: "Kaffee", italianWord: "caffè", spanishWord: "café", frenchWord: "café", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "תה", germanWord: "Tee", italianWord: "tè", spanishWord: "té", frenchWord: "thé", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "מיץ תפוזים", germanWord: "Orangensaft", italianWord: "succo d'arancia", spanishWord: "jugo de naranja", frenchWord: "jus d'orange", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "מיץ תפוחים", germanWord: "Apfelsaft", italianWord: "succo di mela", spanishWord: "zumo de manzana", frenchWord: "jus de pomme", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "מיץ ענבים", germanWord: "Traubensaft", italianWord: "succo d'uva", spanishWord: "jugo de uva", frenchWord: "jus de raisin", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "קולה", germanWord: "Cola", italianWord: "cola", spanishWord: "cola", frenchWord: "cola", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "סודה", germanWord: "Sprudelwasser", italianWord: "acqua frizzante", spanishWord: "agua con gas", frenchWord: "eau pétillante", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "חלב", germanWord: "Milch", italianWord: "latte", spanishWord: "leche", frenchWord: "lait", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "יוגורט", germanWord: "Joghurt", italianWord: "yogurt", spanishWord: "yogur", frenchWord: "yaourt", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "שוקו", germanWord: "Schokoladenmilch", italianWord: "latte al cioccolato", spanishWord: "leche con chocolate", frenchWord: "lait au chocolat", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "בירה", germanWord: "Bier", italianWord: "birra", spanishWord: "cerveza", frenchWord: "bière", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "יין", germanWord: "Wein", italianWord: "vino", spanishWord: "vino", frenchWord: "vin", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "משקה אלכוהולי", germanWord: "alkoholisches Getränk", italianWord: "bevanda alcolica", spanishWord: "bebida alcohólica", frenchWord: "boisson alcoolisée", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 },
  { hebrewWord: "מים מינרליים", germanWord: "Mineralwasser", italianWord: "acqua minerale", spanishWord: "agua mineral", frenchWord: "eau minérale", hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Beverages", courseOrder: 10 }

  // // Parts of the House - 11
  // Animals - 12

  // Health and Fitness - 26
  // Intermediate Clothes - 27
  // Intermediate Animals - 28
  // Holidays - 29
  // Intermediate Numbers - 30
  // Seasons - 31
  // Intermediate Body Parts - 32
  // Health - 33
  // Directions - 34
  // Means of Communication - 35
  // Intermediate Furniture - 36
  // Intermediate Weather - 37
  // Kitchen Tools - 38
  // Musical Instruments - 39
  // Economic Terms - 40
  // Social Media - 41
  // Intermediate Introduction - 42
  // Education - 43
  // City and Village - 44
  // Intermediate Technology - 45
  // Recycling - 46
  // Intermediate Hobbies - 47
  // Politics - 48
  // Intermediate Family Members - 49
  // Intermediate Shopping - 50

  // Intermediate Colors - 51
    // { hebrewWord: "בורדו", germanWord: "bordeauxrot", italianWord: "borgogna", spanishWord: "burdeos", frenchWord: "bordeaux", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "זהב", germanWord: "gold", italianWord: "oro", spanishWord: "dorado", frenchWord: "doré", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "כסף", germanWord: "silber", italianWord: "argento", spanishWord: "plateado", frenchWord: "argenté", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "שנהב", germanWord: "elfenbein", italianWord: "avorio", spanishWord: "marfil", frenchWord: "ivoire", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "זית", germanWord: "olivgrün", italianWord: "verde oliva", spanishWord: "verde oliva", frenchWord: "vert olive", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "טורקיז", germanWord: "türkis", italianWord: "turchese", spanishWord: "turquesa", frenchWord: "turquoise", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "ארגמן", germanWord: "purpurrot", italianWord: "porpora", spanishWord: "púrpura", frenchWord: "pourpre", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "ליים", germanWord: "limettengrün", italianWord: "lime", spanishWord: "lima", frenchWord: "citron vert", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "קרם", germanWord: "cremefarben", italianWord: "crema", spanishWord: "crema", frenchWord: "crème", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "פוקסיה", germanWord: "fuchsienrot", italianWord: "fucsia", spanishWord: "fucsia", frenchWord: "fuchsia", hebrewLevel: "בינוני", englishLevel: "B1", courseNameEnglish: "Intermediate Colors", courseOrder: 51 },

  // Advanced Animals - 52
  // Cultural Diversity - 53
  // Intermediate Professions - 54
  // Intermediate Politics - 55
  // Intermediate Economic Terms - 56
  // Climate Change - 57
  // Intermediate Transportation - 58
  // Science - 59
  // Social Issues - 60
  // Intermediate Sports - 61
  // Higher Education - 62
  // Competitions - 63
  // Intermediate Food Products - 64
  // Adventures - 65
  // Work - 66
  // Intermediate Emotions - 67
  // Intermediate Kitchen Tools - 68
  // Numbers by Tens - 69
  // Advanced Weather - 70
  // Intermediate Shapes - 71
  // Intermediate Directions - 72
  // Beverages - 73
  // Intermediate Musical Instruments - 74
  // Intermediate Education - 75

  // Advanced Colors - 76

    // { hebrewWord: "בורדו", germanWord: "bordeauxrot", italianWord: "borgogna", spanishWord: "burdeos", frenchWord: "bordeaux", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "זהב", germanWord: "gold", italianWord: "oro", spanishWord: "dorado", frenchWord: "doré", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "כסף", germanWord: "silber", italianWord: "argento", spanishWord: "plateado", frenchWord: "argenté", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "שנהב", germanWord: "elfenbein", italianWord: "avorio", spanishWord: "marfil", frenchWord: "ivoire", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "זית", germanWord: "olivgrün", italianWord: "verde oliva", spanishWord: "verde oliva", frenchWord: "vert olive", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "טורקיז", germanWord: "türkis", italianWord: "turchese", spanishWord: "turquesa", frenchWord: "turquoise", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "ארגמן", germanWord: "purpurrot", italianWord: "porpora", spanishWord: "púrpura", frenchWord: "pourpre", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "ליים", germanWord: "limettengrün", italianWord: "lime", spanishWord: "lima", frenchWord: "citron vert", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "קרם", germanWord: "cremefarben", italianWord: "crema", spanishWord: "crema", frenchWord: "crème", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "פוקסיה", germanWord: "fuchsienrot", italianWord: "fucsia", spanishWord: "fucsia", frenchWord: "fuchsia", hebrewLevel: "מתקדם", englishLevel: "B2", courseNameEnglish: "Colors", courseOrder: 76 }

  // Advanced Clothes - 77
  // Intermediate School Supplies - 78
  // Intermediate Health - 79
  // Intermediate Days of the Week - 80
  // Taxes - 81
  // Philosophical Topics - 82
  // Intermediate Parts of the House - 83
  // Describing People - 84
  // Crypto - 85
  // Advanced Politics - 86
  // International Relations - 87
  // Stars - 88
  // Theatre - 89
  // Human Rights - 90
  // Chemistry - 91
  // Artificial Intelligence - 92
  // Intermediate Holidays - 93
  // Numbers by Hundreds - 94
  // Numbers by Thousands - 95
  // Mathematical Topics - 96
  // Intermediate Higher Education - 97
  // Biology - 98
  // Intermediate Work - 99
  // Advanced Emotions - 100

  // Digital Marketing - 101
  // Graphic Design - 102
  // Graphic Design - 103
  // Classical Music - 104
  // Museums - 105
  // Stock Market - 106
  // Cooking - 107
  // Robots - 108
  // Services - 109
  // Christmas - 110
  // Fruits - 111
  // Vegetables - 112
  // Makeup - 113
  // Countries - 114
  // Extreme Sports - 115
  // Surfing - 116
  // Camping - 117
  // Martial Arts - 118
  // Market - 119
  // Gifts - 120
  // Restaurant - 121
  // Bank - 122
  // News - 123
  // Writing Tools - 124
  // Advanced Tools - 125

  // Business Communication - 126
  // Cyber - 127
  // Academic Writing - 128
  // Leadership and Management - 129
  // Legal Terms - 130
  // Globalization - 131
  // Topics in Psychology - 132
  // Renewable Energy - 133
  // Neuroscience - 134
  // Topics in Physics - 135
  // Topics in Architecture - 136
  // Religions - 137
  // Tools - 138
  // Plants and Flowers - 139
  // Sea - 140
  // Office Supplies - 141
  // Advanced Conversation Management - 142
  // Nature Trip - 143
  // Cars - 144
  // Houses - 145
  // Gym - 146
  // Brain Research - 147
  // Army - 148
  // Cinema - 149
  // Extreme Sports - 150

];

const getUuidByCourseName = ( courseIds: Array<{ index: number; uuid: string; courseName: string }>, courseName: string ): string => {
  const resultItem = courseIds.find((item) => item.courseName.toLowerCase() === courseName.toLowerCase());
  if (!resultItem) {
    console.error(`Course name "${courseName}" not found in courseIds`);
    console.error("Available course names:", courseIds.map((item) => item.courseName));
    throw new Error(`Course name "${courseName}" not found in courseIds`);
  }
  return resultItem.uuid;
};

const wordData = words.map((word) => ({
  ...word,
  userId,
  knowledge: "X",
  wordId: uuidv4(),
  courseId: getUuidByCourseName(courseIds, word.courseNameEnglish),
}));

await db.insert(Words).values(wordData).returning({ id: Words.courseId });
};