// CRUD de perfiles
// Controlador para gestionar perfiles
// Implementa CRUD para perfiles asociados a usuarios

const Profile = require('../models/Profile');

// Obtiene perfiles de un usuario
exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find({ user: req.user.id });
    console.log('Perfiles obtenidos:', profiles.length); // Depuración
    res.json(profiles);
  } catch (error) {
    console.error('Error al obtener perfiles:', error);
    next(error);
  }
};

// Crea un perfil
exports.createProfile = async (req, res, next) => {
  try {
    const { name, role } = req.body;
    console.log('Creando perfil:', name, role); // Depuración
    const profile = await Profile.create({ name, role, user: req.user.id });
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error al crear perfil:', error);
    next(error);
  }
};

// Actualiza un perfil
exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    console.log('Actualizando perfil:', id, updates); // Depuración
    const profile = await Profile.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updates,
      { new: true }
    );
    if (!profile)
      return res.status(404).json({ message: 'Perfil no encontrado' });
    res.json(profile);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    next(error);
  }
};

// Elimina un perfil
exports.deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Eliminando perfil:', id); // Depuración
    const profile = await Profile.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!profile)
      return res.status(404).json({ message: 'Perfil no encontrado' });
    res.json({ message: 'Perfil eliminado' });
  } catch (error) {
    console.error('Error al eliminar perfil:', error);
    next(error);
  }
};

// Agrega cóctel a watchlist
exports.addToWatchlist = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const { cocktailId } = req.body;
    console.log('Agregando a watchlist:', profileId, cocktailId); // Depuración
    const profile = await Profile.findOneAndUpdate(
      { _id: profileId, user: req.user.id },
      { $addToSet: { watchlist: cocktailId } },
      { new: true }
    );
    if (!profile)
      return res.status(404).json({ message: 'Perfil no encontrado' });
    res.json(profile);
  } catch (error) {
    console.error('Error al agregar a watchlist:', error);
    next(error);
  }
};
