// Página para mostrar detalles de una bebida específica
// Usa useParams para obtener el ID de la bebida desde la URL
// Carga datos de la API y permite agregar al carrito
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDrinkById } from '../services/apiBackend'; // Updated import
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function DrinkDetail() {
  // Estado para la bebida y estado de carga
  const { id } = useParams(); // Obtiene ID de la bebida desde la URL
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Función para agregar al carrito

  // Carga detalles de la bebida al montar o al cambiar el ID
  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const data = await getDrinkById(id);
        // Agrega precio aleatorio para simulación
        if (data) {
          data.price = (Math.random() * 15 + 5).toFixed(2);
          setDrink(data);
        } else {
          toast.error('Bebida no encontrada');
        }
      } catch {
        toast.error('Error al cargar detalles de la bebida');
      } finally {
        setLoading(false);
      }
    };
    fetchDrink();
  }, [id]);

  // Agrega la bebida al carrito
  const handleAddToCart = () => {
    if (drink) {
      addToCart({
        id: drink.idDrink,
        name: drink.strDrink,
        price: parseFloat(drink.price),
        image: drink.strDrinkThumb,
      });
    }
  };

  // Muestra estado de carga
  if (loading) return <div className="text-center py-10">Cargando...</div>;
  // Muestra mensaje si no se encuentra la bebida
  if (!drink)
    return <div className="text-center py-10">Bebida no encontrada</div>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/menu" className="text-orange-500 hover:underline mb-4 block">
        &larr; Volver al Menú
      </Link>
      <div className="flex flex-col md:flex-row items-center bg-gray-800 p-6 rounded-lg shadow-lg">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="w-64 h-64 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{drink.strDrink}</h1>
          <p className="text-lg mb-2">Categoría: {drink.strCategory}</p>
          <p className="text-lg mb-4">Precio: ${drink.price}</p>
          <h2 className="text-xl font-semibold mb-2">Ingredientes:</h2>
          <ul className="list-disc pl-5 mb-4">
            {Object.keys(drink)
              .filter((key) => key.startsWith('strIngredient') && drink[key])
              .map((key) => (
                <li key={key}>
                  {drink[key]} - {drink[`strMeasure${key.slice(13)}`]}
                </li>
              ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Instrucciones:</h2>
          <p className="mb-4">{drink.strInstructions}</p>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrinkDetail;
