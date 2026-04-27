'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { 
  Bed, Bath, User, Car, Info, ChevronRight, ChevronLeft, 
  Warehouse, Tag, Ruler, Calendar, CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AddPropertyStep2() {
  const router = useRouter();
  const [tempData, setTempData] = useState<any>({});

  useEffect(() => {
    const data = localStorage.getItem('homesure_temp_property');
    if (!data) router.push('/landlord/add/step1');
    setTempData(JSON.parse(data || '{}'));
  }, [router]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updatedData = {
      ...tempData,
      title: formData.get('title'),
      description: formData.get('description'),
      price: parseInt(formData.get('price') as string),
      pricePeriod: formData.get('pricePeriod'),
      bedrooms: parseInt(formData.get('bedrooms') as string),
      bathrooms: parseInt(formData.get('bathrooms') as string),
      toilets: parseInt(formData.get('toilets') as string),
      parking: parseInt(formData.get('parking') as string),
      furnishing: formData.get('furnishing'),
    };
    
    localStorage.setItem('homesure_temp_property', JSON.stringify(updatedData));
    router.push('/landlord/add/step3');
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20 max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-text-primary mb-2">Property Details</h1>
            <p className="text-text-secondary">Step 2 of 4: Specifications & Pricing</p>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4].map(s => (
              <div key={s} className={cn("w-3 h-3 rounded-full", s <= 2 ? "bg-primary" : "bg-gray-200")} />
            ))}
          </div>
        </div>

        <form onSubmit={handleNext} className="space-y-10">
          <div className="card p-8 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Tag className="text-primary" size={24} />
              Basic Info
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Listing Title</label>
                <input name="title" required placeholder="e.g. Modern 3 Bedroom Flat with 24h Power" className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Description</label>
                <textarea name="description" required rows={4} placeholder="Describe the property, neighborhood, highlights..." className="input-field resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="card p-8 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Warehouse className="text-primary" size={24} />
              Specifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Bedrooms</label>
                <input type="number" name="bedrooms" required defaultValue={1} min={0} className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Bathrooms</label>
                <input type="number" name="bathrooms" required defaultValue={1} min={0} className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Toilets</label>
                <input type="number" name="toilets" required defaultValue={1} min={0} className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Parking Spaces</label>
                <input type="number" name="parking" required defaultValue={1} min={0} className="input-field" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Furnishing</label>
              <select name="furnishing" required className="input-field">
                <option value="unfurnished">Unfurnished</option>
                <option value="semi-furnished">Semi-furnished</option>
                <option value="furnished">Fully Furnished</option>
              </select>
            </div>
          </div>

          <div className="card p-8 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CreditCard className="text-primary" size={24} />
              Pricing
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Price (₦)</label>
                <input type="number" name="price" required placeholder="0" className="input-field font-black text-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Price Period</label>
                <select name="pricePeriod" required className="input-field">
                  {tempData.listingType === 'rent' ? (
                    <>
                      <option value="year">Per Year</option>
                      <option value="month">Per Month</option>
                    </>
                  ) : (
                    <option value="sale">Full Payment (Sale)</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-text-secondary font-bold hover:text-text-primary px-6">
               <ChevronLeft size={20} />
               Back
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
