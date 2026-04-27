'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Image as ImageIcon, Upload, X, ChevronRight, ChevronLeft, Plus, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function AddPropertyStep3() {
  const router = useRouter();
  const { toast } = useToast();
  const [tempData, setTempData] = useState<any>({});
  const [images, setImages] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('homesure_temp_property');
    if (!data) router.push('/landlord/add/step1');
    setTempData(JSON.parse(data || '{}'));
  }, [router]);

  const availableAmenities = [
    '24h Power', 'Security', 'Running Water', 'AC', 'Parking', 
    'Internet', 'Swimming Pool', 'Gym', 'Gated Estate', 'CCTV'
  ];

  const handleNext = () => {
    if (images.length === 0) {
      toast("Please add at least one image.", "error");
      return;
    }
    
    const updatedData = {
      ...tempData,
      images: images,
      amenities: amenities
    };
    
    localStorage.setItem('homesure_temp_property', JSON.stringify(updatedData));
    router.push('/landlord/add/step4');
  };

  const addMockImage = () => {
    const seed = Math.random().toString(36).substring(7);
    setImages(prev => [...prev, `https://picsum.photos/seed/${seed}/800/600`]);
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20 max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-text-primary mb-2">Media & Amenities</h1>
            <p className="text-text-secondary">Step 3 of 4: Visuals & Features</p>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4].map(s => (
              <div key={s} className={cn("w-3 h-3 rounded-full", s <= 3 ? "bg-primary" : "bg-gray-200")} />
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="card p-8 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ImageIcon className="text-primary" size={24} />
              Property Photos
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary group">
                  <img src={img} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-danger shadow-md"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button 
                onClick={addMockImage}
                className="aspect-square rounded-xl border-4 border-dashed border-gray-100 flex flex-col items-center justify-center gap-2 text-text-secondary hover:border-primary/30 transition-all bg-white"
              >
                <Plus size={32} />
                <span className="text-xs font-bold font-black uppercase tracking-widest">Add Photo</span>
              </button>
            </div>
            <p className="text-xs text-text-secondary font-medium">Add at least 3 high-quality photos (Living room, Bedroom, Kitchen, Exterior).</p>
          </div>

          <div className="card p-8 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle className="text-primary" size={24} />
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableAmenities.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-sm font-bold",
                    amenities.includes(amenity)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-50 bg-white text-text-secondary hover:border-primary/20"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center transition-all",
                    amenities.includes(amenity) ? "bg-primary text-white" : "bg-gray-100 text-transparent"
                  )}>
                    <CheckCircle size={14} />
                  </div>
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-text-secondary font-bold hover:text-text-primary px-6">
               <ChevronLeft size={20} />
               Back
            </button>
            <button onClick={handleNext} className="btn-primary px-12">
              Continue
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
