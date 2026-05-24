// Supplier API endpoints
import api from './service';
import { API_CONFIG } from './config';
import { Supplier } from '../types';

export const suppliersApi = {
  // Get all suppliers
  getAll: async (): Promise<Supplier[]> => {
    return api.get<Supplier[]>(API_CONFIG.ENDPOINTS.SUPPLIERS);
  },

  // Get single supplier
  getById: async (id: string): Promise<Supplier> => {
    return api.get<Supplier>(API_CONFIG.ENDPOINTS.SUPPLIER_DETAIL(id));
  },

  // Create new supplier
  create: async (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>): Promise<Supplier> => {
    return api.post<Supplier>(API_CONFIG.ENDPOINTS.SUPPLIERS, supplier);
  },

  // Update supplier
  update: async (id: string, supplier: Partial<Supplier>): Promise<Supplier> => {
    return api.put<Supplier>(API_CONFIG.ENDPOINTS.SUPPLIER_DETAIL(id), supplier);
  },

  // Delete supplier
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(API_CONFIG.ENDPOINTS.SUPPLIER_DETAIL(id));
  },
};
