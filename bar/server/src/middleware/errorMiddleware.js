// Middleware para manejar errores del backend
// Captura errores y devuelve respuestas estandarizadas

const errorMiddleware = (err, req, res, next) => {
  console.error('Error en el servidor:', err.message); // Depuración
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
  });
};

module.exports = errorMiddleware;
