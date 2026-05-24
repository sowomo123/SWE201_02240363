// Domain Types for Inventory Manager

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  supplierId: string;
  category: string;
  minStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  suppliers: Supplier[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
