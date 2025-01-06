import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import localforage from 'localforage';

function Home() {
  const [streak, setStreak] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);

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
        currentStreak: 0,
        totalLosses: 1,
        lossHistory: [newLoss]
      };
      localforage.setItem('gameData', updatedData);
    });
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Days Without Loss</h2>
      <div className="text-6xl mb-8 text-yellow-400 blink">{streak}</div>
      <animated.button
        style={buttonAnimation}
        onClick={handleLoss}
        className="pixel-button bg-red-600 text-white px-6 py-3 rounded-lg text-xl mb-8"
      >
        I Lost The Game
      </animated.button>
      <div className="text-lg">Total Losses: {totalLosses}</div>
    </div>
  );
}

export default Home;
