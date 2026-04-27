'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { PropertyCard } from '@/components/PropertyCard';
import { storage } from '@/lib/storage';
import { Property } from '@/lib/types';
import { Search, Filter, SlidersHorizontal, MapPin, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [propertyType, setPropertyType] = useState<string>('All');
  const [listingType, setListingType] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [bedrooms, setBedrooms] = useState<string>('Any');

  useEffect(() => {
    storage.init();
    setProperties(storage.getProperties());
  }, []);

  useEffect(() => {
    let results = properties.filter(prop => {
      const matchSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prop.location.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCity = selectedCity === 'All' || prop.location.city === selectedCity;
      const matchType = propertyType === 'All' || prop.type === propertyType;
      const matchListing = listingType === 'All' || prop.listingType === listingType;
      const matchPrice = prop.price >= priceRange[0] && prop.price <= priceRange[1];
      const matchBedrooms = bedrooms === 'Any' || prop.details.bedrooms >= parseInt(bedrooms);
      
      return matchSearch && matchCity && matchType && matchListing && matchPrice && matchBedrooms;
    });
    setFilteredProperties(results);
  }, [searchQuery, selectedCity, propertyType, listingType, priceRange, bedrooms, properties]);

  const cities = ['All', 'Lagos', 'Abuja', 'Ibadan', 'Port Harcourt', 'Kano'];
  const types = ['All', 'flat', 'house', 'duplex', 'bungalow', 'commercial'];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="pt-24 lg:pt-32 pb-10">
        <div className="section-container">
          {/* Search Bar Header */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 bg-surface rounded-lg">
              <Search className="text-primary" size={20} />
              <input 
                type="text" 
                placeholder="Search by neighborhood or property name..." 
                className="w-full bg-transparent outline-none py-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-text-secondary hover:text-primary">
                  <X size={18} />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all",
                showFilters ? "bg-primary text-white" : "bg-white border-2 border-primary text-primary"
              )}
            >
              <SlidersHorizontal size={20} />
              Filters
              {selectedCity !== 'All' || propertyType !== 'All' ? (
                <span className="w-5 h-5 bg-accent text-white text-[10px] rounded-full flex items-center justify-center">!</span>
              ) : null}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <AnimatePresence>
              {(showFilters || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "lg:w-72 space-y-8 bg-white p-6 rounded-2xl self-start lg:sticky lg:top-32 h-fit border border-gray-100 shadow-sm",
                    !showFilters && "hidden lg:block"
                  )}
                >
                  <div className="flex items-center justify-between lg:hidden mb-6">
                    <h3 className="font-bold text-xl">Filters</h3>
                    <button onClick={() => setShowFilters(false)}><X /></button>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-4">Location</label>
                    <div className="grid grid-cols-2 gap-2">
                      {cities.map(city => (
                        <button 
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={cn(
                            "px-3 py-2 rounded-md border text-sm transition-all",
                            selectedCity === city 
                              ? "bg-primary text-white border-primary font-bold" 
                              : "bg-white text-text-secondary border-gray-200 hover:border-primary"
                          )}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-4">Property Type</label>
                    <div className="space-y-2">
                      {types.map(type => (
                        <button 
                          key={type}
                          onClick={() => setPropertyType(type)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all text-sm capitalize",
                            propertyType === type 
                              ? "bg-primary/5 text-primary border-primary font-bold" 
                              : "bg-white text-text-secondary border-gray-200 hover:border-primary"
                          )}
                        >
                          {type}
                          {propertyType === type && <CheckCircle size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-4">Listing Type</label>
                    <div className="flex p-1 bg-surface rounded-lg gap-1 border border-gray-200">
                      {['All', 'rent', 'buy'].map(type => (
                        <button 
                          key={type}
                          onClick={() => setListingType(type)}
                          className={cn(
                            "flex-1 py-2 rounded-md text-sm font-bold capitalize transition-all",
                            listingType === type 
                              ? "bg-white text-primary shadow-sm" 
                              : "text-text-secondary hover:text-primary"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-4">Min. Bedrooms</label>
                    <div className="flex gap-2">
                      {['Any', '1', '2', '3', '4+'].map(num => (
                        <button 
                          key={num}
                          onClick={() => setBedrooms(num)}
                          className={cn(
                            "flex-1 h-10 rounded-md border text-sm font-bold transition-all",
                            bedrooms === num 
                              ? "bg-primary text-white border-primary" 
                              : "bg-white text-text-secondary border-gray-200"
                          )}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedCity('All');
                      setPropertyType('All');
                      setListingType('All');
                      setBedrooms('Any');
                    }}
                    className="w-full text-xs font-bold text-danger hover:underline pt-4"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">
                  {filteredProperties.length} Properties Found
                </h2>
                <div className="flex items-center gap-2 text-sm font-bold text-text-secondary cursor-pointer hover:text-primary transition-colors">
                  Sort: Newest First
                  <ChevronDown size={16} />
                </div>
              </div>

              {filteredProperties.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((prop, i) => (
                    <motion.div
                      key={prop.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <PropertyCard property={prop} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-20 text-center flex flex-col items-center gap-6 border-2 border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center text-text-secondary">
                    <Search size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">No results found</h3>
                    <p className="text-text-secondary">Try adjusting your filters or search terms to find what you&apos;re looking for.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCity('All');
                      setPropertyType('All');
                    }}
                    className="btn-outline"
                  >
                    Clear All Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

function CheckCircle({ size }: { size: number }) {
  return <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-white"><X size={10} strokeWidth={4} /></div>;
}
