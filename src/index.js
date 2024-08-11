const express = require('express');
const app = express();
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');

// Middleware de seguridad
app.use(helmet()); // Configura encabezados HTTP seguros
app.use(xss()); // Limpia datos de entrada para prevenir

// Limitar el número de solicitudes, para evitar ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limita cada IP a 100 solicitudes por ventana
});
app.use(limiter);

// Configurar CORS
app.use(cors());

//Middleware para manejar solicitudes JSON
app.use(express.json()); // Parsear solicitudes JSON

// Rutas
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// Manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
