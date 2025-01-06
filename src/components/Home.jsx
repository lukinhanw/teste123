import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import localforage from 'localforage';
import { defaultGameData } from '../services/mockData';

function Home() {
  const [streak, setStreak] = useState(defaultGameData.currentStreak);
  const [totalLosses, setTotalLosses] = useState(defaultGameData.totalLosses);

  useEffect(() => {
    localforage.getItem('gameData').then((data) => {
      if (data) {
        setStreak(data.currentStreak);
        setTotalLosses(data.totalLosses);
      }
    });
  }, []);

  const buttonAnimation = useSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      await next({ transform: 'scale(0.9)' });
      await next({ transform: 'scale(1.1)' });
      await next({ transform: 'scale(1)' });
    },
  });

  const handleLoss = () => {
    const newTotalLosses = totalLosses + 1;
    setTotalLosses(newTotalLosses);
    setStreak(0);
    
    const newLoss = {
      date: new Date().toISOString(),
      streak: streak
    };

    localforage.getItem('gameData').then((data) => {
      const updatedData = data ? {
        ...data,
        currentStreak: 0,
        totalLosses: newTotalLosses,
        lossHistory: [...(data.lossHistory || []), newLoss]
      } : {
        ...defaultGameData,
        totalLosses: 1,
        lossHistory: [newLoss]
      };
      localforage.setItem('gameData', updatedData);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 -m-4 p-4 flex flex-col items-center justify-center">
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-xl text-white pixel-border mb-2">CURRENT STREAK</h2>
          <div className="text-6xl text-yellow-400 pixel-border float">{streak}</div>
        </div>

        <animated.button
          style={buttonAnimation}
          onClick={handleLoss}
          className="w-48 h-48 bg-red-500 hover:bg-red-400 text-white rounded-full pixel-button border-8 border-red-700 active:border-4 flex items-center justify-center text-xl p-4 text-center leading-tight"
        >
          I LOST THE GAME
        </animated.button>

        <div className="bg-blue-800/80 rounded-lg p-4 mt-8">
          <div className="text-lg text-white pixel-border">
            Total Losses: {totalLosses}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;