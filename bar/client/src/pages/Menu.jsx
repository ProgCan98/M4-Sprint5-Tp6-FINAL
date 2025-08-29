// Página para mostrar el menú de bebidas
// Permite filtrar bebidas por categoría o búsqueda, y agregar al carrito
// Usa useNavigate para limpiar filtros y useSearchParams para manejar query params

import { useState, useEffect } from 'react'; // Hooks para estado y efectos
import { useSearchParams, Link, useNavigate } from 'react-router-dom'; // Manejo de URL y navegación
import { getDrinks, getCategories } from '../services/apiBackend'; // APIs para bebidas y categorías
import { useCart } from '../context/CartContext'; // Acceso al carrito
import { toast } from 'react-toastify'; // Notificaciones

function Menu() {
  const [drinks, setDrinks] = useState([]); // Lista de bebidas
  const [categories, setCategories] = useState([]); // Lista de categorías
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selectedCategory') || ''; // Persiste categoría
  });
  const [loading, setLoading] = useState(true); // Estado de carga
  const { addToCart } = useCart(); // Función para agregar al carrito
  const [searchParams, setSearchParams] = useSearchParams(); // Parámetros de URL
  const searchTerm = searchParams.get('search') || ''; // Término de búsqueda
  const navigate = useNavigate(); // Navegación programática

  // Carga categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log('Categorías cargadas en Menu:', data); // Depuración
        setCategories(data);
        if (data.length === 0) {
          toast.warn('No se encontraron categorías');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Error al cargar categorías');
      }
    };
    fetchCategories();
  }, []);

  // Carga bebidas según categoría o búsqueda
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        setLoading(true);
        let query = '';
        if (selectedCategory && !searchTerm) {
          query = selectedCategory; // Filtra por categoría
        } else if (searchTerm) {
          query = searchTerm; // Filtra por búsqueda
        } else {
          query = null; // Sin filtro
        }
        console.log('Buscando bebidas con query:', query); // Depuración
        const data = await getDrinks(query);
        if (!data || !data.length) {
          console.warn('No se encontraron bebidas para el query:', query);
          setDrinks([]);
          toast.warn(`No se encontraron bebidas para "${query || 'todas'}"`);
          setLoading(false);
          return;
        }
        // Agrega precios aleatorios (simulación)
        const drinksWithPrices = data.map((drink) => ({
          ...drink,
          price: (Math.random() * 15 + 5).toFixed(2),
        }));
        setDrinks(drinksWithPrices);
      } catch (error) {
        console.error('Error fetching drinks:', error);
        toast.error('Error al cargar bebidas');
        setDrinks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
    localStorage.setItem('selectedCategory', selectedCategory); // Persiste categoría
  }, [selectedCategory, searchTerm]);

  // Agrega bebida al carrito
  const handleAddToCart = (drink) => {
    addToCart({
      id: drink.idDrink,
      name: drink.strDrink,
      price: parseFloat(drink.price),
      image: drink.strDrinkThumb,
    });
    toast.success(`${drink.strDrink} agregado al carrito`);
  };

  // Limpia filtros y búsqueda
  const handleClearSearch = () => {
    setSearchParams({});
    setSelectedCategory('');
    navigate('/menu');
    localStorage.removeItem('selectedCategory'); // Limpia persistencia
  };

  // Maneja cambio de categoría
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    console.log('Categoría seleccionada:', category); // Depuración
    setSelectedCategory(category);
    if (category) {
      setSearchParams({}); // Limpia búsqueda si se selecciona categoría
    }
  };

  // Muestra estado de carga
  if (loading) return <div className="text-center py-10">Cargando...</div>;

  // Muestra mensaje si no hay bebidas
  if (drinks.length === 0 && !loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Menú de Bebidas</h1>
        <p className="mb-4">
          No se encontraron bebidas para "
          {searchTerm || selectedCategory || 'todas'}".
        </p>
        <button
          onClick={handleClearSearch}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Limpiar Filtros
        </button>
        <br />
        <Link to="/" className="text-orange-500 hover:underline mt-4 block">
          Volver a Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menú de Bebidas</h1>
      {/* Filtro por categoría */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Filtrar por Categoría
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded focus:ring-orange-500"
        >
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
        {categories.length === 0 && (
          <p className="text-red-500 text-sm mt-2">
            No se cargaron categorías. Intenta recargar la página.
          </p>
        )}
      </div>
      {/* Grid de bebidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drinks.map((drink) => (
          <div
            key={drink.idDrink}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold mb-1">{drink.strDrink}</h2>
            <p className="text-sm mb-1">Categoría: {drink.strCategory}</p>
            <p className="text-sm mb-2">Precio: ${drink.price}</p>
            <Link
              to={`/drink/${drink.idDrink}`}
              className="block text-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition mb-2"
            >
              Ver Detalles
            </Link>
            <button
              onClick={() => handleAddToCart(drink)}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
