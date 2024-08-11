// Controlador para la ruta /api/hello
const getHello = (req, res) => {
    res.json({ message: 'Bienvenido entrenador, ¿Que te gustaria saber?' });
};
// Exportar controladores
module.exports = { getHello };
