'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { 
  Building2, Search, Plus, Filter, Eye, Edit, 
  Trash2, ChevronRight, CheckCircle, Clock, AlertCircle, X, MessageSquare
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { Property } from '@/lib/types';
import { formatNaira, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function LandlordListingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (user) {
      storage.init();
      const myProps = storage.getProperties().filter(p => p.ownerId === user.id);
      setProperties(myProps);
    }
  }, [user]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      const all = storage.getProperties();
      const updated = all.filter(p => p.id !== id);
      localStorage.setItem('homesure_properties', JSON.stringify(updated));
      setProperties(prev => prev.filter(p => p.id !== id));
      toast("Listing deleted successfully", "info");
      window.dispatchEvent(new Event('storage'));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-text-primary mb-2">My Listings</h1>
            <p className="text-text-secondary">Manage and track the performance of your property portfolio.</p>
          </div>
          <Link href="/landlord/add/step1" className="btn-primary">
            <Plus size={20} />
            Add New Property
          </Link>
        </div>

        <div className="grid gap-6">
          {properties.length > 0 ? (
            properties.map((prop, i) => (
              <motion.div 
                key={prop.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 group hover:border-primary/30 transition-all"
              >
                {/* Visual */}
                <div className="w-full lg:w-48 h-48 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                  <img src={prop.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>

                {/* Info */}
                <div className="flex-1 w-full space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-text-primary mb-1">{prop.title}</h3>
                      <p className="text-text-secondary flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        {prop.location.address}
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-black text-primary">{formatNaira(prop.price)}</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Per {prop.pricePeriod}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="bg-surface px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold text-text-primary">
                      <Eye size={16} className="text-primary" />
                      {prop.views} Views
                    </div>
                    <div className="bg-surface px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold text-text-primary">
                      <MessageSquare size={16} className="text-primary" />
                      {prop.inquiries} Inquiries
                    </div>
                    <div className={cn(
                      "px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold",
                      prop.verification.status === 'verified' ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                    )}>
                      {prop.verification.status === 'verified' ? <CheckCircle size={16} /> : <Clock size={16} />}
                      {prop.verification.status === 'verified' ? 'Verified Listing' : 'Pending Verification'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
                  <Link href={`/property/${prop.id}`} className="flex-1 lg:w-full flex items-center justify-center gap-2 py-3 px-6 bg-surface hover:bg-primary/5 rounded-xl font-bold transition-all">
                    <Eye size={18} />
                    View
                  </Link>
                  <button className="flex-1 lg:w-full flex items-center justify-center gap-2 py-3 px-6 bg-surface hover:bg-primary/5 rounded-xl font-bold transition-all">
                    <Edit size={18} />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(prop.id)}
                    className="flex-shrink-0 lg:w-full flex items-center justify-center gap-2 py-3 px-4 bg-danger/5 hover:bg-danger/10 text-danger rounded-xl font-bold transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-32 text-center flex flex-col items-center gap-6 shadow-sm">
              <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-text-secondary">
                <Building2 size={48} />
              </div>
              <h3 className="text-2xl font-bold">No active listings</h3>
              <p className="text-text-secondary">Ready to reach thousands of verified tenants?</p>
              <Link href="/landlord/add/step1" className="btn-primary px-10">Start Your First Listing</Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function MapPin({ size, className }: { size: number, className: string }) {
  return <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke="currentColor" fill="none" strokeWidth="2" />;
}
