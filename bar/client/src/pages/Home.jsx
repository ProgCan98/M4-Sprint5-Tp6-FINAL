import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero1.jpg';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Bienvenido a Cocktail Bar
        </h1>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
          Descubre y disfruta de los mejores cócteles, personalizados según tu
          perfil.
        </p>
        {!user && (
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Registrarse
            </Link>
          </div>
        )}
        {user && (
          <Link
            to="/profiles"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Seleccionar Perfil
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
