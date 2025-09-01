// Modelo de usuario (Mongoose)

// Modelo de usuario para MongoDB
// Define la estructura de datos y validaciones para usuarios

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Esquema del usuario
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['owner', 'standard', 'child'],
    default: 'owner', // Dueño puede gestionar perfiles
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encripta la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compara contraseñas para login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
