'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { storage } from '@/lib/storage';
import { Property } from '@/lib/types';
import { ShieldCheck, CheckCircle, XCircle, Eye, Search, Clock, MapPin, AlertCircle, ChevronRight } from 'lucide-react';
import { formatNaira, cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminVerificationPage() {
  const { toast } = useToast();
  const [pendingProperties, setPendingProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    storage.init();
    const all = storage.getProperties();
    setPendingProperties(all.filter(p => p.verification.status === 'pending'));
  }, []);

  const handleApprove = (id: string) => {
    const all = storage.getProperties();
    const updated = all.map(p => {
      if (p.id === id) {
        return {
          ...p,
          verification: {
            ...p.verification,
            status: 'verified' as any,
            verifiedAt: new Date().toISOString(),
            verifierId: 'admin_1'
          },
          status: 'active' as any
        };
      }
      return p;
    });
    localStorage.setItem('homesure_properties', JSON.stringify(updated));
    setPendingProperties(prev => prev.filter(p => p.id !== id));
    setSelectedProperty(null);
    toast("Property approved successfully!", "success");
    window.dispatchEvent(new Event('storage'));
  };

  const handleReject = (id: string) => {
    const all = storage.getProperties();
    const updated = all.map(p => {
      if (p.id === id) {
        return {
          ...p,
          verification: {
            ...p.verification,
            status: 'rejected' as any,
          }
        };
      }
      return p;
    });
    localStorage.setItem('homesure_properties', JSON.stringify(updated));
    setPendingProperties(prev => prev.filter(p => p.id !== id));
    setSelectedProperty(null);
    toast("Property verification rejected.", "info");
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <div className="bg-text-primary text-white p-12 rounded-3xl flex items-center justify-between mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-4">
              Verification Queue
              <span className="bg-accent px-4 py-1 rounded-full text-sm font-black">{pendingProperties.length} Pending</span>
            </h1>
            <p className="text-white/60">Review and approve property listings to maintain Homesure standards.</p>
          </div>
          <ShieldCheck size={80} className="text-accent opacity-20" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {pendingProperties.length > 0 ? (
              pendingProperties.map((prop) => (
                <div 
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop)}
                  className={cn(
                    "bg-white p-6 rounded-2xl border transition-all cursor-pointer flex items-center gap-6",
                    selectedProperty?.id === prop.id ? "border-primary shadow-xl ring-2 ring-primary/20" : "border-gray-100 hover:border-primary/50"
                  )}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={prop.images[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-lg truncate mb-1">{prop.title}</h3>
                    <p className="text-text-secondary text-sm flex items-center gap-1 mb-3">
                      <MapPin size={12} />
                      {prop.location.city}, {prop.location.state}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-black">{formatNaira(prop.price)}</span>
                      <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{prop.listingType}</span>
                    </div>
                  </div>
                  <ChevronRight size={24} className="text-text-secondary" />
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-32 text-center flex flex-col items-center gap-6 shadow-sm border border-gray-100">
                <CheckCircle size={64} className="text-success opacity-20" />
                <h3 className="text-2xl font-bold">Queue Empty</h3>
                <p className="text-text-secondary">All properties have been reviewed.</p>
              </div>
            )}
          </div>

          <div>
            <AnimatePresence mode="wait">
              {selectedProperty ? (
                <motion.div 
                  key={selectedProperty.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8 sticky top-32 space-y-8"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                    <img src={selectedProperty.images[0]} className="w-full h-full object-cover" />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-black mb-2">{selectedProperty.title}</h2>
                    <p className="text-text-secondary text-sm leading-relaxed">{selectedProperty.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface p-4 rounded-xl">
                      <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Pricing</p>
                      <p className="font-black">{formatNaira(selectedProperty.price)}</p>
                    </div>
                    <div className="bg-surface p-4 rounded-xl">
                      <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Type</p>
                      <p className="font-black capitalize">{selectedProperty.type}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/5 rounded-xl border border-accent/10 flex items-center gap-4 text-accent text-sm font-bold">
                    <AlertCircle size={20} />
                    Ready for inspection?
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => handleReject(selectedProperty.id)}
                      className="flex-1 py-4 border-2 border-danger text-danger font-black rounded-xl hover:bg-danger/5 transition-all text-sm uppercase tracking-widest"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleApprove(selectedProperty.id)}
                      className="flex-[2] btn-primary py-4 text-sm"
                    >
                      Verify Listing
                      <CheckCircle size={18} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-surface rounded-3xl p-12 text-center flex flex-col items-center gap-6 border-2 border-dashed border-gray-200">
                  <Eye size={48} className="text-gray-300" />
                  <p className="text-text-secondary font-medium">Select a property from the queue to review details.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
