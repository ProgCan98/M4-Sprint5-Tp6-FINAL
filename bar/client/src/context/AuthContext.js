// Contexto para autenticación (JWT)

// Contexto para manejar autenticación en el frontend
// Almacena el token JWT y datos del usuario

import { createContext } from 'react';

const AuthContext = createContext({
  user: null, // Datos del usuario autenticado
  token: null, // Token JWT
  login: () => {}, // Inicia sesión
  logout: () => {}, // Cierra sesión
  setProfile: () => {}, // Selecciona perfil activo
});

export default AuthContext;
