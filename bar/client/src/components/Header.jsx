import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { ThemeContext } from '../contexts/ThemeContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
  const { user, selectedProfile, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 dark:bg-blue-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <HomeIcon className="h-6 w-6" /> Cocktail Bar
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 hover:underline"
            aria-label={
              theme === 'light'
                ? 'Cambiar a modo oscuro'
                : 'Cambiar a modo claro'
            }
          >
            {theme === 'light' ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <SunIcon className="h-6 w-6" />
            )}
            {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
          </button>
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="hover:underline">
                Registrarse
              </Link>
            </>
          ) : (
            <>
              {selectedProfile && (
                <>
                  <Link to="/catalog" className="hover:underline">
                    Catálogo
                  </Link>
                  <Link to="/watchlist" className="hover:underline">
                    Watchlist
                  </Link>
                  {user?.role === 'owner' && (
                    <Link to="/admin-profiles" className="hover:underline">
                      Administrar Perfiles
                    </Link>
                  )}
                </>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:underline"
                aria-label="Cerrar sesión"
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" /> Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
