// Modelo de perfil
// Modelo de perfil para MongoDB
// Define la estructura de datos para perfiles asociados a usuarios

const mongoose = require('mongoose');

// Esquema del perfil
const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['standard', 'child'], // Roles estándar o niño (dueño es el usuario principal)
    default: 'standard',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  watchlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cocktail',
    },
  ],
  preferences: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Profile', profileSchema);
