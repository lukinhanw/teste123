// Mock Users Data
export const mockUsers = [
  {
    id: 1,
    username: 'player1',
    email: 'player1@example.com',
    password: 'password123'
  },
  {
    id: 2,
    username: 'gamer2',
    email: 'gamer2@example.com',
    password: 'password123'
  },
  {
    id: 3,
    username: 'theGameMaster',
    email: 'master@example.com',
    password: 'password123'
  }
];

// Mock Game Settings
export const defaultGameSettings = {
  playerName: 'Anonymous Player',
  avatar: '👾',
};

// Mock Game Data
export const defaultGameData = {
  currentStreak: 0,
  totalLosses: 0,
  lossHistory: [
    {
      date: '2024-02-15T10:30:00Z',
      streak: 5
    },
    {
      date: '2024-02-10T15:45:00Z',
      streak: 3
    },
    {
      date: '2024-02-05T08:20:00Z',
      streak: 7
    }
  ]
};

// Helper function to simulate API delay
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));