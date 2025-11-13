const axios = require('axios');

// Get first 150 Pokemon (basic list only)
const getPokemonList = async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    
    // Return basic list with ID extracted from URL
    const pokemonList = response.data.results.map((pokemon, index) => {
      // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon/1/" -> "1")
      const id = pokemon.url.split('/').filter(Boolean).pop();
      return {
        id: parseInt(id),
        name: pokemon.name,
        // We'll construct image URL using the ID
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      };
    });


    res.json(pokemonList);
  } catch (error) {
    console.error('Error fetching Pokemon list:', error.message);
    res.status(500).json({ message: 'Error fetching Pokemon list', error: error.message });
  }
};

// Get Pokemon details by ID
const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const speciesResponse = await axios.get(response.data.species.url);
    
    const pokemon = {
      id: response.data.id,
      name: response.data.name,
      imageUrl: response.data.sprites.other['official-artwork'].front_default || response.data.sprites.front_default,
      types: response.data.types.map(type => type.type.name),
      abilities: response.data.abilities.map(ability => ({
        name: ability.ability.name,
        isHidden: ability.is_hidden
      })),
      height: response.data.height,
      weight: response.data.weight,
      stats: response.data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      }))
    };

    // Get evolution chain
    if (speciesResponse.data.evolution_chain) {
      const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
      pokemon.evolutionChain = parseEvolutionChain(evolutionResponse.data.chain);
    }

    res.json(pokemon);
  } catch (error) {
    console.error('Error fetching Pokemon details:', error.message);
    res.status(500).json({ message: 'Error fetching Pokemon details', error: error.message });
  }
};

// Helper function to parse evolution chain recursively
const parseEvolutionChain = (chain) => {
  const evolutionChain = [];
  
  const traverse = (node) => {
    // Extract ID from species URL (e.g., "https://pokeapi.co/api/v2/pokemon-species/1/" -> "1")
    const speciesId = node.species.url.split('/').filter(Boolean).pop();
    
    evolutionChain.push({
      id: parseInt(speciesId),
      name: node.species.name,
      isBaby: node.is_baby
    });
    
    // Recursively process all evolution branches
    if (node.evolves_to && node.evolves_to.length > 0) {
      node.evolves_to.forEach(evolution => traverse(evolution));
    }
  };
  
  traverse(chain);
  return evolutionChain;
};

module.exports = {
  getPokemonList,
  getPokemonById
};
