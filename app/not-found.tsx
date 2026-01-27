"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-300 p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white/5 backdrop-blur-md shadow-xl border border-white/10 px-10 py-16 text-center">
        <h1 className="text-6xl font-bold text-pink-900 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-pink-900 mb-2">Page not found</h2>

        <p className="text-pink-800 mb-8">
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          href="/"
          className="inline-block rounded-xl bg-amber-500/90 text-pink-950 px-6 py-3 font-semibold hover:bg-amber-500 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
