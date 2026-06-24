export default function Loading() {
  return (
    <div className="min-h-screen bg-sand-50 animate-pulse">
      <div className="h-16 bg-white/80 backdrop-blur" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-96 bg-sand-200 rounded-2xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-sand-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
