'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/lib/types';
import { cn, formatNaira } from '@/lib/utils';
import { Bed, Bath, User, MapPin, CheckCircle, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { motion, AnimatePresence } from 'framer-motion';

export function PropertyCard({ property }: { property: Property }) {
  const { user, updateUser } = useAuth();
  const [currentImage, setCurrentImage] = useState(0);
  const isSaved = user?.savedProperties.includes(property.id);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    
    const newSaved = isSaved 
      ? user.savedProperties.filter(id => id !== property.id)
      : [...user.savedProperties, property.id];
    
    updateUser({ savedProperties: newSaved });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <Link href={`/property/${property.id}`} className="group block h-full">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col h-full relative overflow-hidden">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImage}
              src={property.images[currentImage]} 
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </AnimatePresence>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {property.verification.status === 'verified' && (
              <div className="bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                <CheckCircle size={12} strokeWidth={3} />
                VERIFIED
              </div>
            )}
            <div className="bg-accent/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
              FOR {property.listingType.toUpperCase()}
            </div>
          </div>

          <button 
            onClick={toggleSave}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm",
              isSaved ? "bg-accent text-white" : "bg-white/80 text-text-primary hover:bg-white"
            )}
          >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>

          {/* Navigation Overlay */}
          {property.images.length > 1 && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between px-2 pointer-events-none">
              <button 
                onClick={prevImage}
                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-primary pointer-events-auto shadow-md"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-primary pointer-events-auto shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
              {property.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 text-text-secondary text-sm">
            <MapPin size={14} className="flex-shrink-0" />
            <span className="truncate">{property.location.address}, {property.location.city}</span>
          </div>

          <div className="flex items-center gap-4 text-text-primary/70 text-sm py-2 border-y border-gray-100">
            <div className="flex items-center gap-1">
              <Bed size={16} className="text-primary" />
              <span className="font-medium">{property.details.bedrooms} beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={16} className="text-primary" />
              <span className="font-medium">{property.details.bathrooms} baths</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} className="text-primary" />
              <span className="font-medium">{property.details.toilets} toilets</span>
            </div>
          </div>

          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-black text-primary">
                {formatNaira(property.price)}
              </span>
              <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">
                Per {property.pricePeriod}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
