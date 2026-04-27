'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';

export default function Loading() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 border-8 border-primary/20 rounded-full" />
        <div className="absolute top-0 left-0 w-24 h-24 border-8 border-primary rounded-full border-t-transparent animate-spin" />
      </div>
      <h2 className="text-2xl font-black text-text-primary mb-2">Securing your journey...</h2>
      <p className="text-text-secondary max-w-[200px] mx-auto text-sm">Verifying listings and protecting payments. Every time.</p>
    </div>
  );
}
