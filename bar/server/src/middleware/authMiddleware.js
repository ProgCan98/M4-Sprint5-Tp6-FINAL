// Verificación de JWT y roles
// Middleware para autenticación y autorización
// Verifica JWT y roles para proteger endpoints

const jwt = require('jsonwebtoken');

// Verifica token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'No token proporcionado' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega usuario decodificado a la solicitud
    console.log('Token verificado para usuario:', decoded.id); // Depuración
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Verifica rol específico
exports.checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    console.log('Acceso denegado para rol:', req.user.role); // Depuración
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};
