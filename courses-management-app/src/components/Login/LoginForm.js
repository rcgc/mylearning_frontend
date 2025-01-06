import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Use login from AuthContext
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // State to store the error message
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out effect

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Redirect to home after login
    } catch (error) {
      setErrorMessage(error.message); // Set the error message
      setFadeOut(false); // Reset fade-out state when a new error message is shown

      setTimeout(() => {
        setFadeOut(true); // Trigger the fade-out effect after 2.5 seconds
      }, 2500);

      setTimeout(() => {
        setErrorMessage(''); // Clear the error message after 5 seconds
      }, 5000);
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Todos tus cursos<br/> en un sólo lugar</h2>
      <h5 className="login-subtitle">¡El aprendizaje nunca<br/> termina!</h5>
      <br/>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className={`errorMsg ${fadeOut ? 'fade-out' : ''}`}>
            {errorMessage}
          </div>
        )}
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            required
            className="login-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">Ingresar</button>
      </form>
      <br />
      <p>¿No tienes cuenta?</p>
      <Link to="/signup" className="signup-link">Regístrate</Link>
    </div>
  );
};

export default LoginForm;
