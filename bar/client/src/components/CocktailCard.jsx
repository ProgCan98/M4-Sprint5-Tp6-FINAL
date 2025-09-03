import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { addToWatchlist } from '../services/profileService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CocktailCard = ({ cocktail }) => {
  const { selectedProfile } = useContext(AuthContext);

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(selectedProfile._id, cocktail._id);
      toast.success('Cóctel agregado a la watchlist');
    } catch (err) {
      toast.error(
        'Error al agregar a la watchlist: ' +
          (err.response?.data?.message || err.message)
      );
    }
  };

  // Fallbacks for missing properties
  const {
    _id,
    name = 'Sin nombre',
    category = 'Desconocida',
    alcoholic = 'No especificado',
    image = 'https://via.placeholder.com/300',
  } = cocktail;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
      />
      <h3 className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-200">
        {name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {category} - {alcoholic}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleAddToWatchlist}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
          disabled={!selectedProfile}
        >
          Agregar a Watchlist
        </button>
        <Link
          to={`/cocktail/${_id}`}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default CocktailCard;
