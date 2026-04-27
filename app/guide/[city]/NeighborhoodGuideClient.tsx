'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { MapPin, TrendingUp, Shield, Users, Info, ArrowRight, Home, School, ShoppingBag, Coffee, CheckCircle } from 'lucide-react';
import { formatNaira, cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NeighborhoodGuideClient() {
  const params = useParams();
  const city = (params.city as string) || 'Lagos';
  const displayCity = city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');

  const guideData: any = {
    'Lagos': {
      tagline: 'The heartbeat of Africa.',
      description: 'From the luxury of Banana Island to the buzzing tech hubs of Yaba, Lagos offers a neighborhood for every lifestyle.',
      safety: 85, power: 70, traffic: 40, avgRent: 1500000,
      highlights: ['Business Hubs', 'Luxury Living', 'Vibrant Nightlife', 'Tech Ecosystem'],
      neighborhoods: [
        { name: 'Lekki Phase 1', type: 'Residential/Commercial', rating: 4.5, price: '₦3M - ₦8M' },
        { name: 'Yaba', type: 'Tech/Education Hub', rating: 4.2, price: '₦800K - ₦1.5M' },
      ]
    },
    'Abuja': {
      tagline: 'The Federal Power House.',
      description: 'Clean roads, organized structure, and a growing community.',
      safety: 95, power: 90, traffic: 80, avgRent: 2500000,
      highlights: ['Diplomatic Enclaves', 'Serene Environments', 'Modern Infrastructure'],
      neighborhoods: [
        { name: 'Maitama', type: 'Diplomatic', rating: 4.9, price: '₦10M - ₦25M' },
        { name: 'Gwarinpa', type: 'Mass Residential', rating: 4.1, price: '₦1.2M - ₦3M' },
      ]
    }
  };

  const data = guideData[displayCity] || guideData['Lagos'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="relative pt-48 pb-32 bg-text-primary text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('https://picsum.photos/seed/guide44/1600/900')" }}
        />
        <div className="section-container relative z-10 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-xs font-bold mb-6"><MapPin size={14} /> NEIGHBORHOOD GUIDE</div>
            <h1 className="text-6xl font-black mb-6 leading-tight">Living in <span className="text-accent">{displayCity}</span></h1>
            <p className="text-2xl text-white/80 leading-relaxed mb-10">{data.tagline}</p>
            <div className="flex items-center gap-8 justify-center md:justify-start">
              <div className="flex flex-col"><span className="text-4xl font-black text-accent">{formatNaira(data.avgRent)}</span><span className="text-sm text-white/50 font-bold uppercase tracking-widest">Avg. Rent</span></div>
              <div className="w-px h-16 bg-white/10" />
              <div className="flex flex-col"><span className="text-4xl font-black text-accent">{data.neighborhoods.length}+</span><span className="text-sm text-white/50 font-bold uppercase tracking-widest">Top Areas</span></div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-24">
        <div className="section-container grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl font-black">City Overview</h2>
            <p className="text-xl text-text-secondary leading-relaxed">{data.description}</p>
            <div className="grid grid-cols-2 gap-4">
              {data.highlights.map((h: string) => (
                <div key={h} className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-gray-50"><div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm"><CheckCircle size={20} /></div><span className="font-bold">{h}</span></div>
              ))}
            </div>
          </div>
          <div className="card space-y-10">
            <h3 className="text-xl font-bold mb-6">City Vital Signs</h3>
            {[
              { label: 'Security', val: data.safety, icon: Shield, color: 'bg-green-500' },
              { label: 'Power', val: data.power, icon: TrendingUp, color: 'bg-primary' },
              { label: 'Infrastructure', val: data.traffic, icon: MapPin, color: 'bg-accent' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><stat.icon size={16} />{stat.label}</span>
                  <span>{stat.val}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${stat.val}%` }} className={cn("h-full rounded-full", stat.color)} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-surface">
        <div className="section-container">
          <h2 className="text-4xl font-black mb-12 text-center">Where should you live?</h2>
          <div className="grid gap-6">
            {data.neighborhoods.map((n: any, i: number) => (
              <motion.div key={n.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-center gap-8 flex-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-2xl">{i + 1}</div>
                  <div><h3 className="text-2xl font-black mb-1">{n.name}</h3><p className="text-text-secondary font-medium">{n.type}</p></div>
                </div>
                <div className="grid grid-cols-2 gap-12 flex-[0.8] w-full md:w-auto">
                  <div><span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Rent Range</span><p className="font-black text-lg text-primary">{n.price}</p></div>
                  <div><span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Rating</span><div className="font-black text-lg">{n.rating} / 5</div></div>
                </div>
                <Link href={`/search?q=${n.name}`} className="btn-outline px-6 py-3 text-xs flex items-center gap-2">View Listings <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
