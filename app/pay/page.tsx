'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { 
  ShieldCheck, CreditCard, Lock, ArrowRight, 
  CheckCircle, Plus, Info, AlertCircle, History,
  TrendingDown, TrendingUp
} from 'lucide-react';
import { formatNaira, cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/storage';
import Link from 'next/link';
import { Transaction, Property } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomesurePayPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (user) {
      storage.init();
      const all = storage.getProperties().filter(p => !user.savedProperties.includes(p.id));
      setProperties(all.slice(0, 3));
      
      const trans = storage.getTransactions().filter(t => t.senderId === user.id || t.receiverId === user.id);
      setTransactions(trans.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Header / Wallet Card */}
            <div className="bg-primary text-white p-10 rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
                <div>
                  <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                    <CreditCard className="text-accent" />
                    Homesure Pay
                  </h1>
                  <p className="text-white/60">Nigeria&apos;s first escrow system for real estate.</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Escrow Balance</div>
                   <div className="text-3xl font-black">{formatNaira(transactions.filter(t => t.status === 'escrow').reduce((acc, t) => acc + t.amount, 0))}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="bg-white text-primary p-6 rounded-2xl flex flex-col gap-2">
                    <ShieldCheck size={24} />
                    <span className="text-sm font-bold">100% Protection</span>
                 </div>
                 <div className="bg-white/10 text-white p-6 rounded-2xl border border-white/10 flex flex-col gap-2">
                    <Lock size={24} />
                    <span className="text-sm font-bold">Smart Contracts</span>
                 </div>
                 <div className="hidden lg:flex bg-white/10 text-white p-6 rounded-2xl border border-white/10 flex-col gap-2">
                    <CheckCircle size={24} />
                    <span className="text-sm font-bold">Instant Release</span>
                 </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="grid md:grid-cols-2 gap-8">
               <div className="card space-y-4">
                 <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-xl font-bold">How Escrow Works</h3>
                 <p className="text-text-secondary text-sm leading-relaxed">
                   When you pay for a property, your money goes into the Homesure Escrow vault. The landlord only gets paid AFTER you have physically moved in and confirmed everything matches the listing.
                 </p>
                 <button className="text-primary font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-all">
                   Watch how it works <ArrowRight size={14} />
                 </button>
               </div>

               <div className="card space-y-4">
                 <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                    <AlertCircle size={24} />
                 </div>
                 <h3 className="text-xl font-bold">Refund Policy</h3>
                 <p className="text-text-secondary text-sm leading-relaxed">
                   If the property fails our verification or the landlord defaults on the agreement, your money is refunded within 24 hours, no questions asked.
                 </p>
                 <button className="text-primary font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-all">
                   View Terms <ArrowRight size={14} />
                 </button>
               </div>
            </div>

            {/* Recent History */}
            <div className="card px-0 overflow-hidden">
               <div className="px-8 flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Recent Activity</h3>
                  <Link href="/pay/history" className="text-xs font-bold text-primary uppercase tracking-widest">See Full History</Link>
               </div>
               
               {transactions.length > 0 ? (
                 <div className="divide-y divide-gray-50 border-t border-gray-50">
                    {transactions.slice(0, 5).map((t) => (
                      <div key={t.id} className="p-6 flex items-center justify-between hover:bg-surface transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            t.senderId === user.id ? "bg-danger/10 text-danger" : "bg-success/10 text-success"
                          )}>
                             {t.senderId === user.id ? <TrendingDown size={24} /> : <TrendingUp size={24} />}
                          </div>
                          <div>
                            <p className="font-bold text-text-primary capitalize">{t.type} Payment</p>
                            <p className="text-xs text-text-secondary">{new Date(t.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn("font-black text-lg", t.senderId === user.id ? "text-danger" : "text-success")}>
                            {t.senderId === user.id ? "- " : "+ "}{formatNaira(t.amount)}
                          </p>
                          <div className={cn(
                             "text-[10px] font-black uppercase tracking-widest mt-1",
                             t.status === 'escrow' ? "text-accent" : "text-success"
                          )}>
                            {t.status}
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="p-20 text-center flex flex-col items-center gap-6">
                    <History size={48} className="text-gray-200" />
                    <p className="text-text-secondary font-medium">No transactions found.</p>
                 </div>
               )}
            </div>
          </div>

          <aside className="space-y-8">
            {/* Quick Pay */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8 sticky top-32 space-y-8 border-t-8 border-primary">
              <h3 className="text-2xl font-black">Make a Payment</h3>
              <p className="text-text-secondary text-sm">Send rent, caution fee, or agent fees directly into escrow.</p>
              
              <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Property ID</label>
                   <input type="text" placeholder="HS-XXXX" className="input-field" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Amount (₦)</label>
                   <input type="number" placeholder="500,000" className="input-field font-black" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Payment For</label>
                   <select className="input-field font-bold">
                     <option>Rent Payment</option>
                     <option>Caution Fee</option>
                     <option>Agency & Legal</option>
                     <option>Property Purchase</option>
                   </select>
                 </div>
              </div>

              <button className="btn-primary w-full py-5 text-xl">
                 Pay Securely
                 <Lock size={20} />
              </button>

              <div className="flex items-center gap-3 p-4 bg-surface rounded-xl text-xs text-text-secondary">
                 <Info size={16} />
                 Homesure charges a 1.5% security fee capped at ₦50,000.
              </div>
            </div>

            {/* Popular FAQs */}
            <div className="card bg-accent text-white p-8">
               <h4 className="font-extrabold text-xl mb-4">Payment Safe-check</h4>
               <ul className="space-y-3 mb-6">
                 <li className="flex items-start gap-2 text-sm">
                   <CheckCircle size={16} className="mt-0.5" />
                   Never pay outside Homesure escrow.
                 </li>
                 <li className="flex items-start gap-2 text-sm">
                   <CheckCircle size={16} className="mt-0.5" />
                   We never ask for &apos;agreement fees&apos; before viewing.
                 </li>
                 <li className="flex items-start gap-2 text-sm">
                   <CheckCircle size={16} className="mt-0.5" />
                   Receipts are generated instantly.
                 </li>
               </ul>
               <button className="w-full py-3 bg-white text-accent font-black rounded-xl text-xs uppercase tracking-widest">
                 Report suspicious link
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
