import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarContext';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { openSnackbar } = useSnackbar();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(userName, password);
      navigate('/notes'); // Redirect to notes page
    } catch (error) {
        openSnackbar('Login failed. Please check your credentials.', 'error')
    }
  };

  const handleRegister = async () => {
    navigate('/register'); // Redirect to register page
  };


  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div onSubmit={handleLogin}>
        <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
        />
        <div
            className='grid gap-4 grid-cols-2'
        >
            <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Login
            </button>
            <button
                onClick={handleRegister}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Register
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;