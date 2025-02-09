"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageLetters = exports.languageDictionaries = exports.convertDateToDay = exports.generateEmptyWeekPoints = exports.getDayDate = exports.getLastWeekDate = exports.getTodayDate = void 0;
const userType_1 = require("../types/userType");
const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};
exports.getTodayDate = getTodayDate;
const getLastWeekDate = () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return lastWeek.toISOString().split('T')[0];
};
exports.getLastWeekDate = getLastWeekDate;
const getDayDate = (day) => {
    const today = new Date();
    const todayDay = today.getDay();
    const targetDay = Object.values(userType_1.DaysOfTheWeek).indexOf(day);
    const dayDifference = targetDay - todayDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + dayDifference);
    return targetDate.toISOString().split('T')[0];
};
exports.getDayDate = getDayDate;
const generateEmptyWeekPoints = (userId, userName, weekPoints) => {
    const emptyWeekArray = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const pointsDate = new Date(today);
        pointsDate.setDate(today.getDate() - i);
        const existingEntry = weekPoints.find((point) => {
            const existingDate = new Date(point.pointsDate);
            return (existingDate.getFullYear() === pointsDate.getFullYear() &&
                existingDate.getMonth() === pointsDate.getMonth() &&
                existingDate.getDate() === pointsDate.getDate());
        });
        if (existingEntry) {
            emptyWeekArray.push(existingEntry);
        }
        else {
            emptyWeekArray.push({
                userId,
                userName,
                points: 0,
                pointsDate,
            });
        }
    }
    return emptyWeekArray;
};
exports.generateEmptyWeekPoints = generateEmptyWeekPoints;
const convertDateToDay = (dateString) => {
    if (dateString === null)
        return;
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
};
exports.convertDateToDay = convertDateToDay;
const keyboardEnglish = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const keyboardGerman = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß'];
const keyboardSpanish = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'á', 'é', 'í', 'ñ', 'ó', 'ú'];
const keyboardFrench = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'à', 'â', 'ç', 'é', 'è', 'ê', 'ë', 'î', 'ï', 'ô', 'ù', 'û', 'ÿ'];
const keyboardItalian = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'z', 'à', 'è', 'é', 'ì', 'ò', 'ù'];
exports.languageDictionaries = {
    english: keyboardEnglish,
    german: keyboardGerman,
    spanish: keyboardSpanish,
    french: keyboardFrench,
    italian: keyboardItalian
};
const lettersGerman = ['ä', 'ö', 'ü', 'ß'];
const lettersSpanish = ['á', 'é', 'í', 'ñ', 'ó', 'ú'];
const lettersFrench = ['à', 'â', 'ç', 'é', 'è', 'ê', 'ë', 'î', 'ï', 'ô', 'ù', 'û', 'ÿ'];
const lettersItalian = ['à', 'è', 'é', 'ì', 'ò', 'ù'];
exports.languageLetters = {
    english: null,
    german: lettersGerman,
    spanish: lettersSpanish,
    french: lettersFrench,
    italian: lettersItalian
};
