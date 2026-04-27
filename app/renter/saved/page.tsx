'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { PropertyCard } from '@/components/PropertyCard';
import { storage } from '@/lib/storage';
import { Property } from '@/lib/types';
import { Heart, Search, LayoutDashboard, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SavedPropertiesPage() {
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (user) {
      storage.init();
      const allProps = storage.getProperties();
      const saved = allProps.filter(p => user.savedProperties.includes(p.id));
      setSavedProperties(saved);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <Link href="/renter" className="flex items-center gap-2 text-primary font-bold mb-8 hover:translate-x-1 transition-all">
          <ChevronLeft size={20} />
          Back to Dashboard
        </Link>
        
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-text-primary flex items-center gap-4">
              Saved Properties
              <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-black">
                {savedProperties.length}
              </span>
            </h1>
            <p className="text-text-secondary mt-2">Properties you&apos;ve bookmarked for later consideration.</p>
          </div>
        </div>

        {savedProperties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <PropertyCard property={prop} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center flex flex-col items-center gap-6 shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-text-secondary">
              <Heart size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">No saved properties yet</h3>
              <p className="text-text-secondary">Explore verified listings and click the heart icon to save them here.</p>
            </div>
            <Link href="/search" className="btn-primary px-10">
              Start Searching
            </Link>
          </div>
        )}
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
