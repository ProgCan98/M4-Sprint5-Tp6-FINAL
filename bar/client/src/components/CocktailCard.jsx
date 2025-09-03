import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { addToWatchlist } from '../services/profileService';

const CocktailCard = ({ cocktail }) => {
  const { selectedProfile } = useContext(AuthContext);

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(selectedProfile._id, cocktail._id);
      alert('Cóctel agregado a la watchlist');
    } catch (err) {
      alert('Error al agregar a la watchlist');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={cocktail.image}
        alt={cocktail.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{cocktail.name}</h3>
      <p className="text-gray-600">
        {cocktail.category} - {cocktail.alcoholic}
      </p>
      <button
        onClick={handleAddToWatchlist}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Agregar a Watchlist
      </button>
    </div>
  );
};

export default CocktailCard;
