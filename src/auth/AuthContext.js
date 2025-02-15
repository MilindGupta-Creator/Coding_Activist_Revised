"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/firebase/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Auth object:", auth); // Debug log
    
    if (!auth) {
      console.error("Auth is not initialized");
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user); // Debug log
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};