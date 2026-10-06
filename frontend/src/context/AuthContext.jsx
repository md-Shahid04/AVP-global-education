import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('edu_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('edu_admin_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const savedToken = localStorage.getItem('edu_admin_token');
      if (savedToken) {
        try {
          const res = await authAPI.getMe();
          if (res.data?.success) {
            setUser(res.data.data);
            localStorage.setItem('edu_admin_user', JSON.stringify(res.data.data));
          }
        } catch {
          // Token is invalid or expired
          localStorage.removeItem('edu_admin_token');
          localStorage.removeItem('edu_admin_user');
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    if (res.data?.success) {
      const { admin, token: newToken } = res.data.data;
      localStorage.setItem('edu_admin_token', newToken);
      localStorage.setItem('edu_admin_user', JSON.stringify(admin));
      setToken(newToken);
      setUser(admin);
      return admin;
    } else {
      throw new Error(res.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('edu_admin_token');
    localStorage.removeItem('edu_admin_user');
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
