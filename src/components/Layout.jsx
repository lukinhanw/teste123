import { Outlet, useNavigate } from 'react-router-dom';
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
    <div className="h-[100dvh] bg-blue-900 text-white flex flex-col overflow-hidden">
      {/* Menu flutuante que aparece do fundo quando ativado */}
      {user && (
        <div 
          className={`
            fixed inset-0 bg-black/90 backdrop-blur-sm z-50 transition-opacity duration-300
            ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className={`
              fixed bottom-0 left-0 right-0 bg-blue-800/95 rounded-t-3xl p-6 transform transition-transform duration-300 max-h-[85dvh] overflow-y-auto border-t-4 border-x-4 border-blue-700
              ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}
            `}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl text-yellow-400 pixel-border">{user.username}</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl text-yellow-400"
              >
                ×
              </button>
            </div>
            <nav className="space-y-4">
              <button 
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className="w-full text-center py-3 bg-blue-700 rounded-xl hover:bg-blue-600 transition-colors pixel-button"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  navigate('/history');
                  setIsMenuOpen(false);
                }}
                className="w-full text-center py-3 bg-blue-700 rounded-xl hover:bg-blue-600 transition-colors pixel-button"
              >
                History
              </button>
              <button 
                onClick={() => {
                  navigate('/settings');
                  setIsMenuOpen(false);
                }}
                className="w-full text-center py-3 bg-blue-700 rounded-xl hover:bg-blue-600 transition-colors pixel-button"
              >
                Settings
              </button>
              <button 
                onClick={() => {
                  navigate('/profile');
                  setIsMenuOpen(false);
                }}
                className="w-full text-center py-3 bg-blue-700 rounded-xl hover:bg-blue-600 transition-colors pixel-button"
              >
                Profile
              </button>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-center py-3 bg-red-600 rounded-xl hover:bg-red-500 transition-colors pixel-button"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Botão flutuante de menu */}
      {user && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center text-2xl shadow-lg hover:bg-yellow-300 transition-colors z-40 pixel-button border-4 border-yellow-600"
        >
          ☰
        </button>
      )}

      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;