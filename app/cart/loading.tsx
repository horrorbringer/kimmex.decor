export default function CartLoading() {
  return (
    <div className="min-h-screen bg-sand-50 animate-pulse">
      <div className="h-16 bg-white/80 backdrop-blur" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-10 bg-sand-200 rounded w-32 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 flex gap-6 shadow-sm">
              <div className="w-24 h-24 bg-sand-200 rounded-lg shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-sand-200 rounded w-1/3" />
                <div className="h-4 bg-sand-200 rounded w-1/4" />
                <div className="h-8 bg-sand-200 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
