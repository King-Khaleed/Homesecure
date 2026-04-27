'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<boolean>;
  signup: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    storage.init();
    const currentUser = storage.getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    const handleStorageChange = () => {
      const updatedUser = storage.getCurrentUser();
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    const users = storage.getUsers();
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      storage.setCurrentUser(foundUser);
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    const users = storage.getUsers();
    const newUser: User = {
      id: `user_${Date.now()}`,
      role: userData.role || ('' as any),
      email: userData.email || '',
      phone: userData.phone || '',
      name: userData.name || '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
      kycStatus: 'pending',
      verified: false,
      createdAt: new Date().toISOString(),
      creditScore: 0,
      savedProperties: [],
      ...userData,
    };
    
    users.push(newUser);
    localStorage.setItem('homesure_users', JSON.stringify(users));
    storage.setCurrentUser(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    storage.setCurrentUser(null);
    setUser(null);
    router.push('/');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    storage.updateUser(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
