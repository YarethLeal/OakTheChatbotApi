const { generateResponse } = require('../services/chatbotService');
const { getAllQuestions } = require('../services/questionService');

// Controlador para la ruta /api/consulta
const handleUserInput = (req, res) => {
    const userInput = req.body.message;
    const response = generateResponse(userInput);
    res.json({ message: response.botResponse });
};

// Controlador para la ruta /api/preguntas
const getQuestions = (req, res) => {
    const questions = getAllQuestions();
    res.json({ questions });
};

module.exports = { handleUserInput, getQuestions };