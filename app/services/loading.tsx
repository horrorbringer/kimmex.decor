export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-sand-50 animate-pulse">
      <div className="h-16 bg-white/80 backdrop-blur" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-12 bg-sand-200 rounded w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-video bg-sand-200" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-sand-200 rounded w-2/3" />
                <div className="h-4 bg-sand-200 rounded" />
                <div className="h-4 bg-sand-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
