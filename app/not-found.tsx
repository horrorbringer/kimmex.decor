import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-ink-900 mb-4">404</h1>
        <p className="text-lg text-ink-700/70 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-ink-900 text-white rounded-xl hover:bg-ink-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
