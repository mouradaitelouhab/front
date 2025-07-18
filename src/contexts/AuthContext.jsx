// Contexte d'authentification pour Gems Revived
// Gère l'état global de l'utilisateur connecté

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const userData = await authService.verifyToken();
          setUser(userData);
        } catch (error) {
          console.error('Token invalide:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { user: userData, token: userToken } = response.data;
      
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('token', userToken);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur de connexion' 
      };
    }
  };

  // Fonction d'inscription
  const register = async (username, email, password) => {
    try {
      const response = await authService.register({ username, email, password });
      // For registration, we don't auto-login, user needs to login
      return { success: true, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur d\'inscription' 
      };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    hasRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

