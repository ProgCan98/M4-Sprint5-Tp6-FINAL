// CRUD de usuarios
// Controlador para gestionar usuarios
// Implementa CRUD para usuarios (con roles)

const User = require('../models/User');

// Obtiene todos los usuarios (protegido para dueño)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log('Usuarios obtenidos:', users.length); // Depuración
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    next(error);
  }
};

// Actualiza un usuario
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    console.log('Actualizando usuario:', id, updates); // Depuración
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    next(error);
  }
};

// Elimina un usuario
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Eliminando usuario:', id); // Depuración
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    next(error);
  }
};
