import React from 'react';
import { 
  TextField, 
  Box, 
  FormControlLabel, 
  Switch,
  Paper 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { usePokemon } from '../context/PokemonContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, showFavoritesOnly, setShowFavoritesOnly } = usePokemon();

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Pokémon by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{ flex: 1, minWidth: '250px' }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              color="primary"
            />
          }
          label="Show Favorites Only"
        />
      </Box>
    </Paper>
  );
};

export default SearchBar;
