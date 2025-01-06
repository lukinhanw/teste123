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
    <div>
      <h2 className="text-2xl mb-4 text-center">Loss History</h2>
      <div className="space-y-4">
        {lossHistory.map((loss, index) => (
          <div key={index} className="bg-blue-800 p-4 rounded-lg flex items-center">
            <span className="text-2xl mr-4">😢</span>
            <div>
              <div>{format(new Date(loss.date), 'MMM d, yyyy HH:mm')}</div>
              <div className="text-sm text-gray-400">Streak: {loss.streak} days</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
