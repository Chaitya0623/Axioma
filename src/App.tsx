"use client";

import './App.css';
import { useState } from 'react';
import Dashboard from './pages/Dashboard'; // Import the main dashboard component
import Login from './pages/Login'; // Import the login page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard /> // Render the dashboard if authenticated
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} /> // Render login if not authenticated
      )}
    </div>
  );
}

export default App;
