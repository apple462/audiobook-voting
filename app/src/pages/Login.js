import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem('token', response.data.access_token);
      if (response.data.access_token) {
        login(response.data.access_token);  // Call the login function from context
        navigate('/audiobooks');  // Redirect after successful login
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100" style={{
      height: "calc(100vh - 60px)"
    }}>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-center">Login</h2>
        <div className="mt-4">
          <input
            className="w-full p-2 mb-4 border rounded-md"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-2 mb-4 border rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full p-2 text-white bg-blue-500 rounded-md">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;