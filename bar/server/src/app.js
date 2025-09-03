// app.js - CORREGIDO CON ORDERS
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/errorMiddleware');

// Carga variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

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
app.use('/api/orders', require('./routes/orderRoutes')); // ← RUTA AÑADIDA

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ message: 'API funcionando correctamente', timestamp: new Date() });
});

// Middleware de errores
app.use(errorMiddleware);

module.exports = app;
