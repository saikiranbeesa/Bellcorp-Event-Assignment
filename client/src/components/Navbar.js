import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🎯 Bellcorp Events
        </Link>

        {/* Navigation Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/events" className="nav-links">
              Browse Events
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links">
                  My Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-user">Hello, {user?.name}!</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-btn logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links nav-btn login-btn">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links nav-btn register-btn">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
