import axios from 'axios';

const API_URL = 'http://localhost:5000'; // URL del backend

export const getClientes = async () => {
  const response = await axios.get(`${API_URL}/clientes`);
  return response.data;
};

export const getClienteById = async (id) => {
  const response = await axios.get(`${API_URL}/clientes/${id}`);
  return response.data;
};

export const createCliente = async (cliente) => {
  const response = await axios.post(`${API_URL}/clientes`, cliente);
  return response.data;
};

export const updateCliente = async (id, cliente) => {
  const response = await axios.put(`${API_URL}/clientes/${id}`, cliente);
  return response.data;
};

export const deleteCliente = async (id) => {
  const response = await axios.delete(`${API_URL}/clientes/${id}`);
  return response.data;
};









/*import axios from 'axios';

// Crear una instancia base de axios
const api = axios.create({
  baseURL: 'http://localhost:5000', // Reemplaza con la URL de tu API si es diferente
  headers: {
    'Content-Type': 'application/json'
  }
});

// Añadir un interceptor para agregar el token de autenticación en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Funciones CRUD para Clientes

// Obtener todos los clientes
export const getClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los clientes', error);
    throw error;
  }
};

// Obtener un cliente por ID
export const getClienteById = async (id) => {
  try {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el cliente con id ${id}`, error);
    throw error;
  }
};

// Crear un nuevo cliente
export const createCliente = async (cliente) => {
  try {
    const response = await api.post('/clientes', cliente);
    return response.data;
  } catch (error) {
    console.error('Error al crear el cliente', error);
    throw error;
  }
};

// Actualizar un cliente existente
export const updateCliente = async (id, cliente) => {
  try {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el cliente con id ${id}`, error);
    throw error;
  }
};

// Eliminar un cliente
export const deleteCliente = async (id) => {
  try {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el cliente con id ${id}`, error);
    throw error;
  }
};

// Exportar la instancia base de axios para su uso directo si es necesario
export default api;
*/