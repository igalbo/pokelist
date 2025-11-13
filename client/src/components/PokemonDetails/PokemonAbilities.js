import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const PokemonAbilities = ({ abilities }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Abilities
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {abilities.map((ability, index) => (
          <Chip
            key={index}
            label={ability.name.replace('-', ' ')}
            variant={ability.isHidden ? 'outlined' : 'filled'}
            color={ability.isHidden ? 'secondary' : 'default'}
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PokemonAbilities;
