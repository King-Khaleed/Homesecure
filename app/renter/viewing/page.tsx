'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { storage } from '@/lib/storage';
import { Booking, Property } from '@/lib/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Calendar, Clock, MapPin, ChevronLeft, CalendarCheck, MoreHorizontal, Video, CheckCircle, Info, Home } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ViewingSchedulePage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      storage.init();
      const all = storage.getBookings().filter(b => b.renterId === user.id);
      setBookings(all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <Link href="/renter" className="flex items-center gap-2 text-primary font-bold mb-8 transition-transform hover:-translate-x-1">
          <ChevronLeft size={20} />
          Dashboard
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-black text-text-primary mb-2">Viewing Schedule</h1>
          <p className="text-text-secondary">Manage your physical and virtual property inspections.</p>
        </div>

        <div className="grid lg:grid-cols-1 gap-6">
          {bookings.length > 0 ? (
            bookings.map((book) => {
              const prop = storage.getProperty(book.propertyId);
              return (
                <motion.div 
                  key={book.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:border-primary/50 transition-all"
                >
                  {/* Property Info */}
                  <div className="flex items-center gap-6 w-full md:w-auto md:min-w-[300px]">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                      <img src={prop?.images[0]} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text-primary mb-1 truncate max-w-[200px]">{prop?.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-text-secondary">
                        <MapPin size={12} className="text-primary" />
                        {prop?.location.city}, {prop?.location.state}
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-1 rounded">
                        {book.type === 'virtual' ? <Video size={10} /> : <Home size={10} />}
                        {book.type} VIEWING
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-12 flex-1 w-full md:w-auto">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Date</p>
                      <p className="font-black text-xl flex items-center gap-2">
                        <CalendarCheck className="text-primary" size={20} />
                        {book.date}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Time</p>
                      <p className="font-black text-xl flex items-center gap-2">
                        <Clock className="text-primary" size={20} />
                        {book.time}
                      </p>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={cn(
                      "px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest min-w-[140px] text-center",
                      book.status === 'confirmed' ? "bg-success/10 text-success" : 
                      book.status === 'pending' ? "bg-accent/10 text-accent" : "bg-gray-100 text-gray-400"
                    )}>
                      {book.status}
                    </div>
                    <button className="p-3 bg-surface rounded-xl hover:bg-gray-100 transition-colors">
                      <MoreHorizontal size={24} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="bg-white rounded-3xl p-20 text-center flex flex-col items-center gap-6">
              <Calendar size={64} className="text-gray-200" />
              <h3 className="text-xl font-bold">No viewings scheduled yet</h3>
              <p className="text-text-secondary">Book physical tours to see properties in person.</p>
              <Link href="/search" className="btn-primary px-8">Find Properties</Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
