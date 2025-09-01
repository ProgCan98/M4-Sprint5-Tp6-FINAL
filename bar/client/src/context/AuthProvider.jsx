// Proveedor del contexto de autenticación
// Gestiona el estado del usuario, token y perfil activo
// Persiste datos en LocalStorage

import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
  // Estados para usuario, token y perfil activo
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [activeProfile, setActiveProfile] = useState(() => {
    const savedProfile = localStorage.getItem('activeProfile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  // Persiste usuario, token y perfil en LocalStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token || '');
    localStorage.setItem('activeProfile', JSON.stringify(activeProfile));
  }, [user, token, activeProfile]);

  // Inicia sesión
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    console.log('Usuario autenticado:', userData); // Depuración
  };

  // Cierra sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    setActiveProfile(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('activeProfile');
  };

  // Selecciona perfil activo
  const setProfile = (profile) => {
    setActiveProfile(profile);
    console.log('Perfil seleccionado:', profile); // Depuración
  };

  // Valor del contexto
  const value = { user, token, activeProfile, login, logout, setProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
