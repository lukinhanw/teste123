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
    <div className="h-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex flex-col">
      <div className="pt-6 pb-4 px-4 text-center">
        <h1 className="text-3xl text-yellow-400 pixel-border mb-1">HISTORY</h1>
        <div className="text-sm text-blue-200 pixel-border">Your past defeats</div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="max-w-sm mx-auto space-y-4 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-4 text-4xl opacity-20 float">📜</div>
            <div className="absolute bottom-20 left-6 text-4xl opacity-20 float">⏳</div>
          </div>

          {lossHistory.length === 0 ? (
            <div className="bg-blue-950/50 rounded-xl p-8 border-4 border-blue-800 shadow-lg text-center">
              <div className="text-4xl mb-4">🏆</div>
              <div className="text-blue-200 pixel-border">No losses recorded yet!</div>
            </div>
          ) : (
            lossHistory.map((loss, index) => (
              <div 
                key={index} 
                className="bg-blue-950/50 rounded-xl p-4 border-4 border-blue-800 shadow-lg transform transition-all hover:scale-102"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl float">💔</div>
                  <div className="flex-1">
                    <div className="text-yellow-400 pixel-border text-xs">
                      {format(new Date(loss.date), 'MMM d, yyyy HH:mm')}
                    </div>
                    <div className="text-blue-200 pixel-border text-lg mt-2">
                      Streak: <span className="text-yellow-400">{loss.streak}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pb-20 pt-4 px-4 text-center">
        <div className="text-xs text-blue-300/60 pixel-border">
          Each card represents a moment of weakness
        </div>
      </div>
    </div>
  );
}

export default History;