'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { 
  Building2, MapPin, ChevronRight, CheckCircle, 
  ArrowRight, Info, Home, Building, Warehouse
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function AddPropertyStep1() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState('flat');
  const [listingType, setListingType] = useState('rent');

  const propertyTypes = [
    { id: 'flat', label: 'Flat', icon: Building },
    { id: 'house', label: 'House', icon: Home },
    { id: 'duplex', label: 'Duplex', icon: Building2 },
    { id: 'bungalow', label: 'Bungalow', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building2 },
    { id: 'warehouse', label: 'Warehouse', icon: Warehouse },
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      type: propertyType,
      listingType: listingType,
      city: formData.get('city'),
      state: formData.get('state'),
      address: formData.get('address'),
    };
    
    localStorage.setItem('homesure_temp_property', JSON.stringify(data));
    router.push('/landlord/add/step2');
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20 max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-text-primary mb-2">List Property</h1>
            <p className="text-text-secondary">Step 1 of 4: Basic Information</p>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4].map(s => (
              <div key={s} className={cn("w-3 h-3 rounded-full", s === 1 ? "bg-primary" : "bg-gray-200")} />
            ))}
          </div>
        </div>

        <form onSubmit={handleNext} className="space-y-10">
          <div className="card p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase text-text-secondary tracking-widest">What type of property is it?</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {propertyTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPropertyType(t.id)}
                    className={cn(
                      "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all",
                      propertyType === t.id 
                        ? "border-primary bg-primary/5 text-primary scale-105 shadow-lg" 
                        : "border-gray-100 bg-white text-text-secondary hover:border-primary/30"
                    )}
                  >
                    <t.icon size={28} />
                    <span className="font-bold text-sm">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Is it for Rent or Sale?</label>
              <div className="flex p-1 bg-surface rounded-2xl gap-2 border border-gray-100">
                {['rent', 'buy'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setListingType(t)}
                    className={cn(
                      "flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all",
                      listingType === t 
                        ? "bg-white text-primary shadow-xl" 
                        : "text-text-secondary hover:text-primary"
                    )}
                  >
                    For {t === 'rent' ? 'Rent' : 'Sale'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MapPin className="text-primary" size={24} />
              Property Location
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">State</label>
                <select name="state" required className="input-field">
                  <option value="Lagos">Lagos</option>
                  <option value="FCT">Abuja (FCT)</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Kano">Kano</option>
                  <option value="Oyo">Oyo</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">City / Area</label>
                <input name="city" required placeholder="e.g. Lekki Phase 1" className="input-field" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Complete Address</label>
              <input name="address" required placeholder="Plot number, Street name, Estate..." className="input-field" />
            </div>

            <div className="p-4 bg-primary/5 rounded-xl flex items-center gap-4 text-primary text-sm font-medium border border-primary/10">
              <Info size={20} />
              Accurate locations help our verification team find your property faster.
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button type="button" onClick={() => router.back()} className="text-text-secondary font-bold hover:text-text-primary px-6">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-12">
              Continue
              <ChevronRight size={20} />
            </button>
          </div>
        </form>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
