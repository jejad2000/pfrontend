import React, { createContext, useState, useContext } from 'react';
import api from '../utils/api'; 

type AuthContextType = {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = async (username: string, password: string) => {
    const response = await api.post('/api/v1/user/login', { username, password });
    const { data } = response;

    if ( data.status === 1 ) {
      const token = data.data.token;
      setToken(token);
      localStorage.setItem('token', token);
    } 
  };

  const register = async (username: string, password: string) => {
    await api.post('/api/v1/user/register', { username, password });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export { AuthProvider, useAuth };