// controllers/profileController.js - MEJORADO
const Profile = require('../models/Profile');

// Obtiene perfiles de un usuario
exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find({ user: req.user.id });
    console.log('Perfiles obtenidos:', profiles.length);
    res.json(profiles);
  } catch (error) {
    console.error('Error al obtener perfiles:', error);
    next(error);
  }
};

// NUEVO: Obtiene un perfil específico con watchlist populated
exports.getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({
      _id: id,
      user: req.user.id,
    }).populate('watchlist');

    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    next(error);
  }
};

// Crea un perfil
exports.createProfile = async (req, res, next) => {
  try {
    const { name, role } = req.body;
    console.log('Creando perfil:', name, role);
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
    console.log('Actualizando perfil:', id, updates);
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
    console.log('Eliminando perfil:', id);
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
    console.log('Agregando a watchlist:', profileId, cocktailId);

    const profile = await Profile.findOneAndUpdate(
      { _id: profileId, user: req.user.id },
      { $addToSet: { watchlist: cocktailId } },
      { new: true }
    ).populate('watchlist');

    if (!profile)
      return res.status(404).json({ message: 'Perfil no encontrado' });
    res.json(profile);
  } catch (error) {
    console.error('Error al agregar a watchlist:', error);
    next(error);
  }
};

// NUEVO: Elimina cóctel de watchlist
exports.removeFromWatchlist = async (req, res, next) => {
  try {
    const { profileId, cocktailId } = req.params;
    console.log('Eliminando de watchlist:', profileId, cocktailId);

    const profile = await Profile.findOneAndUpdate(
      { _id: profileId, user: req.user.id },
      { $pull: { watchlist: cocktailId } },
      { new: true }
    ).populate('watchlist');

    if (!profile)
      return res.status(404).json({ message: 'Perfil no encontrado' });
    res.json(profile);
  } catch (error) {
    console.error('Error al eliminar de watchlist:', error);
    next(error);
  }
};
