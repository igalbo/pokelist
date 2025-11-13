const express = require('express');
const router = express.Router();
const { getPokemonList, getPokemonById } = require('../controllers/pokemonController');

// GET /api/pokemon - Get list of first 150 Pokemon
router.get('/', getPokemonList);

// GET /api/pokemon/:id - Get specific Pokemon details
router.get('/:id', getPokemonById);

module.exports = router;
