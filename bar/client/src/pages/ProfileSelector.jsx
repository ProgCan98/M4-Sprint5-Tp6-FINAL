// Página para seleccionar un perfil tras el login
// Muestra perfiles asociados al usuario y permite gestionarlos (dueño)

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfileSelector() {
  const [profiles, setProfiles] = useState([]);
  const { user, setProfile, token } = useAuth();
  const navigate = useNavigate();

  // Carga perfiles del usuario
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profiles`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Perfiles cargados:', response.data); // Depuración
        setProfiles(response.data);
      } catch (error) {
        console.error('Error al cargar perfiles:', error);
        toast.error('Error al cargar perfiles');
      }
    };
    if (user) fetchProfiles();
  }, [user, token]);

  // Selecciona un perfil y redirige al menú
  const handleSelectProfile = (profile) => {
    setProfile(profile);
    navigate('/menu');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seleccionar Perfil</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleSelectProfile(profile)}
          >
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm">Tipo: {profile.role}</p>
          </div>
        ))}
      </div>
      {user?.role === 'owner' && (
        <button
          onClick={() => navigate('/profile-manager')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Gestionar Perfiles
        </button>
      )}
    </div>
  );
}

export default ProfileSelector;
