import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from '../services/profileService';

const AdminProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: 'standard' });
  const [editingId, setEditingId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfiles();
        setProfiles(data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };
    if (user?.role === 'owner') {
      fetchProfiles();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProfile(editingId, formData);
        setEditingId(null);
      } else {
        await createProfile(formData);
      }
      const data = await getProfiles();
      setProfiles(data);
      setFormData({ name: '', role: 'standard' });
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleEdit = (profile) => {
    setFormData({ name: profile.name, role: profile.role });
    setEditingId(profile._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProfile(id);
      setProfiles(profiles.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  if (user?.role !== 'owner') {
    return <div className="container mx-auto p-6">Acceso denegado</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Administrar Perfiles</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rol</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="standard">Standard</option>
            <option value="child">Child</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? 'Actualizar' : 'Crear'} Perfil
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div key={profile._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-600">Rol: {profile.role}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(profile)}
                className="text-blue-500 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(profile._id)}
                className="text-red-500 hover:underline"
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
