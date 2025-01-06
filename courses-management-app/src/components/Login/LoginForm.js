import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Use login from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/'); // Redirect to home after login
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Todos tus cursos<br/> en un sólo lugar</h2>
      <h5 className="login-subtitle">¡El aprendizaje nunca<br/> termina!</h5>
      <br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo" // Add placeholder here
            required
            className="login-input" // Apply login-input class
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña" // Add placeholder here
            required
            className="login-input" // Apply login-input class
          />
        </div>
        <button type="submit" className="login-button">Ingresar</button>
      </form>
      <br />
      <p>¿No tienes cuenta?</p>
      <Link to="/signup" className="signup-link">Regístrate</Link> {/* Use Link here */}
    </div>
  );
};

export default LoginForm;
