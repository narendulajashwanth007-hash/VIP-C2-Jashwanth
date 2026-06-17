import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

// Add JWT token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopez_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized errors (like expired or orphaned tokens)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('shopez_token');
      localStorage.removeItem('shopez_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const toggleWishlist = (productId) => API.post('/auth/wishlist/toggle', { productId });
export const getWishlist = () => API.get('/auth/wishlist');

// Product APIs
export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Cart APIs
export const getCartItems = (userId) => API.get(`/cart/${userId}`);
export const addToCart = (data) => API.post('/cart', data);
export const updateCartItem = (id, data) => API.put(`/cart/${id}`, data);
export const deleteCartItem = (id) => API.delete(`/cart/${id}`);

// Order APIs
export const createOrder = (data) => API.post('/orders', data);
export const getUserOrders = (userId) => API.get(`/orders/${userId}`);
export const cancelOrder = (orderId) => API.post(`/orders/${orderId}/cancel`);

// Admin APIs
export const getDashboard = () => API.get('/admin/dashboard');
export const getAllUsers = () => API.get('/admin/users');
export const getAllOrders = () => API.get('/admin/orders');
export const updateOrderStatus = (id, data) => API.put(`/admin/orders/${id}`, data);
export const updateBanner = (data) => API.post('/admin/banner', data);
export const updateCategories = (data) => API.post('/admin/categories', data);
export const getAdminConfig = () => API.get('/admin/config');

export default API;
