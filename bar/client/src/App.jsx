// Componente principal de la aplicación
// Actúa como layout, incluyendo la barra de navegación y el contenedor de rutas
// Configura Toastify para notificaciones globales
import { Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <CartProvider>
      <Navbar /> {/* Barra de navegación */}
      <ToastContainer position="bottom-right" autoClose={3000} />{' '}
      {/* Cierra notificaciones tras 3 segundos */}
      <Outlet /> {/* Renderiza rutas hijas definidas en appRouter */}
    </CartProvider>
  );
}

export default App;
