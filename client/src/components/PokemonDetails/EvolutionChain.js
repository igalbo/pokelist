import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EvolutionChain = ({ chain, currentPokemonId }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {chain.map((evolution, index) => (
        <React.Fragment key={evolution.id}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
              alt={evolution.name}
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'background.default',
                border: evolution.id === currentPokemonId ? '3px solid' : 'none',
                borderColor: evolution.id === currentPokemonId ? 'primary.main' : 'transparent',
                boxShadow: evolution.id === currentPokemonId ? 3 : 0,
                transition: 'all 0.3s ease',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
              }}
            >
              {evolution.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              #{evolution.id.toString().padStart(3, '0')}
            </Typography>
          </Box>
          {index < chain.length - 1 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 80, // Match Avatar height
              }}
            >
              <ArrowForwardIcon sx={{ color: 'text.secondary', fontSize: 32 }} />
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default EvolutionChain;
