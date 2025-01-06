import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(usernameOrEmail, password);
      await authLogin(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl text-yellow-400 pixel-border mb-2">THE GAME</h1>
          <div className="text-lg text-white pixel-border">Press Start!</div>
        </div>

        {error && (
          <div className="mb-4 text-red-500 bg-red-100 p-3 rounded-lg text-center pixel-border text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/90 rounded-lg border-4 border-blue-500 text-blue-900 placeholder-blue-400 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="Username or Email"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/90 rounded-lg border-4 border-blue-500 text-blue-900 placeholder-blue-400 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="Password"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-white py-3 rounded-lg pixel-button border-b-4 border-green-700 active:border-b-0 active:mt-1"
          >
            START GAME
          </button>

          <Link
            to="/register"
            className="block w-full bg-yellow-500 hover:bg-yellow-400 text-white py-3 rounded-lg text-center pixel-button border-b-4 border-yellow-700 active:border-b-0 active:mt-1"
          >
            NEW PLAYER
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;