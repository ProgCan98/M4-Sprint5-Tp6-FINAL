import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
  const { user, selectedProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/catalog"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <HomeIcon className="h-6 w-6" /> Cocktail Bar
        </Link>
        {selectedProfile && (
          <div className="flex items-center gap-4">
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:underline"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6" /> Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
