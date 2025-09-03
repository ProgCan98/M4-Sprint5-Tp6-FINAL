import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  getProfileById,
  removeFromWatchlist,
} from '../services/profileService';
import CocktailCard from '../components/CocktailCard';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const { selectedProfile } = useContext(AuthContext);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (selectedProfile) {
        try {
          const profile = await getProfileById(selectedProfile._id);
          setWatchlist(profile.watchlist || []);
        } catch (err) {
          console.error('Error fetching watchlist:', err);
        }
      }
    };
    fetchWatchlist();
  }, [selectedProfile]);

  const handleRemove = async (cocktailId) => {
    try {
      await removeFromWatchlist(selectedProfile._id, cocktailId);
      setWatchlist(watchlist.filter((c) => c._id !== cocktailId));
    } catch (err) {
      console.error('Error removing from watchlist:', err);
    }
  };

  if (!selectedProfile) {
    return (
      <div className="container mx-auto p-6">Selecciona un perfil primero</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        Watchlist de {selectedProfile.name}
      </h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-600">No hay cócteles en la watchlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((cocktail) => (
            <div key={cocktail._id}>
              <CocktailCard cocktail={cocktail} />
              <button
                onClick={() => handleRemove(cocktail._id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
