// Product Context with useReducer
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductState, Product, Supplier } from '../types';
import { productsApi } from '../api/products';
import { suppliersApi } from '../api/suppliers';

// Action types
type ProductAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { products: Product[]; suppliers: Supplier[] } }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_SUPPLIER'; payload: Supplier }
  | { type: 'UPDATE_SUPPLIER'; payload: Supplier }
  | { type: 'DELETE_SUPPLIER'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY_FILTER'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: ProductState = {
  products: [],
  suppliers: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedCategory: '',
};

// Reducer
const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        suppliers: action.payload.suppliers,
        isLoading: false,
        error: null,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
        error: null,
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
        error: null,
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
        error: null,
      };
    case 'ADD_SUPPLIER':
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
        error: null,
      };
    case 'UPDATE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.map(s =>
          s.id === action.payload.id ? action.payload : s
        ),
        error: null,
      };
    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter(s => s.id !== action.payload),
        error: null,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Context
const ProductContext = createContext<{
  state: ProductState;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addSupplier: (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => Promise<void>;
  deleteSupplier: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  clearError: () => void;
  getFilteredProducts: () => Product[];
} | undefined>(undefined);

// Provider
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Rehydrate state on app start
  useEffect(() => {
    const rehydrateState = async () => {
      try {
        const searchQuery = await AsyncStorage.getItem('search_query');
        const selectedCategory = await AsyncStorage.getItem('selected_category');
        
        if (searchQuery) {
          dispatch({ type: 'SET_SEARCH_QUERY', payload: searchQuery });
        }
        if (selectedCategory) {
          dispatch({ type: 'SET_CATEGORY_FILTER', payload: selectedCategory });
        }
      } catch (error) {
        console.error('Error rehydrating product state:', error);
      }
    };

    rehydrateState();
  }, []);

  // Persist filters on state change
  useEffect(() => {
    AsyncStorage.setItem('search_query', state.searchQuery);
    AsyncStorage.setItem('selected_category', state.selectedCategory);
  }, [state.searchQuery, state.selectedCategory]);

  const fetchProducts = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const [products, suppliers] = await Promise.all([
        productsApi.getAll(),
        suppliersApi.getAll(),
      ]);
      dispatch({ type: 'FETCH_SUCCESS', payload: { products, suppliers } });
    } catch (error: any) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message || 'Failed to fetch data' });
      throw error;
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProduct = await productsApi.create(product);
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    } catch (error: any) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message || 'Failed to add product' });
      throw error;
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      const updatedProduct = await productsApi.update(id, product);
      dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
    } catch (error: any) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message || 'Failed to update product' });
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productsApi.delete(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    } catch (error: any) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message || 'Failed to delete product' });
      throw error;
    }
  };

  const addSupplier = async (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newSupplier = await suppliersApi.create(supplier);
      dispatch({ type: 'ADD_SUPPLIER', payload: newSupplier });
    } catch (error: any) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message || 'Failed to add supplier' });
      throw error;
    }
  };

  const updateSupplier = async (id: string, supplier: Partial<Supplier>) => {
    try {
      const updatedSupplier = await suppliersApi.update(id, supplier);
      dispatch({ type: 'UPDATE_SUPPLIER', payload: updatedSupplier });
    } catch (error: any) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message || 'Failed to update supplier' });
      throw error;
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      await suppliersApi.delete(id);
      dispatch({ type: 'DELETE_SUPPLIER', payload: id });
    } catch (error: any) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message || 'Failed to delete supplier' });
      throw error;
    }
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setCategoryFilter = (category: string) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: category });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const getFilteredProducts = (): Product[] => {
    let filtered = state.products;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (state.selectedCategory) {
      filtered = filtered.filter(p => p.category === state.selectedCategory);
    }

    return filtered;
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        setSearchQuery,
        setCategoryFilter,
        clearError,
        getFilteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
