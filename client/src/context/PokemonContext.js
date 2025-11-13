import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { getPokemonList, getFavorites, addFavorite, removeFavorite } from '../services/api';

const PokemonContext = createContext();

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        const [pokemonData, favoritesData] = await Promise.all([
          getPokemonList(),
          getFavorites(),
        ]);
        setPokemonList(pokemonData);
        setFavorites(favoritesData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Check if a pokemon is favorited
  const isFavorite = (pokemonId) => {
    return favorites.some((fav) => fav.pokemonId === pokemonId);
  };

  // Toggle favorite
  const toggleFavorite = async (pokemon) => {
    try {
      setError(null); // Clear any previous errors
      if (isFavorite(pokemon.id)) {
        await removeFavorite(pokemon.id);
        setFavorites((prev) => prev.filter((fav) => fav.pokemonId !== pokemon.id));
      } else {
        const newFavorite = await addFavorite({
          pokemonId: pokemon.id,
          name: pokemon.name,
          imageUrl: pokemon.imageUrl,
        });
        setFavorites((prev) => [...prev, newFavorite]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setError('Failed to update favorites. Please try again.');
      // Auto-clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  // Filter pokemon based on search and favorites - memoized for performance
  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFavorites = !showFavoritesOnly || isFavorite(pokemon.id);
      return matchesSearch && matchesFavorites;
    });
  }, [pokemonList, searchQuery, showFavoritesOnly, favorites]);

  const value = {
    pokemonList,
    favorites,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    showFavoritesOnly,
    setShowFavoritesOnly,
    filteredPokemon,
    isFavorite,
    toggleFavorite,
  };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};
