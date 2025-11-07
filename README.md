# Notes App

A simple Notes application built with a React frontend and a Node.js/Express backend. This app allows users to create, edit, and delete notes.

## Features
- Create, edit, and delete notes
- Responsive design
- Backend hosted on Render
- Frontend deployable on Vercel

## Project Structure
```
notes-app/
├── backend/       # Node.js/Express backend
│   ├── models/    # Mongoose models
│   ├── routes/    # API routes
│   ├── server.js  # Entry point for the backend
│   └── package.json
├── frontend/      # React frontend
│   ├── public/    # Static files
│   ├── src/       # React components and logic
│   ├── .env       # Environment variables
│   └── package.json
```

## Prerequisites
- Node.js installed
- MongoDB database (local or hosted)

## Setup Instructions

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder with the following variable for local development:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api/notes
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```

### Deployment
#### Backend
- Deploy the backend to a platform like Render, Heroku, or AWS.
- Ensure the backend URL is accessible (e.g., `https://notes-app-1dz8.onrender.com`).

#### Frontend
- Build the frontend for production:
  ```bash
  npm run build
  ```
- Deploy the `build/` folder to a platform like Vercel or Netlify.
- Set the `REACT_APP_API_BASE_URL` environment variable in the hosting platform to the deployed backend URL.

## Technologies Used
- **Frontend**: React, Axios
- **Backend**: Node.js, Express, MongoDB

## License
This project is licensed under the MIT License.