export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-sand-50 animate-pulse">
      <div className="h-16 bg-white/80 backdrop-blur" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-sand-200 rounded-2xl" />
          <div className="space-y-6 py-4">
            <div className="h-8 bg-sand-200 rounded w-3/4" />
            <div className="h-4 bg-sand-200 rounded w-1/2" />
            <div className="h-10 bg-sand-200 rounded w-1/4" />
            <div className="space-y-2">
              <div className="h-3 bg-sand-200 rounded" />
              <div className="h-3 bg-sand-200 rounded" />
              <div className="h-3 bg-sand-200 rounded w-2/3" />
            </div>
            <div className="h-12 bg-sand-200 rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
