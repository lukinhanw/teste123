import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { defaultGameSettings } from '../services/mockData';

function Settings() {
  const [playerName, setPlayerName] = useState(defaultGameSettings.playerName);
  const [avatar, setAvatar] = useState(defaultGameSettings.avatar);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    localforage.getItem('gameSettings').then((settings) => {
      if (settings) {
        setPlayerName(settings.playerName || defaultGameSettings.playerName);
        setAvatar(settings.avatar || defaultGameSettings.avatar);
      }
    });
  }, []);

  const saveSettings = () => {
    localforage.setItem('gameSettings', { playerName, avatar });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const avatars = ['👾', '🤖', '👽', '🎮', '🕹️'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 -m-4 p-4">
      <div className="max-w-sm mx-auto space-y-8">
        <h2 className="text-2xl text-white pixel-border text-center">SETTINGS</h2>
        
        <div className="bg-blue-800/80 rounded-lg p-6 border-4 border-blue-700">
          <div className="space-y-6">
            <div>
              <label className="block text-white pixel-border mb-2 text-sm">PLAYER NAME</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 rounded-lg border-4 border-blue-500 text-blue-900 placeholder-blue-400 focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              />
            </div>

            <div>
              <label className="block text-white pixel-border mb-2 text-sm">AVATAR</label>
              <div className="grid grid-cols-5 gap-2">
                {avatars.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAvatar(a)}
                    className={`text-3xl ${avatar === a ? 'bg-blue-600' : 'bg-blue-700'} p-2 rounded-lg border-4 ${avatar === a ? 'border-yellow-400' : 'border-blue-600'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={saveSettings}
              className="w-full bg-green-500 hover:bg-green-400 text-white py-3 rounded-lg pixel-button border-b-4 border-green-700"
            >
              SAVE
            </button>

            {showSaved && (
              <div className="text-center text-green-400 pixel-border text-sm mt-4">
                Settings saved!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;