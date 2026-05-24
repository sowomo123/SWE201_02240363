// Authentication Context with useReducer
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User } from '../types';
import { authApi } from '../api/auth';

// Action types
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
} | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Rehydrate state on app start
  useEffect(() => {
    const rehydrateAuth = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user_data');
        if (userJson) {
          const user = JSON.parse(userJson);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        }
      } catch (error) {
        console.error('Error rehydrating auth state:', error);
      }
    };

    rehydrateAuth();
  }, []);

  // Persist user data on state change
  useEffect(() => {
    if (state.user) {
      AsyncStorage.setItem('user_data', JSON.stringify(state.user));
    } else {
      AsyncStorage.removeItem('user_data');
    }
  }, [state.user]);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const user = await authApi.login(email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message || 'Login failed' });
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const user = await authApi.register(username, email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message || 'Registration failed' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout even if API fails
      dispatch({ type: 'LOGOUT' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
