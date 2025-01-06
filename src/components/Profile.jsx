import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 -m-4 p-4 flex items-center justify-center">
        <div className="text-white pixel-border">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 -m-4 p-4">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl text-white pixel-border text-center mb-6">PROFILE</h2>
        
        <div className="bg-blue-800/80 rounded-lg p-6 border-4 border-blue-700 space-y-4">
          <div className="text-6xl text-center mb-6">👾</div>
          
          <div>
            <div className="text-sm text-yellow-400 pixel-border">USERNAME</div>
            <div className="text-white text-lg mt-1">{user.username}</div>
          </div>
          
          <div>
            <div className="text-sm text-yellow-400 pixel-border">EMAIL</div>
            <div className="text-white text-lg mt-1">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;