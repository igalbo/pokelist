import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { typeColors } from '../../constants/pokemonTypes';

const PokemonTypes = ({ types }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Types
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {types.map((type) => (
          <Chip
            key={type}
            label={type}
            sx={{
              bgcolor: typeColors[type] || '#777',
              color: 'white',
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PokemonTypes;
