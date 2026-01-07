export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <header className="mb-12 pt-8 text-center md:text-start">
        <div className="h-16 md:h-20 bg-white/5 rounded-2xl w-3/4 mb-4 animate-pulse" />
        <div className="h-6 bg-white/5 rounded-full w-64 animate-pulse" />
      </header>

      <div className="flex flex-col md:flex-row gap-12 w-full items-start">
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-72 shrink-0 space-y-6">
          <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-48 bg-white/5 rounded-2xl animate-pulse" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="flex-1 min-w-0 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="group relative flex flex-col w-full bg-white/5 rounded-4xl p-4 border border-white/10 animate-pulse">
                <div className="aspect-square w-full bg-white/10 rounded-3xl mb-4" />
                <div className="h-4 bg-white/10 rounded-full w-3/4 mb-2" />
                <div className="h-6 bg-white/10 rounded-full w-full mb-2" />
                <div className="h-8 bg-white/10 rounded-xl w-1/2 mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}