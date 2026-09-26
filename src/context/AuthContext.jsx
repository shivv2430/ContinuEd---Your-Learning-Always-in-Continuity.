import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());

  const login = async (email, password, role) => {
    const res = await authService.login(email, password, role);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const signup = async (name, email, password, role) => {
    const res = await authService.signup(name, email, password, role);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    authService.logout();
    // Reset to student default demo user
    setUser(authService.getCurrentUser());
  };

  const switchRole = (newRole) => {
    const updated = authService.switchRole(newRole);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role || 'student', login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
