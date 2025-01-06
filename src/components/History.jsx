import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import localforage from 'localforage';

function History() {
  const [lossHistory, setLossHistory] = useState([]);

  useEffect(() => {
    localforage.getItem('gameData').then((data) => {
      if (data && data.lossHistory) {
        setLossHistory(data.lossHistory.reverse());
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 -m-4 p-4">
      <h2 className="text-2xl text-white pixel-border text-center mb-6">LOSS HISTORY</h2>
      <div className="space-y-4 max-w-sm mx-auto">
        {lossHistory.map((loss, index) => (
          <div 
            key={index} 
            className="bg-blue-800/80 p-4 rounded-lg border-4 border-blue-700 flex items-center gap-4"
          >
            <div className="text-3xl float">😢</div>
            <div>
              <div className="text-yellow-400 pixel-border text-sm">
                {format(new Date(loss.date), 'MMM d, yyyy HH:mm')}
              </div>
              <div className="text-white pixel-border text-lg mt-1">
                Streak: {loss.streak}
              </div>
            </div>
          </div>
        ))}
        
        {lossHistory.length === 0 && (
          <div className="text-center text-white pixel-border">
            No losses recorded yet!
          </div>
        )}
      </div>
    </div>
  );
}

export default History;