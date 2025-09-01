// Rutas de cócteles
// Rutas para cócteles
// Define endpoints para CRUD, filtros y sincronización

const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const cocktailController = require('../controllers/cocktailController');

const router = express.Router();

// Obtiene cócteles con filtros y paginado
router.get('/', verifyToken, cocktailController.getCocktails);

// Sincroniza cócteles desde TheCocktailDB
router.get('/sync', verifyToken, cocktailController.syncCocktails);

module.exports = router;
