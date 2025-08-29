// Archivo para manejar todas las solicitudes API usando Axios
// Fusiona funciones de api.js y apiBackend.js original para consistencia
// Usa dos instancias de Axios para separar CocktailDB y MockAPI

import axios from 'axios'; // Biblioteca para solicitudes HTTP

// Instancia de Axios para TheCocktailDB API con base URL y timeout
const cocktailApi = axios.create({
  baseURL: import.meta.env.VITE_COCKTAILDB_BASE_URL,
  timeout: 5000, // Timeout de 5 segundos
});

// Instancia de Axios para MockAPI para manejar órdenes
const mockApi = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_URL,
  timeout: 5000,
});

// Obtiene lista de bebidas filtradas por categoría o usa default
export const getDrinks = async (query) => {
  try {
    let url = '/filter.php?';
    if (query) {
      url += `c=${encodeURIComponent(query)}`; // Filtra por categoría
    } else {
      url += 'c=Ordinary_Drink'; // Categoría por defecto
    }
    const response = await cocktailApi.get(url);
    return response.data.drinks || []; // Retorna bebidas o array vacío
  } catch (error) {
    console.error('Error fetching drinks:', error);
    throw new Error('Error fetching drinks');
  }
};

// Obtiene lista de categorías disponibles
export const getCategories = async () => {
  try {
    const response = await cocktailApi.get('/list.php?c=list');
    console.log('Categorías obtenidas:', response.data.drinks); // Depuración
    return response.data.drinks || []; // Retorna lista de categorías
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Error fetching categories');
  }
};

// Obtiene detalles de una bebida por ID (fusionado desde api.js)
export const getDrinkById = async (id) => {
  try {
    const response = await cocktailApi.get(`/lookup.php?i=${id}`);
    return response.data.drinks ? response.data.drinks[0] : null; // Retorna primera bebida o null
  } catch (error) {
    console.error('Error fetching drink by ID:', error);
    throw new Error('Error fetching drink by ID');
  }
};

// Crea una nueva orden en MockAPI
export const createOrder = async (orderData) => {
  try {
    console.log(
      'Sending order to:',
      `${import.meta.env.VITE_MOCKAPI_URL}/orders`,
      'with data:',
      orderData
    ); // Depuración
    const response = await mockApi.post('/orders', orderData);
    return response.data; // Retorna datos de la orden creada
  } catch (error) {
    console.error(
      'Fetch error, status:',
      error.response?.status,
      'data:',
      error.response?.data
    );
    throw new Error(
      `Error creating order: ${error.response?.status || 'unknown'} - ${
        error.response?.data || error.message
      }`
    );
  }
};

// Obtiene todas las órdenes de MockAPI
export const getOrders = async () => {
  try {
    const response = await mockApi.get('/orders');
    return response.data; // Retorna lista de órdenes
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Error fetching orders');
  }
};

// Actualiza una orden existente por ID
export const updateOrder = async (id, orderData) => {
  try {
    const response = await mockApi.put(`/orders/${id}`, orderData);
    return response.data; // Retorna orden actualizada
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Error updating order');
  }
};

// Elimina una orden por ID
export const deleteOrder = async (id) => {
  try {
    await mockApi.delete(`/orders/${id}`);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Error deleting order');
  }
};
