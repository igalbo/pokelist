import React from 'react';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';

const PokemonStats = ({ stats }) => {
  return (
    <Box sx={{ mb: 3, width: "260px" }}>
      <Typography variant="h6" gutterBottom>
        Base Stats
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
        {stats.map((stat) => (
          <Grid item xs={12} key={stat.name} sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Typography
                variant="body2"
                sx={{
                  minWidth: '120px',
                  textTransform: 'capitalize',
                  fontWeight: 500,
                }}
              >
                {stat.name.replace('-', ' ')}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={stat.value > 100 ? 100 : stat.value}
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
              <Typography variant="body2" sx={{ minWidth: '30px', fontWeight: 600, textAlign: 'right' }}>
                {stat.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PokemonStats;
