# Cocktail Bar - TP6 Documentación

## Descripción General

Aplicación web para explorar, gestionar y pedir cócteles, con autenticación, perfiles de usuario y watchlist. Usa **React** y **Vite** en el frontend, y **Node.js**, **Express**, y **MongoDB** en el backend. Implementa **JWT** para autenticación, **Tailwind CSS v4** para estilos, **react-hook-form** para formularios, y **SweetAlert2**/**Toastify** para notificaciones. Consume **TheCocktailDB** para datos de cócteles y persiste datos en MongoDB.

## Tecnologías Utilizadas

- **Frontend**:
  - React (v18+), Vite, Tailwind CSS v4
  - React Router DOM, Axios, react-hook-form, Yup (opcional)
  - React Toastify, SweetAlert2
  - Context API, LocalStorage
- **Backend**:
  - Node.js, Express, MongoDB, Mongoose
  - JSON Web Tokens (JWT), bcryptjs
  - Axios para consumir TheCocktailDB
- **APIs**:
  - TheCocktailDB: Cócteles y categorías
  - Backend propio: Gestión de usuarios, perfiles, cócteles

## Configuración del Proyecto

### Frontend (carpeta `client`)
1. **Clonar y configurar**:
   ```bash
   cd client
   npm install
   ```
2. **.env**:
   ```
   VITE_BACKEND_URL=
   VITE_COCKTAILDB_BASE_URL=
   ```
3. **Ejecutar**:
   ```bash
   npm run dev
   ```

### Backend (carpeta `server`)
1. **Clonar y configurar**:
   ```bash
   cd server
   npm install
   ```
2. **.env**:
   ```
   PORT=
   MONGODB_URI=
   JWT_SECRET=
   COCKTAILDB_BASE_URL=
   ```
3. **Ejecutar**:
   ```bash
   npm run dev
   ```

## Estructura de Archivos

### Frontend
- **src/App.jsx**: Layout principal con Navbar y Toastify.
- **src/router/appRouter.jsx**: Rutas protegidas y dinámicas.
- **src/context/**: Contextos para autenticación, carrito, y tema.
- **src/pages/**: Login, ProfileSelector, Menu, Cart, Checkout, DrinkDetail, Orders, ProfileManager, Watchlist.
- **src/services/api.js**: Peticiones al backend con Axios.
- **src/index.css**: Estilos con Tailwind CSS v4.

### Backend
- **src/app.js**: Configuración de Express.
- **src/models/**: Modelos Mongoose (User, Profile, Cocktail).
- **src/controllers/**: Lógica de autenticación, usuarios, perfiles, cócteles.
- **src/routes/**: Endpoints protegidos con JWT.
- **src/middleware/**: Verificación de JWT y manejo de errores.

## Funcionalidades

### Backend
- **CRUD**: Usuarios, Perfiles, Cócteles.
- **Autenticación**: Login/registro con JWT.
- **Roles**: Dueño (gestiona perfiles), Estándar (acceso completo), Niño (solo no alcohólicos).
- **Filtros**: Búsqueda por nombre, categoría, alcohol/no alcohol.
- **Paginado**: 9 cócteles por página.
- **API Externa**: Sincronización con TheCocktailDB.

### Frontend
- **Login**: Formulario con `react-hook-form`.
- **Perfiles**: Selector y gestión (CRUD) para dueño.
- **Catálogo**: `Menu.jsx` con filtros, paginado, y watchlist.
- **Watchlist**: Persistente por perfil.
- **Restricciones**: Perfiles de niño solo ven cócteles sin alcohol.
- **Rutas Protegidas**: Usando `ProtectedRoute.jsx`.
- **Tema Claro/Oscuro**: Gestionado con `ThemeContext`.
- **Notificaciones**: SweetAlert2 para confirmaciones, Toastify para feedback.

## Notas para Estudio

- **Hooks**:
  - `useNavigate`: Redirige tras login o selección de perfil.
  - `useParams`: Detalles de cócteles (`/drink/:id`).
  - `useContext`: Autenticación, carrito, tema.
  - `useState`, `useEffect`: Estado y efectos en componentes.
- **react-hook-form**: Validación de formularios en `Login.jsx`, `ProfileManager.jsx`.
- **SweetAlert2**: Confirmaciones en `Cart.jsx` (vaciar), `Orders.jsx` (eliminar).
- **JWT**: Tokens para autenticación y rutas protegidas.
- **Paginado**: Implementado en `Menu.jsx` con backend.
- **Depuración**: `console.log` en API y componentes.