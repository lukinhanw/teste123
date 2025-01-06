import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white flex flex-col">
      <header className="bg-blue-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl text-yellow-400">The Game</h1>
          {user && (
            <div className="flex items-center">
              <span className="mr-4 hidden md:inline">Welcome, {user.username}!</span>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
                Logout
              </button>
            </div>
          )}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </header>
      
      {user && (
        <nav className={`bg-blue-700 md:block ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto py-2">
            <ul className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
              <li><Link to="/" className="pixel-button text-green-400 hover:text-green-300" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/history" className="pixel-button text-red-400 hover:text-red-300" onClick={() => setIsMenuOpen(false)}>History</Link></li>
              <li><Link to="/settings" className="pixel-button text-purple-400 hover:text-purple-300" onClick={() => setIsMenuOpen(false)}>Settings</Link></li>
              <li><Link to="/profile" className="pixel-button text-yellow-400 hover:text-yellow-300" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
            </ul>
          </div>
        </nav>
      )}

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-blue-800 p-4 text-center">
        <p>&copy; 2024 The Game. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
