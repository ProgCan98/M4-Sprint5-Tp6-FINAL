# Cocktail Bar - Documentación del Proyecto

## Descripción General

Esta aplicación web, desarrollada en **React**, permite a los usuarios explorar un menú de cócteles, agregar bebidas al carrito, realizar pedidos y gestionar órdenes existentes. Utiliza la API de **TheCocktailDB** para obtener datos de bebidas y categorías, y **MockAPI** para manejar órdenes. La aplicación implementa un diseño responsivo con **Tailwind CSS**, notificaciones con **React Toastify**, confirmaciones interactivas con **SweetAlert2**, y enrutamiento con **React Router**. El estado del carrito se gestiona con **Context API** y se persiste en **LocalStorage** y la API de MockAPI.

Originalmente, el proyecto usaba dos archivos para manejar APIs: `api.js` (con **Axios**) y `apiBackend.js` (con `fetch`). Para mantener consistencia y aprovechar las ventajas de Axios (sintaxis clara, manejo de errores, timeouts), se fusionaron en un solo archivo, `apiBackend.js`, que usa Axios exclusivamente.

El proyecto es ideal para estudiar conceptos clave de React como **Hooks**, **Context API**, **enrutamiento dinámico**, **manejo de APIs** y **persistencia de datos**.

## Tecnologías Utilizadas

- **React (v18+)**: Framework para la interfaz de usuario.
- **React Router DOM**: Enrutamiento entre páginas (Home, Menu, Cart, etc.).
- **Context API**: Manejo de estado global para el carrito.
- **Axios**: Biblioteca para solicitudes HTTP a las APIs.
- **Tailwind CSS**: Estilos utilitarios con tema oscuro.
- **React Toastify**: Notificaciones de éxito y error.
- **SweetAlert2**: Diálogos de confirmación interactivos para acciones críticas (vaciar carrito, eliminar pedidos).
- **LocalStorage**: Persistencia local del carrito y ID de orden.
- **APIs Externas**:
  - **TheCocktailDB**: Provee datos de bebidas y categorías (usando `VITE_COCKTAILDB_BASE_URL`).
  - **MockAPI**: Maneja creación, obtención, actualización y eliminación de órdenes (`VITE_MOCKAPI_URL`).
- **Vite**: Herramienta de desarrollo para un entorno rápido.

## Configuración del Proyecto

1. **Clonar el Repositorio**:

   ```bash
   git clone <url-del-repositorio>
   cd cocktail-bar
   ```

2. **Instalar Dependencias**:

   ```bash
   npm install
   ```

   Asegúrate de que `axios`, `react-router-dom`, `react-toastify`, `sweetalert2`, y `tailwindcss` estén en `package.json`.

3. **Configurar Variables de Entorno**: Crea un archivo `.env` en la raíz con:

   ```
   VITE_MOCKAPI_URL=https://68a73634639c6a54e9a15be8.mockapi.io/api/v1
   VITE_COCKTAILDB_BASE_URL=https://www.thecocktaildb.com/api/json/v1/1
   ```

4. **Ejecutar en Desarrollo**:

   ```bash
   npm run dev
   ```

   Abre `http://localhost:5173` en el navegador.

5. **Construir para Producción**:

   ```bash
   npm run build
   ```

   Los archivos se generan en la carpeta `dist`.

## Desarrollo Paso a Paso

### 1. Inicialización

- Se creó el proyecto con Vite: `npm create vite@latest`.
- Se configuró Tailwind CSS en `index.css` con un tema oscuro (`bg-gray-900`) y una clase `hero-bg` para la página Home.
- Se importó una imagen (`hero1.jpg`) para el fondo de la página inicial.

### 2. Enrutamiento

- En `appRouter.jsx`, se definieron rutas para:
  - `/`: Página inicial (Home).
  - `/menu`: Lista de bebidas.
  - `/cart`: Carrito de compras.
  - `/checkout`: Formulario de pedido.
  - `/drink/:id`: Detalles de una bebida.
  - `/orders`: Gestión de órdenes.
- `App.jsx` actúa como layout, incluyendo la barra de navegación (`Navbar`) y el contenedor de rutas (`Outlet`).

### 3. Manejo de Estado

- **CartContext.js** y **CartProvider.jsx**: Gestionan el estado del carrito (items, cantidades, totales) usando Context API.
- Persistencia: El carrito se guarda en `LocalStorage` y se sincroniza con MockAPI para órdenes activas.
- Funciones como `addToCart`, `updateQuantity`, `removeFromCart` y `clearCart` manejan operaciones del carrito.

### 4. Componentes Principales

