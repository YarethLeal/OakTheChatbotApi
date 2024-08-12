const { loadDB } = require('../config/db');

const getAllQuestions = () => {
    const db = loadDB();
    const questions = db.queries.map(query => query.question);
    return questions;
};

module.exports = {
    getAllQuestions,
};