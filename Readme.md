# Gumla Gadi

Gumla Gadi is a full-stack bus information platform for Gumla, Jharkhand. It helps users search buses by route, view stand-specific schedule details, manage bus records through an admin panel, and ask travel questions through an AI assistant called `HamsafarAI`.

This repository is a small monorepo with three services:

- `gumla-gadi-frontend`: React + Vite client
- `server`: Express + MongoDB API
- `ai-service`: FastAPI + LangChain + Gemini-powered assistant

## What The Project Does

- Lets commuters search buses by source and destination
- Shows bus details such as departure time, arrival time, fare, contact number, type, and stand
- Supports user signup and login with JWT-based authentication
- Supports "Continue with Google" signup/login through Google Identity Services
- Provides an admin-only dashboard to add, edit, and delete bus records
- Includes an AI chat widget that answers bus and travel-related queries in Hinglish

## Current Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs
- CORS + dotenv

### AI Service

- FastAPI
- Uvicorn
- LangChain Core
- `langchain-google-genai`
- DuckDuckGo Search
- Requests + python-dotenv

## Repository Structure

```text
GUMLA-GADI/
|-- Readme.md
|-- gumla-gadi-frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   |-- config.js
|   |   `-- main.jsx
|   `-- package.json
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- index.js
|   |-- generate-jwt-secret.js
|   `-- package.json
|-- ai-service/
|   |-- main.py
|   |-- rag_chain.py
|   `-- requirements.txt
```

## Main Features

### 1. Bus Search

The home page fetches bus data from the backend and supports filtering with:

- `from`
- `to`

The frontend calls:

- `GET /api/buses`
- `GET /api/buses?from=Gumla&to=Ranchi`

### 2. Bus Details

Each bus card links to a dedicated detail page showing:

- route
- departure and arrival time
- fare
- contact number
- stand name
- bus type

### 3. Authentication

The backend supports:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `GET /api/auth/me`

User sessions are stored in `localStorage` on the frontend as `userInfo`.

### 4. Admin Dashboard

Users with role `admin` can:

- create buses
- update buses
- delete buses
- manage the current list of routes and schedules

Protected bus routes use JWT middleware plus an `adminOnly` guard.

### 5. HamsafarAI Assistant

The floating chat widget in the frontend talks to the Python AI service at:

- `POST /chat`

The assistant can:

- fetch bus data from the Express API
- search the web for general travel information
- answer in Hinglish
- include stand information when sharing bus details

## Data Models

### User

Stored in MongoDB with:

- `name`
- `email`
- `phone`
- `password`
- `role` with values `user` or `admin`

Passwords are hashed with bcrypt before save.

### Bus

Stored in MongoDB with:

- `id`
- `name`
- `source`
- `destination`
- `departureTime`
- `arrivalTime`
- `price`
- `type` with values `AC` or `Non-AC`
- `stand` with values `Gumla Depot` or `Dunduriya`
- `contact`

## API Reference

### Express API

Base URL: `http://localhost:5000`

#### Public routes

- `GET /` - health-style text response
- `GET /api/buses` - list all buses
- `GET /api/buses?from=value&to=value` - filter buses
- `POST /api/auth/signup` - register a new user
- `POST /api/auth/login` - authenticate a user
- `POST /api/auth/google` - authenticate or register a user with a Google ID token

#### Protected routes

- `GET /api/auth/me` - get current user
- `POST /api/buses` - create a bus, admin only
- `PUT /api/buses/:id` - update a bus, admin only
- `DELETE /api/buses/:id` - delete a bus, admin only

### AI Service API

Base URL: `http://localhost:8000`

- `GET /` - returns service status
- `POST /chat` - accepts `{ "query": "..." }` and returns `{ "response": "..." }`

## Environment Variables

Create environment files manually for the services that need them.

### `server/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_oauth_web_client_id.apps.googleusercontent.com
```

### `ai-service/.env`

```env
GOOGLE_API_KEY=your_google_gemini_api_key
BACKEND_URL=http://localhost:5000
```

### `gumla-gadi-frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_AI_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_web_client_id.apps.googleusercontent.com
```

## Local Setup

### Prerequisites

- Node.js and npm
- Python 3.10+
- MongoDB Atlas or local MongoDB
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd GUMLA-GADI
```

### 2. Install frontend dependencies

```bash
cd gumla-gadi-frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Install AI service dependencies

```bash
cd ../ai-service
pip install -r requirements.txt
```

## Running The Project

Start all three services in separate terminals.

### Frontend

```bash
cd gumla-gadi-frontend
npm run dev
```

Runs by default on `http://localhost:5173`.

### Backend

```bash
cd server
npm run dev
```

Runs by default on `http://localhost:5000`.

### AI service

```bash
cd ai-service
python main.py
```

Runs by default on `http://localhost:8000`.

## How The AI Flow Works

1. The user opens the `HamsafarAI` chat widget in the frontend.
2. The frontend sends the query to the FastAPI service.
3. The AI service uses Gemini with tool calling.
4. For bus schedule questions, it calls the Express API through `fetch_bus_data`.
5. For general travel questions, it uses DuckDuckGo search.
6. The final answer is returned to the frontend and rendered in the chat widget.

## Important Implementation Notes

- The frontend and backend are already wired together through `src/config.js` and environment variables.
- Bus filtering is currently source and destination based; there is no dedicated time filter endpoint yet.
- Admin access depends on the `role` field in the `User` document.
- The AI service keeps chat history in a global in-memory list, so conversation state is not isolated per user session.
- The frontend sends a bearer token to the AI service, but the current FastAPI service does not validate it.
- There are currently no automated tests configured in this repository.

## Suggested Improvements

- Add per-user chat memory instead of shared global memory
- Add validation for bus creation and update payloads
- Add automated tests for frontend, backend, and AI service
- Add pagination or search optimization for larger bus datasets
- Add seed scripts for demo data
- Add Docker support for running all services together
- Add API documentation with Swagger or OpenAPI for the Express service

## Status

This project is functional as a development-stage prototype and already includes the main commuter flow, admin bus management, and AI-assisted travel help.

## License

This project is licensed under the MIT License. See [LICENSE](/c:/GUMLA-GADI/LICENSE).
