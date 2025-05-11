# Tabletop Companion

A web application for managing tabletop game characters and campaigns.

## Features

- User authentication (register/login)
- Character creation and management
- Campaign tracking
- Dice rolling
- Spell management
- Inventory system

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize ORM
- JWT Authentication

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tabletop-companion.git
cd tabletop-companion
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up the database:
```bash
# Create the database
createdb tabletop_companion

# Run migrations (if any)
cd backend
npm run migrate
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user

### Characters
- POST /api/characters - Create a new character
- GET /api/characters - Get all characters for the authenticated user
- GET /api/characters/:id - Get a specific character
- PUT /api/characters/:id - Update a character
- DELETE /api/characters/:id - Delete a character

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project Structure

```
tabletop_companion/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
└── README.md         # This file
```

## Development

- Backend runs on http://localhost:3001
- Frontend runs on http://localhost:3000 