const express = require('express');
const router = express.Router();

// Importar controladores
const { getHello } = require('../controllers/apiController');
const { handleUserInput, getQuestions } = require('../controllers/chatbotController');

// Definir rutas
router.get('/hello', getHello);
router.post('/consulta', handleUserInput);
router.get('/preguntas', getQuestions);

module.exports = router;
