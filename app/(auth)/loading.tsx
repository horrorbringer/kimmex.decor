export default function AuthLoading() {
  return (
    <main className="content-shell grid min-h-[calc(100vh-73px)] place-items-center py-8" aria-busy="true">
      <div className="w-full max-w-md animate-pulse rounded-xl border border-sand-300 bg-white p-6 shadow-panel sm:p-8">
        <div className="h-3 w-24 rounded bg-sand-300" />
        <div className="mt-4 h-10 w-3/4 rounded bg-sand-300" />
        <div className="mt-4 h-4 w-full rounded bg-sand-200" />
        <div className="mt-8 space-y-4">
          <div className="h-12 rounded-lg bg-sand-200" />
          <div className="h-12 rounded-lg bg-sand-200" />
          <div className="h-12 rounded-lg bg-sand-300" />
        </div>
        <span className="sr-only">Loading authentication page</span>
      </div>
    </main>
  );
}
