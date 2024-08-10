const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

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
