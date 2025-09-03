import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from '../services/profileService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup.string().required('Nombre requerido').min(2, 'Mínimo 2 caracteres'),
  role: yup
    .string()
    .oneOf(['standard', 'child'], 'Rol inválido')
    .required('Rol requerido'),
});

const AdminProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfiles();
        setProfiles(data);
      } catch (err) {
        toast.error('Error al cargar perfiles');
        console.error('Error fetching profiles:', err);
      }
    };
    if (user?.role === 'owner') {
      fetchProfiles();
    }
  }, [user]);

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await updateProfile(editingId, data);
        toast.success('Perfil actualizado');
        setEditingId(null);
      } else {
        await createProfile(data);
        toast.success('Perfil creado');
      }
      const dataProfiles = await getProfiles();
      setProfiles(dataProfiles);
      reset({ name: '', role: 'standard' });
    } catch (err) {
      toast.error('Error al guardar perfil');
      console.error('Error saving profile:', err);
    }
  };

  const handleEdit = (profile) => {
    reset({ name: profile.name, role: profile.role });
    setEditingId(profile._id);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro de eliminar este perfil?');
    if (!confirmed) return;
    try {
      await deleteProfile(id);
      setProfiles(profiles.filter((p) => p._id !== id));
      toast.success('Perfil eliminado');
    } catch (err) {
      toast.error('Error al eliminar perfil');
      console.error('Error deleting profile:', err);
    }
  };

  if (user?.role !== 'owner') {
    return (
      <div className="container mx-auto p-6 dark:text-gray-200">
        Acceso denegado
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 dark:text-gray-200">
        Administrar Perfiles
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Nombre
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Rol
          </label>
          <select
            {...register('role')}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            <option value="standard">Standard</option>
            <option value="child">Child</option>
          </select>
          {errors.role && (
            <p className="text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cargando...' : editingId ? 'Actualizar' : 'Crear'}
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold dark:text-gray-200">
              {profile.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Rol: {profile.role}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(profile)}
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(profile._id)}
                className="text-red-500 hover:underline dark:text-red-400"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProfiles;
