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
    <div className="h-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex flex-col">
      <div className="pt-6 pb-4 px-4 text-center">
        <h1 className="text-3xl text-yellow-400 pixel-border mb-1">SETTINGS</h1>
        <div className="text-sm text-blue-200 pixel-border">Customize your game</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-4 text-4xl opacity-20 float">⚙️</div>
          <div className="absolute bottom-20 right-6 text-4xl opacity-20 float">🎮</div>
        </div>

        <div className="w-full max-w-sm space-y-6">
          <div className="bg-blue-950/50 rounded-xl p-6 border-4 border-blue-800 shadow-lg space-y-6">
            <div>
              <label className="block text-blue-200 pixel-border mb-3 text-sm">PLAYER NAME</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 bg-blue-900/50 rounded-lg border-4 border-blue-700 text-yellow-400 placeholder-blue-400 focus:outline-none focus:border-yellow-400 transition-colors pixel-border"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              />
            </div>

            <div>
              <label className="block text-blue-200 pixel-border mb-3 text-sm">SELECT AVATAR</label>
              <div className="grid grid-cols-5 gap-3">
                {avatars.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAvatar(a)}
                    className={`
                      aspect-square text-3xl rounded-lg border-4 transition-all
                      ${avatar === a 
                        ? 'bg-blue-700 border-yellow-400 scale-110 shadow-lg' 
                        : 'bg-blue-900/50 border-blue-700 hover:border-blue-500'
                      }
                    `}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={saveSettings}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl pixel-button border-8 border-green-800 active:border-4 shadow-[0_0_20px_rgba(22,163,74,0.5)] transform hover:scale-105 transition-transform"
            >
              SAVE SETTINGS
            </button>
          </div>

          {showSaved && (
            <div className="text-center">
              <div className="inline-block bg-green-600/20 text-green-400 pixel-border text-sm px-4 py-2 rounded-lg border-2 border-green-500/30">
                Settings saved successfully! 🎮
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pb-20 pt-4 px-4 text-center">
        <div className="text-xs text-blue-300/60 pixel-border">
          Customize your gaming experience
        </div>
      </div>
    </div>
  );
}

export default Settings;