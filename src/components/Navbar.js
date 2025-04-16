import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">JobHub</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={showMenu ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        
        <ul className={showMenu ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setShowMenu(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link" onClick={() => setShowMenu(false)}>
              Jobs
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link" onClick={() => setShowMenu(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button 
                className="nav-link btn-login" 
                onClick={() => {
                  setIsLoggedIn(true);
                  setShowMenu(false);
                }}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 