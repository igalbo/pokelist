import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import EvolutionChain from './EvolutionChain';

const EvolutionChainSection = ({ evolutionChain, currentPokemonId }) => {
  if (!evolutionChain || evolutionChain.length <= 1) {
    return null;
  }

  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Evolution Chain
        </Typography>
        <EvolutionChain chain={evolutionChain} currentPokemonId={currentPokemonId} />
      </Box>
    </>
  );
};

export default EvolutionChainSection;
