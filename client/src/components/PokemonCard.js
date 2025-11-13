import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { usePokemon } from '../context/PokemonContext';
import { typeColors } from '../constants/pokemonTypes';

const PokemonCard = ({ pokemon, onClick }) => {
  const { isFavorite, toggleFavorite } = usePokemon();
  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  // Get color based on Pokemon ID using hash
  const getBackgroundColor = (id) => {
    const typeColorArray = Object.values(typeColors);
    const index = id % typeColorArray.length;
    return typeColorArray[index];
  };

  const bgColor = getBackgroundColor(pokemon.id);

  return (
    <Card
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        m: "4px",
        border: favorite ? '3px solid' : 'none',
        borderColor: favorite ? 'error.main' : 'transparent',
      }}
      onClick={() => onClick(pokemon)}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: 'background.paper',
          '&:hover': {
            bgcolor: 'background.paper',
            transform: 'scale(1.1)',
          },
        }}
        onClick={handleFavoriteClick}
      >
        {favorite ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      <CardMedia
        component="img"
        height="200"
        image={pokemon.imageUrl}
        alt={pokemon.name}
        sx={{
          objectFit: 'contain',
          pt: 2,
          background: `linear-gradient(to bottom, ${bgColor} 0%, ${bgColor} 20%, white 70%)`,
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            textTransform: 'capitalize',
            mb: 1,
            fontWeight: 600,
          }}
        >
          #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
