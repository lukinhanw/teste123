// Mock authentication service
const mockUsers = [];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const register = async (username, email, password) => {
  await delay(500); // Simulate API call
  const existingUser = mockUsers.find(u => u.username === username || u.email === email);
  if (existingUser) {
    throw new Error('Username or email already exists');
  }
  const newUser = { id: mockUsers.length + 1, username, email, password };
  mockUsers.push(newUser);
  return { id: newUser.id, username: newUser.username, email: newUser.email };
};

export const login = async (usernameOrEmail, password) => {
  await delay(500); // Simulate API call
  const user = mockUsers.find(u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return { id: user.id, username: user.username, email: user.email };
};
