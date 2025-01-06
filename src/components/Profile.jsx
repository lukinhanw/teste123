import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="h-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-yellow-400 pixel-border text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex flex-col">
      <div className="pt-6 pb-4 px-4 text-center">
        <h1 className="text-3xl text-yellow-400 pixel-border mb-1">PROFILE</h1>
        <div className="text-sm text-blue-200 pixel-border">Your gaming identity</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-4 text-4xl opacity-20 float">👤</div>
          <div className="absolute bottom-20 right-6 text-4xl opacity-20 float">🎮</div>
        </div>

        <div className="w-full max-w-sm space-y-6">
          <div className="bg-blue-950/50 rounded-xl p-6 border-4 border-blue-800 shadow-lg">
            <div className="text-6xl text-center mb-8 float">👾</div>
            
            <div className="space-y-6">
              <div className="bg-blue-900/50 rounded-lg p-4 border-4 border-blue-700">
                <div className="text-sm text-blue-200 pixel-border mb-2">USERNAME</div>
                <div className="text-xl text-yellow-400 pixel-border">{user.username}</div>
              </div>
              
              <div className="bg-blue-900/50 rounded-lg p-4 border-4 border-blue-700">
                <div className="text-sm text-blue-200 pixel-border mb-2">EMAIL</div>
                <div className="text-base sm:text-xl text-yellow-400 pixel-border truncate hover:text-clip hover:whitespace-normal cursor-pointer transition-all" title={user.email}>
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20 pt-4 px-4 text-center">
        <div className="text-xs text-blue-300/60 pixel-border">
          Level up your game presence
        </div>
      </div>
    </div>
  );
}

export default Profile;