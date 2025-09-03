import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getCocktails } from '../services/cocktailService';
import CocktailCard from '../components/CocktailCard';

const Catalog = () => {
  const [cocktails, setCocktails] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ name: '', category: '' });
  const { selectedProfile } = useContext(AuthContext);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const params = { page, limit: 9, ...filters };
        if (selectedProfile?.role === 'child') {
          params.nonAlcoholic = 'true';
        }
        const { cocktails } = await getCocktails(params);
        setCocktails(cocktails);
      } catch (err) {
        console.error('Error fetching cocktails:', err);
      }
    };
    fetchCocktails();
  }, [page, filters, selectedProfile]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Catálogo de Cócteles</h2>
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Buscar por nombre"
          className="p-2 border rounded"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">Todas las categorías</option>
          <option value="Ordinary_Drink">Ordinary Drink</option>
          <option value="Cocktail">Cocktail</option>
          {/* Add more categories as per your backend */}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cocktails.map((cocktail) => (
          <CocktailCard key={cocktail._id} cocktail={cocktail} />
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Catalog;
