// Servicio para interactuar con TheCocktailDB API
// Maneja la sincronización de cócteles y transforma los datos

const axios = require('axios');

const THE_COCKTAIL_DB_API = process.env.COCKTAILDB_BASE_URL;

const fetchCocktailsFromApi = async () => {
  try {
    // Ejemplo: Obtener cócteles de categoría "Ordinary_Drink"
    const response = await axios.get(
      `${THE_COCKTAIL_DB_API}/filter.php?c=Ordinary_Drink`
    );
    return response.data.drinks || [];
  } catch (error) {
    console.error(
      'Error fetching cocktails from TheCocktailDB:',
      error.message
    );
    throw new Error('No se pudieron obtener los cócteles de la API externa');
  }
};

const transformCocktailData = (apiCocktail) => {
  // Transforma los datos de la API al esquema de Cocktail.js
  return {
    name: apiCocktail.strDrink,
    category: apiCocktail.strCategory || 'Unknown',
    alcoholic: apiCocktail.strAlcoholic || 'Non_Alcoholic',
    image: apiCocktail.strDrinkThumb,
    instructions: '', // No siempre disponible en filter.php
    ingredients: [], // Se puede completar con lookup.php si es necesario
    createdAt: new Date(),
  };
};

const syncCocktails = async () => {
  const cocktailsFromApi = await fetchCocktailsFromApi();
  const Cocktail = require('../models/Cocktail'); // Correcta desde services/

  // Transforma y guarda solo los nuevos cócteles
  const cocktailsToSave = cocktailsFromApi
    .map(transformCocktailData)
    .filter((cocktail) => !cocktail.name.includes('Unknown'));

  await Cocktail.deleteMany({}); // Opcional: Limpia la colección antes de sincronizar
  const savedCocktails = await Cocktail.insertMany(cocktailsToSave);

  return { message: 'Cócteles sincronizados', count: savedCocktails.length };
};

module.exports = { syncCocktails };
