const express = require('express');
const router = express.Router();

// Importar controladores
const { getHello } = require('../controllers/apiController');

// Definir rutas
router.get('/hello', getHello);

module.exports = router;
