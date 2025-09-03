// models/Order.js - MODELO FALTANTE
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  items: [
    {
      cocktail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cocktail',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending',
  },
  deliveryAddress: {
    street: String,
    city: String,
    zipCode: String,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Actualiza updatedAt antes de guardar
orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
