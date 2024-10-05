import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth();  // Access logout function from context

    const handleLogout = () => {
        logout();  // Call the logout function from context
        navigate('/login');  // Redirect to login page
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <Link to="/audiobooks" className="text-lg font-semibold">
                    Audiobook Voting
                </Link>
                <div>
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-red-500 rounded">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="ml-4">
                                Login
                            </Link>
                            <Link to="/register" className="ml-4">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;