import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getPokemonById } from '../../services/api';
import PokemonImage from './PokemonImage';
import PokemonTypes from './PokemonTypes';
import PokemonAbilities from './PokemonAbilities';
import PokemonStats from './PokemonStats';
import PhysicalAttributes from './PhysicalAttributes';
import EvolutionChainSection from './EvolutionChainSection';

const PokemonDetails = ({ pokemon, open, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDetails = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPokemonById(pokemon.id);
      setDetails(data);
    } catch (error) {
      console.error('Error loading Pokemon details:', error);
    } finally {
      setLoading(false);
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemon && open) {
      loadDetails();
    }
  }, [pokemon, open, loadDetails]);

  if (!pokemon) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
          #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : details ? (
          <Box>
            {/* Image and Stats in two columns */}
            <Grid container spacing={3} sx={{ mb: 3, justifyContent: 'space-evenly' }}>
              <Grid item xs={12} md={5}>
                <PokemonImage imageUrl={details.imageUrl} name={details.name} />
              </Grid>
              <Grid item xs={12} md={7}>
                <PokemonStats stats={details.stats} />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            {/* Types, Abilities, Physical Attributes in a row */}
            <Grid container spacing={2} sx={{ mb: 3, justifyContent: 'space-between' }}>
              <Grid item xs={12} md={4}>
                <PokemonTypes types={details.types} />
              </Grid>
              <Grid item xs={12} md={4}>
                <PokemonAbilities abilities={details.abilities} />
              </Grid>
              <Grid item xs={12} md={4}>
                <PhysicalAttributes height={details.height} weight={details.weight} />
              </Grid>
            </Grid>
            
            <EvolutionChainSection 
              evolutionChain={details.evolutionChain} 
              currentPokemonId={pokemon.id} 
            />
          </Box>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetails;
