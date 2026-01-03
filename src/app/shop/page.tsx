import { ActiveFilters } from '@/components/shop/ActiveFilters';
import { Pagination } from '@/components/shop/Pagination';
import { ProductCard } from '@/components/shop/ProductCard';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { productService } from '@/services/product.service';
import { Product, PaginatedProducts, ProductFilters } from '@/types/product';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ProductFilters>;
}) {
  const urlFilters = await searchParams;

  const filters: ProductFilters = {
    ...urlFilters,
    page: urlFilters.page ? Number(urlFilters.page) : 1,
    limit: urlFilters.limit ? Number(urlFilters.limit) : 12
  };

  let data: PaginatedProducts;

  try {
    data = await productService.getFiltered(filters);
  } catch (error) {
    console.error("Error cargando productos:", error);
    data = {
      products: [],
      totalProducts: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false
    };
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-24">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <ShopSidebar />

        <div className="flex-1">
          <ActiveFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {data.products.length > 0 ? (
              data.products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500 italic">
                No se encontraron productos en esta categoría.
              </div>
            )}
          </div>

          <Pagination data={data} />
        </div>
      </div>
    </main>
  );
}