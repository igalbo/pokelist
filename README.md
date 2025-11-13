# Pokémon Full-Stack Application

A modern full-stack application built with React and Node.js that allows users to browse, search, and manage their favorite Pokémon. The application fetches data from the PokéAPI and provides a beautiful, responsive interface with Material UI.

## 🎯 Features

### Core Features

- ✅ Display first 150 Pokémon in a scrollable list
- ✅ Click on Pokémon to view detailed information:
  - Abilities (including hidden abilities)
  - Types with color-coded badges
  - Base stats with visual progress bars
  - Physical attributes (height & weight)
  - Full evolution chain visualization
- ✅ Add/remove Pokémon from favorites
- ✅ Filter to show only favorite Pokémon
- ✅ Search Pokémon by name

### Bonus Features

- ✅ **Search functionality** - Real-time search with debouncing
- ✅ **Infinite scroll** - Lazy loading for optimal performance
- ✅ **Animations** - Smooth transitions and hover effects
- ✅ **MongoDB database** - Persistent favorites storage
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Material UI** - Beautiful, modern interface

## 🛠️ Tech Stack

### Frontend

- React 18
- Material UI (MUI)
- Context API for state management
- Axios for API calls
- React Infinite Scroll Component

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Axios for PokéAPI integration
- CORS enabled

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd poke-list
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pokemon-app
NODE_ENV=development
```

**Note:** If using MongoDB Atlas, replace `MONGODB_URI` with your connection string.

### 3. Frontend Setup

```bash
cd ../client
npm install
```

The frontend is pre-configured to connect to `http://localhost:5000/api`. If you need to change this, update `client/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Running the Application

### Start MongoDB (if running locally)

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or start manually
mongod
```

### Start the Backend

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

### Start the Frontend

Open a new terminal:

```bash
cd client
npm start
```

The app will open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
poke-list/
├── server/                      # Backend application
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── pokemonController.js
│   │   └── favoritesController.js
│   ├── models/
│   │   └── Favorite.js         # MongoDB schema
│   ├── routes/
│   │   ├── pokemon.js
│   │   └── favorites.js
│   ├── .env                    # Environment variables
│   ├── server.js               # Express server entry
│   └── package.json
│
├── client/                      # Frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.js
│   │   │   ├── PokemonCard.js
│   │   │   ├── PokemonList.js
│   │   │   ├── PokemonDetails.js
│   │   │   └── EvolutionChain.js
│   │   ├── context/
│   │   │   └── PokemonContext.js
│   │   ├── services/
│   │   │   └── api.js          # API service layer
│   │   ├── constants/
│   │   │   └── pokemonTypes.js  # Shared constants
│   │   ├── theme.js            # Material UI theme
│   │   └── App.js
│   ├── .env                    # Environment variables
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Pokemon Endpoints

- `GET /api/pokemon` - Get list of first 150 Pokémon
- `GET /api/pokemon/:id` - Get detailed Pokémon information

### Favorites Endpoints

- `GET /api/favorites` - Get all favorites
- `POST /api/favorites` - Add a Pokémon to favorites
  ```json
  {
    "pokemonId": 1,
    "name": "bulbasaur",
    "imageUrl": "https://..."
  }
  ```
- `DELETE /api/favorites/:id` - Remove a Pokémon from favorites

## 🎨 Key Implementation Details

### Efficient Data Loading

- The initial Pokémon list loads quickly with just basic information (id, name, image)
- Detailed data (abilities, stats, evolution) is fetched only when clicking on a Pokémon
- This reduces initial load time from 150+ requests to just 1 request

### Infinite Scroll

- Initial display shows 20 Pokémon
- Automatically loads 20 more as you scroll down
- Improves performance and user experience

### State Management

- Context API manages global state (Pokémon list, favorites, search, filters)
- Centralized logic for favorites synchronization with backend
- Clean separation between UI and business logic

### Type System

- Shared constants for Pokémon type colors across components
- DRY principle applied to avoid code duplication

## 🧪 Testing the Application

1. **Browse Pokémon**: Scroll through the list to see different Pokémon
2. **Search**: Type a Pokémon name in the search bar
3. **Add Favorites**: Click the heart icon on any Pokémon card
4. **View Details**: Click on a Pokémon card to see full details
5. **Filter Favorites**: Toggle "Show Favorites Only" switch
6. **Evolution Chain**: View evolution chains in the details modal

## 🚀 Deployment Considerations

### Frontend (Vercel/Netlify)

- Build the React app: `npm run build`
- Deploy the `build` folder
- Set environment variable: `REACT_APP_API_URL` to your backend URL

### Backend (Render/Heroku)

- Set environment variables:
  - `PORT`
  - `MONGODB_URI` (MongoDB Atlas connection string)
  - `NODE_ENV=production`
- Deploy from `server` directory

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `brew services list` (macOS)
- Check connection string in `server/.env`
- For MongoDB Atlas: Whitelist your IP address

### CORS Errors

- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `client/.env`
- Ensure CORS is enabled in `server/server.js`

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## 📝 Future Enhancements

- User authentication system
- Multiple user profiles with separate favorites
- Advanced filtering (by type, generation, stats)
- Compare Pokémon side-by-side
- Battle simulator
- PWA (Progressive Web App) support

## 👨‍💻 Author

Created as part of a full-stack engineering assessment.

## 📄 License

This project is open source and available under the MIT License.
