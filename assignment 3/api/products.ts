// Product API endpoints
import api from './service';
import { API_CONFIG } from './config';
import { Product, ApiResponse } from '../types';

export const productsApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    return api.get<Product[]>(API_CONFIG.ENDPOINTS.PRODUCTS);
  },

  // Get single product
  getById: async (id: string): Promise<Product> => {
    return api.get<Product>(API_CONFIG.ENDPOINTS.PRODUCT_DETAIL(id));
  },

  // Create new product
  create: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    return api.post<Product>(API_CONFIG.ENDPOINTS.PRODUCTS, product);
  },

  // Update product
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    return api.put<Product>(API_CONFIG.ENDPOINTS.PRODUCT_DETAIL(id), product);
  },

  // Delete product
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(API_CONFIG.ENDPOINTS.PRODUCT_DETAIL(id));
  },

  // Search products
  search: async (query: string): Promise<Product[]> => {
    return api.get<Product[]>(`${API_CONFIG.ENDPOINTS.PRODUCTS}?q=${query}`);
  },

  // Filter by category
  filterByCategory: async (category: string): Promise<Product[]> => {
    return api.get<Product[]>(`${API_CONFIG.ENDPOINTS.PRODUCTS}?category=${category}`);
  },
};
