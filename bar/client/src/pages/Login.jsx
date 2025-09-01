// Formulario de login

// Página de login para autenticar usuarios
// Usa react-hook-form para validaciones y Axios para enviar datos
// Guarda token y usuario en el contexto de autenticación

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    try {
      console.log('Enviando login:', data); // Depuración
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        data
      );
      login(response.data.user, response.data.token);
      toast.success('Inicio de sesión exitoso');
      navigate('/profiles'); // Redirige a selección de perfiles
    } catch (error) {
      console.error('Error en login:', error);
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="p-6 bg-gray-800 rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register('email', { required: 'El email es obligatorio' })}
              className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              {...register('password', {
                required: 'La contraseña es obligatoria',
              })}
              className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
