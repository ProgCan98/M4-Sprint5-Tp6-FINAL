import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children || <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