- **Navbar.jsx**: Barra de navegación responsiva con links y contador de ítems en el carrito.
- **Home.jsx**: Página inicial con formulario de búsqueda y enlace al menú.
- **Menu.jsx**: Muestra bebidas filtradas por categoría o búsqueda, permite agregar al carrito.
- **Cart.jsx**: Lista ítems en el carrito, permite actualizar cantidades, eliminar y vaciar (con confirmación de SweetAlert2).
- **Checkout.jsx**: Formulario para enviar pedidos (mesa, mozo, tiempo) a MockAPI.
- **DrinkDetail.jsx**: Detalles de una bebida específica (ingredientes, instrucciones).
- **Orders.jsx**: Lista órdenes, permite actualizar mozo/tiempo o eliminar (con confirmación de SweetAlert2).

### 5. Manejo de APIs

- Inicialmente, `api.js` usaba Axios para obtener detalles de bebidas (`getDrinkById`), mientras que `apiBackend.js` usaba `fetch` para otras operaciones.
- **Fusión**: Se unificaron en `apiBackend.js` usando **Axios** para consistencia, aprovechando su sintaxis clara y soporte para timeouts (5 segundos).
- Funciones en `apiBackend.js`:
  - `getDrinks`: Lista bebidas por categoría.
  - `getCategories`: Obtiene categorías disponibles (corregido para manejar correctamente `response.data.drinks`).
  - `getDrinkById`: Detalles de una bebida por ID.
  - `createOrder`, `getOrders`, `updateOrder`, `deleteOrder`: Gestionan órdenes en MockAPI.
- Todas las funciones manejan errores con `try/catch` y muestran notificaciones con Toastify.

### 6. Estilos y UX

- **index.css**: Define un tema oscuro global y el fondo hero para `Home.jsx`.
- Tailwind CSS proporciona clases responsivas (ej. `sm:`, `md:`) y efectos hover.
- **React Toastify**: Notificaciones para errores (ej. API falla) y éxitos (ej. pedido enviado).
- **SweetAlert2**: Diálogos de confirmación para vaciar el carrito (`Cart.jsx`) y eliminar pedidos (`Orders.jsx`).
- Precios generados aleatoriamente (`Math.random() * 15 + 5`) para simulación.

### 7. Pruebas y Depuración

- Se agregaron `console.log` en `createOrder`, `getCategories`, y `Menu.jsx` para depuración.
- Estados de carga (`loading`) en páginas para mejorar UX.
- Persistencia en `LocalStorage` asegura que el carrito no se pierda al recargar.
- Sincronización con MockAPI asegura consistencia de órdenes.
- SweetAlert2 agrega confirmaciones interactivas para acciones críticas.
- **Corrección de Categorías**: Se corrigió `getCategories` en `apiBackend.js` para devolver `response.data.drinks`, solucionando el problema de categorías vacías en `Menu.jsx`.

## Estructura de Archivos

- **.env**: Variables de entorno para APIs.
- **src/main.jsx**: Punto de entrada, renderiza la app.
- **src/App.jsx**: Layout principal con Navbar y Outlet.
- **src/router/appRouter.jsx**: Define rutas.
- **src/context/CartContext.js** y **CartProvider.jsx**: Manejo del carrito.
- **src/components/Navbar.jsx**: Navegación responsiva.
- **src/pages/**: Páginas (Home, Menu, Cart, Checkout, DrinkDetail, Orders).
- **src/services/apiBackend.js**: Llamadas API con Axios.
- **src/index.css**: Estilos globales con Tailwind.
- **src/assets/hero1.jpg**: Imagen de fondo para Home.

## Notas para Estudio y Examen

- **Conceptos Clave**:
  - **React Hooks**: `useState` (estado local), `useEffect` (efectos secundarios), `useContext` (estado global), `useNavigate` (navegación programática), `useParams` (parámetros de URL).
  - **Context API**: Evita prop drilling para el carrito.
  - **Axios**: Simplifica solicitudes HTTP, maneja errores y timeouts.
  - **React Router**: Rutas dinámicas (`/drink/:id`) y navegación programática.
  - **SweetAlert2**: Diálogos interactivos para confirmaciones de usuario.
  - **Persistencia**: Uso de `LocalStorage` y sincronización con API.
  - **Tailwind CSS**: Estilos responsivos y utilitarios.
- **Depuración de Categorías**:
  - Problema: `getCategories` retornaba un array vacío debido a una lógica incorrecta en la verificación de `response.data.drinks`.
  - Solución: Actualizado para usar `response.data.drinks || []`, asegurando que las categorías se carguen en `Menu.jsx`.
  - Consejo: Verifica siempre el formato de la respuesta de la API (usando `console.log` o herramientas de red) antes de procesarla.
- **Mejoras Posibles**:
  - Autenticación de usuarios.
  - Integración de pagos reales.
  - Precios reales desde una base de datos.
  - WebSockets para actualizaciones en tiempo real.
- **Problemas Comunes**:
  - Manejo de estados asíncronos (loading, errors).
  - Sincronización entre `LocalStorage` y API.
  - Respuesta incorrecta de APIs externas (como categorías vacías).
  - Responsividad en dispositivos móviles.
