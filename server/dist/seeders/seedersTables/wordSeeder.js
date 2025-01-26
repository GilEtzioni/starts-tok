"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordSeeder = void 0;
const schema_1 = require("../../drizzle/schema");
const db_1 = require("../../drizzle/db");
const seedersType_1 = require("../../types/seedersType");
const uuid_1 = require("uuid");
const wordSeeder = async (userId, courseIds) => {
    console.log("Seeding database...");
    const words = [
        // Colors - 1
        { hebrew: "אדום", english: "red", german: "rot", italian: "rosso", spanish: "rojo", french: "rouge", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "כחול", english: "blue", german: "blau", italian: "blu", spanish: "azul", french: "bleu", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "ירוק", english: "green", german: "grün", italian: "verde", spanish: "verde", french: "vert", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "צהוב", english: "yellow", german: "gelb", italian: "giallo", spanish: "amarillo", french: "jaune", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "שחור", english: "black", german: "schwarz", italian: "nero", spanish: "negro", french: "noir", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "לבן", english: "white", german: "weiß", italian: "bianco", spanish: "blanco", french: "blanc", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "כתום", english: "orange", german: "orange", italian: "arancione", spanish: "naranja", french: "orange", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "ורוד", english: "pink", german: "rosa", italian: "rosa", spanish: "rosa", french: "rose", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "אפור", english: "gray", german: "grau", italian: "grigio", spanish: "gris", french: "gris", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "חום", english: "brown", german: "braun", italian: "marrone", spanish: "marrón", french: "marron", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "סגול", english: "purple", german: "lila", italian: "viola", spanish: "morado", french: "violet", courseNameEnglish: "Colors", courseOrder: 1 },
        { hebrew: "תכלת", english: "light blue", german: "hellblau", italian: "azzurro", spanish: "celeste", french: "bleu clair", courseNameEnglish: "Colors", courseOrder: 1 },
        // Numbers - 2
        { hebrew: "אחד", english: "one", german: "eins", italian: "uno", spanish: "uno", french: "un", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "שתיים", english: "two", german: "zwei", italian: "due", spanish: "dos", french: "deux", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "שלוש", english: "three", german: "drei", italian: "tre", spanish: "tres", french: "trois", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "אבע", english: "four", german: "vier", italian: "quattro", spanish: "cuatro", french: "quatre", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "חמש", english: "five", german: "fünf", italian: "cinque", spanish: "cinco", french: "cinq", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "שש", english: "six", german: "sechs", italian: "sei", spanish: "seis", french: "six", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "שבע", english: "seven", german: "sieben", italian: "sette", spanish: "siete", french: "sept", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "שמונה", english: "eight", german: "acht", italian: "otto", spanish: "ocho", french: "huit", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "תשע", english: "nine", german: "neun", italian: "nove", spanish: "nueve", french: "neuf", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "עשר", english: "ten", german: "zehn", italian: "dieci", spanish: "diez", french: "dix", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "אחד עשרה", english: "eleven", german: "elf", italian: "undici", spanish: "once", french: "onze", courseNameEnglish: "Numbers", courseOrder: 2 },
        { hebrew: "שתיים עשרה", english: "twelve", german: "zwölf", italian: "dodici", spanish: "doce", french: "douze", courseNameEnglish: "Numbers", courseOrder: 2 },
        // Family Members - 3
        { hebrew: "אמא", english: "mother", german: "Mutter", italian: "madre", spanish: "madre", french: "mère", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "אבא", english: "father", german: "Vater", italian: "padre", spanish: "padre", french: "père", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "אח", english: "brother", german: "Bruder", italian: "fratello", spanish: "hermano", french: "frère", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "אחות", english: "sister", german: "Schwester", italian: "sorella", spanish: "hermana", french: "sœur", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "סבא", english: "grandfather", german: "Großvater", italian: "nonno", spanish: "abuelo", french: "grand-père", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "סבתא", english: "grandmother", german: "Großmutter", italian: "nonna", spanish: "abuela", french: "grand-mère", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "דוד", english: "uncle", german: "Onkel", italian: "zio", spanish: "tío", french: "oncle", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "דודה", english: "aunt", german: "Tante", italian: "zia", spanish: "tía", french: "tante", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "נכד", english: "grandson", german: "Enkel", italian: "nipote", spanish: "nieto", french: "petit-fils", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "נכדה", english: "granddaughter", german: "Enkelin", italian: "nipote", spanish: "nieta", french: "petite-fille", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "אחיין", english: "nephew", german: "Neffe", italian: "nipote", spanish: "sobrino", french: "neveu", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "אחיינית", english: "niece", german: "Nichte", italian: "nipote", spanish: "sobrina", french: "nièce", courseNameEnglish: "Family Members", courseOrder: 3 },
        { hebrew: "הורים", english: "parents", german: "Eltern", italian: "genitori", spanish: "padres", french: "parents", courseNameEnglish: "Family Members", courseOrder: 3 },
        // Days of the Week - 4
        { hebrew: "ראשון", english: "Sunday", german: "Sonntag", italian: "domenica", spanish: "domingo", french: "dimanche", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "שני", english: "Monday", german: "Montag", italian: "lunedì", spanish: "lunes", french: "lundi", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "שלישי", english: "Tuesday", german: "Dienstag", italian: "martedì", spanish: "martes", french: "mardi", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "רביעי", english: "Wednesday", german: "Mittwoch", italian: "mercoledì", spanish: "miércoles", french: "mercredi", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "חמישי", english: "Thursday", german: "Donnerstag", italian: "giovedì", spanish: "jueves", french: "jeudi", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "שישי", english: "Friday", german: "Freitag", italian: "venerdì", spanish: "viernes", french: "vendredi", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "שבת", english: "Saturday", german: "Samstag", italian: "sabato", spanish: "sábado", french: "samedi", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "יום מנוחה", english: "Rest day", german: "Ruhetag", italian: "giorno di riposo", spanish: "día de descanso", french: "jour de repos", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "סוף שבוע", english: "Weekend", german: "Wochenende", italian: "fine settimana", spanish: "fin de semana", french: "week-end", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "יום עבודה", english: "Workday", german: "Arbeitstag", italian: "giorno lavorativo", spanish: "día laboral", french: "jour de travail", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "יום חופשי", english: "Day off", german: "freier Tag", italian: "giorno libero", spanish: "día libre", french: "jour de congé", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        { hebrew: "יום חג", english: "Holiday", german: "Feiertag", italian: "giorno festivo", spanish: "día festivo", french: "jour férié", courseNameEnglish: "Days of the Week", courseOrder: 4 },
        // Months - 5
        { hebrew: "ינואר", english: "January", german: "Januar", italian: "Gennaio", spanish: "Enero", french: "Janvier", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "פברואר", english: "February", german: "Februar", italian: "Febbraio", spanish: "Febrero", french: "Février", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "מרץ", english: "March", german: "März", italian: "Marzo", spanish: "Marzo", french: "Mars", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "אפריל", english: "April", german: "April", italian: "Aprile", spanish: "Abril", french: "Avril", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "מאי", english: "May", german: "Mai", italian: "Maggio", spanish: "Mayo", french: "Mai", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "יוני", english: "June", german: "Juni", italian: "Giugno", spanish: "Junio", french: "Juin", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "יולי", english: "July", german: "Juli", italian: "Luglio", spanish: "Julio", french: "Juillet", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "אוגוסט", english: "August", german: "August", italian: "Agosto", spanish: "Agosto", french: "Août", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "ספטמבר", english: "September", german: "September", italian: "Settembre", spanish: "Septiembre", french: "Septembre", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "אוקטובר", english: "October", german: "Oktober", italian: "Ottobre", spanish: "Octubre", french: "Octobre", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "נובמבר", english: "November", german: "November", italian: "Novembre", spanish: "Noviembre", french: "Novembre", courseNameEnglish: "Months", courseOrder: 5 },
        { hebrew: "דצמבר", english: "December", german: "Dezember", italian: "Dicembre", spanish: "Diciembre", french: "Décembre", courseNameEnglish: "Months", courseOrder: 5 },
        // Introduction - 6
        { hebrew: "שלום", english: "Hello", german: "Hallo", italian: "Ciao", spanish: "Hola", french: "Bonjour", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "תודה", english: "Thank you", german: "Danke", italian: "Grazie", spanish: "Gracias", french: "Merci", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "בבקשה", english: "Please", german: "Bitte", italian: "Per favore", spanish: "Por favor", french: "S'il vous plaît", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "סליחה", english: "Sorry", german: "Entschuldigung", italian: "Scusa", spanish: "Lo siento", french: "Désolé", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "מה שלומך", english: "How are you?", german: "Wie geht es dir?", italian: "Come stai?", spanish: "¿Cómo estás?", french: "Comment ça va?", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "אני בסדר", english: "I am fine", german: "Mir geht's gut", italian: "Sto bene", spanish: "Estoy bien", french: "Je vais bien", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "איך קוראים לך", english: "What is your name?", german: "Wie heißt du?", italian: "Come ti chiami?", spanish: "¿Cómo te llamas?", french: "Comment t'appelles-tu?", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "אני", english: "I", german: "Ich", italian: "Io", spanish: "Yo", french: "Je", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "אתה", english: "You (male)", german: "Du", italian: "Tu", spanish: "Tú", french: "Tu", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "איפה", english: "Where", german: "Wo", italian: "Dove", spanish: "Dónde", french: "Où", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "כן", english: "Yes", german: "Ja", italian: "Sì", spanish: "Sí", french: "Oui", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "לא", english: "No", german: "Nein", italian: "No", spanish: "No", french: "Non", courseNameEnglish: "Introduction", courseOrder: 6 },
        { hebrew: "לא מבין", english: "I don't understand", german: "Ich verstehe nicht", italian: "Non capisco", spanish: "No entiendo", french: "Je ne comprends pas", courseNameEnglish: "Introduction", courseOrder: 6 },
        // Weather - 7
        { hebrew: "מזג אוויר", english: "Weather", german: "Wetter", italian: "tempo", spanish: "tiempo", french: "météo", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "חם", english: "Hot", german: "heiß", italian: "caldo", spanish: "calor", french: "chaud", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "קר", english: "Cold", german: "kalt", italian: "freddo", spanish: "frío", french: "froid", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "גשום", english: "Rainy", german: "regnerisch", italian: "piovoso", spanish: "lluvioso", french: "pluvieux", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "מעונן", english: "Cloudy", german: "bewölkt", italian: "nuvoloso", spanish: "nublado", french: "nuageux", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "שמשי", english: "Sunny", german: "sonnig", italian: "soleggiato", spanish: "soleado", french: "ensoleillé", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "סערה", english: "Storm", german: "Sturm", italian: "tempesta", spanish: "tormenta", french: "tempête", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "רוח", english: "Wind", german: "Wind", italian: "vento", spanish: "viento", french: "vent", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "שלג", english: "Snow", german: "Schnee", italian: "neve", spanish: "nieve", french: "neige", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "ברקים ורעמים", english: "Lightning and Thunder", german: "Blitze und Donner", italian: "fulmini e tuoni", spanish: "relámpagos y truenos", french: "éclairs et tonnerre", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "טמפרטורה", english: "Temperature", german: "Temperatur", italian: "temperatura", spanish: "temperatura", french: "température", courseNameEnglish: "Weather", courseOrder: 7 },
        { hebrew: "חם מאוד", english: "Very Hot", german: "sehr heiß", italian: "molto caldo", spanish: "muy caliente", french: "très chaud", courseNameEnglish: "Weather", courseOrder: 7 },
        // Clothes - 8
        { hebrew: "חולצה", english: "Shirt", german: "Hemd", italian: "maglietta", spanish: "camisa", french: "chemise", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "מכנסיים", english: "Pants", german: "Hose", italian: "pantaloni", spanish: "pantalones", french: "pantalon", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "מעיל", english: "Coat", german: "Mantel", italian: "cappotto", spanish: "abrigo", french: "manteau", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "סוודר", english: "Sweater", german: "Pullover", italian: "maglione", spanish: "suéter", french: "pull", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "חצאית", english: "Skirt", german: "Rock", italian: "gonna", spanish: "falda", french: "jupe", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "שמלה", english: "Dress", german: "Kleid", italian: "vestito", spanish: "vestido", french: "robe", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "נעליים", english: "Shoes", german: "Schuhe", italian: "scarpe", spanish: "zapatos", french: "chaussures", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "גרביים", english: "Socks", german: "Socken", italian: "calzini", spanish: "calcetines", french: "chaussettes", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "תיק", english: "Bag", german: "Tasche", italian: "borsa", spanish: "bolso", french: "sac", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "כובע", english: "Hat", german: "Hut", italian: "cappello", spanish: "sombrero", french: "chapeau", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "משקפי שמש", english: "Sunglasses", german: "Sonnenbrille", italian: "occhiali da sole", spanish: "gafas de sol", french: "lunettes de soleil", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "עניבה", english: "Tie", german: "Krawatte", italian: "cravatta", spanish: "corbata", french: "cravate", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "טי שירט", english: "T-Shirt", german: "T-Shirt", italian: "maglietta", spanish: "camiseta", french: "T-shirt", courseNameEnglish: "Clothes", courseOrder: 8 },
        { hebrew: "מעיל רוח", english: "Windbreaker", german: "Windjacke", italian: "giacca a vento", spanish: "chaqueta cortavientos", french: "veste coupe-vent", courseNameEnglish: "Clothes", courseOrder: 8 },
        // Food Products - 9
        { hebrew: "לחם", english: "Bread", german: "Brot", italian: "pane", spanish: "pan", french: "pain", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "חלב", english: "Milk", german: "Milch", italian: "latte", spanish: "leche", french: "lait", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "ביצה", english: "Egg", german: "Ei", italian: "uovo", spanish: "huevo", french: "œuf", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "חמאה", english: "Butter", german: "Butter", italian: "burro", spanish: "mantequilla", french: "beurre", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "גבינה", english: "Cheese", german: "Käse", italian: "formaggio", spanish: "queso", french: "fromage", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "תפוח אדמה", english: "Potato", german: "Kartoffel", italian: "patata", spanish: "papa", french: "pomme de terre", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "עגבנייה", english: "Tomato", german: "Tomate", italian: "pomodoro", spanish: "tomate", french: "tomate", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "מלפפון", english: "Cucumber", german: "Gurke", italian: "cetriolo", spanish: "pepino", french: "concombre", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "עוף", english: "Chicken", german: "Hähnchen", italian: "pollo", spanish: "pollo", french: "poulet", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "בשר", english: "Meat", german: "Fleisch", italian: "carne", spanish: "carne", french: "viande", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "דג", english: "Fish", german: "Fisch", italian: "pesce", spanish: "pescado", french: "poisson", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "ממתקים", english: "Sweets", german: "Süßigkeiten", italian: "dolci", spanish: "dulces", french: "bonbons", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "סוכר", english: "Sugar", german: "Zucker", italian: "zucchero", spanish: "azúcar", french: "sucre", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "מלח", english: "Salt", german: "Salz", italian: "sale", spanish: "sal", french: "sel", courseNameEnglish: "Food Products", courseOrder: 9 },
        { hebrew: "קמח", english: "Flour", german: "Mehl", italian: "farina", spanish: "harina", french: "farine", courseNameEnglish: "Food Products", courseOrder: 9 },
        // Beverages - 10
        { hebrew: "מים", english: "Water", german: "Wasser", italian: "acqua", spanish: "agua", french: "eau", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "קפה", english: "Coffee", german: "Kaffee", italian: "caffè", spanish: "café", french: "café", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "תה", english: "Tea", german: "Tee", italian: "tè", spanish: "té", french: "thé", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "מיץ תפוזים", english: "Orange Juice", german: "Orangensaft", italian: "succo d'arancia", spanish: "jugo de naranja", french: "jus d'orange", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "מיץ תפוחים", english: "Apple Juice", german: "Apfelsaft", italian: "succo di mela", spanish: "zumo de manzana", french: "jus de pomme", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "מיץ ענבים", english: "Grape Juice", german: "Traubensaft", italian: "succo d'uva", spanish: "jugo de uva", french: "jus de raisin", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "קולה", english: "Cola", german: "Cola", italian: "cola", spanish: "cola", french: "cola", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "סודה", english: "Soda", german: "Sprudelwasser", italian: "acqua frizzante", spanish: "agua con gas", french: "eau pétillante", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "חלב", english: "Milk", german: "Milch", italian: "latte", spanish: "leche", french: "lait", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "יוגורט", english: "Yogurt", german: "Joghurt", italian: "yogurt", spanish: "yogur", french: "yaourt", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "שוקו", english: "Chocolate Milk", german: "Schokoladenmilch", italian: "latte al cioccolato", spanish: "leche con chocolate", french: "lait au chocolat", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "בירה", english: "Beer", german: "Bier", italian: "birra", spanish: "cerveza", french: "bière", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "יין", english: "Wine", german: "Wein", italian: "vino", spanish: "vino", french: "vin", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "משקה אלכוהולי", english: "Alcoholic Beverage", german: "alkoholisches Getränk", italian: "bevanda alcolica", spanish: "bebida alcohólica", french: "boisson alcoolisée", courseNameEnglish: "Beverages", courseOrder: 10 },
        { hebrew: "מים מינרליים", english: "Mineral Water", german: "Mineralwasser", italian: "acqua minerale", spanish: "agua mineral", french: "eau minérale", courseNameEnglish: "Beverages", courseOrder: 10 },
        // // Parts of the House - 11
        // Animals - 12
        // Health and Fitness - 26
        // Intermediate Clothes - 27
        // Intermediate Animals - 28
        // Holidays - 29
        { hebrew: "חג", english: "Holiday", german: "Feiertag", italian: "Vacanza", spanish: "Fiesta", french: "Fête", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "פסח", english: "Passover", german: "Pessach", italian: "Pasqua Ebraica", spanish: "Pésaj", french: "Pâque juive", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "חנוכה", english: "Hanukkah", german: "Chanukka", italian: "Chanukkah", spanish: "Janucá", french: "Hanoucca", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "ראש השנה", english: "Rosh Hashanah", german: "Rosch Haschana", italian: "Rosh Hashanah", spanish: "Rosh Hashaná", french: "Roch Hachana", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "סוכות", english: "Sukkot", german: "Sukkot", italian: "Sukkot", spanish: "Sucot", french: "Souccot", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "שבועות", english: "Shavuot", german: "Schawuot", italian: "Shavuot", spanish: "Shavuot", french: "Chavouot", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "פורים", english: "Purim", german: "Purim", italian: "Purim", spanish: "Purim", french: "Pourim", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "יום הולדת", english: "Birthday", german: "Geburtstag", italian: "Compleanno", spanish: "Cumpleaños", french: "Anniversaire", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "יום העמצאות", english: "Independence Day", german: "Unabhängigkeitstag", italian: "Giorno dell'Indipendenza", spanish: "Día de la Independencia", french: "Fête de l'Indépendance", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "שנה טובה", english: "Happy New Year", german: "Frohes neues Jahr", italian: "Buon anno", spanish: "Feliz Año Nuevo", french: "Bonne année", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "חגיגה", english: "Celebration", german: "Feier", italian: "Celebrazione", spanish: "Celebración", french: "Célébration", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "מסיבה", english: "Party", german: "Party", italian: "Festa", spanish: "Fiesta", french: "Fête", courseNameEnglish: "Holidays", courseOrder: 29 },
        { hebrew: "כריסמס", english: "Christmas", german: "Weihnachten", italian: "Natale", spanish: "Navidad", french: "Noël", courseNameEnglish: "Holidays", courseOrder: 29 },
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
        { hebrew: "מחזור", english: "Recycling", german: "Recycling", italian: "Riciclaggio", spanish: "Reciclaje", french: "Recyclage", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "זכוכית", english: "Glass", german: "Glas", italian: "Vetro", spanish: "Vidrio", french: "Verre", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "פלסטיק", english: "Plastic", german: "Plastik", italian: "Plastica", spanish: "Plástico", french: "Plastique", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "נייר", english: "Paper", german: "Papier", italian: "Carta", spanish: "Papel", french: "Papier", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "ברזל", english: "Metal", german: "Metall", italian: "Metallo", spanish: "Metal", french: "Métal", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "עץ", english: "Wood", german: "Holz", italian: "Legno", spanish: "Madera", french: "Bois", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "אדם", english: "Person", german: "Mensch", italian: "Persona", spanish: "Persona", french: "Personne", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "סוגי פסולת", english: "Types of Waste", german: "Abfallarten", italian: "Tipi di rifiuti", spanish: "Tipos de residuos", french: "Types de déchets", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "מיכל מחזור", english: "Recycling Bin", german: "Recyclingbehälter", italian: "Contenitore per il riciclaggio", spanish: "Contenedor de reciclaje", french: "Bac de recyclage", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "קומפוסט", english: "Compost", german: "Kompost", italian: "Compost", spanish: "Compost", french: "Compost", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "שימור", english: "Conservation", german: "Erhaltung", italian: "Conservazione", spanish: "Conservación", french: "Conservation", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "הטמנה", english: "Landfill", german: "Deponie", italian: "Discarica", spanish: "Vertedero", french: "Décharge", courseNameEnglish: "Recycling", courseOrder: 46 },
        { hebrew: "פח", english: "Trash Can", german: "Mülleimer", italian: "Cestino", spanish: "Basurero", french: "Poubelle", courseNameEnglish: "Recycling", courseOrder: 46 },
        // Intermediate Hobbies - 47
        // Politics - 48
        // Intermediate Family Members - 49
        // Intermediate Shopping - 50
        // Intermediate Colors - 51
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
        { hebrew: "חוק", english: "Law", german: "Gesetz", italian: "Legge", spanish: "Ley", french: "Loi", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "זכות", english: "Right", german: "Recht", italian: "Diritto", spanish: "Derecho", french: "Droit", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "פסק דין", english: "Judgment", german: "Urteil", italian: "Sentenza", spanish: "Sentencia", french: "Jugement", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "חוזה", english: "Contract", german: "Vertrag", italian: "Contratto", spanish: "Contrato", french: "Contrat", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "ערעור", english: "Appeal", german: "Berufung", italian: "Appello", spanish: "Apelación", french: "Appel", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "פשע", english: "Crime", german: "Verbrechen", italian: "Crimine", spanish: "Crimen", french: "Crime", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "עבירה", english: "Offense", german: "Straftat", italian: "Reato", spanish: "Delito", french: "Infraction", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "תביעה", english: "Lawsuit", german: "Klage", italian: "Causa", spanish: "Demanda", french: "Procès", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "הגנה", english: "Defense", german: "Verteidigung", italian: "Difesa", spanish: "Defensa", french: "Défense", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "תובע", english: "Prosecutor", german: "Staatsanwalt", italian: "Procuratore", spanish: "Fiscal", french: "Procureur", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "עדים", english: "Witnesses", german: "Zeugen", italian: "Testimoni", spanish: "Testigos", french: "Témoins", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "הסכמה", english: "Consent", german: "Zustimmung", italian: "Consenso", spanish: "Consentimiento", french: "Consentement", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "משפט", english: "Trial", german: "Prozess", italian: "Processo", spanish: "Juicio", french: "Procès", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "פיצויים", english: "Compensation", german: "Entschädigung", italian: "Risarcimento", spanish: "Compensación", french: "Indemnisation", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "מעשה פלילי", english: "Criminal Act", german: "Kriminelle Handlung", italian: "Atto criminale", spanish: "Acto criminal", french: "Acte criminel", courseNameEnglish: "Legal Terms", courseOrder: 130 },
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
        { hebrew: "עבודה", english: "Work", german: "Arbeit", italian: "Lavoro", spanish: "Trabajo", french: "Travail", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "משרד", english: "Office", german: "Büro", italian: "Ufficio", spanish: "Oficina", french: "Bureau", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "מנהל", english: "Manager", german: "Manager", italian: "Manager", spanish: "Gerente", french: "Manager", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "פגישה", english: "Meeting", german: "Meeting", italian: "Riunione", spanish: "Reunión", french: "Réunion", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "לקוח", english: "Client", german: "Kunde", italian: "Cliente", spanish: "Cliente", french: "Client", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "פרויקט", english: "Project", german: "Projekt", italian: "Progetto", spanish: "Proyecto", french: "Projet", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "הסכם", english: "Agreement", german: "Vereinbarung", italian: "Accordo", spanish: "Acuerdo", french: "Accord", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "שכר", english: "Salary", german: "Gehalt", italian: "Stipendio", spanish: "Salario", french: "Salaire", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "משרות", english: "Jobs", german: "Stellen", italian: "Lavori", spanish: "Trabajos", french: "Emplois", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "כישורים", english: "Skills", german: "Fähigkeiten", italian: "Competenze", spanish: "Habilidades", french: "Compétences", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "תנאים", english: "Conditions", german: "Bedingungen", italian: "Condizioni", spanish: "Condiciones", french: "Conditions", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "תפקיד", english: "Role", german: "Rolle", italian: "Ruolo", spanish: "Papel", french: "Rôle", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "עובד", english: "Employee", german: "Mitarbeiter", italian: "Dipendente", spanish: "Empleado", french: "Employé", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "מנכל", english: "CEO", german: "CEO", italian: "Amministratore delegato", spanish: "Director general", french: "PDG", courseNameEnglish: "Work", courseOrder: 66 },
        { hebrew: "הכשרה", english: "Training", german: "Ausbildung", italian: "Formazione", spanish: "Capacitación", french: "Formation", courseNameEnglish: "Work", courseOrder: 66 },
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
        { hebrew: "תפוח", english: "Apple", german: "Apfel", italian: "Mela", spanish: "Manzana", french: "Pomme", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "בננה", english: "Banana", german: "Banane", italian: "Banana", spanish: "Plátano", french: "Banane", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "תפוז", english: "Orange", german: "Orange", italian: "Arancia", spanish: "Naranja", french: "Orange", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "תות", english: "Strawberry", german: "Erdbeere", italian: "Fragola", spanish: "Fresa", french: "Fraise", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "ענבים", english: "Grapes", german: "Trauben", italian: "Uva", spanish: "Uvas", french: "Raisins", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "אבטיח", english: "Watermelon", german: "Wassermelone", italian: "Anguria", spanish: "Sandía", french: "Pastèque", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "שזיף", english: "Plum", german: "Pflaume", italian: "Prugna", spanish: "Ciruela", french: "Prune", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "מנגו", english: "Mango", german: "Mango", italian: "Mango", spanish: "Mango", french: "Mangue", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "פפאיה", english: "Papaya", german: "Papaya", italian: "Papaia", spanish: "Papaya", french: "Papaye", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "אננס", english: "Pineapple", german: "Ananas", italian: "Ananas", spanish: "Piña", french: "Ananas", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "קיווי", english: "Kiwi", german: "Kiwi", italian: "Kiwi", spanish: "Kiwi", french: "Kiwi", courseNameEnglish: "Fruits", courseOrder: 111 },
        { hebrew: "אגס", english: "Pear", german: "Birne", italian: "Pera", spanish: "Pera", french: "Poire", courseNameEnglish: "Fruits", courseOrder: 111 },
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
        { hebrew: "חוק", english: "Law", german: "Gesetz", italian: "Legge", spanish: "Ley", french: "Loi", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "זכות", english: "Right", german: "Recht", italian: "Diritto", spanish: "Derecho", french: "Droit", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "פסק דין", english: "Judgment", german: "Urteil", italian: "Sentenza", spanish: "Sentencia", french: "Jugement", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "חוזה", english: "Contract", german: "Vertrag", italian: "Contratto", spanish: "Contrato", french: "Contrat", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "ערעור", english: "Appeal", german: "Berufung", italian: "Appello", spanish: "Apelación", french: "Appel", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "פשע", english: "Crime", german: "Verbrechen", italian: "Crimine", spanish: "Crimen", french: "Crime", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "עבירה", english: "Offense", german: "Straftat", italian: "Reato", spanish: "Delito", french: "Infraction", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "תביעה", english: "Lawsuit", german: "Klage", italian: "Causa", spanish: "Demanda", french: "Procès", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "הגנה", english: "Defense", german: "Verteidigung", italian: "Difesa", spanish: "Defensa", french: "Défense", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "תובע", english: "Prosecutor", german: "Staatsanwalt", italian: "Procuratore", spanish: "Fiscal", french: "Procureur", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "עדים", english: "Witnesses", german: "Zeugen", italian: "Testimoni", spanish: "Testigos", french: "Témoins", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "הסכמה", english: "Consent", german: "Zustimmung", italian: "Consenso", spanish: "Consentimiento", french: "Consentement", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "משפט", english: "Trial", german: "Prozess", italian: "Processo", spanish: "Juicio", french: "Procès", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "פיצויים", english: "Compensation", german: "Entschädigung", italian: "Risarcimento", spanish: "Compensación", french: "Indemnisation", courseNameEnglish: "Legal Terms", courseOrder: 130 },
        { hebrew: "מעשה פלילי", english: "Criminal Act", german: "Kriminelle Handlung", italian: "Atto criminale", spanish: "Acto criminal", french: "Acte criminel", courseNameEnglish: "Legal Terms", courseOrder: 130 },
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
    const getCourseLevel = (courseOrder) => {
        if (courseOrder <= 25) {
            return { hebrewLevel: seedersType_1.HebrewLevel.A1, englishLevel: seedersType_1.EnglishLevel.A1 };
        }
        else if (courseOrder <= 50) {
            return { hebrewLevel: seedersType_1.HebrewLevel.A2, englishLevel: seedersType_1.EnglishLevel.A2 };
        }
        else if (courseOrder <= 75) {
            return { hebrewLevel: seedersType_1.HebrewLevel.B1, englishLevel: seedersType_1.EnglishLevel.B1 };
        }
        else if (courseOrder <= 100) {
            return { hebrewLevel: seedersType_1.HebrewLevel.B2, englishLevel: seedersType_1.EnglishLevel.B2 };
        }
        else if (courseOrder <= 125) {
            return { hebrewLevel: seedersType_1.HebrewLevel.C1, englishLevel: seedersType_1.EnglishLevel.C1 };
        }
        else if (courseOrder <= 150) {
            return { hebrewLevel: seedersType_1.HebrewLevel.C2, englishLevel: seedersType_1.EnglishLevel.C2 };
        }
    };
    const getUuidByCourseName = (courseIds, courseName) => {
        const resultItem = courseIds.find((item) => item.courseName.toLowerCase() === courseName.toLowerCase());
        if (!resultItem) {
            console.error(`Course name "${courseName}" not found in courseIds`);
            console.error("Available course names:", courseIds.map((item) => item.courseName));
            throw new Error(`Course name "${courseName}" not found in courseIds`);
        }
        return resultItem.uuid;
    };
    const wordData = words.flatMap((word) => {
        const commonData = {
            hebrewWord: word.hebrew,
            hebrewLevel: getCourseLevel(word.courseOrder)?.hebrewLevel,
            englishLevel: getCourseLevel(word.courseOrder)?.englishLevel,
            courseNameEnglish: word.courseNameEnglish,
            courseOrder: word.courseOrder,
            userId,
            knowledge: "X",
            wordId: (0, uuid_1.v4)(),
            courseId: getUuidByCourseName(courseIds, word.courseNameEnglish),
        };
        return [
            { ...commonData, language: seedersType_1.CourseLangauge.English, foreignWord: word.english, },
            { ...commonData, language: seedersType_1.CourseLangauge.German, foreignWord: word.german },
            { ...commonData, language: seedersType_1.CourseLangauge.French, foreignWord: word.french },
            { ...commonData, language: seedersType_1.CourseLangauge.Italian, foreignWord: word.italian },
            { ...commonData, language: seedersType_1.CourseLangauge.Spanish, foreignWord: word.spanish },
        ];
    });
    await db_1.db.insert(schema_1.Words).values(wordData).returning({ id: schema_1.Words.courseId });
};
exports.wordSeeder = wordSeeder;
