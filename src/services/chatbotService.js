const natural = require('natural');
const { loadDB } = require('../config/db');
const Response = require('../models/query');

// Inicialización de la herramienta de NLP de 'natural'
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmerEs; // Usa el stemmer en español
const similarity = natural.JaroWinklerDistance; // Métrica de similitud

const generateResponse = (input) => {
    const db = loadDB();
    const stemmedInput = tokenizer.tokenize(input).map(token => stemmer.stem(token)).join(' ');

    let bestMatch = null;
    let highestScore = 0;

    db.queries.forEach(query => {
        const stemmedQuestion = tokenizer.tokenize(query.question).map(token => stemmer.stem(token)).join(' ');
        const score = similarity(stemmedInput, stemmedQuestion);

        if (score > highestScore) {
            highestScore = score;
            bestMatch = query;
        }
    });

    // Definir un umbral de similitud para determinar si se ha encontrado una coincidencia adecuada
    const similarityThreshold = 0.7;

    if (highestScore >= similarityThreshold && bestMatch) {
        return new Response(input, bestMatch.answer);
    } else {
        return new Response(input, 'Lo siento, no entiendo tu pregunta.');
    }
};

module.exports = { generateResponse };

