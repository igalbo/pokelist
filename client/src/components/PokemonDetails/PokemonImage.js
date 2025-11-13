import React from 'react';
import { Box } from '@mui/material';

const PokemonImage = ({ imageUrl, name }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={imageUrl}
        alt={name}
        style={{ width: '200px', height: '200px', objectFit: 'contain' }}
      />
    </Box>
  );
};

export default PokemonImage;
