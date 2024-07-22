import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import logDetails from '../utils/logUtil';

const LoginPage = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ userName: '', userPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(credentials);
      localStorage.setItem("token", response.token);
      setIsAuthenticated(true);
      logDetails('Login successful', response);
      navigate('/admin/tickets');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      logDetails('Login failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Username</label>
        <input type="text" name="userName" value={credentials.userName} onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="userPassword" value={credentials.userPassword} onChange={handleChange} required />
      </div>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;
