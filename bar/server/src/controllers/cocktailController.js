// Controlador para gestionar cócteles
// Implementa CRUD, filtros, paginado y sincronización con TheCocktailDB

const { syncCocktails } = require('../services/cocktailService'); // Ruta corregida
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

    res.json({ cocktails, total, page, limit });
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
