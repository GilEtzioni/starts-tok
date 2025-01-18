import { Words } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { Word } from "../../types/seedersType";
import { v4 as uuidv4 } from "uuid";

export const wordSeeder = async (userId: string, courseIds: Array<{ index: number; uuid: string; courseName: string }>) => {

  console.log("Seeding database...");

  const words: Word[] = [
    // Colors
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "rot", hebrewWord: "אדום", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "blau", hebrewWord: "כחול", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "grün", hebrewWord: "ירוק", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "gelb", hebrewWord: "צהוב", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "schwarz", hebrewWord: "שחור" , knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "weiß", hebrewWord: "לבן", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "grau", hebrewWord: "אפור", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "braun", hebrewWord: "חום" , knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "rosa", hebrewWord: "ורוד", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "orange", hebrewWord: "כתום", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "lila", hebrewWord: "סגול", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "violett", hebrewWord: "ארגמן", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "gold", hebrewWord: "זהב", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "silber", hebrewWord: "כסף", knowledge: "X" },

    // Numbers
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "eins", hebrewWord: "אחד", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "zwei", hebrewWord: "שתיים", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "drei", hebrewWord: "שלוש", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "vier", hebrewWord: "ארבע", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "fünf", hebrewWord: "חמש", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "sechs", hebrewWord: "שש", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "sieben", hebrewWord: "שבע", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "acht", hebrewWord: "שמונה", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "neun", hebrewWord: "תשע", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "zehn", hebrewWord: "עשר", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "elf", hebrewWord: "אחד עשרה", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Numbers", courseOrder: 2, germanWord: "zwölf", hebrewWord: "שתים עשרה", knowledge: "?" },

    // Fammily Members
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Vater", hebrewWord: "אבא", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Mutter", hebrewWord: "אמא", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Bruder", hebrewWord: "אח", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Schwester", hebrewWord: "אחות", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Opa", hebrewWord: "סבא", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Oma", hebrewWord: "סבתא", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Onkel", hebrewWord: "דוד", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Tante", hebrewWord: "דודה", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Cousin", hebrewWord: "בן דוד", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Cousine", hebrewWord: "בת דוד", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Neffe", hebrewWord: "אחיין", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Nichte", hebrewWord: "אחיינית", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Enkel", hebrewWord: "נכד", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Enkelin", hebrewWord: "נכדה", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Tochter", hebrewWord: "בת", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Großvater", hebrewWord: "סבא רבא", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Family members", courseOrder: 3, germanWord: "Großmutter", hebrewWord: "סבתא רבתא", knowledge: "V" },

    // Days of the Week
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Sonntag", hebrewWord: "יום ראשון", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Montag", hebrewWord: "יום שני", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Dienstag", hebrewWord: "יום שלישי", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Mittwoch", hebrewWord: "יום רביעי", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Donnerstag", hebrewWord: "יום חמישי", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Freitag", hebrewWord: "יום שישי", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Samstag", hebrewWord: "שבת", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Wochenende", hebrewWord: "סוף שבוע", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Ruhetag", hebrewWord: "יום מנוחה", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Gestern", hebrewWord: "אתמול", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Heute", hebrewWord: "היום", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Morgen", hebrewWord: "מחר", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Früher", hebrewWord: "לפני כן", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Später", hebrewWord: "אחרי כן", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Nächste Woche", hebrewWord: "שבוע הבא", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Letzte Woche", hebrewWord: "שבוע שעבר", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Days of the Week", courseOrder: 4, germanWord: "Freie Tage", hebrewWord: "ימי חופשה", knowledge: "X" },

    // Months
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "Januar", hebrewWord: "ינואר", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "Februar", hebrewWord: "פברואר", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "März", hebrewWord: "מרץ", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "April", hebrewWord: "אפריל", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "Mai", hebrewWord: "מאי", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "Juni", hebrewWord: "יוני", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "Juli", hebrewWord: "יולי", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "August", hebrewWord: "אוגוסט", knowledge: "?" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "September", hebrewWord: "ספטמבר", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "Oktober", hebrewWord: "אוקטובר", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "November", hebrewWord: "נובמבר", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Months", courseOrder: 5, germanWord: "Dezember", hebrewWord: "דצמבר", knowledge: "X" },

    // Greetings
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Wie heißen Sie", hebrewWord: "איך קוראים לך", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "ich", hebrewWord: "אני", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "heiße", hebrewWord: "קוראים", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Hallo", hebrewWord: "שלום", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Guten Morgen", hebrewWord: "בוקר טוב", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Guten Tag", hebrewWord: "צהריים טובים", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Guten Abend", hebrewWord: "ערב טוב", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Gute Nacht", hebrewWord: "לילה טוב", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Wie geht's", hebrewWord: "מה שלומך", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Auf Wiedersehen", hebrewWord: "להתראות", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Tschüss", hebrewWord: "ביי", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Bis bald", hebrewWord: "נתראה בקרוב", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Herzlich willkommen", hebrewWord: "ברוך הבא", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Schönen Tag noch", hebrewWord: "שיהיה לך יום נעים", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Viel Glück", hebrewWord: "בהצלחה", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Alles Gute", hebrewWord: "כל טוב", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Guten Appetit", hebrewWord: "בתיאבון", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Prost", hebrewWord: "לחיים", knowledge: "V" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Bis später", hebrewWord: "נתראה מאוחר יותר", knowledge: "X" },
    { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Greetings", courseOrder: 6, germanWord: "Bis morgen", hebrewWord: "נתראה מחר", knowledge: "X" },

    // Weather
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist sonnig", hebrewWord: "יש שמש", knowledge: "V" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist wolkig", hebrewWord: "מעונן", knowledge: "V" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es regnet", hebrewWord: "יורד גשם", knowledge: "V" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es schneit", hebrewWord: "יורד שלג", knowledge: "V" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist windig", hebrewWord: "יש רוח", knowledge: "V" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist heiß", hebrewWord: "חם", knowledge: "V" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist kalt", hebrewWord: "קר", knowledge: "V" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist neblig", hebrewWord: "יש ערפל", knowledge: "V" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist stürmisch", hebrewWord: "סוער", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist trocken", hebrewWord: "יבש", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist nass", hebrewWord: "רטוב", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es gibt Gewitter", hebrewWord: "יש סופת רעמים", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist warm", hebrewWord: "חמים", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Weather", courseOrder: 7, germanWord: "Es ist kühl", hebrewWord: "קריר", knowledge: "X" },

// Basic Clothing
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "das Hemd", hebrewWord: "חולצה", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "die Hose", hebrewWord: "מכנסיים", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "das Kleid", hebrewWord: "שמלה", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "die Jacke", hebrewWord: "מעיל", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "die Schuhe", hebrewWord: "נעליים", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "die Socken", hebrewWord: "גרביים", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "der Hut", hebrewWord: "כובע", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "die Handschuhe", hebrewWord: "כפפות", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "der Schal", hebrewWord: "צעיף", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "die Bluse", hebrewWord: "חולצת נשים", knowledge: "X" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "die Unterwäsche", hebrewWord: "תחתונים", knowledge: "?" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "das T-Shirt", hebrewWord: "טי-שירט", knowledge: "?" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "die Jeans", hebrewWord: "ג'ינס", knowledge: "?" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "der Pullover", hebrewWord: "סוודר", knowledge: "?" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "die Shorts", hebrewWord: "מכנסיים קצרים", knowledge: "?" },
{ hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Basic Clothing", courseOrder: 8, germanWord: "der Mantel", hebrewWord: "מעיל ארוך", knowledge: "X" },
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
  wordId: uuidv4(),
  // courseId: getUuidByCourseName(courseIds, lesson.courseNameEnglish),
  courseId: getUuidByCourseName(courseIds, word.courseNameEnglish),

}));

await db.insert(Words).values(wordData).returning({ id: Words.courseId });
};