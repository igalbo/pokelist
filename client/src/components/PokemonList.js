import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonCard from './PokemonCard';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import { usePokemon } from '../context/PokemonContext';

const PokemonList = () => {
  const { filteredPokemon, loading, error } = usePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [displayCount, setDisplayCount] = useState(20);

  const loadMore = () => {
    setDisplayCount((prev) => prev + 20);
  };

  const hasMore = displayCount < filteredPokemon.length;
  const displayedPokemon = filteredPokemon.slice(0, displayCount);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <img 
          src="/pikachu-gif.gif" 
          alt="Loading..." 
          style={{ width: '150px', height: 'auto' }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (filteredPokemon.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No Pokémon found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={displayedPokemon.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <img 
              src="/pikachu-gif.gif" 
              alt="Loading more..." 
              style={{ width: '100px', height: 'auto' }}
            />
          </Box>
        }
        endMessage={
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ py: 4 }}
          >
            You've seen all {filteredPokemon.length} Pokémon!
          </Typography>
        }
      >
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {displayedPokemon.map((pokemon) => (
            <Grid item xs={12} key={pokemon.id} sx={{ width: { xs: '100%', sm: '200px' } }}>
              <PokemonCard
                pokemon={pokemon}
                onClick={setSelectedPokemon}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      <PokemonDetails
        pokemon={selectedPokemon}
        open={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </>
  );
};

export default PokemonList;
