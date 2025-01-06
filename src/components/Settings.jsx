import { useState, useEffect } from 'react';
import localforage from 'localforage';

function Settings() {
  const [playerName, setPlayerName] = useState('');
  const [avatar, setAvatar] = useState('👾');

  useEffect(() => {
    localforage.getItem('gameSettings').then((settings) => {
      if (settings) {
        setPlayerName(settings.playerName || '');
        setAvatar(settings.avatar || '👾');
      }
    });
  }, []);

  const saveSettings = () => {
    localforage.setItem('gameSettings', { playerName, avatar });
    alert('Settings saved!');
  };

  const avatars = ['👾', '🤖', '👽', '🎮', '🕹️'];

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Settings</h2>
      <div className="mb-4">
        <label className="block mb-2">Player Name:</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="bg-blue-800 px-3 py-2 rounded text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Choose Avatar:</label>
        <div className="flex justify-center space-x-2">
          {avatars.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={`text-3xl ${avatar === a ? 'bg-blue-600' : 'bg-blue-800'} p-2 rounded`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={saveSettings}
        className="pixel-button bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Save Settings
      </button>
    </div>
  );
}

export default Settings;
