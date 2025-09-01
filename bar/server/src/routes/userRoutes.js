// Rutas de usuarios
// Rutas para usuarios
// Define endpoints CRUD protegidos con JWT

const express = require('express');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// Obtiene todos los usuarios (solo dueño)
router.get('/', verifyToken, checkRole(['owner']), userController.getUsers);

// Actualiza un usuario
router.put('/:id', verifyToken, userController.updateUser);

// Elimina un usuario
router.delete(
  '/:id',
  verifyToken,
  checkRole(['owner']),
  userController.deleteUser
);

module.exports = router;
