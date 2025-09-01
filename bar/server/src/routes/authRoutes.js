// Rutas para autenticación
// Define endpoints para login y registro

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Ruta para registro
router.post('/register', authController.register);

// Ruta para login
router.post('/login', authController.login);

module.exports = router;
