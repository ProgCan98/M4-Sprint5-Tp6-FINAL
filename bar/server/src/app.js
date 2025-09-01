// Configuración principal de Express
// Conecta a MongoDB, configura middleware y rutas

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/errorMiddleware');

// Carga variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Permite solicitudes desde frontend
app.use(express.json()); // Parsea JSON

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/profiles', require('./routes/profileRoutes'));
app.use('/api/cocktails', require('./routes/cocktailRoutes'));

// Middleware de errores
app.use(errorMiddleware);

module.exports = app;
