const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  pokemonId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Favorite', favoriteSchema);
