import api from '@/lib/axios';
import { Product, ProductFilters } from '@/types/product';

export interface PaginatedProducts {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
}

export const productService = {
  getAll: async (page = 1): Promise<PaginatedProducts> => {
    const response = await api.get(`/products/all?page=${page}&limit=12`);
    return response.data; // Viene como { products: [], totalProducts: ... }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const { data } = await api.get<{ success: boolean; product: Product }>(`products/${id}`);

      if (!data.product) {
        throw new Error("El backend no devolvió el objeto 'product'");
      }

      return data.product;
    } catch (error) {
      console.error(`Error al obtener el producto ${id}:`, error);
      throw error;
    }
  },

  getByCategory: async (category: string) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  getBySubcategory: async (category: string, subcategory: string) => {
    const response = await api.get(`/products/category/${category}/${subcategory}`);
    return response.data;
  },

  getFiltered: async (filters: ProductFilters) => {
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>);

    const query = new URLSearchParams(cleanFilters).toString();
    const response = await api.get(`/products/filter?${query}`);
    return response.data;
  }
};