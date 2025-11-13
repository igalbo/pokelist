const Favorite = require('../models/Favorite');

// Get all favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};

// Add a favorite
const addFavorite = async (req, res) => {
  try {
    const { pokemonId, name, imageUrl } = req.body;

    // Check if already exists
    const existingFavorite = await Favorite.findOne({ pokemonId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Pokemon already in favorites' });
    }

    const favorite = new Favorite({
      pokemonId,
      name,
      imageUrl
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error adding favorite:', error.message);
    res.status(500).json({ message: 'Error adding favorite', error: error.message });
  }
};

// Remove a favorite
const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    
    const favorite = await Favorite.findOneAndDelete({ pokemonId: id });
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Favorite removed successfully', favorite });
  } catch (error) {
    console.error('Error removing favorite:', error.message);
    res.status(500).json({ message: 'Error removing favorite', error: error.message });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};
