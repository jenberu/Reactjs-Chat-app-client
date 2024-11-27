import React, { useState } from 'react';
// import { useAuth } from '../../context/authContext';
import './login.scss'
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../../components/api';

const Login = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
          const response = await LoginApi(email, password);
            navigate('/')
          
        } catch (error) {
          // Handle error (e.g., invalid credentials)
          setError('Login failed. Please check your credentials.');
        }
 
  };

  return (
    <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleLogin} method='post'>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  </div>
  );
};

export default Login;
