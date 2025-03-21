# Event Management System

A simple full-stack application for managing events, built with React, Express, and MongoDB.

## Features

- Create, read, update, and delete events
- View event details
- List all events
- Simple and intuitive UI

## Tech Stack

- **Frontend**: React.js, React Router, CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB

## Project Structure

The project is organized into two main directories:

- **`/frontend`**: Contains the React.js application
- **`/backend`**: Contains the Express.js API server

## Getting Started

### Prerequisites

- Node.js
- MongoDB (running locally)

### Installation

1. Clone the repository

2. Backend setup:
   ```
   cd backend
   npm install
   ```

3. Frontend setup:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173` (or whichever port Vite is using)

## API Endpoints

- `GET /api/events`: Get all events
- `GET /api/events/:id`: Get a specific event by ID
- `POST /api/events`: Create a new event
- `PUT /api/events/:id`: Update an event
- `DELETE /api/events/:id`: Delete an event 