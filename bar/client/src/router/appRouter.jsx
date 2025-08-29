// Define las rutas de la aplicación usando react-router-dom
// Configura rutas estáticas y dinámicas (como /drink/:id)
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Drink from '../pages/DrinkDetail';
import Orders from '../pages/Orders'; // Nuevo import

// Configuración del router
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Layout con Navbar y Outlet
    children: [
      { path: '', element: <Home /> },
      { path: 'menu', element: <Menu /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'drink/:id', element: <Drink /> },
      { path: 'orders', element: <Orders /> }, // Nueva ruta
    ],
  },
]);

export default appRouter;
