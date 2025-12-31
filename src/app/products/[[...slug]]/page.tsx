import { PaginatedProducts, productService } from '@/services/product.service';
import { ProductCard } from '@/components/shop/ProductCard';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import ScrollToTop from '@/components/utils/scrollToTop';
import { ActiveFilters } from '@/components/shop/ActiveFilters';
import { Pagination } from '@/components/shop/Pagination';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{
    search?: string;
    min?: string;
    max?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  const slug = resolvedParams.slug || [];
  const category = slug[0];
  const subcategory = slug[1];

  const search = resolvedSearch.search;
  const minPrice = resolvedSearch.min ? Number(resolvedSearch.min) : undefined;
  const maxPrice = resolvedSearch.max ? Number(resolvedSearch.max) : undefined;

  const page = resolvedSearch.page ? Number(resolvedSearch.page) : 1;

  let data: PaginatedProducts = {
    products: [],
    totalProducts: 0,
    totalPages: 0,
    page: 1,
    hasNextPage: false
  };

  const activeFilters = [];
  if (search) activeFilters.push({ label: `Búsqueda: ${search}`, key: 'search' });
  if (minPrice) activeFilters.push({ label: `Mín: ${minPrice}`, key: 'min' });
  if (maxPrice) activeFilters.push({ label: `Máx: ${maxPrice}`, key: 'max' });

  try {
    data = await productService.getFiltered({
      category,
      subcategory,
      search,
      min: minPrice,
      max: maxPrice,
      page
    });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
  }

  const products = data.products || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <ScrollToTop />
      <header className="mb-12 pt-8 text-center md:text-start">
         <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
           {subcategory || category || 'Nuestro'} <span className="text-brand-pink drop-shadow-[0_0_15px_rgba(255,45,146,0.4)]">Catálogo</span>
         </h1>
         <p className="text-gray-400 mt-4 italic font-medium text-lg">
           Explora <span className="text-white">{data.totalProducts}</span> joyas seleccionadas para tu placer
         </p>
      </header>

      {/* LEFT COLUMN */}
      <div className="flex flex-col md:flex-row gap-12 w-full items-start">
        <div className="w-full md:w-72 shrink-0">
          <ShopSidebar />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 min-w-0 w-full">
          <ActiveFilters />

          {products.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 px-6">
              <p className="text-white font-black text-xl italic uppercase tracking-tighter mb-2">
                {search || minPrice || maxPrice
                  ? "Sin coincidencias exactas"
                  : "Próximamente"}
              </p>
              <p className="text-gray-400 text-sm font-medium max-w-xs mx-auto mb-8">
                {search || minPrice || maxPrice
                  ? `No encontramos joyas que coincidan con tus filtros actuales. Prueba ajustando el presupuesto o la búsqueda.`
                  : "Aún estamos preparando esta selección de placer para ti."}
              </p>

              {(search || minPrice || maxPrice) && (
                <Link
                  href="/products"
                  className="inline-block bg-brand-pink text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-pink-600 transition-all active:scale-95"
                >
                  Limpiar Filtros
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 overflow-hidden">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <Pagination data={data} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}