import { Product, ProductFilters } from '@/types/product';

export interface PaginatedProducts {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:8000';

export const productService = {
  getAll: async (page = 1): Promise<PaginatedProducts> => {
    const res = await fetch(`${API_URL}/products/all?page=${page}&limit=12`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        next: { revalidate: 3600 }
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

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
    const res = await fetch(`${API_URL}/products/category/${category}`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error('Error por categoría');
    return res.json();
  },

  getBySubcategory: async (category: string, subcategory: string) => {
    const res = await fetch(`${API_URL}/products/category/${category}/${subcategory}`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error('Error por subcategoría');
    return res.json();
  },

  getFiltered: async (filters: ProductFilters): Promise<PaginatedProducts> => {
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>);

    const query = new URLSearchParams(cleanFilters).toString();

    const res = await fetch(`${API_URL}/products/filter?${query}`, {
      next: { revalidate: 300 }
    });

    if (!res.ok) throw new Error('Error en el filtrado');
    return res.json();
  }
};