'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { 
  CreditCard, TrendingUp, AlertCircle, 
  CheckCircle, History, Clock, ArrowUpRight,
  TrendingDown, ShieldCheck, Download, Plus, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatNaira, cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { storage } from '@/lib/storage';

export default function RentCollectionPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  const mockRevenue = [
    { label: 'Jan', amount: 1200000 },
    { label: 'Feb', amount: 800000 },
    { label: 'Mar', amount: 2400000 },
    { label: 'Apr', amount: 1500000 },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:col-span-2 flex-1 space-y-10">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm border-b-8 border-b-primary">
                 <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Total Collected</p>
                 <p className="text-3xl font-black text-text-primary">{formatNaira(5900000)}</p>
                 <div className="flex items-center gap-1 text-success text-xs font-bold mt-2">
                   <TrendingUp size={14} /> +12% this month
                 </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm border-b-8 border-b-accent">
                 <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Pending Escrow</p>
                 <p className="text-3xl font-black text-text-primary">{formatNaira(800000)}</p>
                 <div className="flex items-center gap-1 text-accent text-xs font-bold mt-2">
                   <Clock size={14} /> Releasing in 4 days
                 </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm border-b-8 border-b-text-primary">
                 <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Next Payout</p>
                 <p className="text-3xl font-black text-text-primary">28 Apr</p>
                 <div className="flex items-center gap-1 text-text-secondary text-xs font-bold mt-2">
                   <CreditCard size={14} /> Bank Transfer
                 </div>
              </div>
            </div>

            {/* Payout Channels */}
            <div className="card space-y-8">
               <div className="flex items-center justify-between">
                 <h3 className="text-xl font-bold">Payout Destination</h3>
                 <button className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                   Edit Destination <ArrowUpRight size={14} />
                 </button>
               </div>
               
               <div className="flex items-center justify-between p-6 bg-surface rounded-2xl border border-gray-100 border-l-4 border-l-primary">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-primary shadow-lg">
                      <CreditCard size={28} />
                    </div>
                    <div>
                      <p className="font-black text-lg">ACCESS BANK PLC</p>
                      <p className="text-text-secondary text-sm font-medium">0123****789 • Current Account</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-black text-xs bg-primary/5 px-4 py-2 rounded-full uppercase tracking-widest">
                    <CheckCircle size={14} />
                    Active
                  </div>
               </div>

               <div className="p-4 bg-primary/5 rounded-xl flex items-center gap-4 text-primary text-sm font-medium italic">
                 <ShieldCheck size={20} />
                 Homesure Pay releases funds 48 hours after move-in confirmation.
               </div>
            </div>

            {/* Revenue Graph Mock */}
            <div className="card">
               <h3 className="text-xl font-bold mb-10">Revenue Analytics</h3>
               <div className="flex items-end gap-4 h-64">
                 {mockRevenue.map((m) => (
                   <div key={m.label} className="flex-1 flex flex-col items-center gap-4 h-full group">
                     <div className="flex-1 w-full bg-surface rounded-t-xl relative overflow-hidden flex flex-col justify-end">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${(m.amount / 2400000) * 100}%` }}
                          className="w-full bg-primary group-hover:bg-accent transition-colors"
                        />
                     </div>
                     <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{m.label}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <aside className="lg:w-[400px] space-y-8">
             <div className="card p-8 space-y-8 border-t-8 border-t-accent shadow-2xl">
                <h3 className="text-2xl font-black">Escrow Manager</h3>
                <div className="space-y-6">
                   <div className="flex justify-between items-start">
                     <div>
                       <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Awaiting Release</p>
                       <p className="text-2xl font-black">₦800,000</p>
                     </div>
                     <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">In Escrow</div>
                   </div>

                   <ul className="space-y-4">
                     <li className="flex items-center justify-between text-sm py-4 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-gray-100" />
                           <span className="font-bold">Chidi Okonkwo</span>
                        </div>
                        <span className="text-text-secondary uppercase text-[10px] font-black">2 Day Left</span>
                     </li>
                     <li className="flex items-center justify-between text-sm py-4 border-b border-gray-50 opacity-40 grayscale">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-gray-100" />
                           <span className="font-bold">Musa Ibrahim</span>
                        </div>
                        <CheckCircle size={16} />
                     </li>
                   </ul>
                </div>

                <div className="p-4 bg-accent/5 rounded-xl text-[10px] font-bold text-accent uppercase tracking-widest leading-relaxed flex items-start gap-2">
                   <Info size={14} className="mt-0.5" />
                   Funds are automatically released 48h after the tenant confirms key delivery.
                </div>
             </div>

             <div className="card">
                <h3 className="text-xl font-bold mb-6">Payment History</h3>
                <div className="space-y-4">
                   {[1,2,3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-xl hover:bg-white border border-transparent hover:border-gray-100 transition-all cursor-pointer group">
                         <div>
                            <p className="font-bold text-sm">March Rent Payout</p>
                            <p className="text-[10px] font-black text-text-secondary uppercase">15 Mar • #PAY-9921</p>
                         </div>
                         <Download size={16} className="text-text-secondary group-hover:text-primary transition-colors" />
                      </div>
                   ))}
                </div>
                <button className="w-full text-center text-xs font-bold text-primary mt-8 uppercase tracking-widest hover:underline">
                  View Full Report
                </button>
             </div>
          </aside>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
