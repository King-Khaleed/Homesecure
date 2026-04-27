'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { storage } from '@/lib/storage';
import { Transaction } from '@/lib/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { History, TrendingUp, TrendingDown, Clock, CheckCircle, Download, ChevronLeft, Filter, Search } from 'lucide-react';
import { formatNaira, cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PaymentHistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    if (user) {
      storage.init();
      const all = storage.getTransactions().filter(t => t.senderId === user.id || t.receiverId === user.id);
      setHistory(all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <Link href={user.role === 'landlord' ? '/landlord' : '/renter'} className="flex items-center gap-2 text-primary font-bold mb-8 hover:-translate-x-1 transition-transform">
          <ChevronLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-text-primary mb-2">Payment History</h1>
            <p className="text-text-secondary">Track every naira you&apos;ve sent or received through Homesure Pay.</p>
          </div>
          <button className="btn-outline">
            <Download size={20} />
            Export Statement (PDF)
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center bg-surface/30">
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200">
               <Search size={18} className="text-text-secondary" />
               <input type="text" placeholder="Filter by property or ID..." className="bg-transparent outline-none text-sm w-full" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-text-secondary bg-white border border-gray-200 rounded-lg">
               <Filter size={18} />
               All Status
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-surface/50 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Transaction</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Type</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Date</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {history.length > 0 ? (
                    history.map((t) => (
                      <tr key={t.id} className="hover:bg-surface/50 transition-colors">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                t.senderId === user.id ? "bg-danger/10 text-danger" : "bg-success/10 text-success"
                              )}>
                                {t.senderId === user.id ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
                              </div>
                              <div>
                                <p className="font-bold text-text-primary">#TRN-{t.id.slice(-6).toUpperCase()}</p>
                                <p className="text-xs text-text-secondary">Homesure Secure Pay</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-sm font-bold text-text-primary capitalize">{t.type}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-sm text-text-secondary font-medium">{new Date(t.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className={cn("text-lg font-black", t.senderId === user.id ? "text-danger" : "text-success")}>
                              {t.senderId === user.id ? "-" : "+"}{formatNaira(t.amount)}
                           </span>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              {t.status === 'released' ? (
                                <div className="flex items-center gap-1.5 text-success font-black text-[10px] uppercase tracking-widest">
                                   <CheckCircle size={14} />
                                   Released
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 text-accent font-black text-[10px] uppercase tracking-widest">
                                   <Clock size={14} />
                                   In Escrow
                                </div>
                              )}
                           </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                       <td colSpan={5} className="px-8 py-20 text-center">
                          <History size={48} className="mx-auto text-gray-200 mb-4" />
                          <p className="text-text-secondary font-medium">No transaction history found.</p>
                       </td>
                    </tr>
                  )}
               </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
