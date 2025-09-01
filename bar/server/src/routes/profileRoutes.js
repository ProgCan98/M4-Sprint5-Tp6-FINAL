// Rutas de perfiles
// Rutas para perfiles
// Define endpoints CRUD protegidos con JWT

const express = require('express');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Obtiene perfiles del usuario
router.get('/', verifyToken, profileController.getProfiles);

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

module.exports = router;
