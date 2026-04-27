'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Navbar } from '@/components/Navbar';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { 
  LayoutDashboard, Heart, Calendar, FileText, 
  MessageSquare, CreditCard, ChevronRight, MapPin, 
  CheckCircle, Clock, AlertCircle, TrendingUp, User
} from 'lucide-react';
import { Footer } from '@/components/Footer';
import { storage } from '@/lib/storage';
import { Booking, Application, Transaction, Property } from '@/lib/types';
import { formatNaira, cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function RenterDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    if (user) {
      storage.init();
      const allBookings = storage.getBookings().filter(b => b.renterId === user.id);
      const allApps = storage.getApplications().filter(a => a.renterId === user.id);
      const allTrans = storage.getTransactions().filter(t => t.senderId === user.id);
      
      setBookings(allBookings);
      setApplications(allApps);
      setTransactions(allTrans);
      setSavedCount(user.savedProperties.length);
    }
  }, [user]);

  if (!user) return null;

  const stats = [
    { label: 'Saved', val: savedCount, icon: Heart, color: 'text-accent', href: '/renter/saved' },
    { label: 'Viewings', val: bookings.length, icon: Calendar, color: 'text-primary', href: '/renter/viewing' },
    { label: 'Applications', val: applications.length, icon: FileText, color: 'text-blue-500', href: '/renter/apply' },
    { label: 'Escrow', val: transactions.length, icon: CreditCard, color: 'text-green-500', href: '/pay/history' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Nav */}
          <aside className="hidden lg:block w-72 space-y-2">
            {[
              { label: 'Dashboard', href: '/renter', icon: LayoutDashboard, active: true },
              { label: 'Saved Properties', href: '/renter/saved', icon: Heart },
              { label: 'My Viewings', href: '/renter/viewing', icon: Calendar },
              { label: 'Applications', href: '/renter/apply', icon: FileText },
              { label: 'Messages', href: '/renter/messages', icon: MessageSquare },
              { label: 'Homesure Pay', href: '/pay', icon: CreditCard },
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
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full border-4 border-primary p-1">
                  <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-text-primary">Welcome, {user.name.split(' ')[0]}! 👋</h1>
                  <div className="flex items-center gap-2 text-text-secondary font-medium mt-1">
                    <span className="capitalize">{user.role}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1 text-primary font-bold">
                      <CheckCircle size={14} />
                      {user.kycStatus === 'verified' ? 'Identity Verified' : 'KYC Pending'}
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/search" className="btn-primary w-full md:w-auto">
                Find New Properties
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <Link key={stat.label} href={stat.href} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform", stat.color)}>
                      <stat.icon size={24} />
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-3xl font-black text-text-primary">{stat.val}</p>
                  <p className="text-xs font-black uppercase tracking-wider text-text-secondary">{stat.label}</p>
                </Link>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Viewings */}
              <div className="card h-fit">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Calendar className="text-primary" />
                    Upcoming Viewings
                  </h3>
                  <Link href="/renter/viewing" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View All</Link>
                </div>
                
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((book) => {
                      const prop = storage.getProperty(book.propertyId);
                      return (
                        <div key={book.id} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-gray-50 group hover:border-primary/30 transition-all">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={prop?.images[0]} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 truncate">
                            <h4 className="font-bold text-text-primary truncate">{prop?.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                              <Clock size={12} />
                              {book.date} • {book.time}
                            </div>
                          </div>
                          <div className="text-right">
                             <div className={cn(
                               "text-[10px] font-black px-2 py-1 rounded uppercase",
                               book.status === 'confirmed' ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                             )}>
                               {book.status}
                             </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center text-text-secondary mx-auto mb-4">
                      <Calendar size={32} />
                    </div>
                    <p className="text-text-secondary font-medium">No upcoming viewings scheduled.</p>
                    <Link href="/search" className="text-primary font-bold text-sm mt-2 inline-block">Browse properties</Link>
                  </div>
                )}
              </div>

              {/* Identity & Credit */}
              <div className="card h-fit">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="text-primary" />
                    Resident Score
                  </h3>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Excellent</div>
                </div>

                <div className="flex items-end gap-6 mb-8">
                  <div className="text-6xl font-black text-text-primary">{user.creditScore}</div>
                  <div className="text-text-secondary text-sm pb-2">/ 900 points</div>
                </div>

                <div className="space-y-6">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(user.creditScore / 900) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface rounded-xl border border-gray-50">
                      <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">KYC Status</p>
                      <p className="font-bold text-success flex items-center gap-1">
                        <CheckCircle size={14} />
                        Verified
                      </p>
                    </div>
                    <div className="p-4 bg-surface rounded-xl border border-gray-50">
                      <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">Rent History</p>
                      <p className="font-bold text-text-primary">100% On-time</p>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed p-4 bg-gray-50 rounded-xl italic">
                    &ldquo;High Resident Scores unlock zero-deposit rentals and faster application approvals on Homesure.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions / Banners */}
            <div className="bg-text-primary rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rotate-45 translate-x-12 -translate-y-12" />
               <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary">
                   <CreditCard size={32} />
                 </div>
                 <div>
                   <h4 className="text-xl font-bold">Try Homesure Pay</h4>
                   <p className="text-white/60">Secure your next home with our protected escrow system.</p>
                 </div>
               </div>
               <Link href="/pay" className="btn-accent px-8">Upgrade to Pro</Link>
            </div>
          </main>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
