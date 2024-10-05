import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ username, password });
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            setError(error?.response?.data?.msg ?? 'Error registering user');
        }
    };

    return (
      <div className="flex items-center justify-center bg-gray-100" style={{
        height: "calc(100vh - 60px)"
      }}>
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
                <h2 className="text-xl font-semibold text-center">Register</h2>
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
                    <button className="w-full p-2 text-white bg-blue-500 rounded-md">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;