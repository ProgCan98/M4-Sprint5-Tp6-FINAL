// Lógica de autenticación (login, registro)

// Controlador para autenticación de usuarios
// Maneja registro y login, generando tokens JWT

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Registrando usuario:', email); // Depuración
    const user = await User.create({ email, password });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res
      .status(201)
      .json({ token, user: { id: user._id, email, role: user.role } });
  } catch (error) {
    console.error('Error en registro:', error);
    next(error);
  }
};

// Login de usuario
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Iniciando sesión:', email); // Depuración
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, user: { id: user._id, email, role: user.role } });
  } catch (error) {
    console.error('Error en login:', error);
    next(error);
  }
};
