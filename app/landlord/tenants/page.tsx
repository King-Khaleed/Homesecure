'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { storage } from '@/lib/storage';
import { Application, User, Property } from '@/lib/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Users, FileText, CheckCircle, XCircle, Eye, ChevronLeft, MapPin, MoreHorizontal, UserCheck, ShieldCheck, ChevronRight, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function TenantManagementPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  useEffect(() => {
    if (user) {
      storage.init();
      const myProps = storage.getProperties().filter(p => p.ownerId === user.id);
      const allApps = storage.getApplications().filter(a => myProps.some(p => p.id === a.propertyId));
      
      const enrichedApps = allApps.map(app => ({
        ...app,
        renter: storage.getUsers().find(u => u.id === app.renterId),
        property: storage.getProperties().find(p => p.id === app.propertyId)
      }));
      
      setApplications(enrichedApps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }, [user]);

  const handleStatusChange = (id: string, status: 'approved' | 'rejected') => {
    const all = storage.getApplications();
    const updated = all.map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem('homesure_applications', JSON.stringify(updated));
    
    setApplications((prev: any[]) => prev.map(a => a.id === id ? { ...a, status } : a));
    setSelectedApp((prev: any | null) => prev && prev.id === id ? { ...prev, status } : prev);
    
    toast(`Application ${status} successfully!`, status === 'approved' ? 'success' : 'info');
    window.dispatchEvent(new Event('storage'));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <Link href="/landlord" className="flex items-center gap-2 text-primary font-bold mb-8 hover:-translate-x-1 transition-transform">
          <ChevronLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-black text-text-primary mb-2">Tenant Management</h1>
          <p className="text-text-secondary">Review applications and manage your active tenancies.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {applications.length > 0 ? (
              applications.map((app) => (
                <div 
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={cn(
                    "bg-white p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-6",
                    selectedApp?.id === app.id ? "border-primary shadow-xl ring-2 ring-primary/20" : "border-gray-100 hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                      <img src={app.renter?.avatar} alt={app.renter?.name} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-lg text-text-primary mb-1 truncate">{app.renter?.name}</h3>
                      <p className="text-xs text-text-secondary truncate italic mb-2">&quot;{app.property?.title}&quot;</p>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded",
                          app.status === 'approved' ? "bg-success/10 text-success" : 
                          app.status === 'rejected' ? "bg-danger/10 text-danger" : "bg-accent/10 text-accent"
                        )}>
                          {app.status}
                        </span>
                        <span className="text-[10px] font-black text-text-secondary uppercase">Applied {new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={24} className="text-text-secondary" />
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-32 text-center flex flex-col items-center gap-6">
                <Users size={64} className="text-gray-200" />
                <h3 className="text-2xl font-bold">No applications yet</h3>
                <p className="text-text-secondary">Prospective tenants will show up here as they apply for your listings.</p>
              </div>
            )}
          </div>

          <div>
             <AnimatePresence mode="wait">
               {selectedApp ? (
                 <motion.div 
                   key={selectedApp.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sticky top-32 space-y-8"
                 >
                   <div className="flex items-center gap-6">
                     <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary">
                        <img src={selectedApp.renter?.avatar} alt="renter" />
                     </div>
                     <div>
                       <h3 className="text-2xl font-black">{selectedApp.renter?.name}</h3>
                       <div className="flex items-center gap-1.5 text-primary">
                         <ShieldCheck size={16} />
                         <span className="text-xs font-black uppercase tracking-widest">Verified Renter</span>
                       </div>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <div className="bg-surface p-6 rounded-2xl border border-gray-50">
                        <h4 className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-4">Resident Bio-metrics</h4>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Resident Score</span>
                              <span className="font-black text-primary">{selectedApp.renter?.creditScore}</span>
                           </div>
                           <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${(selectedApp.renter?.creditScore / 900) * 100}%` }} />
                           </div>
                           <div className="flex justify-between items-center text-sm">
                              <span className="text-text-secondary">Identity Verified</span>
                              <CheckCircle size={16} className="text-success" />
                           </div>
                        </div>
                     </div>

                     <div className="bg-surface p-6 rounded-2xl border border-gray-50">
                        <h4 className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Applied For</h4>
                        <p className="font-bold text-text-primary text-sm mb-1">{selectedApp.property?.title}</p>
                        <p className="text-xs text-text-secondary flex items-center gap-1">
                          <MapPin size={10} />
                          {selectedApp.property?.location.city}
                        </p>
                     </div>
                   </div>

                   <div className="flex flex-col gap-3">
                     {selectedApp.status === 'pending' ? (
                       <div className="flex gap-3">
                          <button 
                            onClick={() => handleStatusChange(selectedApp.id, 'rejected')}
                            className="flex-1 py-4 border-2 border-danger text-danger font-black rounded-xl text-xs uppercase tracking-widest hover:bg-danger/5 transition-all"
                          >
                            Reject
                          </button>
                          <button 
                            onClick={() => handleStatusChange(selectedApp.id, 'approved')}
                            className="flex-[2] btn-primary py-4 text-xs"
                          >
                            Approve Application
                            <CheckCircle size={16} />
                          </button>
                       </div>
                     ) : (
                       <div className={cn(
                         "py-4 rounded-xl text-center font-black uppercase tracking-widest text-sm",
                         selectedApp.status === 'approved' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                       )}>
                         Application {selectedApp.status}
                       </div>
                     )}
                     <button className="w-full py-4 text-text-primary bg-surface rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                       <MessageSquare size={18} />
                       Chat with {selectedApp.renter?.name.split(' ')[0]}
                     </button>
                   </div>
                 </motion.div>
               ) : (
                 <div className="bg-surface p-12 rounded-3xl border-2 border-dashed border-gray-200 text-center flex flex-col items-center gap-4">
                    <UserCheck size={48} className="text-gray-300" />
                    <p className="text-text-secondary font-medium">Select an application to view the full renter profile and resident score.</p>
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
