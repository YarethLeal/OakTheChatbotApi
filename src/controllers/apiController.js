// Controlador para la ruta /api/hello
const getHello = (req, res) => {
    res.json({ message: 'Hello, world!' });
};

module.exports = { getHello };
