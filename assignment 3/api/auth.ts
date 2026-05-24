// Authentication API (Dummy implementation)
import { setAuthToken, removeAuthToken } from './config';
import { User } from '../types';

// Dummy users for authentication
const DUMMY_USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@inventory.com',
    password: 'admin123',
    token: 'dummy-jwt-token-admin',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@inventory.com',
    password: 'user123',
    token: 'dummy-jwt-token-user',
  },
];

export const authApi = {
  // Login
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = DUMMY_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Store token
    await setAuthToken(user.token);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },

  // Register
  register: async (username: string, email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = DUMMY_USERS.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: String(DUMMY_USERS.length + 1),
      username,
      email,
      password,
      token: `dummy-jwt-token-${username}`,
    };

    DUMMY_USERS.push(newUser);

    // Store token
    await setAuthToken(newUser.token);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },

  // Logout
  logout: async (): Promise<void> => {
    await removeAuthToken();
  },

  // Get current user (check if token is valid)
  getCurrentUser: async (): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // In a real app, this would validate the token with the backend
    // For dummy implementation, we'll just return null
    return null;
  },
};
