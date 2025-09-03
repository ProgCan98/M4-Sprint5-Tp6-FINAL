// controllers/cocktailController.js - CORREGIDO
const { syncCocktails } = require('../services/cocktailService');
const Cocktail = require('../models/Cocktail');

exports.getCocktails = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, name, nonAlcoholic } = req.query;
    const query = {};

    if (category) query.category = category;
    if (name) query.name = { $regex: name, $options: 'i' };
    if (nonAlcoholic === 'true') query.alcoholic = 'Non_Alcoholic';

    const cocktails = await Cocktail.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Cocktail.countDocuments(query);

    res.json({ cocktails, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

// NUEVO: Obtener cóctel por ID
exports.getCocktailById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cocktail = await Cocktail.findById(id);

    if (!cocktail) {
      return res.status(404).json({ message: 'Cóctel no encontrado' });
    }

    res.json(cocktail);
  } catch (error) {
    next(error);
  }
};

exports.syncCocktails = async (req, res, next) => {
  try {
    const result = await syncCocktails();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
