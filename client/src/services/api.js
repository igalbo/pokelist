import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', errorMessage, error);
    
    // Enhance error object with user-friendly message
    const enhancedError = new Error(errorMessage);
    enhancedError.status = error.response?.status;
    enhancedError.originalError = error;
    
    throw enhancedError;
  }
);

// Pokemon endpoints
export const getPokemonList = async () => {
  const response = await api.get('/pokemon');
  return response.data;
};

export const getPokemonById = async (id) => {
  const response = await api.get(`/pokemon/${id}`);
  return response.data;
};

// Favorites endpoints
export const getFavorites = async () => {
  const response = await api.get('/favorites');
  return response.data;
};

export const addFavorite = async (pokemon) => {
  const response = await api.post('/favorites', pokemon);
  return response.data;
};

export const removeFavorite = async (pokemonId) => {
  const response = await api.delete(`/favorites/${pokemonId}`);
  return response.data;
};

export default api;
