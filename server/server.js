require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const pokemonRoutes = require('./routes/pokemon');
const favoritesRoutes = require('./routes/favorites');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/favorites', favoritesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
