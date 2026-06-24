export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-sand-50 animate-pulse">
      <div className="h-16 bg-white/80 backdrop-blur" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-12 bg-sand-200 rounded w-48 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-square bg-sand-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-sand-200 rounded w-3/4" />
                <div className="h-3 bg-sand-200 rounded w-1/2" />
                <div className="h-5 bg-sand-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
