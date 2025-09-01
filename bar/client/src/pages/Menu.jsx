// Página para mostrar el catálogo de cócteles
// Permite filtrar por categoría, buscar, agregar a watchlist y paginado
// Restringe cócteles con alcohol para perfiles de niño

import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Menu() {
  const [cocktails, setCocktails] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { activeProfile, token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const navigate = useNavigate();

  // Carga categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/cocktails/categories`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Categorías cargadas:', response.data); // Depuración
        setCategories(response.data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        toast.error('Error al cargar categorías');
      }
    };
    fetchCategories();
  }, [token]);

  // Carga cócteles con paginado y filtros
  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        setLoading(true);
        const query = {
          page,
          limit: 9, // 9 cócteles por página
          category: selectedCategory || undefined,
          search: searchTerm || undefined,
          nonAlcoholic: activeProfile?.role === 'child' ? true : undefined,
        };
        console.log('Buscando cócteles:', query); // Depuración
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/cocktails`,
          { params: query, headers: { Authorization: `Bearer ${token}` } }
        );
        setCocktails(response.data.cocktails);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error al cargar cócteles:', error);
        toast.error('Error al cargar cócteles');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchCocktails();
  }, [page, selectedCategory, searchTerm, activeProfile, token]);

  // Agrega cóctel a la watchlist
  const handleAddToWatchlist = async (cocktail) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/profiles/${
          activeProfile._id
        }/watchlist`,
        { cocktailId: cocktail._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${cocktail.name} agregado a la watchlist`);
    } catch (error) {
      console.error('Error al agregar a watchlist:', error);
      toast.error('Error al agregar a la watchlist');
    }
  };

  // Maneja cambio de categoría
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSearchParams({});
    setPage(1);
  };

  // Limpia filtros
  const handleClearSearch = () => {
    setSearchParams({});
    setSelectedCategory('');
    setPage(1);
  };

  // Cambia de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <div className="text-center py-10">Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menú de Cócteles</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Filtrar por Categoría
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded"
        >
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cocktails.map((cocktail) => (
          <div
            key={cocktail._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <img
              src={cocktail.image}
              alt={cocktail.name}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold mb-1">{cocktail.name}</h2>
            <p className="text-sm mb-2">Categoría: {cocktail.category}</p>
            <Link
              to={`/drink/${cocktail._id}`}
              className="block text-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition mb-2"
            >
              Ver Detalles
            </Link>
            <button
              onClick={() => handleAddToWatchlist(cocktail)}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Agregar a Watchlist
            </button>
          </div>
        ))}
      </div>
      {/* Controles de paginado */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md mr-2"
        >
          Anterior
        </button>
        <span className="px-4 py-2">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md ml-2"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Menu;
