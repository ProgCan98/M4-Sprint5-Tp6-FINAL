import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  getProfileById,
  removeFromWatchlist,
} from '../services/profileService';
import CocktailCard from '../components/CocktailCard';
import { toast } from 'react-toastify';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedProfile } = useContext(AuthContext);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (selectedProfile) {
        setLoading(true);
        try {
          const profile = await getProfileById(selectedProfile._id);
          setWatchlist(profile.watchlist || []);
        } catch (err) {
          setError('Error al cargar watchlist');
          toast.error('Error al cargar watchlist');
          console.error('Error fetching watchlist:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWatchlist();
  }, [selectedProfile]);

  const handleRemove = async (cocktailId) => {
    const confirmed = window.confirm(
      '¿Estás seguro de eliminar este cóctel de la watchlist?'
    );
    if (!confirmed) return;
    try {
      await removeFromWatchlist(selectedProfile._id, cocktailId);
      setWatchlist(watchlist.filter((c) => c._id !== cocktailId));
      toast.success('Cóctel eliminado de la watchlist');
    } catch (err) {
      toast.error('Error al eliminar de la watchlist');
      console.error('Error removing from watchlist:', err);
    }
  };

  if (!selectedProfile) {
    return (
      <div className="container mx-auto p-6 dark:text-gray-200">
        Selecciona un perfil primero
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 dark:text-gray-200">
        Watchlist de {selectedProfile.name}
      </h2>
      {loading && (
        <p className="text-gray-600 dark:text-gray-300">Cargando...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && watchlist.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No hay cócteles en la watchlist
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((cocktail) => (
            <div key={cocktail._id}>
              <CocktailCard cocktail={cocktail} />
              <button
                onClick={() => handleRemove(cocktail._id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
