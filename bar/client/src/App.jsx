import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profiles from './pages/Profiles';
import Catalog from './pages/Catalog';
import AdminProfiles from './pages/AdminProfiles';
import Watchlist from './pages/Watchlist';
import CocktailDetail from './pages/CocktailDetail';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/admin-profiles" element={<AdminProfiles />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cocktail/:id" element={<CocktailDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
