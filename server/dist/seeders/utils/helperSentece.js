"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitTheSentence = exports.processSentence = void 0;
const db_1 = require("../../drizzle/db");
const schema_1 = require("../../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const seedersType_1 = require("../../types/seedersType");
const helperWords_1 = require("./helperWords");
const helpingSeeders_1 = require("./helpingSeeders");
const processSentence = async (inputSentence, language) => {
    const wordArray = inputSentence.toLowerCase().replace(/[.,!?…]/g, '').split(' ');
    const resultArray = [];
    const processedWords = new Set();
    ///////////////////////////////////////////////////////////////////////////
    // step 1: helper words
    const remainingWords = [...wordArray];
    ///////////////////////////////////////////////////////////////////////////
    // step 2: words with length 4
    const length4Words = await db_1.db
        .select()
        .from(schema_1.Words)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)((0, drizzle_orm_1.sql) `length("hebrewWord") - length(REPLACE("hebrewWord", ' ', ''))`, 3), (0, drizzle_orm_1.eq)(schema_1.Words.language, language)));
    for (let i = 0; i < remainingWords.length - 1; i++) {
        const fourWordPhrase = [];
        if (i + 3 >= remainingWords.length)
            break;
        const origin = `${remainingWords[i]} ${remainingWords[i + 1]} ${remainingWords[i + 2]} ${remainingWords[i + 3]}`;
        const wordVariations = getFourWordVariations(remainingWords[i], remainingWords[i + 1], remainingWords[i + 2], remainingWords[i + 3]);
        fourWordPhrase.push({
            originWord: origin,
            prefixArray: wordVariations,
        });
        for (const variation of fourWordPhrase) {
            const matchingWords = length4Words.filter(word => variation.prefixArray.includes(word?.hebrewWord ?? ""));
            if (matchingWords.length > 0) {
                let existingEntry = resultArray.find(entry => entry.hebrewWord === variation.originWord);
                if (!existingEntry) {
                    existingEntry = { hebrewWord: variation.originWord, foreignWord: ["המילה לא נמצאת במילון"] };
                    resultArray.push(existingEntry);
                }
                for (const word of matchingWords) {
                    const safeForeignWord = word.foreignWord?.toLowerCase() ?? "המילה לא נמצאת במילון";
                    if (existingEntry && !existingEntry.foreignWord.includes(safeForeignWord)) {
                        existingEntry.foreignWord.push(safeForeignWord);
                    }
                    if (existingEntry.foreignWord.length > 1 && existingEntry.foreignWord.includes("המילה לא נמצאת במילון")) {
                        const filteredWords = existingEntry.foreignWord.filter(word => word !== "המילה לא נמצאת במילון");
                        existingEntry.foreignWord = [filteredWords[0]];
                    }
                }
                processedWords.add(variation.originWord);
                remainingWords.splice(i, 4);
                i--;
                break;
            }
        }
    }
    ///////////////////////////////////////////////////////////////////////////
    // step 3: words with length 3
    const length3Words = await db_1.db
        .select()
        .from(schema_1.Words)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)((0, drizzle_orm_1.sql) `length("hebrewWord") - length(REPLACE("hebrewWord", ' ', ''))`, 2), (0, drizzle_orm_1.eq)(schema_1.Words.language, language)));
    for (let i = 0; i < remainingWords.length - 1; i++) {
        const threeWordPhrase = [];
        if (i + 2 >= remainingWords.length)
            break;
        const origin = `${remainingWords[i]} ${remainingWords[i + 1]} ${remainingWords[i + 2]}`;
        const wordVariations = getThreeWordVariations(remainingWords[i], remainingWords[i + 1], remainingWords[i + 2]);
        threeWordPhrase.push({
            originWord: origin,
            prefixArray: wordVariations,
        });
        for (const variation of threeWordPhrase) {
            const matchingWords = length3Words.filter(word => variation.prefixArray.includes(word?.hebrewWord ?? ""));
            if (matchingWords.length > 0) {
                let existingEntry = resultArray.find(entry => entry.hebrewWord === variation.originWord);
                if (!existingEntry) {
                    existingEntry = { hebrewWord: variation.originWord, foreignWord: ["המילה לא נמצאת במילון"] };
                    resultArray.push(existingEntry);
                }
                for (const word of matchingWords) {
                    const safeForeignWord = word.foreignWord?.toLowerCase() ?? "המילה לא נמצאת במילון";
                    if (existingEntry && !existingEntry.foreignWord.includes(safeForeignWord)) {
                        existingEntry.foreignWord.push(safeForeignWord);
                    }
                    if (existingEntry.foreignWord.length > 1 && existingEntry.foreignWord.includes("המילה לא נמצאת במילון")) {
                        const filteredWords = existingEntry.foreignWord.filter(word => word !== "המילה לא נמצאת במילון");
                        // Ensure it's a tuple of exactly one string
                        existingEntry.foreignWord = [filteredWords[0]];
                    }
                }
                processedWords.add(variation.originWord);
                remainingWords.splice(i, 3);
                i--;
                break;
            }
        }
    }
    ///////////////////////////////////////////////////////////////////////////
    // step 4: words with length 2
    const length2Words = await db_1.db
        .select()
        .from(schema_1.Words)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)((0, drizzle_orm_1.sql) `length("hebrewWord") - length(REPLACE("hebrewWord", ' ', ''))`, 1), (0, drizzle_orm_1.eq)(schema_1.Words.language, language)));
    for (let i = 0; i < remainingWords.length; i++) {
        const twoWordPhrase = [];
        if (i + 1 >= remainingWords.length)
            break;
        const origin = `${remainingWords[i]} ${remainingWords[i + 1]}`;
        const wordVariations = getTwoWordVariations(remainingWords[i], remainingWords[i + 1]);
        twoWordPhrase.push({
            originWord: origin,
            prefixArray: wordVariations,
        });
        for (const variation of twoWordPhrase) {
            const matchingWords = length2Words.filter(word => variation.prefixArray.includes(word?.hebrewWord ?? ""));
            if (matchingWords.length > 0) {
                let existingEntry = resultArray.find(entry => entry.hebrewWord === variation.originWord);
                if (!existingEntry) {
                    existingEntry = { hebrewWord: variation.originWord, foreignWord: ["המילה לא נמצאת במילון"] };
                    resultArray.push(existingEntry);
                }
                for (const word of matchingWords) {
                    const safeForeignWord = word.foreignWord?.toLowerCase() ?? "המילה לא נמצאת במילון";
                    if (existingEntry && !existingEntry.foreignWord.includes(safeForeignWord)) {
                        existingEntry.foreignWord.push(safeForeignWord);
                    }
                    if (existingEntry.foreignWord.length > 1 && existingEntry.foreignWord.includes("המילה לא נמצאת במילון")) {
                        const filteredWords = existingEntry.foreignWord.filter(word => word !== "המילה לא נמצאת במילון");
                        // Ensure it's a tuple of exactly one string
                        existingEntry.foreignWord = [filteredWords[0]];
                    }
                }
                processedWords.add(variation.originWord);
                remainingWords.splice(i, 2);
                i--;
                break;
            }
        }
    }
    // step 5: words with length 1
    const length1Words = await db_1.db
        .select()
        .from(schema_1.Words)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)((0, drizzle_orm_1.sql) `length("hebrewWord") - length(REPLACE("hebrewWord", ' ', ''))`, 0), (0, drizzle_orm_1.eq)(schema_1.Words.language, language)));
    for (let i = 0; i < remainingWords.length; i++) {
        const oneWordPhrase = [];
        const origin = remainingWords[i];
        const wordVariations = getOneWordVariations(origin);
        oneWordPhrase.push({
            originWord: origin,
            prefixArray: wordVariations,
        });
        for (const variation of oneWordPhrase) {
            const matchingWords = length1Words.filter(word => variation.prefixArray.includes(word?.hebrewWord ?? ""));
            if (matchingWords.length > 0) {
                let existingEntry = resultArray.find(entry => entry.hebrewWord === variation.originWord);
                if (!existingEntry) {
                    existingEntry = { hebrewWord: variation.originWord, foreignWord: ["המילה לא נמצאת במילון"] };
                    resultArray.push(existingEntry);
                }
                for (const word of matchingWords) {
                    const safeForeignWord = word.foreignWord?.toLowerCase() ?? "המילה לא נמצאת במילון";
                    if (existingEntry && !existingEntry.foreignWord.includes(safeForeignWord)) {
                        existingEntry.foreignWord.push(safeForeignWord);
                    }
                    if (existingEntry.foreignWord.length > 1 && existingEntry.foreignWord.includes("המילה לא נמצאת במילון")) {
                        const filteredWords = existingEntry.foreignWord.filter(word => word !== "המילה לא נמצאת במילון");
                        // Ensure it's a tuple of exactly one string
                        existingEntry.foreignWord = [filteredWords[0]];
                    }
                }
                processedWords.add(variation.originWord);
                remainingWords.splice(i, 1);
                i--;
                break;
            }
        }
    }
    const twoWordVariations = [];
    const threeWordVariations = [];
    const fourWordVariations = [];
    const oneWordVariations = [];
    for (let i = 0; i < remainingWords.length; i++) {
        oneWordVariations.push(remainingWords[i]);
        if (i < remainingWords.length - 1) {
            twoWordVariations.push(`${remainingWords[i]} ${remainingWords[i + 1]}`);
        }
        if (i < remainingWords.length - 2) {
            threeWordVariations.push(`${remainingWords[i]} ${remainingWords[i + 1]} ${remainingWords[i + 2]}`);
        }
        if (i < remainingWords.length - 3) {
            fourWordVariations.push(`${remainingWords[i]} ${remainingWords[i + 1]} ${remainingWords[i + 2]} ${remainingWords[i + 3]}`);
        }
    }
    const allVariations = [
        ...fourWordVariations,
        ...threeWordVariations,
        ...twoWordVariations,
        ...oneWordVariations
    ];
    for (const variation of allVariations) {
        const helperWord = getHelperWords(helperWords_1.helperWords, language, variation);
        if (helperWord !== null) {
            const wordCount = variation.split(" ").length;
            const index = remainingWords.indexOf(variation.split(" ")[0]);
            if (index !== -1) {
                remainingWords.splice(index, wordCount);
            }
            if (helperWord.foreignWord.includes('/')) {
                resultArray.push({
                    hebrewWord: helperWord.hebrew,
                    foreignWord: [helperWord.foreignWord.split('/').map(word => word.trim()).join(', ')],
                });
            }
            else {
                resultArray.push({
                    hebrewWord: helperWord.hebrew,
                    foreignWord: [helperWord.foreignWord.toLowerCase()],
                });
            }
            processedWords.add(variation);
        }
    }
    // step 6: add missing word
    remainingWords.forEach(word => {
        if (!processedWords.has(word)) {
            resultArray.push({
                hebrewWord: word,
                foreignWord: ["המילה לא נמצאת במילון"],
            });
        }
    });
    // Step 7: arrange the words in the correct order
    const nweWordArray = inputSentence.split(" ");
    resultArray.sort((a, b) => {
        const indexA = nweWordArray.findIndex(word => a.hebrewWord.startsWith(word));
        const indexB = nweWordArray.findIndex(word => b.hebrewWord.startsWith(word));
        return indexA - indexB;
    });
    // step 8: add , . ! ? 
    inputSentence.split(' ').forEach((word) => {
        const match = word.match(/([.,!?…]+)$/);
        if (match) {
            const mark = match[0];
            const cleanWord = word.slice(0, -mark.length);
            const wordEntry = resultArray.find(entry => entry.hebrewWord === cleanWord);
            if (wordEntry) {
                wordEntry.hebrewWord = mark + wordEntry.hebrewWord;
            }
        }
    });
    return resultArray;
};
exports.processSentence = processSentence;
(async () => {
    const language = seedersType_1.CourseLangauge.English;
    const lessons = (0, helpingSeeders_1.generateLessonsWordsJson)(helpingSeeders_1.lessonExample);
    for (const lesson of lessons) {
        const currentLeson = await (0, exports.processSentence)(lesson.hebrew, language);
        if (currentLeson.some((item) => Array.isArray(item.foreignWord)
            ? item.foreignWord.includes('המילה לא נמצאת במילון')
            : item.foreignWord === 'המילה לא נמצאת במילון')) {
            // console.log(currentLeson);
        }
    }
})();
/* ------------------------------------------------------------ */
const getFourWordVariations = (word1, word2, word3, word4) => {
    // word1 options
    const firstVariationsOne = addSuffixesArray(word1);
    const secondVariationsOne = firstVariationsOne.flatMap((word1) => endSuffixesArray(word1));
    const thirdVariationsOne = endSuffixesArray(word1);
    const forthVariationsOne = secondVariationsOne.flatMap((word1) => addSuffixesArray(word1));
    const allOptionsOne = [...firstVariationsOne, ...secondVariationsOne, ...thirdVariationsOne, ...forthVariationsOne].flat();
    // word2 options
    const firstVariationsTwo = addSuffixesArray(word2);
    const secondVariationsTwo = firstVariationsTwo.flatMap((word2) => endSuffixesArray(word2));
    const thirdVariationsTwo = endSuffixesArray(word2);
    const forthVariationsTwo = secondVariationsTwo.flatMap((word2) => addSuffixesArray(word2));
    const allOptionsTwo = [...firstVariationsTwo, ...secondVariationsTwo, ...thirdVariationsTwo, ...forthVariationsTwo].flat();
    // word3 options
    const firstVariationsThree = addSuffixesArray(word3);
    const secondVariationsThree = firstVariationsThree.flatMap((word3) => endSuffixesArray(word3));
    const thirdVariationsThree = endSuffixesArray(word3);
    const forthVariationsThree = secondVariationsThree.flatMap((word3) => addSuffixesArray(word3));
    const allOptionsThree = [...firstVariationsThree, ...secondVariationsThree, ...thirdVariationsThree, ...forthVariationsThree].flat();
    // word4 options
    const firstVariationsFour = addSuffixesArray(word4);
    const secondVariationsFour = firstVariationsFour.flatMap((word4) => endSuffixesArray(word4));
    const thirdVariationsFour = endSuffixesArray(word4);
    const forthVariationsFour = secondVariationsFour.flatMap((word4) => addSuffixesArray(word4));
    const allOptionsFour = [...firstVariationsFour, ...secondVariationsFour, ...thirdVariationsFour, ...forthVariationsFour].flat();
    // Generate all four-word combinations
    const allCombinations = allOptionsOne.flatMap(w1 => allOptionsTwo.flatMap(w2 => allOptionsThree.flatMap(w3 => allOptionsFour.map(w4 => `${w1} ${w2} ${w3} ${w4}`))));
    return allCombinations;
};
/* ------------------------------------------------------------ */
const getThreeWordVariations = (word1, word2, word3) => {
    // word1 options
    const firstVariationsOne = addSuffixesArray(word1);
    const secondVariationsOne = firstVariationsOne.flatMap((word1) => endSuffixesArray(word1));
    const thirdVariationsOne = endSuffixesArray(word1);
    const forthVariationsOne = secondVariationsOne.flatMap((word1) => addSuffixesArray(word1));
    const allOptionsOne = [...firstVariationsOne, ...secondVariationsOne, ...thirdVariationsOne, ...forthVariationsOne].flat();
    // word2 options
    const firstVariationsTwo = addSuffixesArray(word2);
    const secondVariationsTwo = firstVariationsTwo.flatMap((word2) => endSuffixesArray(word2));
    const thirdVariationsTwo = endSuffixesArray(word2);
    const forthVariationsTwo = secondVariationsTwo.flatMap((word2) => addSuffixesArray(word2));
    const allOptionsTwo = [...firstVariationsTwo, ...secondVariationsTwo, ...thirdVariationsTwo, ...forthVariationsTwo].flat();
    // word3 options
    const firstVariationsThree = addSuffixesArray(word3);
    const secondVariationsThree = firstVariationsThree.flatMap((word3) => endSuffixesArray(word3));
    const thirdVariationsThree = endSuffixesArray(word3);
    const forthVariationsThree = secondVariationsThree.flatMap((word3) => addSuffixesArray(word3));
    const allOptionsThree = [...firstVariationsThree, ...secondVariationsThree, ...thirdVariationsThree, ...forthVariationsThree].flat();
    // Generate all three-word combinations
    const allCombinations = allOptionsOne.flatMap(w1 => allOptionsTwo.flatMap(w2 => allOptionsThree.map(w3 => `${w1} ${w2} ${w3}`)));
    return allCombinations;
};
/* ------------------------------------------------------------ */
const getTwoWordVariations = (word1, word2) => {
    // word1 options
    const firstVariationsOne = addSuffixesArray(word1);
    const secondVariationsOne = firstVariationsOne.flatMap((word1) => endSuffixesArray(word1));
    const thirdVariationsOne = endSuffixesArray(word1);
    const forthVariationsOne = secondVariationsOne.flatMap((word1) => addSuffixesArray(word1));
    const allOptionsOne = [...firstVariationsOne, ...secondVariationsOne, ...thirdVariationsOne, ...forthVariationsOne].flat();
    // word2 options
    const firstVariationsTwo = addSuffixesArray(word2);
    const secondVariationsTwo = firstVariationsTwo.flatMap((word2) => endSuffixesArray(word2));
    const thirdVariationsTwo = endSuffixesArray(word2);
    const forthVariationsTwo = secondVariationsTwo.flatMap((word2) => addSuffixesArray(word2));
    const allOptionsTwo = [...firstVariationsTwo, ...secondVariationsTwo, ...thirdVariationsTwo, ...forthVariationsTwo].flat();
    const allCombinations = allOptionsOne.flatMap(w1 => allOptionsTwo.map(w2 => `${w1} ${w2}`));
    return allCombinations;
};
/* ------------------------------------------------------------ */
const getOneWordVariations = (word) => {
    const firstVariations = addSuffixesArray(word);
    const secondVariations = firstVariations.flatMap((word) => endSuffixesArray(word));
    const thirdVariations = endSuffixesArray(word);
    const forthVariations = thirdVariations.flatMap((word) => addSuffixesArray(word));
    const allOptions = [...firstVariations, ...secondVariations, ...thirdVariations, ...forthVariations].flat();
    return allOptions;
};
/* ------------------------------------------------------------ */
const endSuffixesArray = (word) => {
    return [
        word,
        // word.endsWith('ה') ? word.substring(0, word.length - 1): null,
        // word.endsWith('ך') ? word.substring(0, word.length - 1) + 'כם' : null,
        // word.endsWith('ך') ? word.substring(0, word.length - 1) + 'כן' : null,
        // word.endsWith('ם') ? word.substring(0, word.length - 1) + 'מים' : null,
        // word.endsWith('ם') ? word.substring(0, word.length - 1) + 'מות' : null,
        // word.endsWith('ן') ? word.substring(0, word.length - 1) + 'נות' : null,
        // word.endsWith('ן') ? word.substring(0, word.length - 1) + 'נים' : null,
        // word.endsWith('ץ') ? word.substring(0, word.length - 1) + 'צות' : null,
        // word.endsWith('ץ') ? word.substring(0, word.length - 1) + 'צים' : null,
        // word.endsWith('כם') ? word.substring(0, word.length - 2) + 'ך' : null,
        // word.endsWith('מה') ? word.substring(0, word.length - 2) + 'ם' : null,
        // word.endsWith('כם') ? word.substring(0, word.length - 2) + 'ך' : null,
        // word.endsWith('כן') ? word.substring(0, word.length - 2) + 'ך' : null,
        // word.endsWith('מים') ? word.substring(0, word.length - 3) + 'ם' : null,
        // word.endsWith('מות') ? word.substring(0, word.length - 3) + 'ם' : null,
        // word.endsWith('נות') ? word.substring(0, word.length - 3) + 'ן' : null,
        // word.endsWith('נים') ? word.substring(0, word.length - 3) + 'ן' : null,
        // word.endsWith('צות') ? word.substring(0, word.length - 3) + 'ץ' : null,
        // word.endsWith('צים') ? word.substring(0, word.length - 3) + 'ץ' : null,
        // word.endsWith('ים') ? word.substring(0, word.length - 2) : null,
        // word.endsWith('ות') ? word.substring(0, word.length - 2) : null,
    ].filter((w) => w !== null);
};
const addSuffixesArray = (word) => {
    return [
        word.startsWith('ה') ? word.substring(1, word.length) : null,
        word.startsWith('ו') ? word.substring(1, word.length) : null,
        word.startsWith('ב') ? word.substring(1, word.length) : null,
        // word.startsWith('כ') ? word.substring(1, word.length) : null,
        // word.startsWith('וב') ? word.substring(1, word.length) : null,
        // word.startsWith('כש') ? word.substring(1, word.length) : null,
        word === ('אחד') ? "אחת" : null,
        word === ('אחת') ? "אחד" : null,
        word === ('שתיים') ? "שניים" : null,
        word === ('שניים') ? "שתיים" : null,
        word === ('שלוש') ? "שלושה" : null,
        word === ('שלושה') ? "שלוש" : null,
        word === ('ארבע') ? "ארבעה" : null,
        word === ('ארבעה') ? "ארבע" : null,
        word === ('חמש') ? "חמישה" : null,
        word === ('חמישה') ? "חמש" : null,
        word === ('שש') ? "שישה" : null,
        word === ('שישה') ? "שש" : null,
        word === ('שבע') ? "שבעה" : null,
        word === ('שבעה') ? "שבע" : null,
        word === ('תשע') ? "תשעה" : null,
        word === ('תשעה') ? "תשע" : null,
    ].filter((w) => w !== null);
};
/* ------------------------------------------------------------ */
const splitTheSentence = (foreignSentence, foreignWord) => {
    let firstPart = "";
    let secondPart = "";
    const wordLength = foreignWord.length;
    for (let i = 0; i <= foreignSentence.length - wordLength; i++) {
        const currentWord = foreignSentence.substring(i, i + wordLength).toLocaleLowerCase();
        if (currentWord === foreignWord.toLocaleLowerCase()) {
            firstPart = foreignSentence.substring(0, i).trim();
            secondPart = foreignSentence.substring(i + wordLength).trim();
            break;
        }
    }
    return {
        firstPart,
        secondPart,
    };
};
exports.splitTheSentence = splitTheSentence;
/* ------------------------------------------------------------ */
function getHelperWords(helperWords, language, hebrewWord) {
    let result = null;
    for (let i = 0; i < helperWords.length; i++) {
        if (helperWords[i].hebrew === hebrewWord) {
            result = { hebrew: helperWords[i].hebrew, foreignWord: helperWords[i][language] };
            return result;
        }
    }
    return null;
}
