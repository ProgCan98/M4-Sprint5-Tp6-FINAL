// middleware/authMiddleware.js - CORREGIDO
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verifica token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'No token proporcionado' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Token verificado para usuario:', decoded.id);
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

// ALIAS para compatibilidad con orderRoutes
exports.protect = exports.verifyToken;

// Verifica rol específico
exports.checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    console.log('Acceso denegado para rol:', req.user.role);
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};

// Middleware para obtener usuario completo
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    req.user = { ...req.user, ...user.toObject() };
    next();
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
