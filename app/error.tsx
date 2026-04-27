'use client';

import React from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <h2 className="text-3xl font-black text-text-primary mb-4">Something went wrong</h2>
      <p className="text-text-secondary max-w-sm mx-auto mb-8">
        We encountered an error while protecting your property search. Please try again or return home.
      </p>
      <div className="flex gap-4">
        <button onClick={() => reset()} className="btn-primary">Try Again</button>
        <Link href="/" className="btn-outline">Return Home</Link>
      </div>
    </div>
  );
}
