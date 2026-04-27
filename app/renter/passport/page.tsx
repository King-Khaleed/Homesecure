'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { 
  ShieldCheck, Award, Zap, History, UserCheck, 
  MapPin, CheckCircle, Smartphone, Download, Share2,
  Lock, TrendingUp, Star, CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ResidentPassportPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="section-container pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Passport Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-text-primary text-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 skew-x-[-15deg] translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[80px] -z-0" />

            <div className="relative z-10 space-y-10">
              {/* Top Meta */}
              <div className="flex justify-between items-start">
                <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 backdrop-blur-md">
                   <ShieldCheck className="text-accent" size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Digital Resident Passport</span>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mb-1">Passport ID</p>
                   <p className="font-mono text-lg font-black text-accent">HS-PA-4492-BX</p>
                </div>
              </div>

              {/* User Identity Section */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                 <div className="w-48 h-48 rounded-[40px] overflow-hidden border-8 border-white/10 shadow-2xl relative group">
                    <img src={user.avatar} className="w-full h-full object-cover" alt="Passport avatar" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Update Portait</button>
                    </div>
                 </div>

                 <div className="flex-1 text-center md:text-left">
                   <h1 className="text-5xl font-black mb-3">{user.name}</h1>
                   <div className="flex flex-wrap justify-center md:justify-start gap-4">
                     <span className="bg-success text-white px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-2">
                        <CheckCircle size={14} />
                        Identity Verified
                     </span>
                     <span className="bg-white/10 text-white px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 border border-white/10">
                        <Smartphone size={14} />
                        Biometrics Set
                     </span>
                   </div>
                   
                   <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                     <div>
                       <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Status</p>
                       <p className="font-black text-lg">Verified Renter</p>
                     </div>
                     <div>
                       <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Joined</p>
                       <p className="font-black text-lg">Mar 2024</p>
                     </div>
                     <div className="hidden lg:block">
                       <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Nationality</p>
                       <p className="font-black text-lg">Nigerian</p>
                     </div>
                   </div>
                 </div>
              </div>

              {/* Score Display */}
              <div className="bg-white/5 rounded-[40px] p-8 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-10">
                 <div className="flex items-center gap-8">
                    <div className="relative">
                       <svg className="w-32 h-32" viewBox="0 0 100 100">
                         <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/10" />
                         <path d="M50 5 a45 45 0 0 1 0 90 a45 45 0 0 1 0 -90" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" strokeDasharray={`${(user.creditScore / 1000) * 283} 283`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-3xl font-black text-secondary">{user.creditScore}</span>
                         <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Score</span>
                       </div>
                    </div>
                    <div>
                       <h3 className="text-2xl font-black mb-1">Elite Tier</h3>
                       <p className="text-white/40 text-sm leading-relaxed">Your resident score is in the top 5% of Lagos home seekers.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl text-center border border-white/5">
                       <p className="text-[10px] font-black uppercase text-white/40 mb-1">Reliability</p>
                       <p className="font-black">99.2%</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl text-center border border-white/5">
                       <p className="text-[10px] font-black uppercase text-white/40 mb-1">Trust Pos.</p>
                       <p className="font-black">#{user.id.slice(-3).toUpperCase()}</p>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Action Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             <div className="card space-y-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                   <Lock size={28} />
                </div>
                <h3 className="text-xl font-bold">Privacy Controls</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                   Decide which parts of your passport landlords can see during the application process. You have full control over your biometric data.
                </p>
                <div className="flex flex-col gap-3">
                   <div className="flex items-center justify-between p-3 bg-surface rounded-xl">
                      <span className="text-sm font-bold">Show Resident Score</span>
                      <div className="w-10 h-5 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-surface rounded-xl">
                      <span className="text-sm font-bold">Show ID Number</span>
                      <div className="w-10 h-5 bg-gray-200 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                   </div>
                </div>
             </div>

             <div className="card space-y-6">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                   <Star size={28} />
                </div>
                <h3 className="text-xl font-bold">Boost Your Score</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                   Unlock better properties and lower agency fees by improving your Resident Score.
                </p>
                <div className="space-y-4">
                   <div className="flex gap-4 p-4 bg-surface rounded-2xl border border-gray-50 hover:border-accent group transition-all cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform">
                         <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Add Financial Link</p>
                        <p className="text-[10px] font-black uppercase text-accent">+50 Points</p>
                      </div>
                   </div>
                   <div className="flex gap-4 p-4 bg-surface rounded-2xl border border-gray-50 hover:border-primary group transition-all cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                         <UserCheck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Landlord Referral</p>
                        <p className="text-[10px] font-black uppercase text-primary">+80 Points</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 p-8 bg-white rounded-3xl border border-gray-100 items-center justify-between shadow-xl">
             <div className="flex items-center gap-4">
                <ShieldCheck className="text-success" size={40} />
                <div>
                   <h4 className="font-bold text-lg">Passport Active & Secure</h4>
                   <p className="text-text-secondary text-sm">Last verified: Today, 09:42 AM</p>
                </div>
             </div>
             <div className="flex gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none btn-outline py-3 px-6 flex items-center justify-center gap-2">
                   <Share2 size={18} />
                   Share
                </button>
                <button className="flex-1 sm:flex-none btn-primary py-3 px-8 flex items-center justify-center gap-2">
                   <Download size={18} />
                   Export Verifiable PDF
                </button>
             </div>
          </div>

        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
