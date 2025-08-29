// Página inicial del proyecto Cocktail Bar
// Muestra un formulario de búsqueda y un enlace al menú
// Usa useNavigate para redirigir a /menu con parámetros de búsqueda
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import heroImage from '../assets/hero1.jpg';

function Home() {
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Hook useNavigate para navegación programática
  const navigate = useNavigate();

  // Maneja el envío del formulario de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (term) {
      // Redirige a /menu con el término de búsqueda como query param
      console.log('Redirigiendo a /menu?search=', term);
      navigate(`/menu?search=${encodeURIComponent(term)}`);
    } else {
      // Redirige a /menu sin parámetros si la búsqueda está vacía
      console.log('Búsqueda vacía, no se redirige');
      navigate('/menu'); // Si está vacío, va a todas las bebidas
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen  text-white hero-bg"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="p-8 rounded-md">
        <h1
          className="text-orange-500 text-4xl md:text-6xl font-extrabold mb-4"
          style={{
            textShadow:
              '2px 2px 4px rgba(0, 0, 0, 0.7), -2px -2px 4px rgba(255, 255, 255, 0.3)',
          }}
        >
          Cocktail Bar
        </h1>
        <p
          className="text-lg md:text-xl mb-6 font-extrabold"
          style={{
            textShadow:
              '1px 1px 3px rgba(0, 0, 0, 0.7), -1px -1px 3px rgba(255, 255, 255, 0.3)',
          }}
        >
          Elige tu bebida favorita
        </p>
        {/* Formulario de búsqueda */}
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca un cóctel..."
              className="p-2 mb-4 w-full rounded-l-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="px-4 py-2 mb-4 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 transition"
            >
              Buscar
            </button>
          </div>
        </form>
        {/* Enlace directo al menú */}
        <Link
          to="/menu"
          className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          onClick={() => setSearchTerm('')} // Limpia el searchTerm al hacer clic
        >
          Explorar Menú
        </Link>
      </div>
    </div>
  );
}

export default Home;
