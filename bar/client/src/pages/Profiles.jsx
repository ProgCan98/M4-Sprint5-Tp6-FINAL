import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getProfiles } from '../services/profileService';
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const { selectProfile, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfiles();
        setProfiles(data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };
    fetchProfiles();
  }, []);

  const handleSelect = (profile) => {
    selectProfile(profile);
    navigate('/catalog');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Selecciona un Perfil</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            onClick={() => handleSelect(profile)}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-600">Rol: {profile.role}</p>
          </div>
        ))}
      </div>
      {user?.role === 'owner' && (
        <button
          onClick={() => navigate('/admin-profiles')}
          className="mt-8 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Administrar Perfiles
        </button>
      )}
    </div>
  );
};

export default Profiles;
