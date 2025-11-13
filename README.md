# Pokémon Full-Stack Application

A modern full-stack app to browse, search, and manage favorite Pokémon. Built with React, Node.js, and MongoDB.

## Features

- Browse 150 Pokémon with infinite scroll
- Search by name
- View details: abilities, types, stats, evolution chains
- Add/remove favorites (persisted in MongoDB)
- Responsive Material UI design

## Live Link

https://pokelist-five.vercel.app/

## ⚠️ Important Note

**As per requirements, I used Render.com's free tier, which goes to sleep after some inactivity. So if at first you don't see the pokemon list, please allow 60 seconds for the server to "wake up", and refresh the page.**

## Tech Stack

**Frontend:** React, Vite, Material UI, Context API  
**Backend:** Node.js, Express, MongoDB, Mongoose

## Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas account

### Setup

1. **Clone & Install**

```bash
git clone <repo-url>
cd poke-list

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

2. **Environment Variables**

Create `server/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/pokemon-app
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

3. **Run the Application**

```bash
# Terminal 1: Start MongoDB (if local)
mongod

# Terminal 2: Start backend
cd server && npm run dev

# Terminal 3: Start frontend
cd client && npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5001`

## Project Structure

```
poke-list/
├── server/          # Express API + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── client/          # React app
    └── src/
        ├── components/
        ├── context/
        └── services/
```

## API Endpoints

- `GET /api/pokemon` - List Pokémon
- `GET /api/pokemon/:id` - Get details
- `GET /api/favorites` - Get favorites
- `POST /api/favorites` - Add favorite
- `DELETE /api/favorites/:id` - Remove favorite

---

Built as a full-stack engineering assignment showcasing React, Node.js, and MongoDB integration.
