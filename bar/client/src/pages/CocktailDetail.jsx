import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { toast } from 'react-toastify';

const CocktailDetail = () => {
  const { id } = useParams();
  const {
    data: cocktail,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_API_URL}/cocktails/${id}`);

  if (loading)
    return (
      <p className="container mx-auto p-6 dark:text-gray-200">Cargando...</p>
    );
  if (error) {
    toast.error(error);
    return <p className="container mx-auto p-6 text-red-500">{error}</p>;
  }
  if (!cocktail)
    return (
      <p className="container mx-auto p-6 dark:text-gray-200">
        Cóctel no encontrado
      </p>
    );

  const {
    name = 'Sin nombre',
    category = 'Desconocida',
    alcoholic = 'No especificado',
    image = 'https://via.placeholder.com/300',
    instructions = 'No hay instrucciones',
    ingredients = [],
  } = cocktail;

  return (
    <div className="container mx-auto p-6">
      <Link
        to="/catalog"
        className="text-blue-500 hover:underline dark:text-blue-400 mb-4 inline-block"
      >
        ← Volver al catálogo
      </Link>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <img
          src={image}
          alt={name}
          className="w-full max-w-md mx-auto h-64 object-cover rounded"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
        />
        <h2 className="text-3xl font-bold mt-4 text-gray-800 dark:text-gray-200">
          {name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {category} - {alcoholic}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-4">{instructions}</p>
        <h3 className="text-xl font-semibold mt-6 text-gray-800 dark:text-gray-200">
          Ingredientes
        </h3>
        <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-300">
          {ingredients.map((ing, i) => (
            <li key={i}>
              {ing.ingredient || 'Ingrediente desconocido'} -{' '}
              {ing.measure || 'No especificado'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CocktailDetail;
