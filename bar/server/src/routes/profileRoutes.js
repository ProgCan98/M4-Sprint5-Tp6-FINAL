// routes/profileRoutes.js - MEJORADO
const express = require('express');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Obtiene perfiles del usuario
router.get('/', verifyToken, profileController.getProfiles);

// NUEVO: Obtiene un perfil específico con watchlist
router.get('/:id', verifyToken, profileController.getProfileById);

// Crea un perfil
router.post(
  '/',
  verifyToken,
  checkRole(['owner']),
  profileController.createProfile
);

// Actualiza un perfil
router.put(
  '/:id',
  verifyToken,
  checkRole(['owner']),
  profileController.updateProfile
);

// Elimina un perfil
router.delete(
  '/:id',
  verifyToken,
  checkRole(['owner']),
  profileController.deleteProfile
);

// Agrega a watchlist
router.post(
  '/:profileId/watchlist',
  verifyToken,
  profileController.addToWatchlist
);

// NUEVO: Elimina de watchlist
router.delete(
  '/:profileId/watchlist/:cocktailId',
  verifyToken,
  profileController.removeFromWatchlist
);

module.exports = router;
