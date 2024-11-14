import React, { useState } from 'react';
// import { useAuth } from '../../context/authContext';
import './login.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post('http://localhost:8000/accounts/login/', {
            email,
            password
          });
    
          // Save the tokens in local storage
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          
          // You can add additional actions here, e.g., redirecting the user
            alert("Login successful!");
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
