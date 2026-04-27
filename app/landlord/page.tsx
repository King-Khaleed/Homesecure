'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { 
  Building2, Plus, Users, MessageSquare, 
  CreditCard, ChevronRight, CheckCircle, 
  Search, Eye, FileText, AlertCircle, TrendingUp
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { Property, Application, Transaction } from '@/lib/types';
import { formatNaira, cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function LandlordDashboard() {
  const { user } = useAuth();
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (user) {
      storage.init();
      const props = storage.getProperties().filter(p => p.ownerId === user.id);
      setMyProperties(props);
      
      const allApps = storage.getApplications().filter(a => props.some(p => p.id === a.propertyId));
      setApplications(allApps);
      
      const allTrans = storage.getTransactions().filter(t => t.receiverId === user.id && t.status === 'released');
      const revenue = allTrans.reduce((acc, curr) => acc + curr.amount, 0);
      setTotalRevenue(revenue);
    }
  }, [user]);

  if (!user) return null;

  const stats = [
    { label: 'Active Listings', val: myProperties.length, icon: Building2, color: 'text-primary' },
    { label: 'Total Tenants', val: 0, icon: Users, color: 'text-accent' },
    { label: 'Applications', val: applications.length, icon: FileText, color: 'text-blue-500' },
    { label: 'Revenue', val: formatNaira(totalRevenue), icon: TrendingUp, color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Nav */}
          <aside className="hidden lg:block w-72 space-y-2">
            {[
              { label: 'Overview', href: '/landlord', icon: Building2, active: true },
              { label: 'My Listings', href: '/landlord/listings', icon: Search },
              { label: 'Add Property', href: '/landlord/add/step1', icon: Plus },
              { label: 'Tenants', href: '/landlord/tenants', icon: Users },
              { label: 'Rent Collection', href: '/landlord/rent', icon: CreditCard },
              { label: 'Messages', href: '/landlord/messages', icon: MessageSquare },
            ].map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all",
                  link.active ? "bg-primary text-white shadow-lg" : "text-text-secondary hover:bg-white hover:text-primary"
                )}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
          </aside>

          {/* Main Dashboard */}
          <main className="flex-1 space-y-10">
            {/* Welcom Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-10 rounded-3xl border border-gray-100 shadow-sm border-l-8 border-l-accent">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full border-4 border-accent p-1 shadow-xl">
                  <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-text-primary">Ekaabo, {user.name.split(' ')[0]}!</h1>
                  <p className="text-text-secondary font-medium text-lg">Manage your property empire securely.</p>
                </div>
              </div>
              <Link href="/landlord/add/step1" className="btn-accent px-8 py-4 text-lg">
                <Plus size={20} />
                List New Property
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className={cn("w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4", stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-2xl font-black text-text-primary">{stat.val}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* My Rankings / Performance */}
              <div className="card bg-text-primary text-white p-8">
                 <div className="flex justify-between items-start mb-8">
                   <div>
                     <h3 className="text-xl font-bold mb-1">Portfolio Performance</h3>
                     <p className="text-white/60 text-sm">Last 30 days overview</p>
                   </div>
                   <TrendingUp className="text-accent" />
                 </div>
                 
                 <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">Profile Integrity</span>
                     <span className="font-bold text-accent">98%</span>
                   </div>
                   <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-accent w-[98%]" />
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">Tenant Satisfaction</span>
                     <span className="font-bold text-primary">4.9/5</span>
                   </div>
                   <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[95%]" />
                   </div>
                 </div>

                 <div className="mt-10 p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-4">
                   <CheckCircle className="text-success" />
                   <p className="text-xs text-white/70">You are in the top 5% of trusted Nigerian landlords this month!</p>
                 </div>
              </div>

              {/* Pending Applications */}
              <div className="card overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-xl">Recent Applications</h3>
                  <Link href="/landlord/tenants" className="text-xs font-bold text-primary">View All</Link>
                </div>
                
                {applications.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {applications.slice(0, 3).map((app) => {
                      const prop = storage.getProperty(app.propertyId);
                      return (
                        <div key={app.id} className="p-6 hover:bg-surface transition-colors flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.renterId}`} alt="renter" />
                            </div>
                            <div>
                              <p className="font-bold text-text-primary">Prospective Tenant</p>
                              <p className="text-xs text-text-secondary truncate max-w-[150px]">{prop?.title}</p>
                            </div>
                          </div>
                          <button className="p-2 text-primary hover:bg-primary/10 rounded-lg">
                            <Eye size={20} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-20 text-center">
                    <FileText size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-text-secondary">No pending applications.</p>
                  </div>
                )}
              </div>
            </div>

            {/* My Properties List (Simplified) */}
            <div className="card">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">My Active Listings</h3>
                <Link href="/landlord/listings" className="btn-outline py-2 px-4 text-sm">Manage All</Link>
              </div>

              <div className="space-y-4">
                {myProperties.map((prop) => (
                  <div key={prop.id} className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-gray-50 group hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                        <img src={prop.images[0]} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary truncate max-w-[200px]">{prop.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                          <Eye size={12} /> {prop.views} views • <MessageSquare size={12} /> {prop.inquiries} inquiries
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold text-primary">{formatNaira(prop.price)}</p>
                        <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest">{prop.pricePeriod}</p>
                      </div>
                      <div className={cn(
                        "text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest",
                        prop.verification.status === 'verified' ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                      )}>
                        {prop.verification.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
