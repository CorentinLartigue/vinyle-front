
// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authServices';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, verifyPassword: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>;
  resendVerifyEmail: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  modifyPassword: (token: string, newPassword: string, verifyPassword: string) => Promise<{ success: boolean; message: string }>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserData = async () => {
    const token = authService.getToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const profileResponse = await authService.getProfile();
      
      if (profileResponse.success && profileResponse.data) {
        setUser(profileResponse.data);
      } else {
        authService.removeToken();
        setUser(null);
      }
    } catch (error) {
      authService.removeToken();
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await refreshUserData();
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.token) {
        authService.setToken(response.token);
        await refreshUserData();
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erreur de connexion' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, verifyPassword: string) => {
    setIsLoading(true);
    try {
      const response = await authService.register({ email, password, verifyPassword });
      return { success: response.success, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erreur d\'inscription' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.removeToken();
    setUser(null);
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await authService.verifyEmail({ verifyEmailToken: token });
      
      if (response.success) {
        await refreshUserData();
      }
      
      return { success: response.success, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erreur de vérification' 
      };
    }
  };

  const resendVerifyEmail = async (email: string) => {
    try {
      const response = await authService.resendVerifyEmail({ email });
      return { success: response.success, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erreur d\'envoi' 
      };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await authService.resetPassword({ email });
      return { success: response.success, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erreur de réinitialisation' 
      };
    }
  };

  const modifyPassword = async (token: string, newPassword: string, verifyPassword: string) => {
    try {
      const response = await authService.modifyPassword({ 
        resetPasswordToken: token, 
        newPassword, 
        verifyPassword 
      });
      return { success: response.success, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erreur de modification' 
      };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    verifyEmail,
    resendVerifyEmail,
    resetPassword,
    modifyPassword,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
