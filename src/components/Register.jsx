import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex flex-col">
      <div className="pt-6 pb-4 px-4 text-center">
        <h1 className="text-3xl text-yellow-400 pixel-border mb-1">NEW PLAYER</h1>
        <div className="text-sm text-blue-200 pixel-border">Create your game account</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Elementos decorativos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-4 text-4xl opacity-20 float">🎮</div>
          <div className="absolute bottom-20 right-6 text-4xl opacity-20 float">🕹️</div>
          <div className="absolute top-1/2 left-6 text-4xl opacity-20 float">👾</div>
        </div>

        <div className="w-full max-w-sm space-y-6">
          <div className="bg-blue-950/50 rounded-xl p-6 border-4 border-blue-800 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-blue-200 pixel-border mb-3 text-sm">USERNAME</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-900/50 rounded-lg border-4 border-blue-700 text-yellow-400 placeholder-blue-400 focus:outline-none focus:border-yellow-400 transition-colors pixel-border"
                  placeholder="Choose a username"
                  required
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                />
              </div>

              <div>
                <label className="block text-blue-200 pixel-border mb-3 text-sm">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-900/50 rounded-lg border-4 border-blue-700 text-yellow-400 placeholder-blue-400 focus:outline-none focus:border-yellow-400 transition-colors pixel-border"
                  placeholder="Enter your email"
                  required
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                />
              </div>

              <div>
                <label className="block text-blue-200 pixel-border mb-3 text-sm">PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-900/50 rounded-lg border-4 border-blue-700 text-yellow-400 placeholder-blue-400 focus:outline-none focus:border-yellow-400 transition-colors pixel-border"
                  placeholder="Create password"
                  required
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                />
              </div>

              <div>
                <label className="block text-blue-200 pixel-border mb-3 text-sm">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-900/50 rounded-lg border-4 border-blue-700 text-yellow-400 placeholder-blue-400 focus:outline-none focus:border-yellow-400 transition-colors pixel-border"
                  placeholder="Confirm password"
                  required
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                />
              </div>

              {error && (
                <div className="bg-red-500/20 text-red-400 pixel-border text-sm px-4 py-3 rounded-lg border-2 border-red-500/30">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl pixel-button border-8 border-green-700 active:border-4 shadow-[0_0_20px_rgba(22,163,74,0.5)] transform hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>
            </form>
          </div>

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-blue-200 hover:text-yellow-400 pixel-border text-sm transition-colors"
            >
              Already a player? Login here →
            </Link>
          </div>
        </div>
      </div>

      <div className="pb-8 pt-4 px-4 text-center">
        <div className="text-xs text-blue-300/60 pixel-border">
          Join the game and start your journey
        </div>
      </div>
    </div>
  );
}

export default Register;
