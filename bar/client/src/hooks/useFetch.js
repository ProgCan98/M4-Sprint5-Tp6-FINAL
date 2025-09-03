import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useFetch = (url, params = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, { params });
        setData(response.data);
      } catch (err) {
        setError('Error al cargar datos');
        toast.error('Error al cargar datos');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;
