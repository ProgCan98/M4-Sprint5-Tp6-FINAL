// Modelo de cóctel
// Modelo de cóctel para MongoDB
// Define la estructura de datos para cócteles obtenidos de TheCocktailDB

const mongoose = require('mongoose');

// Esquema del cóctel
const cocktailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  alcoholic: {
    type: String,
    enum: ['Alcoholic', 'Non_Alcoholic'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
  },
  ingredients: [
    {
      ingredient: String,
      measure: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Índices para filtros avanzados
cocktailSchema.index({ name: 'text' }); // Búsqueda por nombre
cocktailSchema.index({ category: 1 }); // Filtro por categoría

module.exports = mongoose.model('Cocktail', cocktailSchema);
