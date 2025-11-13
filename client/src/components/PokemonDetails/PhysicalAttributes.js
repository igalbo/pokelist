import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const PhysicalAttributes = ({ height, weight }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Physical Attributes
      </Typography>
      <Grid container spacing={2} 
      sx={{ justifyContent: 'space-between' }}
      >
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Height
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {(height / 10).toFixed(1)} m
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Weight
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {(weight / 10).toFixed(1)} kg
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PhysicalAttributes;
