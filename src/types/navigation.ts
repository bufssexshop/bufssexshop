export interface SubCategoryOption {
  label: string;
  route: string;
}

export interface MainCategory {
  id: string;
  label: string;
  category: string;
  options: SubCategoryOption[];
}