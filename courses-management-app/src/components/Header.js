import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path to your logo file
import { useAuth } from '../context/AuthContext'; // Import AuthContext

const Header = () => {
  const { isAuthenticated, logout, userData } = useAuth(); // Get authentication state, logout function, and user data
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [initial, setInitial] = useState(''); // State for storing user's initial
  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    // If the user is authenticated and userData is available, set the initial letter of the user's name
    if (isAuthenticated && userData && userData.name) {
      const userInitial = userData.name.charAt(0).toUpperCase(); // Get the first letter and capitalize it
      setInitial(userInitial);
    }
  }, [isAuthenticated, userData]); // Run whenever authentication status or user data changes

  const handleLogout = () => {
    logout(); // Perform logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <header>
      <div className="nav-container">
        {/* Logo */}
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="App Logo" className="logo" />
        </NavLink>

        {/* Navigation Links */}
        <div className="links">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                Ingresar
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                Registrarse
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/courses/add" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                Agregar
              </NavLink>
              <NavLink to="/courses/search" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                Buscar
              </NavLink>

              {/* Circle with Dropdown */}
              <div className="profile-circle" onClick={() => setShowDropdown(!showDropdown)}>
                <span className="profile-initial">{initial}</span> {/* Display user's initial */}
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="dropdown-menu">
                    <NavLink to="/profile" className="dropdown-item">
                      Perfil
                    </NavLink>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Salir
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
