export const SidebarSkeleton = () => (
  <div className="w-full lg:w-64 space-y-6 animate-pulse">
    <div className="h-8 bg-white/10 rounded w-1/2" />
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-6 bg-white/5 rounded w-full" />
      ))}
    </div>
  </div>
);

export const FiltersSkeleton = () => (
  <div className="h-10 w-full bg-white/10 animate-pulse rounded-full mb-6" />
);