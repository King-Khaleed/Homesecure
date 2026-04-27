'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ShieldCheck, Calendar, CheckCircle, ChevronLeft, Loader2, Award, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { storage } from '@/lib/storage';
import { Property } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function AddPropertyStep4() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [tempData, setTempData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('homesure_temp_property');
    if (!data) router.push('/landlord/add/step1');
    setTempData(JSON.parse(data || '{}'));
  }, [router]);

  const handleSubmit = () => {
    if (!user) return;
    setIsSubmitting(true);

    const newProperty: Property = {
      id: `prop_${Date.now()}`,
      title: tempData.title,
      description: tempData.description,
      price: tempData.price,
      pricePeriod: tempData.pricePeriod,
      type: tempData.type,
      listingType: tempData.listingType,
      location: {
        address: tempData.address,
        city: tempData.city,
        state: tempData.state,
        lga: 'LGA Name',
        coordinates: { lat: 6.5, lng: 3.3 }
      },
      details: {
        bedrooms: tempData.bedrooms,
        bathrooms: tempData.bathrooms,
        toilets: tempData.toilets,
        parking: tempData.parking,
        yearBuilt: 2024,
        totalRooms: tempData.bedrooms + 2,
        furnishing: tempData.furnishing
      },
      amenities: tempData.amenities,
      images: tempData.images,
      videoTour: null,
      verification: {
        status: 'pending',
        verifiedAt: null,
        verifierId: null,
        notes: 'Verification requested'
      },
      ownerId: user.id,
      status: 'pending',
      views: 0,
      inquiries: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTimeout(() => {
      storage.saveProperty(newProperty);
      localStorage.removeItem('homesure_temp_property');
      toast("Property listing created and submitted for verification!", "success");
      router.push('/landlord/listings');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20 max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-text-primary mb-2">Verification</h1>
            <p className="text-text-secondary">Step 4 of 4: The Homesure Standard</p>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4].map(s => (
              <div key={s} className={cn("w-3 h-3 rounded-full", "bg-primary")} />
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-primary text-white p-10 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rotate-45 translate-x-12 -translate-y-12" />
             <ShieldCheck size={64} className="text-accent mb-8" />
             <h2 className="text-3xl font-black mb-4">You&apos;re almost there!</h2>
             <p className="text-white/80 text-lg leading-relaxed mb-10">
               To protect our community, every listing on Homesure must be physically verified by our team. This process ensures your property gets the &quot;Verified&quot; badge, building instant trust with tenants.
             </p>

             <div className="grid md:grid-cols-2 gap-6">
               <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                 <h4 className="font-bold mb-2 flex items-center gap-2">
                   <Calendar size={18} className="text-accent" />
                   Schedule Visit
                 </h4>
                 <p className="text-sm text-white/60">An inspector will contact you within 24 hours to visit the property.</p>
               </div>
               <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                 <h4 className="font-bold mb-2 flex items-center gap-2">
                   <Award size={18} className="text-accent" />
                   Verification Badge
                 </h4>
                 <p className="text-sm text-white/60">Unlock higher visibility and pre-screened applications instantly.</p>
               </div>
             </div>
          </div>

          <div className="card p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle className="text-primary" size={24} />
              Final Confirmation
            </h3>
            <p className="text-text-secondary leading-relaxed">
              By submitting this listing, you confirm that all details provided are accurate. False information will lead to listing rejection and potential account suspension.
            </p>
            
            <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-gray-100 italic text-sm">
              <Info size={20} className="text-primary flex-shrink-0" />
              There is a one-time verification fee of ₦5,000 for your first listing.
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button disabled={isSubmitting} onClick={() => router.back()} className="flex items-center gap-2 text-text-secondary font-bold hover:text-text-primary px-6">
               <ChevronLeft size={20} />
               Back
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="btn-accent px-16 py-4 text-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving Listing...
                </>
              ) : (
                <>
                  Finish & Schedule Visit
                  <CheckCircle size={24} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
