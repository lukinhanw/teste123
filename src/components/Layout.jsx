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
      <header className="bg-blue-800 px-4 py-3 fixed top-0 w-full z-50 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-yellow-400 pixel-border">The Game</h1>
          {user && (
            <button 
              className="text-2xl text-yellow-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '×' : '☰'}
            </button>
          )}
        </div>
      </header>
      
      {user && (
        <nav className={`
          fixed top-[56px] left-0 w-full bg-blue-800 transform transition-transform duration-300 z-40
          ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}>
          <div className="p-4">
            <div className="mb-4 text-center">
              <span className="text-yellow-400">{user.username}</span>
            </div>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block text-center py-2 px-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/history" 
                  className="block text-center py-2 px-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
              </li>
              <li>
                <Link 
                  to="/settings" 
                  className="block text-center py-2 px-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="block text-center py-2 px-4 bg-blue-700 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-center py-2 px-4 bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}

      <main className="flex-grow pt-[72px] px-4 pb-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;