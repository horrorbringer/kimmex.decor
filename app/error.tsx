"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-ink-900 mb-4">Oops</h1>
        <p className="text-lg text-ink-700/70 mb-8">
          Something went wrong. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-ink-900 text-white rounded-xl hover:bg-ink-700 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-ink-900/20 text-ink-900 rounded-xl hover:bg-ink-900/5 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
