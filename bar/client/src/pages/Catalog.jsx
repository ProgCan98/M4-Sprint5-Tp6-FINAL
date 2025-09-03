import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import useFetch from '../hooks/useFetch';
import CocktailCard from '../components/CocktailCard';
import { toast } from 'react-toastify';

const Catalog = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ name: '', category: '' });
  const { selectedProfile } = useContext(AuthContext);
  const params = { page, limit: 9, ...filters };
  if (selectedProfile?.role === 'child') {
    params.nonAlcoholic = 'true';
  }
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/cocktails`,
    params,
    [page, filters, selectedProfile]
  );

  const cocktails = Array.isArray(data?.cocktails) ? data.cocktails : [];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 dark:text-gray-200">
        Catálogo de Cócteles
      </h2>
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Buscar por nombre"
          className="p-2 border rounded dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-2 border rounded dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
        >
          <option value="">Todas las categorías</option>
          <option value="Ordinary_Drink">Ordinary Drink</option>
          <option value="Cocktail">Cocktail</option>
          <option value="Shot">Shot</option>
          <option value="Punch_/_Party_Drink">Punch / Party Drink</option>
        </select>
      </div>
      {loading && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Cargando...
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && cocktails.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No se encontraron cócteles.
        </p>
      )}
      {!loading && !error && cocktails.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cocktails.map((cocktail) => (
            <CocktailCard key={cocktail._id} cocktail={cocktail} />
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 disabled:opacity-50"
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Catalog;
