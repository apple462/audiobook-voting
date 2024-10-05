import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Audiobooks from './pages/Audiobooks';
import Navbar from './components/Navbar';
import { useAuth } from './AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
                {/* Public Routes */}
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/audiobooks" />} />
                <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/audiobooks" />} />

                {/* Protected Route */}
                <Route path="/audiobooks" element={isAuthenticated ? <Audiobooks /> : <Navigate to="/login" />} />

                {/* Default redirect */}
                <Route path="/" element={<Navigate to={isAuthenticated ? "/audiobooks" : "/login"} />} />
            </Routes>
    </Router>
  );
}

export default App;