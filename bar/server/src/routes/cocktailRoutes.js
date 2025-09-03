// routes/cocktailRoutes.js - CORREGIDO
const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const cocktailController = require('../controllers/cocktailController');

const router = express.Router();

// Obtiene cócteles con filtros y paginado
router.get('/', verifyToken, cocktailController.getCocktails);

// NUEVO: Obtiene un cóctel específico por ID
router.get('/:id', verifyToken, cocktailController.getCocktailById);

// Sincroniza cócteles desde TheCocktailDB
router.get('/sync', verifyToken, cocktailController.syncCocktails);

module.exports = router;
