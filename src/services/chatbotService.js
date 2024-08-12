const natural = require('natural');
const { loadDB } = require('../config/db');
const Response = require('../models/query');

// Inicialización de la herramienta de NLP de 'natural'
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmerEs; // Usa el stemmer en español
const similarity = natural.JaroWinklerDistance; // Métrica de similitud

generateResponse = (input) => {
    const db = loadDB();
    const stemmedInput = tokenizeAndStem(input.toLowerCase());

    const bestMatch = findBestMatch(stemmedInput, db.queries);
    const similarityThreshold = 0.7;

    if (bestMatch.score >= similarityThreshold) {
        return new Response(input, bestMatch.query.answer);
    } else {
        return new Response(input, 'Lo siento, no entiendo tu pregunta.');
    }
}

tokenizeAndStem = (text) => {
    return tokenizer.tokenize(text).map(token => stemmer.stem(token)).join(' ');
}

findBestMatch = (input, queries) => {
    let bestMatch = { query: null, score: 0 };

    queries.forEach(query => {
        query.question.forEach(question => {
            const stemmedQuestion = tokenizeAndStem(question);
            const score = similarity(input, stemmedQuestion);

            if (score > bestMatch.score) {
                bestMatch = { query, score };
            }
        });
    });

    return bestMatch;
}
module.exports = { generateResponse };

