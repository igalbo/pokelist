const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoritesController');

// GET /api/favorites - Get all favorites
router.get('/', getFavorites);

// POST /api/favorites - Add a favorite
router.post('/', addFavorite);

// DELETE /api/favorites/:id - Remove a favorite
router.delete('/:id', removeFavorite);

module.exports = router;
