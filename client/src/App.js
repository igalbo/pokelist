import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { PokemonProvider } from './context/PokemonContext';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PokemonProvider>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <AppBar position="static" elevation={2}>
            <Toolbar>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #FFF 30%, #FFD700 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PokeList
              </Typography>
            </Toolbar>
          </AppBar>

          <Container maxWidth="xl" sx={{ py: 4 }}>
            <SearchBar />
            <PokemonList />
          </Container>
        </Box>
      </PokemonProvider>
    </ThemeProvider>
  );
}

export default App;
