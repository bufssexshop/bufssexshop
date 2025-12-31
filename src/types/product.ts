export interface Product {
  _id: string;
  code: string;
  name: string;
  price: number;
  creditPrice: number;
  promotion: boolean;
  promotionValue: number;
  details: string;
  category: string;
  subcategory: string;
  secondaryCategory?: string;
  secondarySubcategory?: string;
  available: boolean;
  image: string;
  image2?: string;
  pictureId: string;
  pictureId2?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  search?: string;
  min?: string | number;
  max?: string | number;
  page?: number;
  limit?: number;
}